import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { supabase } from './supabaseClient';
import '../CSS/navbar.css';
import '/썸네일사진.png'

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = 'https://api.themoviedb.org/3';

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

function NavBar() {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [session, setSession] = useState(null);
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

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: authListener } = supabase.auth.onAuthStateChange((event, session) => {
      setSession(session);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleMovieClick = (movieId) => {
    navigate(`/detail/${movieId}`);
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('로그아웃 오류:', error);
    else setSession(null);
  };

  return (
    <>
      <nav className="navbar">
        <div className="navbar-logo">
          <Link to="/">Movie </Link>
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
          {session ? (
            <>
              <img
                src="/썸네일사진.png"
                alt="썸네일"
                className="user-thumbnail"
              />
              <div className="dropdown">
                <button onClick={() => navigate('/mypage')}>My Page</button>
                <button onClick={handleLogout}>Logout</button>
              </div>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/join">Join</Link>
            </>
          )}
        </div>
      </nav>

      <main className="main-content">
      </main>
    </>
  );
}

export default NavBar;
