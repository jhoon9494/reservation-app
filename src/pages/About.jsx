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
        <SubTitle>공지사항</SubTitle>
        <Notice>
          로렘 입숨(lorem ipsum; 줄여서 립숨, lipsum)은 출판이나 그래픽 디자인
          분야에서 폰트, 타이포그래피, 레이아웃 같은 그래픽 요소나 시각적 연출을
          보여줄 때 사용하는 표준 채우기 텍스트로, 최종 결과물에 들어가는
          실제적인 문장 내용이 채워지기 전에 시각 디자인 프로젝트 모형의 채움
          글로도 이용된다. 이런 용도로 사용할 때 로렘 입숨을
          그리킹(greeking)이라고도 부르며, 때로 로렘 입숨은 공간만 차지하는
          무언가를 지칭하는 용어로도 사용된다. 로렘 입숨은 전통 라틴어와 닮은 점
          때문에 종종 호기심을 유발하기도 하지만 그 이상의 의미를 담지는 않는다.
          문서에서 텍스트가 보이면 사람들은 전체적인 프레젠테이션보다는 텍스트에
          담긴 뜻에 집중하는 경향이 있어서 출판사들은 서체나 디자인을 보일 때는
          프레젠테이션 자체에 초점을 맞추기 위해 로렘 입숨을 사용한다. 로렘
          입숨은 영어에서 사용하는 문자들의 전형적인 분포에 근접하다고도 하는데,
          이 점 때문에 프레젠테이션으로 초점을 이동하는 데에도 도움을 준다.
        </Notice>
        <SubTitle>오시는길</SubTitle>
        <GoogleMapWrap>
          {isLoaded && (
            <GoogleMap
              mapContainerStyle={{ width: '800px', height: '800px' }}
              center={center}
              zoom={18}
            />
          )}
        </GoogleMapWrap>
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

const Notice = styled.p`
  padding-left: 2rem;
`;

const GoogleMapWrap = styled.div`
  padding-left: 2rem;
`;
