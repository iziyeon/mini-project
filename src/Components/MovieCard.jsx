import { useEffect, useState } from 'react';
import '../CSS/MovieCard.css';
import movieListData from '../assets/movieListData.json';
import { useNavigate } from 'react-router-dom';

function MovieCard() {
  const [movieCard, setMovieCard] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setMovieCard(movieListData.results);
  }, []);

  return (
    <div className="movieCard_gridList_container">
      {movieCard.map((movie, i) => (
        <div
          className="grid-container"
          key={i}
          onClick={() => navigate(`/detail/${movie.id}`)}
        >
          <img
            className="poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <div className="poster_title">{movie.title}</div>
          <div className="poster_grade">평점: {movie.vote_average.toFixed(1)}</div>
        </div>
      ))}
    </div>
  );
}

export default MovieCard;
