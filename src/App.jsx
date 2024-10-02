import '../src/CSS/App.css'
import { Routes, Route } from 'react-router-dom';
import MovieCard from './Components/MovieCard';
import MovieDetail from './Components/MovieDetail';

function App() {
  return (
    <Routes>
      <Route path ="/" element={<MovieCard/>}></Route>
      <Route path ="/detail/:id" element={<MovieDetail/>}></Route>
    </Routes>
    )
}

export default App;