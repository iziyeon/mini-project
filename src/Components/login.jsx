import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import NavBar from './navbar'
import '../CSS/login_signup.css'

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message || "로그인에 실패했습니다. 이메일과 비밀번호를 확인하세요.");
        } else {
            alert("로그인 성공!");
            navigate("/");
        }
    };

    // Google OAuth 로그인을 처리하는 함수 추가
    const handleOAuthLogin = async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                queryParams: {
                    access_type: 'offline',
                    prompt: 'consent',
                },
            },
        });

        if (data) {
            alert("로그인 되었습니다!");
            navigate("/");
        }
        if (error) {
            console.log("error: ", error);
            setError(error.message || "OAuth 로그인에 실패했습니다.");
        }
    };

    return (
      <>
      <NavBar  />
        <div className="login-container">
            <form onSubmit={handleLogin} className="login-form">
                <label>이메일</label>
                <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label>비밀번호</label>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">로그인</button>
                <br></br>
                <button onClick={handleOAuthLogin} className="oauth-login-button">
                Google로 로그인
            </button>
            </form>

        </div>
        </>
    );
}
