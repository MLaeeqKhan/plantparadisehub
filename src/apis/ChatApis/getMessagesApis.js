import axios from 'axios';

export const getMessages = async(chatId)=>{
    try {
        const data = await axios.get(`http://localhost:5000/getMessages/${chatId}`);
        return data;
    } catch (error) {
        console.error('getMessagesApis Error:',error);
        throw error;
        
    }
}