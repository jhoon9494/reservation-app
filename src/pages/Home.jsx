import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';

const Home = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const navigate = useNavigate();
  const slideRef = useRef(null);

  const handleSiteClick = () => {
    navigate('/site');
  };

  const handleReservationClick = () => {
    navigate('/reservation');
  };

  useEffect(() => {
    slideRef.current.style.transition = 'all 0.5s ease-in-out';
    slideRef.current.style.transform = `translateX(-${currentSlide}00vw)`;

    setTimeout(() => {
      setCurrentSlide((prev) => {
        if (prev >= 2) {
          return 0;
        }
        return prev + 1;
      });
    }, 3000);
  }, [currentSlide]);

  return (
    <>
      <Slider ref={slideRef}>
        <BackgroundImage1 />
        <BackgroundImage2 />
        <BackgroundImage3 />
      </Slider>
      <HomeButtonWrap>
        <HomeButton onClick={handleSiteClick}>둘러보기</HomeButton>
        <HomeButton onClick={handleReservationClick}>예약하기</HomeButton>
      </HomeButtonWrap>
    </>
  );
};

export default Home;

const Slider = styled.div`
  display: flex;
  width: 300%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const BackgroundImage1 = styled.div`
  width: 100%;
  background-image: url('/images/main1.jpg');
  background-size: cover;
  background-position: center;
`;

const BackgroundImage2 = styled.div`
  width: 100%;
  background-image: url('/images/main2.jpg');
  background-size: cover;
  background-position: center;
`;

const BackgroundImage3 = styled.div`
  width: 100%;
  background-image: url('/images/main3.jpg');
  background-size: cover;
  background-position: center;
`;

const HomeButtonWrap = styled.div`
  width: 450px;
  position: absolute;
  top: 70%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  justify-content: space-between;
`;

const HomeButton = styled.button`
  width: 200px;
  height: 3rem;
  border: none;
  border-radius: 4px;
  text-align: center;
  cursor: pointer;
  color: ${baseStyle.mainColor};
  font-weight: bold;
  font-size: 1rem;
  background-color: #222;
  box-shadow: 0 0.5rem 1rem rgba(34, 34, 34, 0.8);
  transition: all 0.25s ease-in-out;

  &:hover {
    color: #222;
    background-color: ${baseStyle.mainColor};
  }
`;
