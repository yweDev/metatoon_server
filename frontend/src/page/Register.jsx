import React, {useState} from 'react';
import '../App.css';

function App() {
  const url = "http://34.145.65.5:46351/api/user/register";
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
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
    <body>
    <header>
      <link rel="stylesheet" href="/css/webtoon_test.css" />
      <h1>회원가입</h1>
      <nav>
        <ul>
          <li id="loginBtn"><a href="/login">로그인</a></li>
          <li><a href="/">홈</a></li>
        </ul>
      </nav>
    </header>
    <main>
      <link rel="stylesheet" href="/css/login&register.css" />
      <div class="register-wrapper">
        <h2>Register</h2>
        <form
          method="POST"
          action="http://34.145.65.5:46351/api/user/register"
          id="register-form"
        >
          <input type="text" name="email" placeholder="Email" required />
          <input
            type="password"
            name="password"
            placeholder="Password"
            required
          />
          <input type="text" name="name" placeholder="Name" required />
          <input type="submit" value="Register" />
        </form>
        <script src="/js/register.js"></script>
      </div>
    </main>
  </body>
  );
}

export default App;
