import "./styles.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Home";
import Nav from "./Nav";
import ViewTransaction from "./ViewTransaction";
import MakeTransaction from "./MakeTransaction";
import MineTransaction from "./MineTransaction";
import ConnectNode from "./ConnectNode";
import AddUser from "./AddUser";
export default function App() {
  return (
    <div className="App">
      <Router>
        <Nav />

        <Route path="/" exact component={Home} />
        <Route path="/view_transactions" exact component={ViewTransaction} />
        <Route path="/make_transactions" exact component={MakeTransaction} />
        <Route path="/connect_node" exact component={ConnectNode} />
        <Route path="/mine_transaction" exact component={MineTransaction} />
        <Route path="/add_user" exact component={AddUser} />
        {/* <Route path="/add" exact component={Add} />
        <Route path="/about" exact component={About} />
        <Route path="/schedule" exact component={Schedule} />
        <Route path="/eventdetails/:id" exact component={EventDetails} />
        <Route path="/update/:id" exact component={Update} />
        <Route path="/delete/:id" exact component={Delete} /> */}
      </Router>
    </div>
  );
}
