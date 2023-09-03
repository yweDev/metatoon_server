// import logo from './logo.svg';
import '../css/main.css'
import Header from '../component/header.jsx';

function App() {
  return (
  <body>
    <Header />
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
