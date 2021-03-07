import React, { useLayoutEffect, useState } from 'react';
import notFoundImage from '../../assets/404.png';

const NotFound = () => {
    function useWindowSize() {
        const [size, setSize] = useState([0, 0]);
        useLayoutEffect(() => {
            function updateSize() {
                const headerH = document.getElementsByClassName('navbar')[0].offsetHeight
                setSize([window.innerWidth, (window.innerHeight - headerH)]);
            }
            window.addEventListener('resize', updateSize);
            updateSize();
            return () => window.removeEventListener('resize', updateSize);
        }, []);
        return size;
    }
    const [width, height] = useWindowSize();

    return (
        <div
            style={{ backgroundImage: `url(${notFoundImage})`, height: height }}
            className="notFoundPageClass"></div>
    )
}

export default NotFound