// Attach event listener to form submit event
document
  .getElementById("login-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form submission

    // Retrieve input values
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;

    // Create JavaScript object representing the data
    var data = {
      email: email,
      password: password,
    };

    var form = document.getElementById("login-form");
    fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
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
  });
