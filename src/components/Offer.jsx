import { useEffect, useRef, useState } from 'react';
import { FaCalendarAlt } from 'react-icons/fa'
import { MdTimer } from 'react-icons/md'
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs'
import { HiOutlineArrowNarrowLeft, HiOutlineArrowNarrowRight } from 'react-icons/hi'
import avatarBg from '../assets/images/avatar.jpg' 
import haryyPotterBg from '../assets/images/harry_potter.jpg' 
import jokerBg from '../assets/images/joker.jpg' 
import '../assets/style/Offer.scss'
 
const Offer = ({currentFilm}) => {
    const offerBg = useRef(null);
    const [slideCount, setSlideCount] = useState(0)
    const sliderItems = [
        {
            offer:  jokerBg,
            nameEn: 'JOKER',
            year: '2019',
            rating: 10,
            filmLength: 122,
            genres: ['драма', 'криминал', 'триллер']
        },
        {
            offer: haryyPotterBg,
            nameEn: 'HARRY POTTER ',
            year: '2022',
            rating: '8',
            filmLength: 99,
            genres: [
                'документальный', 'семейный']
        },
        {
            offer: avatarBg,
            nameEn: 'Avatar',
            year: '2022',
            rating: '9',
            filmLength: 192,
            genres: [
                'боевик', 'приключения', 'фантастика', 'фэнтези']
        }
    ]
    
    

    const handleMouseMove = (e) => {
        const offerBgElement = offerBg.current;
        const xPos = (e.clientX / -window.innerWidth) * 20 - 10;
        const yPos = (e.clientY / -window.innerHeight) * 20 - 10;
        offerBgElement.style.transform = `translate(${xPos}px, ${yPos}px)`;
    };
   
    useEffect(() => {
        window.addEventListener('scroll', (e) => {
            if(document.querySelector('.Offer')) {
                const offerContent = document.querySelector('.Offer .offer__content');
                const scrollY = window.scrollY;
                const maxOpacity = 0.9;
                const minOpacity = 0;
            
                const opacity = 1 - (scrollY / (offerContent.clientHeight / 2));
                document.querySelector('.Offer > .bg').style.top = `${-window.scrollY / 2}px`
                document.querySelector('.Offer > .bg').style.filter = `blur(${window.scrollY / 30 > 100 ? 100 : window.scrollY / 30}px)`
                document.querySelector('.Offer .slider').style.filter = `blur(${window.scrollY / 100 > 100 ? 100 : window.scrollY / 100}px)`
                document.querySelector('.Offer > .bg').style.transition = 'all 0s'
                offerContent.style.transform = `translateY(${window.scrollY / 2}px)`;
                offerContent.style.opacity = `${Math.max(Math.min(opacity, maxOpacity), minOpacity)}`;
            }
        })
        window.addEventListener('mousemove', handleMouseMove);
        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
        };
    }, []);
    
                const changeSlide = (direction) => {
                    if(document.querySelector('.Offer > .bg')) {
                        document.querySelector('.Offer > .bg').style.filter = `blur(50px)`
                        document.querySelector('.Offer > .bg').style.transition = 'all .3s ease-out'
                        document.querySelector('.Offer > .bg').style.opacity = '.3'
                        document.querySelector('.Offer > .bg').style.transform = 'scale(1.08)'
                
                        document.querySelector('.Offer .title').style.transition = 'all .2s ease-out'
                        document.querySelector('.Offer .title').style.opacity = '0'
                        document.querySelector('.Offer .title').style.transform = 'translateY(-20px)'
                
                        document.querySelector('.Offer .film-info').style.transition = 'all .3s ease-out'
                        document.querySelector('.Offer .film-info').style.opacity = '0'
                        document.querySelector('.Offer .film-info').style.filter = 'blur(10px)'
                    }
            
                    setTimeout(() => {
                        if(direction == 'next') {
                            if(slideCount > sliderItems.length - 2) {
                                setSlideCount(0)
                            } else {
                                setSlideCount(slideCount + 1)
                            }
                        }
                        if(direction == 'prev') {
                            if(slideCount == 0) {
                                setSlideCount(sliderItems.length-1)
                            } else {
                                setSlideCount(slideCount - 1)
                            }
                        }
                    },200)

                    setTimeout(() => {
                        
                        if(document.querySelector('.Offer > .bg')) {
                            document.querySelector('.Offer > .bg').style.opacity = '1'
                            document.querySelector('.Offer > .bg').style.transform = 'scale(1.0)'
                            document.querySelector('.Offer > .bg').style.filter = `blur(0px)`
                            
                            document.querySelector('.Offer .title').style.opacity = '1'
                            document.querySelector('.Offer .title').style.transform = 'translateY(0)'
                            
                            document.querySelector('.Offer .film-info').style.opacity = '1'
                            document.querySelector('.Offer .film-info').style.filter = 'blur(0px)'
    
                        }
                    },500)
                }

                useEffect(() => {
                    console.log(slideCount);
                    if(document.querySelector('.slider')) {
                        document.querySelectorAll('.slider-dots > .dot').forEach((dot) => {
                            dot.classList.remove('active')
                        })
                        document.querySelectorAll('.slider-dots > .dot')[slideCount].classList.add('active')
                    }
                  }, [slideCount]);
                

    return(
        <div className="Offer">
            <div className="bg" ref={offerBg}>
                <img src={sliderItems[slideCount].offer} alt="" />
            </div>
            <div className="container">
            <div className="slider">
                <div className="slider-dots">
                    <div className="dots-shadow"></div>
                    <div className="dot active" ></div>
                    <div className="dot" ></div>
                    <div className="dot" ></div>
                </div>
                <div className="prev_next_btns">
                    <div className="btn-prev" onClick={() => {
                        changeSlide('prev')
                    }}><HiOutlineArrowNarrowLeft/></div>
                    <div className="btn-next" onClick={() => {
                        changeSlide('next')
                    }}><HiOutlineArrowNarrowRight/></div>
                </div>
            </div>
                <div className="offer__content">
                    <div className="content-left">
                        <div className="title">
                            <h1>{sliderItems[slideCount].nameEn}</h1>
                        </div>
                        <div className="film-info">
                            <div className="info__left">
                                <div className="info__top">
                                    <div className="genre">{sliderItems[slideCount].genres.map((item) => item + ', ')}</div>
                                    <div className="year"> <FaCalendarAlt className='icon'/>{sliderItems[slideCount].year}</div>
                                    <div className="time"><MdTimer className='icon'/>{sliderItems[slideCount].filmLength}</div>
                                </div>
                                <div className="info__bottom">
                                        {
                                            Math.floor(sliderItems[slideCount].rating) / 2 === 5  ?  
                                                <div className="rating">
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/> 
                                                    <BsStarFill className='icon'/> 
                                                    <BsStarFill className='icon'/> 
                                                </div> :
                                                Math.floor(sliderItems[slideCount].rating) / 2 === 4 ?  
                                                <div className="rating">
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/> 
                                                    <BsStarFill className='icon'/> 
                                                    <BsStarHalf className='icon'/> 

                                                </div> : 
                                                <div className="rating">
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/>
                                                    <BsStarFill className='icon'/> 
                                                    <BsStarHalf className='icon'/> 
                                                    <BsStar className='icon'/> 
                                                </div> 
                                        }
                                    <div className="restrictions">
                                        <p>13+</p>
                                    </div>
                                </div>
                            </div>
                            <div className="info__right">

                            </div>
                        </div>
                    </div>
                    <div className="content-right"></div>
                </div>
            </div>
        </div>
    );
 }

export default Offer