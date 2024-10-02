import { useEffect, useState } from 'react';
import '../CSS/MovieDetail.css';
import movieDetailData from '../assets/movieDetailData.json';

function MovieDetail() {
  const [movieDetail, setMovieDetail] = useState();

  useEffect(() => {
    setMovieDetail(movieDetailData);
  }, []);

  if (!movieDetail) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie_detail_container">
      <div className="movie_grid">
        <div className="poster">
          <img
            src={`https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`}
          />
        </div>
        <div className="title"> {movieDetail.title} </div>
        <div className="vote_average"> 평점: {movieDetail.vote_average} </div>
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
