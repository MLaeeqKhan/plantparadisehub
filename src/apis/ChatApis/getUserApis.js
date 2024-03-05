// getUserApis.js
import axios from "axios"

export const getUser =async ()=>{
    try {
        const data = await axios.get(`http://localhost:5000/getUsers`)
        console.log("getUserApis Data:",data);
        return data
    } catch (error) {
        console.log('getUserApis Error:', error.response.data);
        throw error; 
          }
}