
import random

"""
DES Key Scheduler:
    - Generates 16 48-bit subkeys from a randomly
      generated 64-bit initial key
    - Returns a list of the 16 subkeys in the form
      of binary strings
"""

def key_scheduler():

    # -------------------- Variables -------------------- #
    #
    # k         Initial 64-bit key
    # k_prime   Permuted 56-bit key
    # c0        Left half of k_prime
    # d0        Right half of k_prime
    # c_keys    16 28-bit permutations of c0 using lrt
    # d_keys    16 28-bit permutations of d0 using lrt
    # keys      Final list of 16 48-bit keys
    #
    # --------------------------------------------------- #

    
    # ---------------- Hard-Coded Values ---------------- #

    # pc1       Permutation table No. 1
    pc1 = [ 57, 49, 41, 33, 25, 17, 9,
            1, 58, 50, 42, 34, 26, 18,
            10, 2, 59, 51, 43, 35, 27,
            19, 11, 3, 60, 52, 44, 36,
            63, 55, 47, 39, 31, 23, 15,
            7, 62, 54, 46, 38, 30, 22,
            14, 6, 61, 53, 45, 37, 29,
            21, 13, 5, 28, 20, 12, 4 ]


    # pc2       Permutation table No. 2
    pc2 = [ 14, 17, 11, 24, 1, 5,
            3, 28, 15, 6, 21, 10,
            23, 19, 12, 4, 26, 8,
            16, 7, 27, 20, 13, 2,
            41, 52, 31, 37, 47, 55,
            30, 40, 51, 45, 33, 48,
            44, 49, 39, 56, 34, 53,
            46, 42, 50, 36, 29, 32 ]
          

    # lrt       Left rotation table
    lrt = [ 1, 1, 2, 2, 2, 2, 2, 2,
            1, 2, 2, 2, 2, 2, 2, 1 ]


    # --------------------------------------------------- #


    

    # Generate random 64-bit number
    # Note - Even though the algorithm starts with a 64-bit key, DES is still technically
    # 56-bit, because 8 of the bits are used as parity bits. These bits are lost during the
    # first permutation using pc1.
    k = random.getrandbits(64)
    k = bin(k)[2:].zfill(64)
    

    # Generate k_prime using permutation table 1
    k_prime = ""
    for number in pc1:
        k_prime += k[number-1]
        

    # Find c0 (left half of k_prime) and d0 (right half of k_prime)
    c0 = k_prime[:28]
    d0 = k_prime[28:]


    # Rotate c0 and d0 according to left rotation table
    c_keys = []
    d_keys = []
    for i in range(16):
        num = lrt[i]
        
        temp = c0[0:num]
        c0 = c0[num:] + temp
        c_keys.append(c0)

        temp = d0[0:num]
        d0 = d0[num:] + temp
        d_keys.append(d0)


    # Generate subkeys by combining c_keys[i] and d_keys[i].
    # Use permutation table 2 to generate 16 48-bit keys
    keys = []
    for i in range(16):
        cat = c_keys[i] + d_keys[i]
        temp = ""
        for number in pc2:
            temp += cat[number-1]
        keys.append(temp)


    return keys







"""
f Function:
    - Takes 32-bit binary number in the form of a string (bit32)
      and a 48-bit binary number in the form of a string (key)
    - Performs various permutations, expansions, and reductions
      on the input bit32
    - Returns 32-bit binary number in the form of a string
"""
def f(bit32, key):

    # Expand 32-bit input to 48 bits and convert to int
    bit48 = int(_expansion(bit32), 2)


    # XOR 48-bit result and round key, and then convert back to binary
    bit48 ^= int(key, 2)
    bit48 = bin(bit48)[2:].zfill(48)
    

    # Perform Sbox substitution
    bit32 = _Sbox(bit48)


    # Perform permutation on bit32
    bit32 = _permute(bit32)
    

    return bit32


"""
Expansion:
    - Takes 32-bit binary number in the form of a string
    - Transforms and permutes 32-bit number into 48-bit number
    - Returns 48-bit binary number in the form of a string
"""
def _expansion(bit32):

    # Expansion table
    e = [   32, 1, 2, 3, 4, 5, 4, 5,
            6, 7, 8, 9, 8, 9, 10, 11,
            12, 13, 12, 13, 14, 15, 16, 17,
            16, 17, 18, 19, 20, 21, 20, 21,
            22, 23, 24, 25, 24, 25, 26, 27,
            28, 29, 28, 29, 30, 31, 32, 1 ]


    # Perform permutation on bit32
    out = ""
    for number in e:
        out += bit32[number-1]

    return out



"""
Sbox Substitution:
    - Takes 48-bit binary number in the form of a string
    
    - Splits 48-bit input into 8 chunks of 6 bits
    - Performs substitutions on each chunk using 8 hard-coded tables:
	    > The first and last bit of the 6-bit chunk acts as a
	      coordinate for the row of the Sbox
	    > The middle 4 bits act as a coordinate for the column
	    
    - Returns 32-bit binary number in the form of a string 
"""
def _Sbox(bit48):

    s = [
         # s1
         [[ 14, 4, 13, 1, 2, 15, 11, 8, 3, 10, 6, 12, 5, 9, 0, 7,
            0, 15, 7, 4, 14, 2, 13, 1, 10, 6, 12, 11, 9, 5, 3, 8,
            4, 1, 14, 8, 13, 6, 2, 11, 15, 12, 9, 7, 3, 10, 5, 0,
            15, 12, 8, 2, 4, 9, 1, 7, 5, 11, 3, 14, 10, 0, 6, 13]],
         # s2
         [[15,  1,  8, 14,  6, 11,  3,  4,  9,  7,  2, 13, 12,  0,  5, 10],
          [ 3, 13,  4,  7, 15,  2,  8, 14, 12,  0,  1, 10,  6,  9, 11,  5],
          [ 0, 14,  7, 11, 10,  4, 13,  1,  5,  8, 12,  6,  9,  3,  2, 15],
          [13,  8, 10,  1,  3, 15,  4,  2, 11,  6,  7, 12,  0,  5, 14,  9]],
         # s3
         [[10,  0,  9, 14,  6,  3, 15,  5,  1, 13, 12,  7, 11,  4,  2,  8],
          [13,  7,  0,  9,  3,  4,  6, 10,  2,  8,  5, 14, 12, 11, 15,  1],
          [13,  6,  4,  9,  8, 15,  3,  0, 11,  1,  2, 12,  5, 10, 14,  7],
          [ 1, 10, 13,  0,  6,  9,  8,  7,  4, 15, 14,  3, 11,  5,  2, 12]],
         # s4
         [[ 7, 13, 14,  3,  0,  6,  9, 10,  1,  2,  8,  5, 11, 12,  4, 15],
          [13,  8, 11,  5,  6, 15,  0,  3,  4,  7,  2, 12,  1, 10, 14,  9],
          [10,  6,  9,  0, 12, 11,  7, 13, 15,  1,  3, 14,  5,  2,  8,  4],
          [ 3, 15,  0,  6, 10,  1, 13,  8,  9,  4,  5, 11, 12,  7,  2, 14]],
         # s5
         [[ 2, 12,  4,  1,  7, 10, 11,  6,  8,  5,  3, 15, 13,  0, 14,  9],
          [14, 11,  2, 12,  4,  7, 13,  1,  5,  0, 15, 10,  3,  9,  8,  6],
          [ 4,  2,  1, 11, 10, 13,  7,  8, 15,  9, 12,  5,  6,  3,  0, 14],
          [11,  8, 12,  7,  1, 14,  2, 13,  6, 15,  0,  9, 10,  4,  5,  3]],
         # s6
         [[12,  1, 10, 15,  9,  2,  6,  8,  0, 13,  3,  4, 14,  7,  5, 11],
          [10, 15,  4,  2,  7, 12,  9,  5,  6,  1, 13, 14,  0, 11,  3,  8],
          [ 9, 14, 15,  5,  2,  8, 12,  3,  7,  0,  4, 10,  1, 13, 11,  6],
          [ 4,  3,  2, 12,  9,  5, 15, 10, 11, 14,  1,  7,  6,  0,  8, 13]],
         # s7
         [[ 4, 11,  2, 14, 15,  0,  8, 13,  3, 12,  9,  7,  5, 10,  6,  1],
          [13,  0, 11,  7,  4,  9,  1, 10, 14,  3,  5, 12,  2, 15,  8,  6],
          [ 1,  4, 11, 13, 12,  3,  7, 14, 10, 15,  6,  8,  0,  5,  9,  2],
          [ 6, 11, 13,  8,  1,  4, 10,  7,  9,  5,  0, 15, 14,  2,  3, 12]],
         # s8
         [[13,  2,  8,  4,  6, 15, 11,  1, 10,  9,  3, 14,  5,  0, 12,  7],
          [ 1, 15, 13,  8, 10,  3,  7,  4, 12,  5,  6, 11,  0, 14,  9,  2],
          [ 7, 11,  4,  1,  9, 12, 14,  2,  0,  6, 10, 13, 15,  3,  5,  8],
          [ 2,  1, 14,  7,  4, 10,  8, 13, 15, 12,  9,  0,  3,  5,  6, 11]]
        ]
    
    # Break up 48-bit input into 8 6-bit chunks
    bit6_list = []
    for i in range(0, 48, 6):
        bit6_list.append(bit48[i:i+6])


    # Perform 8 Sbox substitutions using the 8 6-bit chunks
    # and the 8 Sbox tables s1-s8
    out = ""
    for i in range(8):
        chunk = bit6_list[i]
        row = int(chunk[0]+chunk[5], 2)
        col = int(chunk[1:5], 2)

        out += (bin(s[i][row][col])[2:].zfill(4))

    return out





"""
Permute:
    - Takes 32-bit binary number in the form of a string
    - Performs simple permutation on the number
    - Returns 32-bit binary number in the form of a string
"""
def _permute(bit32):

    # Permutation table
    p = [16,  7, 20, 21,
         29, 12, 28, 17,
          1, 15, 23, 26,
          5, 18, 31, 10,
          2,  8, 24, 14,
         32, 27,  3,  9,
         19, 13, 30,  6,
         22, 11,  4, 25]

    # Perform permutation on bit32
    out = ""
    for number in p:
        out += bit32[number-1]

    return out






"""Encryption"""


def encrypt(text, keys):

    # Split text up into 64-bit chunks
    blocks = []
    for i in range(0, len(text), 8):
        blocks.append(text[i:i+8])


    # Encrypt chunks
    e_list = []
    for block in blocks:
        e_list.append(_cipher(_ascii_to_bin(block), keys))


    # Combine chunks back into a single string
    out = ""
    for block in e_list:
        #out += _bin_to_ascii(block)    # ASCII output
        #out += hex(int(block, 2))      # Hex output
        out += block                    # Binary output


    return out



def _cipher(bit64, keys):

    # Initial permutation table
    ip = [58, 50, 42, 34, 26, 18, 10, 2,
          60, 52, 44, 36, 28, 20, 12, 4,
          62, 54, 46, 38, 30, 22, 14, 6,
          64, 56, 48, 40, 32, 24, 16, 8,
          57, 49, 41, 33, 25, 17,  9, 1,
          59, 51, 43, 35, 27, 19, 11, 3,
          61, 53, 45, 37, 29, 21, 13, 5,
          63, 55, 47, 39, 31, 23, 15, 7]

    # Final permutation
    fp = [40,  8, 48, 16, 56, 24, 64, 32,
          39,  7, 47, 15, 55, 23, 63, 31,
          38,  6, 46, 14, 54, 22, 62, 30,
          37,  5, 45, 13, 53, 21, 61, 29,
          36,  4, 44, 12, 52, 20, 60, 28,
          35,  3, 43, 11, 51, 19, 59, 27,
          34,  2, 42, 10, 50, 18, 58, 26,
          33,  1, 41,  9, 49, 17, 57, 25]
    

    # Perform initial permutation on block
    p = ""
    for number in ip:
        p += bit64[number-1]


    # Split block into two halves
    ln = p[:32]
    rn = p[32:]

    # 16 rounds of encryption, rotating and XORing each half after each round
    for i in range(16):
        temp = rn
        rn = bin(int(ln, 2) ^ int(f(rn, keys[i]), 2))[2:].zfill(32)
        ln = temp


    # Combine left and right halves and perform final permutation
    combined = ln + rn
    out = ""
    for number in fp:
        out += combined[number-1]


    return out






# Convert ASCII text to binary
def _ascii_to_bin(text):

    out = ""
    for letter in text:
        out += bin(ord(letter))[2:].zfill(8)

    # Pad block with 0s if necessary
    for i in range(64-(len(out))):
        out += "0"

    return out



# Convert binary to ASCII text
def _bin_to_ascii(bit64):

    out = ""
    for i in range(0, 64, 8):
        out += chr(int(bit64[i:i+8], 2))

    #out.replace("\x00", "")
    return out









"""Decryption"""


def decrypt(cipher, keys):

    # Split text up into 64-bit chunks
    blocks = []
    for i in range(0, len(cipher), 64):
        blocks.append(cipher[i:i+64])


    # Decrypt chunks
    d_list = []
    for block in blocks:
        d_list.append(_plaintext(block, keys))


    # Combine chunks back into a single string
    out = ""
    for block in d_list:
        out += _bin_to_ascii(block)


    return out



def _plaintext(bit64, keys):

    # Initial permutation table
    ip = [58, 50, 42, 34, 26, 18, 10, 2,
          60, 52, 44, 36, 28, 20, 12, 4,
          62, 54, 46, 38, 30, 22, 14, 6,
          64, 56, 48, 40, 32, 24, 16, 8,
          57, 49, 41, 33, 25, 17,  9, 1,
          59, 51, 43, 35, 27, 19, 11, 3,
          61, 53, 45, 37, 29, 21, 13, 5,
          63, 55, 47, 39, 31, 23, 15, 7]

    # Final permutation table
    fp = [40,  8, 48, 16, 56, 24, 64, 32,
          39,  7, 47, 15, 55, 23, 63, 31,
          38,  6, 46, 14, 54, 22, 62, 30,
          37,  5, 45, 13, 53, 21, 61, 29,
          36,  4, 44, 12, 52, 20, 60, 28,
          35,  3, 43, 11, 51, 19, 59, 27,
          34,  2, 42, 10, 50, 18, 58, 26,
          33,  1, 41,  9, 49, 17, 57, 25]


    # Perform initial permutation on block
    p = ""
    for number in ip:
        p+= bit64[number-1]


    # Split block into two halves
    ln = p[:32]
    rn = p[32:]

    # 16 rounds of decryption, rotating and XORing each half after each round
    # Notice that for decryption, the algorithm starts with the left half as
    # opposed to the right half with encryption, and it iterates backwards
    # through the key set.
    for i in range(15, -1, -1):
        temp = ln
        ln = bin(int(rn, 2) ^ int(f(ln, keys[i]), 2))[2:].zfill(32)
        rn = temp

    # Combine left and right halves and perform final permutation
    combined = ln + rn
    out = ""
    for number in fp:
        out += combined[number-1]


    return out
        



# Convert binary to ASCII text
def _bin_to_ascii(bit64):

    out = ""
    for i in range(0, 64, 8):
        out += chr(int(bit64[i:i+8], 2))

    #out.replace("\x00", "")
    return out