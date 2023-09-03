// import logo from './logo.svg';
import '../App.css';

function App() {
  return (
    <body>
    <header>
      <h1>웹툰 뷰어</h1>
      <nav>
        <ul>
          <li><a href="/">홈</a></li>
          <li><a id="link1" href=""></a></li>
          <li><a id="link2" href=""></a></li>
        </ul>
      </nav>
      <script src="/js/token_check.js"></script>
      <script src="/js/logout.js"></script>
    </header>
    <main>
      <section>
        <h2 style="margin-bottom: 20px">웹툰</h2>
        <div id="toonLoading">
          <img src="/img/Rolling-1.4s-200px.gif" alt="Loading" />
        </div>
        <div id="toonContainer"></div>
        <script type="module" src="/js/create_toon.js"></script>
      </section>
    </main>
    <footer>
      <p>웹툰 뷰어 플랫폼</p>
    </footer>
  </body>
  );
}

export default App;
