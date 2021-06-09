import React from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import { total, albums } from '../utils/consts';
import '../index.css';

function App() {
  const [background, setBackground] = React.useState('');
  const [imageCounter, setImageCounter] = React.useState(0);
  const [currentAlbum, setСurrentAlbum] = React.useState(total);
  const [currentAlbumName, setСurrentAlbumName] = React.useState('All');

  React.useEffect(() => {
    if (imageCounter === total.length) {
      setImageCounter(0);
    }
    setBackground(total[imageCounter]);
  }, [imageCounter]);

  const newValue = imageCounter + 1;

  setTimeout(() => {
    setImageCounter(newValue);
  }, 150000);

  React.useEffect(() => {
    if (currentAlbumName === 'All') {
      setСurrentAlbum(total);
    } else {
      setСurrentAlbum(albums[currentAlbumName]);
    }
  }, [currentAlbumName]);

  //*DOM
  return (
    <div className="root">
      <div className="page">
        <Header />
        <Main
          currentAlbum={currentAlbum}
          currentAlbumName={currentAlbumName}
          background={background}
          setСurrentAlbum={setСurrentAlbum}
          setСurrentAlbumName={setСurrentAlbumName}
        />
        <Footer />
      </div>
    </div>
  );
}

export default App;
