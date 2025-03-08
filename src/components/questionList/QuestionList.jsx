import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuestions } from '../redux/questionSlice'
import { addAnswer, fetchAnswers } from '../redux/answerSlice';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { backendURL } from '../redux/authSlice';



const QuestionList = () => {


  const [answerVisibility, setAnswerVisibility] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [loading,setLoading] = useState(false);


  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState([]);
  const config = {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    }
  }

  const { register, handleSubmit, setValue } = useForm({
    defaultValues: {
      questionId: "",
    },
  });

  const submitForm = async (data) => {
    try {
      console.log(data);
      const token = localStorage.getItem('token');
      console.log(token)
      const config = {
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        withCredentials: false
      }
      const response = await axios.post(`${backendURL}/questions/${data.questionId}/answers`,
        { content: data.content },
        config)
    } catch (error) { console.log(error.message) }
  };




  const handleAnswer = (questionId) => {
    setSelectedId(questionId)
    setSelectedQuestionId(null)
    setAnswerVisibility(!answerVisibility);
  }

  const handleViewAnswers = async (questionId) => {
    setLoading(true)
    setSelectedQuestionId(questionId);
    setSelectedId(null)
    try{
      const response = await axios.get(`${backendURL}/questions/${questionId}/answers`, config)
      setAnswers(response.data);
    }finally{
      setLoading(false);
      console.log(answers);
    }
  }

  useEffect(() => {
    const fetchAllQuestions = async () => {
      try {
        const response = await axios.get(`${backendURL}/questions`, config);
        setQuestions(response.data);

      } catch (error) { console.log(error.message) }

    }
    fetchAllQuestions();

  }, [])

  const convertDate = (isodate) => {
    const date = new Date(isodate)
    return date.toLocaleDateString('en-GB')
  }
  return (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Latest Questions</h2>
      <div className='space-y-4'>

        {/*this section render questions in db */}
        {questions.map((question) => (
          <div key={question.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">

            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>Asked by {question.user.name}</span>
              <span>{convertDate(question.created_at)}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{question.content}</h2>
            <button onClick={() => handleAnswer(question.id)}>Answer</button>
            <button onClick={() => handleViewAnswers(question.id)}>See Answers</button>

            {/*and this render add Answer Form */}
            {answerVisibility && selectedId == question.id ?
              <form onSubmit={handleSubmit(submitForm)}>
                <div>
                  <label htmlFor="content">Your Answer :</label>
                  <input type='text' {...register('content')} required />
                  {setValue('questionId', question.id)}
                </div>
                <button type='submit'>submit</button>
              </form> : ''}

            {/*this section render all Answers For the Question selected */}
            {selectedQuestionId === question.id && (
              <div className="mt-2 text-sm text-gray-600">
                {loading ?(
                  <p>Loading...</p>
                ): answers.length > 0 ? (
                  answers.map((answer, index) =>
                    <div key={answer.id} className='border border-black mb-2'>
                      <p>Answer By {answer.user.name}</p>
                      <h2 className='text-lg text-black' key={index}>{answer.content}</h2>
                      <span>{convertDate(answer.created_at)}</span>
                    </div>
                  )
                ) : (
                  <li>No Answers yet</li>
                )}

              </div>
            )}
          </div>
        ))}





      </div>
    </div>

  )
}

export default QuestionList