import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { fetchQuestions } from '../redux/questionSlice'
import { addAnswer, fetchAnswers } from '../redux/answerSlice';
import { useForm } from 'react-hook-form';







const QuestionList = () => {
  const storedQuestions = useSelector((state) => state.questionSlice.questions);
  const storedAnswers = useSelector((state) => state.answerSlice.answers);
  const dispatch = useDispatch();
  const { register, handleSubmit,setValue } = useForm({
    defaultValues: {
      questionId: "",
    },
  });

  const submitForm =(data) => {
    console.log(data.questionId);
    console.log(data.content);
    dispatch(addAnswer(data));
  };


  const [answerVisibility, setAnswerVisibility] = useState(false);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [selectedId, setSelectedId] = useState(null);

  const handleAnswer = (questionId) => {
    setSelectedId(questionId)
    setSelectedQuestionId(null)
    setAnswerVisibility(!answerVisibility);
  }

  const handleViewAnswers = (questionId) => {
    setSelectedQuestionId(questionId);
    setSelectedId(null)
    dispatch(fetchAnswers(questionId))
  }
useEffect(()=>{
  console.log(localStorage.getItem('token'));
})
  useEffect(() => {
    dispatch(fetchQuestions())
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchAnswers(2))
  }, [dispatch])

  const convertDate = (isodate) => {
    const date = new Date(isodate)
    return date.toLocaleDateString('en-GB')
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Latest Questions</h1>
      <div className='space-y-4'>

        {/* render questions in db */}
        {storedQuestions.map((question) => (
          <div key={question.id} className="bg-white shadow-md rounded-lg p-4 border hover:shadow-lg transition">

            <div className="flex justify-between items-center mt-2 text-sm text-gray-500">
              <span>Asked by {question.user_id}</span>
              <span>{convertDate(question.created_at)}</span>
            </div>
            <h2 className="text-lg font-semibold text-gray-900">{question.content}</h2>
            <button onClick={() => handleAnswer(question.id)}>Answer</button>
            <button onClick={() => handleViewAnswers(question.id)}>See Answers</button>

            {/* render add Answer Form */}
            {answerVisibility && selectedId == question.id ?
              <form onSubmit={handleSubmit(submitForm)}>
                <div>
                  <label htmlFor="content">Your Answer :</label>
                  <input type='text' {...register('content')} required />
                  {setValue('questionId', question.id)}
                </div>
                <button type='submit'>submit</button>
              </form> : ''}

              {/* render all Answers For the Question selected */}
            {selectedQuestionId === question.id && (
              <div className="mt-2 text-sm text-gray-600">

                {storedAnswers.length > 0 ? (
                  storedAnswers.map((answer, index) =>

                    <div className='border border-black mb-2'>

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