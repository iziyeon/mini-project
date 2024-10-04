import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../CSS/MovieDetail.css';

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetail = async () => {
      const apiKey = import.meta.env.VITE_TMDB_API_KEY; 
      const url = `https://api.themoviedb.org/3/movie/${id}?api_key=${apiKey}&language=ko-KR`;

      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`Failed to fetch movie details: ${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setMovieDetail(data);
        setLoading(false);
      } catch (error) {
        console.error('Failed to fetch movie details:', error.message);
        setLoading(false);
      }
    };

    fetchMovieDetail();
  }, [id]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!movieDetail) {
    return <div>영화 정보를 불러오지 못했습니다.</div>;
  }

  const handleClickOutside = (e) => {
    if (e.target.classList.contains('movie_detail_background')) {
      navigate('/');
    }
  };

  return (
    <div className="movie_detail_background" onClick={handleClickOutside}>
      <div className="movie_grid" onClick={(e) => e.stopPropagation()}>
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
            alt={movieDetail.title}
          />
        </div>
        <div className="title"> {movieDetail.title} </div>
        <div className="vote_average"> 평점: {movieDetail.vote_average.toFixed(1)} </div>
        <div className="genres">
          장르:{" "}
          {movieDetail.genres.map((genre, i) => (
            <span key={i}>{genre.name}</span>
          ))}
        </div>
        <div className="overview"> {movieDetail.overview} </div>
      </div>
    </div>
  );
}

export default MovieDetail;
