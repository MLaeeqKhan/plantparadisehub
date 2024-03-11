import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthContext";

const PostQuestion = () => {
  const { UserID } = useContext(AuthContext);
  const [question, setQuestion] = useState({
    questionTile: "",
    questionDesc: ""
    });
  const [plantImg, setPlantImg] = useState(null);
  const handlePlantImg = (e) => {
    setPlantImg(e.target.files[0]);
  };
  
  let name, value;
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setQuestion({ ...question, [name]: value });
  };
  const postData = async (e) => {

    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("plantImg", plantImg);
      formData.append("questionTile", question.questionTile);
      formData.append("questionDesc", question.questionDesc);
      formData.append("UserID", UserID);
      console.log("POSTdata");
      const res = await fetch("http://localhost:5000/postQuestion", {
      method: "POST",
      body: formData,
    });
    console.log("formData:".formData);
      const responce = await res.json();
      if (res.status === 200 || responce) {
        window.alert("Your Question Successfully Posted!");
      } else {
        window.alert("Your Question Not Posted!");
        console.log("res:",res);
      }
    } catch (error) {
      console.log("error:",error);
    }
   
  };

  return (
    <>
      <form>
        <label htmlFor="plantImg">
          <input
            type="file"
            className="plantImg"
            id="plantImg"
            name="plantImg"
            onChange={handlePlantImg}
          />
        </label>
        <label htmlFor="questionTile">questionTile</label>
        <input
          type="text"
          name="questionTile"
          onChange={handleInputs}
          value={question.questionTile}
        />
        <label htmlFor="questionDesc">questionDesc</label>
        <input
          type="text"
          name="questionDesc"
          onChange={handleInputs}
          value={question.questionDesc}
        />
        <button
          type="submit"
          className="postData"
          onClick={postData}
        >Post</button>
      </form>
    </>
  );
};

export default PostQuestion;
