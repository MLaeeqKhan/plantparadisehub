import axios from "axios";

export const getChat =async()=>{
try {
    const data = await axios.get("http://localhost:5000/getChats")
    return data;
} catch (error) {
    console.log('getUserApis Error:', error);
    throw error;
}
}