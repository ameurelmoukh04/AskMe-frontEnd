import React from 'react'
import {useSelector} from 'react-redux'
import answerSlice from '../redux/answerSlice'



const QuestionAnswers = () => {

    const storedAnswers = useSelector((state) =>state.answerSlice.answers)
  return (
    <div>
{storedAnswers.map((answer) =>(
    <p key={answer.id}>{answer.content}</p>
))}
    </div>
  )
}

export default QuestionAnswers