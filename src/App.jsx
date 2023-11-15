import { useEffect, useState } from 'react';
import WebFont from 'webfontloader';
import Header from './components/Header';
import Offer from './components/Offer';
import Catalog from './components/Catalog';
import FilmPage from './components/FilmPage';
import NotFound from './components/NotFound'
import { useNavigate, Link, json } from 'react-router-dom';
import './App.scss';


function App() {
  const [films, setFilms] = useState([]);
  const [currentFilm, setCurrentFilm] = useState()
  const [findedFilms, setFindedFilms] = useState([])
  const [imgUrl, setImgUrl] = useState("https://img2.goodfon.com/original/1920x1080/8/fe/kong-skull-island-king-kong-ostrov-cherepa-movie-film-1.jpg")

  const randomPage = Math.floor(Math.random() * 10) + 1
  
  const apiKEY = 'e601d8b4-6870-4e16-85b5-63232dbdf389'
useEffect(() => {
  fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_250_BEST_FILMS&page=${randomPage}`, {
    method: 'GET',
    headers: {
      'X-API-KEY': apiKEY,
      'Content-Type': 'application/json',
    },
  })
    .then((res) => res.json())
    .then((json) => setFilms(json))
    .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    WebFont.load({
      google: {
        families: ['Roboto','Bebas Neue','Ropa Sans']
      }
    });

    window.addEventListener('scroll', (e) => {
      document.querySelector('.Header').style.backdropFilter = `blur(${window.scrollY / 50 > 100 ? 100 : window.scrollY / 50}px)`
  })
  }, []);
  if(films.films) {
    return (
        <div className="App">
            <Header apiKEY={apiKEY} findedFilms={findedFilms} setFindedFilms={setFindedFilms} setCurrentFilm={setCurrentFilm}/>
            { 
            currentFilm ? 
              <FilmPage imgUrl={imgUrl} films={films.films} apiKEY={apiKEY} film={currentFilm} setCurrentFilm={setCurrentFilm} />
              : <Offer films={films.films} apiKEY={apiKEY}/>
              }
            <Catalog films={films.films} offerImg={imgUrl} setCurrentFilm={setCurrentFilm} currentFilm={currentFilm}/>
        </div>
    ); 
  } 
}

export default App;
