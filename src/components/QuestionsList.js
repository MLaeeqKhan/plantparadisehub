import React from 'react'
import { getQuestion } from '../apis/ForumApis/getQuestionsApis';
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
    return (
        <>
            {questions.length > 0 ? (questions.map((question) => <div className='questions' key={question._id}>
                <img
                    className="image"
                    style={{ width: "4rem" }}
                    src={imgPath + question.plantImg}
                    width={50}
                    height={50}
                    alt="profile img"
                ></img>
                <div>{question.questionTile}</div>
                <div>{question.questionDesc}</div>
                <div>{question.date}</div>
            </div>)) : (<p>Questions not exists! </p>)}
        </>
    )
}

export default QuestionsList