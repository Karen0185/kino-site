import { useState, useRef, useEffect } from 'react';
import '../assets/style/Catalog.scss'
import FilmList from './FilmList';

const Catalog = ({films, offerImg, setCurrentFilm}) => {
    const catalogBg = useRef(null);
    const [bg, setBg] = useState(offerImg);

    const trillerFilms = films.filter((film) => {
        return film.genres.find((genre) => genre.genre === 'триллер');
    });

    const comedyFilms = films.filter((film) => {
        return film.genres.find((genre) => genre.genre === 'комедия');
    });

    const dramaFilms = films.filter((film) => {
        return film.genres.find((genre) => genre.genre === 'драма');
    });

    return(
        <div className="Catalog">
            <div className="container">
            <FilmList films={films} title="Топ фильмы" setBg={setBg} setCurrentFilm={setCurrentFilm}/>
            <FilmList films={trillerFilms} category='триллер' title="Триллер" setBg={setBg} setCurrentFilm={setCurrentFilm}/>
            <FilmList films={comedyFilms} category='комедия' title="Комедия" setBg={setBg} setCurrentFilm={setCurrentFilm}/>
            <FilmList films={dramaFilms} category='драма' title="Драма" setBg={setBg} setCurrentFilm={setCurrentFilm}/>
            </div>
            <div className="bg" ref={catalogBg} style={{ backgroundImage: `url(${bg})` }}></div>
        </div>
    );
}

export default Catalog