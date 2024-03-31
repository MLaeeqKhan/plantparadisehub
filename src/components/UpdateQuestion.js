
import {React,useState,useEffect} from 'react';
import { getQuestion } from '../apis/ForumApis/getQuestionsApis';
import {questionUpdate} from '../apis/ForumApis/questionUpdateApis';
import { useParams,useNavigate } from 'react-router-dom';

const UpdateQuestion = ({questionId}) => {
    // const params=useParams();
    // const id = params.id;
    // console.log('ID',id);
    // const navigate = useNavigate();
     const [questionTitle, setQuestionTitle] = useState('');
  const [questionDesc, setQuestionDesc] = useState('');
  const [plantImg, setPlantImg] = useState('');

   const handleUpdate = () => {
    questionUpdate(questionId, questionTitle, questionDesc)
      .then(response => {
        console.log(response);
        
      })
      .catch(error => {
        console.error(error);
      });
      // navigate('/YourPosts');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'questionTitle') {
      setQuestionTitle(value);
    } else if (name === 'questionDesc') {
      setQuestionDesc(value);
    }
  }; 

    const [question, setQuestion] = useState([]);
    useEffect(() => {
        fetchData();
      }, []);
      const fetchData = async () => {
        const resQuestion = await getQuestion();
        console.log('resQuestion',resQuestion);
        setQuestion(resQuestion.data.questions);
      };

      useEffect(() => {
        if (question && question.length > 0) {
          const selectedQuestion = question.find(item => item._id === questionId);
          if (selectedQuestion) {
            setQuestionTitle(selectedQuestion.questionTitle);
            setQuestionDesc(selectedQuestion.questionDesc);
          }
        }
      }, [question, questionId]);
  return (
    <>
    <h2>ThreadUpdateForm {questionId}</h2>
        {question && question.length > 0 ? (
        question.map((item) =>
          item._id === questionId ? (
            <form className="form" >

<div className="input">
              {" "}
              Problem Title:
              <input
                style={{ height: "40px;" }}
                type="file"
                name="plantImg"
                onChange={handleInputChange}
                value={plantImg}
                required
              />
            </div>


            <div className="input">
              {" "}
              Problem Title:
              <input
                style={{ height: "40px;" }}
                type="text"
                name="questionTitle"
                onChange={handleInputChange}
                value={questionTitle}
                required
              />
            </div>
            

            <div className="input">
              Elaborate your Question:
              <textarea
                type="text"
                name="questionDesc"
                onChange={handleInputChange}
                value={questionDesc}
                rows="10"
                required
              ></textarea>
            </div>
            
            <div className="input">
              {" "}
              <button
                className="btn"
                type="submit"
                value="submit"
                onClick={handleUpdate} style={{background:"skyblue"}}
              >Update</button>
            </div>
          </form>
          ) : null
        )
      ) : (
        <center>
          <div
            className="media"
            style={{
              width: "30%",
              paddingTop: "1.6rem",
              borderRadius: "1.6rem",
            }}
          >
          </div>
        </center>
      )}
      
     
    </>
  )
}

export default UpdateQuestion