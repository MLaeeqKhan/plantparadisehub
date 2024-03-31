// threadDeleteApis.js
import axios from 'axios';

// Delete a thread
export const deleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/deleteThread/${questionId}`);
      return response.data;
    } catch (error) {
      throw error;
    }
  };
