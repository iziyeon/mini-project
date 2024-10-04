import '../src/CSS/App.css'
import { Routes, Route } from 'react-router-dom';
import MovieCard from './Components/MovieCard';
import MovieDetail from './Components/MovieDetail';
import Login from './Components/login';
import Signup from './Components/signup';

function App() {
  return (
    <Routes>
      <Route path ="/" element={<MovieCard/>}></Route>
      <Route path ="/detail/:id" element={<MovieDetail/>}></Route>
      <Route path ="/login" element={<Login />}></Route>
      <Route path ="/join" element={<Signup />}></Route>
    </Routes>
    )
}

export default App;