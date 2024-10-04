import React from 'react';
import '../CSS/login_signup.css'; 
import NavBar from './navbar';

const Signup = () => {
  return (
    <>
    <NavBar />
    <div className="signup-container">
      <h2>회원가입</h2><br></br>
      <form className="signup-form">
        <label htmlFor="name">이름</label>
        <input type="text" id="name" placeholder="이름을 입력하세요" />

        <label htmlFor="email">이메일</label>
        <input type="email" id="email" placeholder="이메일을 입력하세요" />

        <label htmlFor="password">비밀번호</label>
        <input type="password" id="password" placeholder="비밀번호를 입력하세요" />

        <label htmlFor="confirm-password">비밀번호 확인</label>
        <input type="password" id="confirm-password" placeholder="비밀번호를 다시 입력하세요" />

        <button type="submit">회원가입</button>
      </form>
    </div>
    </>
  );
}

export default Signup;
