import React from 'react';

const Carousel = () => {
  return (
    <div id="carouselExample" className="carousel slide" data-ride="carousel">
      <div className="carousel-inner" style={{maxHeight:"400px"}}>
        <div className="carousel-item active">
        <img src={`${import.meta.env.VITE_SERVER_URL}/images/other-images/slider1.png`} alt="login form" className="img-fluid" style={{objectFit:"cover"}}/>
        </div>
        <div className="carousel-item">
        <img src={`${import.meta.env.VITE_SERVER_URL}/images/other-images/slider2.jpg`} alt="login form" className="img-fluid" />
        </div>
        <div className="carousel-item">
        <img src={`${import.meta.env.VITE_SERVER_URL}/images/other-images/slider4.jpg`} alt="login form" className="img-fluid" style={{width:"100%",objectFit:"cover"}}/>
        </div>
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
}

export default Carousel;
