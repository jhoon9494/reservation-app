import styled from 'styled-components';
import RoomsButton from '../components/RoomsButton';

const Site = () => {
  return (
    <Container>
      <MapImg src="/campMapImg.png" alt="mapImg" />
      <RoomsButton />
    </Container>
  );
};

export default Site;

const Container = styled.div`
  width: 637px;
  height: 932px;
  margin: 157px auto auto;
  position: relative;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  transform: rotate(90deg);
`;
