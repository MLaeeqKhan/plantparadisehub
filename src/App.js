import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import NavBar from "./components/NavBar";
import Chat from "./Pages/Chat";
import Venders from "./Pages/Venders";
import Forum from "./Pages/Forum";
import YourPosts from "./Pages/YourPosts";
function App() {
  return (
   <Router>
<NavBar/>
<Routes>
  <Route exact path="/" element={<Home/>} />
  <Route exact path="/Forum" element={<Forum/>}/>
  <Route exact path="/YourPosts" element={<YourPosts/>}/>
  <Route exact path="/SignUp" element={<SignUp/>}/>
  <Route exact path="/Login" element ={<Login/>}/>
  <Route exact path="/Chat/:receiverID" element={<Chat/>}/>
  <Route exact path="/Venders" element={<Venders/>}/>
  {/* <Route exact path="/Chat/:receiverID" element={<Chat/>} /> */}
</Routes>
   </Router>
    
  );
}

export default App;
