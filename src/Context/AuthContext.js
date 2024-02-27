import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("");
  const [UserID, setUserID] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userName, setUserName] = useState("");
  const [user,setUser] = useState(null);
  const [ChatId,setChatId]=useState("");

  

const setUserData=(data)=>{
  setUser(data);
 setToken(data.token || "");
      setUserID(data._id || "");
      setUserEmail(data.email || "");
      setUserName(data.userName);
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
const notify=(selectChat)=>{
  setChatId(selectChat);
}
  return (
    <AuthContext.Provider value={{ token,user, setUserToken, UserID, userEmail,userName, logoutUser,notify,ChatId }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
