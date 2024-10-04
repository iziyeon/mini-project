import React from 'react';
import '../CSS/login_signup.css'; 
import NavBar from './navbar';

const Login = () => {
  return (
    <>
    <NavBar />
    <div className="login-container">
      <h2>로그인</h2>
      <br></br>
      <form className="login-form">
        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력하세요" />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요" />

        <br></br>
        <button type="submit">로그인</button>
      </form>
    </div>
    </>
  );
}

export default Login;
