import styled from 'styled-components';
import RoomsButton from '../components/RoomsButton';
import Navbar from '../components/Navbar';

const Site = () => {
  return (
    <>
      <Navbar />
      <Container>
        <MapImg src="/campMapImg.png" alt="mapImg" />
        <RoomsButton />
      </Container>
    </>
  );
};

export default Site;

const Container = styled.div`
  width: 932px;
  height: 637px;
  margin: 157px auto auto;
  position: relative;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;
