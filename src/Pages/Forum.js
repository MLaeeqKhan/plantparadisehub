import React from 'react'
import PostQuestion from '../components/PostQuestion';
import QuestionList from '../components/QuestionsList';

const Forum = () => {
  return (
    <>
      <h1>Forum</h1>
      <PostQuestion/>
      <QuestionList/>
    </>
  )
}

export default Forum;
