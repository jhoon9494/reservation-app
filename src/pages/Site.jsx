import styled from 'styled-components';
import SiteRooms from '../components/SiteRooms';
const Site = () => {
  return (
    <Container>
      <MapContainer>
        <MapImg src="/images/campMapImg.png" alt="mapImg" />
        <SiteRooms />
      </MapContainer>
    </Container>
  );
};

export default Site;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const MapContainer = styled.div`
  width: 70rem;
  height: 50rem;
  margin: 80px auto;
  position: relative;
  flex-grow: 1;

  @media (max-width: 768px) {
    width: 560px;
    height: 400px;
    margin: 40px auto;
  }
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;
