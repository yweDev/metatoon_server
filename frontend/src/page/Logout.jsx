function deleteCookie(cookieName) {
    document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/html;`;
  }

function Logout() {
    var token = localStorage.getItem("token");
    if (token) {
      deleteCookie("token");
      window.localStorage.removeItem("token");
      console.log(document.cookie);
  
      // Redirect to login page or home page
      // Refer to App.js for route options/urls
      alert("로그아웃 완료");
      window.location.replace("/");
    }
  }

  export default Logout;