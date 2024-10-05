import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import '../CSS/NavBar.css';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

const searchMovies = async (query) => {
  if (!query) return []; 
  try {
    const response = await axios.get(`${BASE_URL}/search/movie`, {
      params: {
        api_key: API_KEY,
        query,
        language: 'ko-KR',
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('영화 검색 오류:', error);
    return []; 
  }
};

const useDebounce = (value, delay) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);  
    }, delay);

    return () => {
      clearTimeout(handler);  
    };
  }, [value, delay]);

  return debouncedValue;
};

function NavBar() {
  const [query, setQuery] = useState('');  
  const [movies, setMovies] = useState([]);  
  const debouncedQuery = useDebounce(query, 500);  
  const navigate = useNavigate();


  useEffect(() => {
    const fetchMovies = async () => {
      if (debouncedQuery) {
        const results = await searchMovies(debouncedQuery);
        setMovies(results); 
      } else {
        setMovies([]); 
      }
    };
    fetchMovies();
  }, [debouncedQuery]);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  return (
    <nav className="navbar">
      <div className="navbar-logo">
        <Link to="/">Movie</Link>
      </div>

      <div className="search-bar">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="영화명을 입력하세요"
          className="search-input"
        />
        <FontAwesomeIcon
          icon={faMagnifyingGlass}
          className="search-icon"
          onClick={() => {
            if (movies.length > 0) {
              handleMovieClick(movies[0].id);
            }
          }}
        />

        {movies.length > 0 && (
          <div className="suggestions">
            <ul>
              {movies.map((movie) => (
                <li key={movie.id} onClick={() => handleMovieClick(movie.id)}>
                  {movie.title} ({movie.release_date?.substring(0, 4)})
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="navbar-buttons">
        <Link to="/login">Login</Link>
        <Link to="/join">Join</Link>
      </div>
    </nav>
  );
}

export default NavBar;
