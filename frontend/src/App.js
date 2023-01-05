import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import AddUser from "./components/AddUser/AddUser";
import UpdateUser from "./components/UpdateUser/UpdateUser";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" exact element={<Home />} />
          <Route path="/addUser" exact element={<AddUser />} />
          <Route path="/updateUser/:id" exact element={<UpdateUser />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
