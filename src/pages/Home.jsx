import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
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
  background-image: url('images/main1.jpg');
  background-size: cover;
  background-position: center;
`;

const BackgroundImage2 = styled.div`
  width: 100%;
  background-image: url('images/main2.jpg');
  background-size: cover;
  background-position: center;
`;

const BackgroundImage3 = styled.div`
  width: 100%;
  background-image: url('images/main3.jpg');
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

const HomeButton = styled(Button)`
  width: 200px;
  padding: 8px 28px;
  background-color: ${baseStyle.mainColor};
  border: 1px solid ${baseStyle.mainColor};

  &:hover {
    background-color: ${baseStyle.mainHoverColor};
    border: 1px solid ${baseStyle.mainHoverColor};
  }
`;
