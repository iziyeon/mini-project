import '../src/CSS/App.css'
import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react'
import MovieCard from './Components/MovieCard';
import MovieDetail from './Components/MovieDetail';
import Login from './Components/login';
import Signup from './Components/signup';
import { createClient } from '@supabase/supabase-js'
import { Auth } from '@supabase/auth-ui-react'
import { ThemeSupa } from '@supabase/auth-ui-shared'
import {supabase} from "./Components/supabaseClient"


function App() {
  const [session, setSession] = useState(null)
  
  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })

    return () => subscription.unsubscribe()
  }, [])

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