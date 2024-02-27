import axios from "axios";

export const getNotification =async()=>{
try {
    const data = await axios.get("http://localhost:5000/getNotification")
    return data;
} catch (error) {
    console.log('getNotifificationsApis Error:', error);
    throw error;
}
}