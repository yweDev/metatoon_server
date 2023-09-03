// Attach event listener to form submit event
document
  .getElementById("register-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form submission

    // Retrieve input values
    var email = document.getElementsByName("email")[0].value;
    var password = document.getElementsByName("password")[0].value;
    var name = document.getElementsByName("name")[0].value;

    // Create JavaScript object representing the data
    var data = {
      email: email,
      password: password,
      name: name,
    };

    var form = document.getElementById("register-form");
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
        console.log(data);

        alert("회원가입 성공");

        // Redirect to login.html
        window.location.href = "/login";
      })
      .catch(function (error) {
        // Handle error
        console.error(error);
      });
  });
