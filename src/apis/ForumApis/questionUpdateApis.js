// threadUpdateApis.js file
import axios from "axios";

// Update a thread
export const questionUpdate = async (id, questionTitle, questionDesc) => {
  const data = await axios.put(`http://localhost:5000/updateQuestion/${id}`, { questionTitle, questionDesc });
  return data;
};

