// signup.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "./supabaseClient";
import NavBar from './navbar'
import '../CSS/login_signup.css'

export default function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setError("비밀번호가 일치하지 않습니다.");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError("유효한 이메일 주소를 입력해 주세요.");
            return;
        }

        const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: { name }
            }
        });

        if (error) {
            setError(error.message || "회원가입 중 오류가 발생했습니다.");
        } else {
            alert("회원가입이 완료되었습니다.");
            navigate("/login");
        }
    };
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
        <div className="signup-container">
            <form onSubmit={handleSignup} className="signup-form">
                <label>이름</label>
                <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
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
                <label>비밀번호 확인</label>
                <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {error && <p style={{ color: "red" }}>{error}</p>}
                <button type="submit">회원가입</button>
                <br></br>
                <button onClick={handleOAuthLogin} className="oauth-login-button">
                Google로 로그인
            </button>
            </form>
        </div></>
    );
}
