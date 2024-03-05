import React, { useContext, useState } from 'react'
import {AuthContext} from "../Context/AuthContext";

const ThreadList = () => {
  const {UserID} = useContext(AuthContext);
  const [question,setQuestion]= useState({threadTile:"",threadDesc:"",userID:""});
  const [plantImg,setPlantImg] =useState(null);
  const handlePlantImg=(e)=>{setPlantImg(e.target.files[0])};
  const imgUpload=(e)=>{setQuestion({...question,plantImg:e.target.files[0]})};
  return (
    <>
      
    </>
  )
}

export default ThreadList
