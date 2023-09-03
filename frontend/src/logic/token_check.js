/*
// Read the token from a cookie or local storage
var token = document.cookie; // Get cookies
console.log(token);
// var rootPath = window.location.origin;
// console.log(rootPath);
var loginBtn = document.getElementById("loginBtn");
var logoutBtn = document.getElementById("logoutBtn");
var userinfoBtn = document.getElementById("userinfoBtn");

// Use the token to determine if the login was successful or not
if (token.startsWith("token=")) {
  loginBtn.style.display = "none";
  logoutBtn.style.display = "block";
  userinfoBtn.style.display = "block";
} else {
  logoutBtn.style.display = "none";
  loginBtn.style.display = "block";
  userinfoBtn.style.display = "none";
}
*/

document.addEventListener("DOMContentLoaded", function() {
  var token = localStorage.getItem("token");
  var link1 = document.getElementById("link1");
  var link2 = document.getElementById("link2");

  if (token) {
    link1.href = "/user-info";
    link1.textContent = "회원정보";
    link2.href = "";
    link2.textContent = "로그아웃";
  } else {
    link1.href = "/login";
    link1.textContent = "로그인";
    link2.href = "/register";
    link2.textContent = "회원가입";
  }
});