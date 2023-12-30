import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [UserID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  

const setUserData=(data)=>{
 setToken(data.token || "");
      setUserID(data._id || "");
      setUserEmail(data.email || "");
};
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    console.log("AuthContext UserData:", data);
    if (data) {
      setUserData(data)
    }
  }, []); 

  const setUserToken = (data) => {
    localStorage.setItem("userData", JSON.stringify(data));
    console.log("AuthContext UserData:", data);

    if (data) {
      setUserData(data);
    }
  };

  console.log("AuthContext token:", token);

  const logoutUser = () => {
    localStorage.removeItem("userData");
    setToken("");
  };

  return (
    <AuthContext.Provider value={{ token, setUserToken, UserID, userEmail, logoutUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
