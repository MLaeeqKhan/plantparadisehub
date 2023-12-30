import {useState,useContext} from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
const Login = () => {
  const {setUserToken} = useContext(AuthContext);
  const navigate =useNavigate();
    const [user, setUser] = useState({email:"",pass:"",cPass:""});
    let name, value;
    const handlInputs =(e)=>{
     
     name= e.target.name;
     value = e.target.value;
     setUser({...user,[name]:value});
    }
    const postData=async(e)=>{
    e.preventDefault();
    const {email,pass}= user;
    const res = await fetch("http://localhost:5000/signin",{
        method:"POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify({email,pass})
    });
    const response = await res.json();
    if(res.status===404 || !response){
        window.alert("Invalid Credential!")
    }else if(res.status === 400 || !response){
        window.alert("Fill the Credential!");
    }else{
      setUserToken(response);
      window.alert("Login Successfull!");
      navigate("/");
    }

    }
  return (
    <>
        <h2>Login</h2>

      Email<input type="text" name='email' onChange={handlInputs} value={user.email} />
      Password<input type="password" name="pass" onChange={handlInputs} value={user.pass} />
      <button type="submit" onClick={postData}>Login</button>
    </>
  )
}

export default Login
