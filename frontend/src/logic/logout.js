// logout logic
document.getElementById("link2").addEventListener("click", function () {
  var token = localStorage.getItem("token");
  if (token) {
    // Clear authentication-related data
    deleteCookie("token");
    window.localStorage.removeItem("token");
    console.log(document.cookie);

    // Redirect to login page or home page
    alert("로그아웃 완료");
    window.location.replace("webtoon_test.html"); // replace with your login page URL
  }
});

function deleteCookie(cookieName) {
  document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/html;`;
}
