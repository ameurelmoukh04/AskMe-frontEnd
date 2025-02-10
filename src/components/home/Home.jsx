import React from 'react'
import Navbar from '../commun/navbar/Navbar'
import QuestionAnswers from '../questionAnswers/QuestionAnswers'
import QuestionList from '../questionList/QuestionList'
import WhatDoYouWantToAsk from './WhatDoYouWantToAsk'


const Home = () => {

  return (
    <div>
        <Navbar />
        <WhatDoYouWantToAsk />
        <QuestionList />
    </div>
  )
}

export default Home