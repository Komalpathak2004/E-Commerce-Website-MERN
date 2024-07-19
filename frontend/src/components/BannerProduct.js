import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

import image1 from '../assest/banner/img1.png';
import image2 from '../assest/banner/img2.png';
import image3 from '../assest/banner/img3.png';
import image4 from '../assest/banner/img4.png';

const OuterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 20px;
  box-sizing: border-box;
`;

const Container = styled.div`
  width: 100%;
  max-width: 1200px; /* Adjust this value as needed */
  text-align: center;
  box-sizing: border-box;
  
  .slick-slide img {
    width: 100%;
    height: auto;
  }

  @media (max-width: 732px) {
    .slick-slide img {
      height: 12em;
    }
  }
  
  @media (max-width: 550px) {
    .slick-slide img {
      height: 10em;
    }
  }
`;

const BannerProduct = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <OuterContainer>
      <Container>
        <Slider {...settings}>
          <div>
            <img src={image1} alt="image1" />
          </div>
          <div>
            <img src={image2} alt="image2" />
          </div>
          <div>
            <img src={image3} alt="image3" />
          </div>
          <div>
            <img src={image4} alt="image4" />
          </div>
        </Slider>
      </Container>
    </OuterContainer>
  );
};

export default BannerProduct;
