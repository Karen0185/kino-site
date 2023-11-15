import '../assets/style/NotFound.scss'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'


const NotFound = () => {

    const [second, setSecond] = useState(10);
    const navigate = useNavigate();
    
    useEffect(() => {
        setTimeout(() => {
            second < 1 ? navigate('/') : setSecond(second - 1)
        },1000)
    }, [second]);

    return(
        <div className="NotFound">
            <h1>404</h1>
            <p>This page not a found</p>
            <p>Go to the main page in {second} second</p>
        </div>
    );
}

export default NotFound;