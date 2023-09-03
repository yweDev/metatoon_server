// Token value: 로컬 토큰 가져오는 코드로 수정!!!
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid29vIiwiaWQiOjMsImlhdCI6MTY4NzAwNzk5MX0.Cj8gLYl9zCywFu-v_KLgPQyf8lF9lFSZEUVz3_xYR2E";
var token = localStorage.getItem("token");

// Fetch request options
var requestOptions = {
  method: "GET",
  headers: {
    token: token,
  },
};

// Make a fetch request to the server API with headers
fetch("http://34.145.65.5:46351/api/user", requestOptions)
  .then((response) => response.json())
  .then((data) => {
    // Update the HTML elements with the user information
    document.getElementById("user-id").innerText = data[0].email;
    document.getElementById("user-name").innerText = data[0].name;
  })
  .catch((error) => {
    console.log("Error:", error);
  });
