import axios from 'axios';


export const removeNotification=async(chatId)=>{
    try {
        const response = await axios.delete(`http://localhost:5000/deleteNotification/${chatId}`);
        return response;
    } catch (error) {
        console.log('removeNotifificationsApis Error:', error);
        throw error;
    }
} 