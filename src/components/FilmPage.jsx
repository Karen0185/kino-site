import { useEffect, useState } from 'react';
import FilmList from './FilmList';
import '../assets/style/FilmPage.scss';
import '../assets/style/Catalog.scss';


const FilmPage = ({film,apiKEY, setCurrentFilm, setBg}) => {

    const [similarFilms, setSimilarFilms] = useState([])
    const [filmDescription, setFilmDescription] = useState()
    const [filmImages, setFilmImages] = useState([])

    useEffect(() => {
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}/similars`, {
        method: 'GET',
        headers: {
          'X-API-KEY': apiKEY,
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((json) => setSimilarFilms(json.items))
        .catch((err) => console.log(err));

          window.scrollTo({
            top: 0,
            behavior: "smooth"
          });

          fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}`, {
          method: 'GET',
          headers: {
            'X-API-KEY': apiKEY,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((json) => setFilmDescription(json.description))
        .catch((err) => console.log(err));

        fetch(`https://kinopoiskapiunofficial.tech/api/v2.2/films/${film.filmId}/images`, {
          method: 'GET',
          headers: {
            'X-API-KEY': apiKEY,
            'Content-Type': 'application/json',
          },
        })
        .then((res) => res.json())
        .then((json) => setFilmImages(json.items))
        .catch((err) => console.log(err));

      }, [film,filmDescription]);

    if(similarFilms) {
        return(
            <div className="FilmPage">
                <div className="container">
                    <div className="film">
                        <div className="top_content">
                            <div className="left-content">
                                <div className="film-poster">
                                    {film.posterUrl ? <img src={film.posterUrl} alt="" /> : ""}
                                </div>
                                <div className="film-info">
                                    <div className="film-name">{film.nameOriginal ? film.nameOriginal : film.nameEn}</div>
                                    <div className="genres">{film.genres ? film.genres.map((item) => item.genre + ', ' + ' ') : ''}</div>
                                    <div className={film.ratingKinopoisk ? film.ratingKinopoisk >= 8 ? 'rating rating-green' : 'rating rating-orange' : film.rating >= 8 ? 'rating rating-green' : 'rating rating-orange'}>{film.ratingKinopoisk ?  film.ratingKinopoisk : film.rating}</div>
                                    <div className="restrictions"><p>{film.ratingAgeLimits ?  film.ratingAgeLimits.slice(3) + '+' : '12+'}</p></div>
                                </div>
                            </div>
                            <div className="right-content">
                                <div className="film-description">{filmDescription}</div>
                            </div>
                        </div>
                        {
                        filmImages.length > 0 && filmImages.imageUrl ? 
                            <div className="film_iamges">
                                <img src={filmImages[0].imageUrl} alt="" />
                                <img src={filmImages[1].imageUrl} alt="" />
                                <img src={filmImages[2].imageUrl} alt="" />
                                <img src={filmImages[3].imageUrl} alt="" />
                                <img src={filmImages[4].imageUrl} alt="" />
                                <img src={filmImages[5].imageUrl} alt="" />
                            </div> : ''
                        }
                      <FilmList className='film_list similar' setBg={() => {}}  films={similarFilms} title="Похожие" setCurrentFilm={setCurrentFilm}/>
                    </div>
                </div>
                <div className="bg"  style={{ backgroundImage: `url(${film.posterUrl})` }}></div>
            </div>
        );
    }
}

export default FilmPage;