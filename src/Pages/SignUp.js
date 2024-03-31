import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const SignUp = () => {
  const navigator =useNavigate();
  const [user, setUser] = useState({
    userName: "",
    email: "",
    pass: "",
    cPass: "",
  });
  let name, value;
  const handleInput = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const postData = async (e) => {
    e.preventDefault();
    const { userName, email, pass, cPass } = user;
    const res = await fetch("https://plantparadisehub.vercel.app//signup", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({ userName, email, pass, cPass }),
    });
    

    const response = await res.json();
    console.log("Parsed response:", response);
    if (res.status === 409 || !response) {
      window.alert("Email is already Exists!");
    } else if (res.status === 401 ) {
      window.alert("Passsword don't match!");
    } else {
            window.alert("You successsfully SignUp!");
            navigator('/Login');
    }
  };
  return (
    <>
      <h2>Signup</h2>
      <form action="" method="POST">
        UserName
        <input
          type="text"
          onChange={handleInput}
          name="userName"
          value={user.userName}
        />
        Email
        <input
          type="email"
          onChange={handleInput}
          name="email"
          value={user.email}
        />
        Password
        <input
          type="password"
          onChange={handleInput}
          name="pass"
          value={user.pass}
        />
        Confirm Password
        <input
          type="password"
          onChange={handleInput}
          name="cPass"
          value={user.cPass}
        />
        <button onClick={postData} type="submit">
          SignUp
        </button>
      </form>
    </>
  );
};

export default SignUp;
