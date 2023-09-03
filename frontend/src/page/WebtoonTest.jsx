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
        <h2>웹툰</h2>
        <div class="container">
          <a href="/webtoon1">
            <div class="image-container">
              <img src="/img/sample_cover.png" alt="Image 1" />
              <h2>스페셜 에이전트 원</h2>
            </div>
        </a>
          <a href="/webtoon2">
            <div class="image-container">
              <img src="/img/sample_cover2.png" alt="Image 2" />
              <h2>매직 & 썬더</h2>
            </div>
          </a>
        </div>
      </section>
    </main>
    <footer>
      <p>웹툰 뷰어 플랫폼</p>
    </footer>
  </body>
  );
}

export default App;
