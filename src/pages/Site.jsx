import styled from 'styled-components';
import SiteRooms from '../components/SiteRooms';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
const Site = () => {
  return (
    <>
      <Navbar />
      <Container>
        <MapImg src="/images/campMapImg.png" alt="mapImg" />
        <SiteRooms />
      </Container>
      <Footer />
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
