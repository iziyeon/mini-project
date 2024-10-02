import { useEffect, useState } from 'react'
import '../src/CSS/App.css'
import { Routes, Route } from 'react-router-dom';
import MovieCard from './Components/MovieCard';

function App() {
  return (
    <Routes>
      <Route path ="/" element={<MovieCard/>}></Route>
    </Routes>
    )
}

export default App;