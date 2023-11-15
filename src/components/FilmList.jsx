const FilmList = ({films, title, category, setBg, setCurrentFilm}) => {
    // const comedyFilm = films.find(film => film.genres.some(genre => genre.genre === category));
    // const genresToShow = comedyFilm ? comedyFilm.genres.map(genre => genre.genre) : films[0].genres.map(genre => genre.genre);

    const prioritizeGenres = (genres) => {
        const sortedGenres = genres.sort((a, b) => {
            if (a.genre === category) {
                return -1;
            } else if (b.genre === category) {
                return 1;
            } else {
                return 0;
            }
        });
        // Выбрать первый жанр из отсортированного массива
        return sortedGenres[0].genre;
    }



    return(
        <>
            <div className="title">{title}</div>
            <div className="film_list similar">
                {
                    films.map((film, index) => {
                        return(<div className="card" onMouseOver={() => {
                                setBg(film.posterUrl)
                        }} key={index}>
                        <div className="poster" onClick={() => {
                            setCurrentFilm(film)
                        }}>
                            <div className={film.rating >= 8 ? 'rating rating-green' : 'rating rating-orange'}>{film.rating}</div>
                            <img src={film.posterUrl} alt="" />
                        </div>
                        <div className="card__info">
                            {/* <p>{film.year} / {prioritizeGenres(film.genres) + ', ' + genresToShow.slice(1,2).map((item) => item + ', ')}</p> */}
                            {/* <p>{film.year} / {genresToShow.slice(0,2).map((item) => item + ', ')}</p> */}
                            {/* <p>{film.year} / {film.genres.slice(0,2).map((item) => item.genre + ', ')}</p> */}
                        </div>
                        <div className="name">{film.nameRu}</div>
                    </div>
                        )
                    }) 
                }
            </div>
        </>
    );
}

export default FilmList;