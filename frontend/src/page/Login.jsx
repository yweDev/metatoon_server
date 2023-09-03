// import logo from './logo.svg';
import React, { useState } from 'react';
import '../css/login&register.css'

function App() {
  const url = "http://34.145.65.5:46351/api/user/login";
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // http request(login.js implementation here)
    fetch(url, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then(function (response) {
        if (response.ok) {
          return response.text();
        } else {
          throw new Error("Error: " + response.statusText);
        }
      })
      .then(function (data) {
        // Handle successful response
        var json_data = JSON.parse(data); // String to JSON

        var token = json_data.token; // assuming the token is returned as "token" in the response data
        console.log(token);

        if (json_data.result == "success") {
          // Store token in cookie or local storage for later use
          document.cookie = "token=" + token;
          console.log(document.cookie);
          localStorage.setItem("token", token);

          alert("로그인 성공");

          // Redirect to webtoon_test.html
          window.location.href = "/";
        } else {
          alert(json_data.message);
        }
      })
      .catch(function (error) {
        // Handle error
        console.error(error);
      });

    // Clear form data after sending
    setFormData({
      email: '',
      password: '',
    });
  };
  
  return (
    <main>
      <div class="login-wrapper">
        <h2>Login</h2>
        <form onSubmit={handleSubmit} id='login-form'>
        <input
          type="text"
          id="email"
          name="email"
          placeholder='Email'
          value={formData.username}
          required
          onChange={handleChange}
        />
        <input
          type="password"
          id="password"
          name="password"
          placeholder='Password'
          value={formData.password}
          required
          onChange={handleChange}
        />
          <input type="submit" value="LOGIN" />
          <p><a href="/register">회원가입</a></p>
        </form>
      </div>
    </main>
  );
}

export default App;
