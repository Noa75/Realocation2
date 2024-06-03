import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LogIn from './LogIn'
import OpeningQuestions from './OpeningQuestions'
import Categories from './Categories';
import TaskBoard from './TaskBoard';
import SignUp from './SignUp';

export default function RealocationApp() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LogIn />}/>
        <Route path="/sign-up" element={<SignUp />}/>
        <Route path="/opening-questions" element={<OpeningQuestions />}/>
        <Route path="/categoies" element={<Categories />}/>
        <Route path="/tasks-board" element={<TaskBoard />}/>
      </Routes>
    </Router>
  )
}


