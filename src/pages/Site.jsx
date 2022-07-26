import styled from 'styled-components';
import SiteRooms from '../components/SiteRooms';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Site = () => {
  return (
    <Container>
      <Navbar />
      <MapContainer>
        <MapImg src="/images/campMapImg.png" alt="mapImg" />
        <SiteRooms />
      </MapContainer>
      <Footer />
    </Container>
  );
};

export default Site;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MapContainer = styled.div`
  width: 70rem;
  height: 50rem;
  margin: 157px auto;
  position: relative;
  flex-grow: 1;
`;

const MapImg = styled.img`
  width: 100%;
  height: 100%;
  opacity: 0.7;
`;
