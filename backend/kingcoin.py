import datetime
import hashlib
import json
from flask import Flask, jsonify, request
import requests
from uuid import uuid4
from urllib.parse import urlparse
from des import encrypt_des
import sys
import pickle
from Crypto.PublicKey import RSA
from Crypto import Random
from Crypto.Hash import SHA
import binascii
from collections import OrderedDict
from Crypto.Signature import PKCS1_v1_5
from flask_cors import CORS


def generate_RSA():
    random_generator = Random.new().read
    private_key = RSA.generate(1024, random_generator)
    public_key = private_key.publickey()
    private_key = binascii.hexlify(private_key.exportKey(format("DER"))).decode("ascii")
    public_key = binascii.hexlify(public_key.exportKey(format("DER"))).decode("ascii")
    return private_key, public_key


HEX_KEY = "133457799bbcdff1"


USER_NAME = sys.argv[1]
PORT_NUM = int(sys.argv[2])

with open("users.json", "r") as f:
    data = json.load(f)
if USER_NAME not in data.keys():
    pvt_key, pub_key = generate_RSA()
    data.update({USER_NAME: {"client_pub_key": pub_key, "client_pvt_key": pvt_key}})
    with open("users.json", "w") as f:
        json.dump(data, f, indent=4)


def encrypt(block_sha256):
    p1 = encrypt_des(block_sha256[:16], HEX_KEY)
    p2 = encrypt_des(block_sha256[16:32], HEX_KEY)
    p3 = encrypt_des(block_sha256[32:48], HEX_KEY)
    p4 = encrypt_des(block_sha256[48:64], HEX_KEY)
    return str(p1 + p2 + p3 + p4)


class Blockchain:
    def __init__(self):
        self.transactions = []
        with open("blockchain.json", "r") as f:
            data = json.load(f)
        if len(data):
            self.chain = data["blockchain"]
        else:
            self.chain = []
            self.create_block(proof=1, previous_hash="0")
        self.nodes = set()
        self.app = Flask(__name__)

    def create_block(self, proof, previous_hash):
        block = {
            "index": len(self.chain) + 1,
            "timestamp": str(datetime.datetime.now()),
            "proof": proof,
            "previous_hash": previous_hash,
            "transactions": self.transactions,
        }
        self.transactions = []
        self.chain.append(block)
        return block

    def blockchain_save(self):
        with open("blockchain.json", "r") as f:
            data = json.load(f)
            data.clear()
            data.update({"blockchain": self.chain})
        with open("blockchain.json", "w") as f:
            json.dump(data, f, indent=4)

    def get_previous_block(self):
        return self.chain[-1]

    def zero_knowledge_proof(self, transaction, pub_key, signature):
        public_key = RSA.importKey(binascii.unhexlify(pub_key))
        verifier = PKCS1_v1_5.new(public_key)
        h = SHA.new(str(transaction).encode("utf8"))
        try:
            if verifier.verify(h, binascii.unhexlify(signature)):
                return True
            else:
                return False
        except ValueError:
            return False

    def proof_of_work(self, previous_proof):
        new_proof = 1
        check_proof = False
        while check_proof is False:
            hash_operation = hashlib.sha256(str(new_proof ** 2 - previous_proof ** 2).encode()).hexdigest()
            if hash_operation[:4] == "0000":
                check_proof = True
            else:
                new_proof += 1
        return new_proof

    def hash(self, block):
        encoded_block = json.dumps(block, sort_keys=True).encode()
        return encrypt(hashlib.sha256(encoded_block).hexdigest())

    def is_chain_valid(self, chain):
        previous_block = chain[0]
        block_index = 1
        while block_index < len(chain):
            block = chain[block_index]
            if block["previous_hash"] != self.hash(previous_block):
                return False
            previous_proof = previous_block["proof"]
            proof = block["proof"]
            hash_operation = hashlib.sha256(str(proof ** 2 - previous_proof ** 2).encode()).hexdigest()
            if hash_operation[:4] != "0000":
                return False
            previous_block = block
            block_index += 1
        return True

    def add_transaction(self, sender_pub, sender_pvt, receiver, amount):
        # Verify Transaction
        transaction = {
            "sender": sender_pub,
            "receiver": receiver,
            "amount": amount,
        }
        if sender_pvt:  # Actual Transaction
            try:
                private_key = RSA.importKey(binascii.unhexlify(sender_pvt))
                signer = PKCS1_v1_5.new(private_key)
                h = SHA.new(str(transaction).encode("utf8"))
                signature = binascii.hexlify(signer.sign(h)).decode("ascii")
                res_zkp = self.zero_knowledge_proof(transaction, sender_pub, signature)
                if res_zkp:
                    self.transactions.append(transaction)
                else:
                    return False
            except:
                return False
        else:  # Mining Reward
            self.transactions.append(transaction)

        previous_block = self.get_previous_block()
        return previous_block["index"] + 1

    def add_node(self, address):
        parsed_url = urlparse(address)
        self.nodes.add(parsed_url.netloc)

    def update_chain(self):
        network = self.nodes
        longest_chain = None
        max_length = len(self.chain)
        for node in network:
            response = requests.get(f"http://{node}/api/get_blockchain")
            if response.status_code == 200:
                length = response.json()["length"]
                chain = response.json()["chain"]
                if length > max_length and self.is_chain_valid(chain):
                    max_length = length
                    longest_chain = chain
        if longest_chain:
            self.chain = longest_chain
            self.blockchain_save()
            return True
        return False


# Creating a Web App
app = Flask(__name__, static_folder="../KingCoinFE/build", static_url_path="/")
CORS(app)
app.config["JSONIFY_PRETTYPRINT_REGULAR"] = False

# Creating an address for the node on Port 5001
node_address = str(uuid4()).replace("-", "")

# Creating a Blockchain
blockchain = Blockchain()

# Mining a new block
@app.route("/api/mine_block", methods=["GET"])
def mine_block():
    previous_block = blockchain.get_previous_block()
    previous_proof = previous_block["proof"]
    proof = blockchain.proof_of_work(previous_proof)
    previous_hash = blockchain.hash(previous_block)
    with open("users.json", "r") as f:
        data = json.load(f)
    # Mining Reward
    blockchain.add_transaction(
        sender_pub=node_address, sender_pvt=None, receiver=data[USER_NAME]["client_pub_key"], amount=1
    )
    block = blockchain.create_block(proof, previous_hash)
    response = {
        "message": "Congratulations, you just mined a block!",
        "index": block["index"],
        "timestamp": block["timestamp"],
        "proof": block["proof"],
        "previous_hash": block["previous_hash"],
        "transactions": block["transactions"],
    }
    return jsonify(response), 200


# Getting the full Blockchain
@app.route("/api/get_blockchain", methods=["GET"])
def get_chain():
    response = {"chain": blockchain.chain, "length": len(blockchain.chain)}
    return jsonify(response), 200


# Checking if the Blockchain is valid
@app.route("/api/is_valid", methods=["GET"])
def is_valid():
    is_valid = blockchain.is_chain_valid(blockchain.chain)
    if is_valid:
        response = {"message": "All good. The Blockchain is valid."}
    else:
        response = {"message": "The Blockchain is not valid."}
    return jsonify(response), 200


# Adding a new transaction to the Blockchain
@app.route("/api/add_transaction", methods=["POST"])
def add_transaction():
    res_json = request.get_json()
    transaction_keys = ["sender_pub", "sender_pvt", "receiver", "amount"]
    if not all(key in res_json for key in transaction_keys):
        return jsonify({"Error": "Some elements of the transaction are missing"}), 400
    # res = requests.post(f'http://127.0.0.1:{PORT_NUM}/api/view_user', json={"user_pub_key":res_json['sender_pub']})
    # if res.json()["net_balance"] >= int(res_json["amount"]):
    index = blockchain.add_transaction(
        res_json["sender_pub"], res_json["sender_pvt"], res_json["receiver"], res_json["amount"]
    )
    if index:
        response = {"message": f"This transaction will be added to Block {index}", "status": "success"}
        return jsonify(response), 201
    else:
        response = {"message": "Zero Knowledge Proof Failed! Could not verify signature!", "status": "failed"}
        return jsonify(response), 201
    # else:
    #     response = {'message': 'The user does not have enough funds for transaction'}


# Connecting new nodes
@app.route("/api/connect_node", methods=["POST"])
def connect_node():
    res_json = request.get_json()
    nodes = res_json.get("nodes")
    if nodes is None:
        return "No node", 400
    for node in nodes:
        blockchain.add_node(node)
    response = {
        "message": "All the nodes are now connected. KingCoin Blockchain now contains the following nodes:",
        "total_nodes": list(blockchain.nodes),
    }
    return jsonify(response), 201


# Replacing the chain by the longest chain if needed
@app.route("/api/update_chain", methods=["GET"])
def update_chain():
    is_chain_updated = blockchain.update_chain()
    if is_chain_updated:
        response = {
            "message": "The nodes had different chains so the chain was replaced by the longest one.",
            "new_chain": blockchain.chain,
        }
    else:
        response = {"message": "All good. The chain is the largest one.", "actual_chain": blockchain.chain}
    return jsonify(response), 200


# Adding a new User
@app.route("/api/add_user", methods=["POST"])
def add_user():
    res_json = request.get_json()
    name = res_json.get("name")
    with open("users.json", "r") as f:
        data = json.load(f)
    pvt_key, pub_key = generate_RSA()
    data.update({name: {"client_pub_key": pub_key, "client_pvt_key": pvt_key}})

    with open("users.json", "w") as f:
        json.dump(data, f, indent=4)
    response = {"username": name, "client_pub_key": pub_key, "client_pvt_key": pvt_key}
    return jsonify(response), 201


# Viewing User balance and transactions
@app.route("/api/view_user", methods=["POST"])
def view_user():
    res_json = request.get_json()
    user_pub_key = res_json.get("user_pub_key")
    chain = blockchain.chain
    response = {"user_pub_key": user_pub_key, "user_transactions": [], "net_balance": 0}
    for block in chain:
        for transaction in block["transactions"]:
            if transaction["sender"] == user_pub_key:
                response["user_transactions"].append(transaction)
                response["net_balance"] -= transaction["amount"]
            if transaction["receiver"] == user_pub_key:
                response["user_transactions"].append(transaction)
                response["net_balance"] += transaction["amount"]
    return jsonify(response), 200


@app.route("/")
def index():
    return app.send_static_file("index.html")


# Running the app
app.run(host="127.0.0.1", port=PORT_NUM)
