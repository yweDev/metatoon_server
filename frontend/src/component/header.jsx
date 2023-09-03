import React, { useState } from 'react';
import "../css/main.css";

// const [HeaderData, setHeaderData] = useState({
//   link1Href: '',
//   link1Content: '',
//   link2Href: '',
//   link2Content: '',
// });

// const handleChange = (e) => {
//   const { name, value } = e.target;
//   setFormData({
//     ...formData,
//     [name]: value,
//   });

const token = localStorage.getItem("token");
function Header() {
  let link1Href, link1Content, link2Href, link2Content;

  if(token){
    link1Href = "/user-info";
    link1Content = "회원정보";
    link2Href = "/logout";
    link2Content = "로그아웃";
  } else {
    link1Href = "/login";
    link1Content = "로그인";
    link2Href = "/register";
    link2Content = "회원가입";
  }

  return (
    <header>
        <h1>Home</h1>
        <nav>
          <ul>
              <li><a id="" href={ link1Href }>{ link1Content }</a></li>
              <li><a id="" href={ link2Href }>{ link2Content }</a></li>
          </ul>
        </nav>
    </header>
  );
}

export default Header;
