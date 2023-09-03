// import logo from './logo.svg';
import '../App.css';
import Header from '../component/header.jsx';

const ImageEditor = () => {

  const handleFullScreen = () => {
    const iframe = document.getElementById('Metatoon'); // Replace with the actual ID of your iframe

    if (iframe) {
      if (iframe.requestFullscreen) {
        iframe.requestFullscreen();
      } else if (iframe.mozRequestFullScreen) {
        iframe.mozRequestFullScreen();
      } else if (iframe.webkitRequestFullscreen) {
        iframe.webkitRequestFullscreen();
      } else if (iframe.msRequestFullscreen) {
        iframe.msRequestFullscreen();
      }
    }
  };

  return (
    <iframe
      title="ImageEditor"
      src={`${process.env.PUBLIC_URL}/html/imageEditor.html`}
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
      <ImageEditor />
    </div>
  );
}

export default App;
