import React from 'react'
import { getQuestion } from '../apis/ForumApis/getQuestionsApis';
import { deleteQuestion } from '../apis/ForumApis/QuestionDeleteApis';
import { useState } from 'react';
import { useEffect } from 'react';

const QuestionsList = () => {
    const [questions, setQuestion] = useState([]);
const imgPath=`http://localhost:5000/public/assets/`;
    useEffect(() => {
        fetchQuestions();
    }, [])
    const fetchQuestions = async () => {
        const questions = await getQuestion(); 
        setQuestion(questions.data.questions);

    }
    const questionDelete=async(questionId)=>{
        deleteQuestion(questionId);
    }
    return (
        <>
        <div className='outer'>
            {questions.length > 0 ? (questions.map((question) => <div className='questions' key={question._id}>
               <div className='inner'>
                <img
                    className="image"
                    style={{ width: "10rem",height:'10rem',background: 'grey' }}
                    src={imgPath + question.plantImg}
                    width={50}
                    height={50}
                    alt="profile img" 
                    
                ></img>
                <div className='list'>{question.questionTile}</div>
                <div className='list'>{question.questionDesc.substring(0,100)}</div>
                <div className='list'>{question.date}</div>
                <button>Update</button>
                <button onClick={()=>questionDelete(question._id)}>Delete</button></div>
            </div>)) : (<p>Questions not exists! </p>)}</div>
        </>
    )
}

export default QuestionsList