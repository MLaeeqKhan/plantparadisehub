import axios from "axios";

export const getAllMessages =async()=>{
try {
    const data = await axios.get("http://localhost:5000/getAllMessages")
    return data;
} catch (error) {
    console.log('getUserApis Error:', error);
    throw error;
}
}