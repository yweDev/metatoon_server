// import logo from './logo.svg';
import '../App.css';

function App() {
  return (
  <body>
    <header>
      <h1>Home</h1>
      <nav>
        <ul>
          <li><a id="link1" href=""></a>Link1</li>
          <li><a id="link2" href=""></a>Link2</li>
        </ul>
      </nav>
    </header>

    <form action="/production" method="get">
        <button id="productionButton" type="submit">웹툰 제작</button>
    </form>

    <form action="/viewer" method="get">  
      <button id="viewerButton" type="submit">웹툰 뷰어</button>
    </form>

    <script src="/js/token_check.js"></script>
    <script src="/js/logout.js"></script>
    
  </body>

  );
}

export default App;
