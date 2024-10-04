import { useEffect, useState } from 'react';
import '../CSS/MovieCard.css';
import { useNavigate } from 'react-router-dom';
import NavBar from './navbar';

function MovieCard() {
  const [movieCard, setMovieCard] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=ko-KR&page=1`;

      try {
        const response = await fetch(url);
        const data = await response.json();
        setMovieCard(data.results);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movies:', error);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <NavBar /> 
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
            <div className="poster_grade">평점 {movie.vote_average.toFixed(1)}</div>
          </div>
        ))}
      </div>
    </>
  );
}

export default MovieCard;
