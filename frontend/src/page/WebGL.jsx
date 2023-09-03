// import logo from './logo.svg';
import '../css/main.css';
import Header from '../component/header.jsx';

const Metaoon_webGL = () => {
  return (
    <iframe
      title="Metatoon"
      src={`${process.env.PUBLIC_URL}/webgl.html`}
      width="1280"
      height="720"
      allowFullScreen
    ></iframe>
  );
}

function App() {
  return (
    <div className='App'>
      <Header />
      <Metaoon_webGL />
      <form action="/imageEditor" method="get">
      <button id="editorButton" type="submit">이미지 편집</button>
    </form>
    </div>
  );
}

export default App;
