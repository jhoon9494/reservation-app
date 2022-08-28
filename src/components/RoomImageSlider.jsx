import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import styled from 'styled-components';
import baseStyle from '../styles/baseStyle';
import { useRef, useState } from 'react';

const RoomImageSlider = ({ roomContent, windowSize }) => {
  const containerRef = useRef();
  const [imgIndex, setImgIndex] = useState(0);
  const handleImageMoveLeft = () => {
    const currentMargin = parseInt(containerRef.current.style.marginLeft);
    const nextMargin = currentMargin + (windowSize > 768 ? 550 : 500);
    if (nextMargin > 0) return;
    containerRef.current.style.marginLeft = `${nextMargin}px`;
    setImgIndex((curr) => curr - 1);
  };

  const handleImageMoveRight = () => {
    const currentMargin = parseInt(containerRef.current.style.marginLeft)
      ? parseInt(containerRef.current.style.marginLeft)
      : 0;
    const nextMargin = currentMargin - (windowSize > 768 ? 550 : 500);
    if (nextMargin < -(roomContent.imgSrc?.length - 1) * 550) return;
    containerRef.current.style.marginLeft = `${nextMargin}px`;
    setImgIndex((curr) => curr + 1);
  };

  return (
    <Container>
      <ImgIndicators>
        {Array(roomContent.imgSrc?.length)
          .fill('idx')
          .map((item, idx) => {
            return (
              <Indicator
                key={`${item}-${idx}`}
                active={imgIndex === idx}
              ></Indicator>
            );
          })}
      </ImgIndicators>

      <LeftArrowBtn onClick={handleImageMoveLeft} />
      <SliderContainer>
        <ImageContainer ref={containerRef}>
          {/* roomContent의 초기 값은 빈 객체이므로 키 값을 통해 접근할 수 없음.
          해당된 키 값이 없을 경우 undefined를 반환하여 에러를 발생하지 않도록 옵셔널 체이닝(?.)을 사용 */}
          {roomContent.imgSrc?.map((img, idx) => {
            return (
              <Image
                key={`${roomContent.name}-${idx}image`}
                src={img}
                alt={roomContent.name}
              />
            );
          })}
        </ImageContainer>
      </SliderContainer>
      <RightArrowBtn onClick={handleImageMoveRight} />
    </Container>
  );
};

export default RoomImageSlider;

const Container = styled.div`
  width: 550px;
  display: flex;
  margin: 21px auto auto;
  justify-content: center;
  position: relative;

  @media (max-width: 768px) {
    width: 500px;
  }
`;
const ImgIndicators = styled.div`
  display: flex;
  position: absolute;
  bottom: 5px;
  left: 50%;
  transform: translate(-50%);
`;

const Indicator = styled.div`
  background-color: ${(props) =>
    props.active ? `${baseStyle.mainColor}` : 'white'};
  border-radius: 5px;
  width: 15px;
  height: 5px;
  margin: 5px;
`;

const SliderContainer = styled.div`
  width: 550px;
  height: 300px;
  display: flex;
  overflow: hidden;
  border-radius: 10px;

  @media (max-width: 768px) {
    width: 500px;
  }
`;

const ImageContainer = styled.div`
  width: 1650px;
  height: 300px;
  display: flex;
  transition: all 0.6s ease;

  @media (max-width: 768px) {
    width: 1500px;
  }
`;

const Image = styled.img`
  width: 550px;
  height: 300px;

  :hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    width: 500px;
  }
`;

const LeftArrowBtn = styled(VscChevronLeft)`
  transform: scale(6);
  color: white;
  position: absolute;
  top: 155px;
  left: 20px;
  :hover {
    cursor: pointer;
  }
`;

const RightArrowBtn = styled(VscChevronRight)`
  transform: scale(6);
  color: white;
  position: absolute;
  top: 155px;
  right: 20px;

  :hover {
    cursor: pointer;
  }
`;
