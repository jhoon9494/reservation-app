import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import styled from 'styled-components';

const center = {
  lat: 35.8324,
  lng: 128.7091,
};

const About = () => {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
  });

  return (
    <>
      <Body>
        <SubTitle>Welcome</SubTitle>
        <Notice>
          <p>
            딩굴딩굴 굴러다니며 놀 수 있는 딩굴딩굴 캠핑장에 오신것을
            환영합니다.
          </p>
          <p>
            저희 딩굴딩굴 캠핑장은 부산광역시 XX구 XXX로 XX에 위치 하고 있어서
            도심과 가까워 접근성이 좋고 현대인들의 지친 일상을 힐링 할 수 있는
            곳입니다.
          </p>
          <br />
          <p>
            넓고 넉넉한 오토캠핑 사이트와 더불어 몸만 준비해오면 되는 글램핑
            또한 준비되어 있습니다.
          </p>
          <p>원하시는 기간과 캠핑 장소를 한 눈에 확인 해보세요.</p>
          <p>
            딩굴딩굴 캠핑장에서 일상의 피로와 스트레스를 자연과 함께
            날려버리시길 바랍니다.
          </p>
          <br />
          <p>딩굴딩굴 캠핑장</p>
          <p>대표 전화 : 010-1234-5678</p>
        </Notice>
        <SubTitle>오시는길</SubTitle>
        <GoogleMapWrap>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '1250px', height: '600px' }}
              center={center}
              zoom={18}
            />
          )}
        </GoogleMapWrap>
        <br />
        <Transportation>
          <img
            src="https://cdn.icon-icons.com/icons2/38/PNG/512/bustransport_bus_4984.png"
            width="25px"
          ></img>{' '}
          <TransportationDescription>
            724번, 349번, 937번 / 딩굴딩굴 캠핑장 앞 역
          </TransportationDescription>
        </Transportation>
      </Body>
    </>
  );
};

export default About;

const Body = styled.div`
  width: 1280px;
`;

const SubTitle = styled.h2`
  font-size: 2rem;
  font-weight: bold;
  margin: 4rem 0 2rem;
`;

const Notice = styled.div`
  padding-left: 2rem;
`;

const GoogleMapWrap = styled.div`
  padding-left: 2rem;
`;

const Transportation = styled.div`
  padding-left: 2rem;
  display: flex;
  align-items: center;
`;

const TransportationDescription = styled.span`
  margin-left: 20px;
`;
