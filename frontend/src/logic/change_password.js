// Get the button and form elements
var changePwBtn = document.getElementById("changePwBtn");
var changePwForm = document.getElementById("changePw-form");

// Add an event listener to the button
changePwBtn.addEventListener("click", function (event) {
  event.preventDefault(); // Prevent the default form submission behavior

  // Toggle the visibility of the form
  if (changePwForm.style.display === "none") {
    changePwForm.style.display = "block";
  } else {
    changePwForm.style.display = "none";
  }
});

// Token value: 로컬 토큰 가져오는 코드로 수정!!!
// var token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoid29vIiwiaWQiOjMsImlhdCI6MTY4NzAwNzk5MX0.Cj8gLYl9zCywFu-v_KLgPQyf8lF9lFSZEUVz3_xYR2E";
var token = localStorage.getItem("token");

// Attach event listener to form submit event
document
  .getElementById("changePw-form")
  .addEventListener("submit", function (event) {
    event.preventDefault(); // prevent form submission

    // Retrieve input values
    var originalPw = document.getElementsByName("originalPw");
    var newPw = document.getElementsByName("newPw");

    // Create JavaScript object representing the data
    var data = {
      originalPw: originalPw[0].value,
      newPw: newPw[0].value,
    };

    var form = document.getElementById("changePw-form");
    fetch(form.action, {
      method: form.method,
      headers: {
        "Content-Type": "application/json",
        token: token,
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
        console.log(json_data);

        if (json_data.result == "Success") {
          console.log("비밀번호 변경 성공");
          changePwForm.style.display = "none";
          alert("비밀번호 변경 완료");
          originalPw[0].value = "";
          newPw[0].value = "";
        } else {
          console.log("비밀번호 변경 실패");
          alert("비밀번호 변경 실패");
          originalPw[0].value = "";
          newPw[0].value = "";
        }
      })
      .catch(function (error) {
        // Handle error
        console.error(error);
      });
  });
