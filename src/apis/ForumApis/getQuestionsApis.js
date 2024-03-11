import axios from "axios"


export const getQuestion =async ()=>{
    const data = await axios.get(`http://localhost:5000/getQuestion`)
    return data
}