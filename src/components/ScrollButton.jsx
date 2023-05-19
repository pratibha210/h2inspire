import React, {useState} from 'react';

const ScrollButton = () =>{

    const [visible, setVisible] = useState(false)

    const toggleVisible = () => {
        const scrolled = document.documentElement.scrollTop;
        if (scrolled > 300){
            setVisible(true)
        }
        else if (scrolled <= 300){
            setVisible(false)
        }
    };

    const scrollToTop = () =>{
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    window.addEventListener('scroll', toggleVisible);

    return (
        <div className="scrollToTopBtn showBtn" onClick={scrollToTop} style={{display: visible ? 'flex' : 'none'}}>
            <i className="fa-solid fa-angle-up"></i>
        </div>
    );
}

export default ScrollButton;
