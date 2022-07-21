import { VscChevronLeft, VscChevronRight } from 'react-icons/vsc';
import styled from 'styled-components';
import { useRef } from 'react';

const RoomImageSlider = ({ roomContent }) => {
  const containerRef = useRef();

  const handleImageMoveLeft = () => {
    const currentMargin = parseInt(containerRef.current.style.marginLeft);
    const nextMargin = currentMargin + 600;
    if (nextMargin > 0) return;
    containerRef.current.style.marginLeft = `${nextMargin}px`;
  };

  const handleImageMoveRight = () => {
    const currentMargin = parseInt(containerRef.current.style.marginLeft)
      ? parseInt(containerRef.current.style.marginLeft)
      : 0;
    const nextMargin = currentMargin - 600;
    if (nextMargin < -(roomContent.imgSrc?.length - 1) * 600) return;
    containerRef.current.style.marginLeft = `${nextMargin}px`;
  };

  return (
    <Container>
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
  width: 600px;
  display: flex;
  margin: 21px auto auto;
  justify-content: center;
  position: relative;
`;

const SliderContainer = styled.div`
  width: 600px;
  height: 350px;
  display: flex;
  overflow: hidden;
`;

const ImageContainer = styled.div`
  width: 1800px;
  height: 350px;
  display: flex;
  transition: all 0.6s ease;
`;

const Image = styled.img`
  width: 600px;
  height: 350px;

  :hover {
    cursor: pointer;
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
