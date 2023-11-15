import { useRef, useState, useEffect } from 'react';
import {AiOutlineSearch} from 'react-icons/ai'


const Header = ({apiKEY, setFindedFilms, findedFilms, setCurrentFilm}) => {

    const searchRef = useRef(null);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [serachValue, setSearchValue] = useState('');
    const [serachResultShow, setSearchResultShow] = useState(false)
    const [burgerisOpen, setBurgerisOpen] = useState(false)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  const handleSearchClick = () => {
    setIsSearchOpen(true);
  };

  useEffect(() => {
    if(serachValue != '') {
      fetch(`https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=${serachValue}`, {
      method: 'GET',
      headers: {
        'X-API-KEY': apiKEY,
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((json) => setFindedFilms(json))
      .catch((err) => console.log(err));
      console.log(serachValue);
    }

  }, [serachValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setSearchResultShow(false);
      }
    };
  
    document.addEventListener('mousedown', handleClickOutside);
  
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [searchRef]);

  useEffect(() => {

  }, [burgerisOpen])

  const Nav = () => {
    return(
      <div className="nav">
        <ul>
            <li onClick={() => {
              window.location.reload();
            }}>Главная</li>
            <li onClick={() => {
              window.scrollTo({
                top: window.innerHeight,
                behavior: "smooth"
              })
            }}>Филмы</li>
        </ul>
        <div className={isSearchOpen ? 'search open' : 'search'} ref={searchRef} onClick={handleSearchClick} onMouseOver={handleSearchClick}>
            <AiOutlineSearch className='icon'/>
            <input type="text" value={serachValue} onInput={(e) => {
              setSearchValue(e.target.value)
              setSearchResultShow(!serachResultShow)
            }} 
            onClick={() => {
              serachValue != '' ? setSearchResultShow(!serachResultShow) : setSearchResultShow(serachResultShow)
            }}/>
        <div className={serachResultShow ? 'serachResult show' : 'serachResult'}>
            <div className="wrapper">
              {
                findedFilms.films ? 
                  findedFilms.films.map((item) => 
                  <div key={item.id} className="film"  onClick={(e) => {
                    setCurrentFilm(item)
                  }}>
                    <div className="film_bg" style={{ backgroundImage: `url(${item.posterUrl})` }}></div>
                    <div className="avatar"><img src={item.posterUrl} alt="" /></div>
                    <div className="filmInfo">
                      <div className="name">{item.nameRu}</div>
                      <div className={item.rating >= 8 ? 'rating rating-green' : 'rating rating-orange'}>{item.rating}</div>
                    </div>
                  </div>
                  )
                : ''
              }
            </div>
        </div>
        </div>
    </div>
    );
  }
    return(
        <div className="Header">
            <div className="container">
                <div className="logo" onClick={() => {
                          window.location.reload();
                        }}>
                    <h1>KINOMANIA</h1>
                </div>
                <div className={burgerisOpen ? 'burgerMenu open' : 'burgerMenu'}>
                  <div className={burgerisOpen ? 'burger__lines open' : 'burger__lines'} onClick={() => {
                    setBurgerisOpen(!burgerisOpen)
                  }}>
                    <div className="line"></div>
                    <div className="line"></div>
                    <div className="line"></div>
                  </div>
                  <div className="nav">
                  <ul>
                      <li onClick={() => {
                        window.location.reload();
                      }}>Главная</li>
                      <li onClick={() => {
                        window.scrollTo({
                          top: window.innerHeight,
                          behavior: "smooth"
                        })
                      }}>Филмы</li>
                  </ul>
                  <div className={isSearchOpen ? 'search open' : 'search'} ref={searchRef} onClick={handleSearchClick} onMouseOver={handleSearchClick}>
                      <AiOutlineSearch className='icon'/>
                      <input type="text" value={serachValue} onInput={(e) => {
                        setSearchValue(e.target.value)
                        setSearchResultShow(!serachResultShow)
                      }} 
                      onClick={() => {
                        serachValue != '' ? setSearchResultShow(!serachResultShow) : setSearchResultShow(serachResultShow)
                      }}/>
                  <div className={serachResultShow ? 'serachResult show' : 'serachResult'}>
                      <div className="wrapper">
                        {
                          findedFilms.films ? 
                            findedFilms.films.map((item) => 
                            <div key={item.id} className="film"  onClick={(e) => {
                              setCurrentFilm(item)
                            }}>
                              <div className="film_bg" style={{ backgroundImage: `url(${item.posterUrl})` }}></div>
                              <div className="avatar"><img src={item.posterUrl} alt="" /></div>
                              <div className="filmInfo">
                                <div className="name">{item.nameRu}</div>
                                <div className={item.rating >= 8 ? 'rating rating-green' : 'rating rating-orange'}>{item.rating}</div>
                              </div>
                            </div>
                            )
                          : ''
                        }
                      </div>
                  </div>
                  </div>
              </div>
                </div>
                
            </div>
        </div>
    );
}

export default Header;