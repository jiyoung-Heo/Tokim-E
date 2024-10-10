import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'; // Redux에서 사용자 정보 가져오기
import { RootState } from '../redux/store'; // RootState 가져오기
import backIcon from '../assets/images/icon/left-actionable.png';
import beforeStoryIcon from '../assets/images/icon/beforestory.png';
import newsIcon from '../assets/images/news.png';
import lawsIcon from '../assets/images/icon/law.png';
import elasticNewsAxios from '../api/elasticNewsAxios';
import elasticLawsAxios from '../api/elasticLawsAxios';
import PrecedentDetailModal from '../components/modals/PrecedentDetailModal'; // 법령 상세 정보를 보여줄 모달 컴포넌트
import StoryListModal from '../components/modals/PreviousStoryModal'; // 법령 상세 정보를 보여줄 모달 컴포넌트
import { storyAxios } from '../api/storyAxios'; // storyAxios 추가

// 반응형 조정
const Container = styled.div`
  width: 100%;
  background: #f3f7fb;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  margin: 0 0 3vh 0;
  font-size: 25px;
  font-weight: bold;
  font-family: 'KoddiUD OnGothic';
  color: #333333;
  display: flex;
  justify-content: left;
`;

const BackIcon = styled.img`
  margin-right: 2vw;
  cursor: pointer;
`;

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 3vh;
`;

const StoryContainer = styled.div`
  width: 100%;
  height: 35vh;
  background: #ffffff;
  border-radius: 10px;
  padding: 2vh 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  white-space: pre-wrap;
  font-size: 4vw;
  color: #333333;
`;

const PreviousStoryButton = styled.button`
  background: none;
  border: none;
  display: flex;
  align-items: center;
  color: #333333;
  font-size: 4vw;
  cursor: pointer;
`;

const BeforeStoryIcon = styled.img`
  width: 4vw;
  height: 4vw;
  margin-right: 5px;
`;

const NewsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 2vh 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
`;

const LawsContainer = styled.div`
  width: 100%;
  background: #ffffff;
  border-radius: 10px;
  padding: 2vh 5%;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 5vh;
`;

const NewsHeader = styled.div`
  display: flex;
  align-items: center;
  margin-top: -4vh;
  margin-bottom: -3vh;
`;

const NewsIcon = styled.img`
  width: 5vw;
  height: 5vw;
  margin-right: 5px;
`;

const LawsIcon = styled.img`
  width: 5vw;
  height: 5vw;
  margin-right: 5px;
`;

const NewsTitle = styled.a`
  font-size: 4vw;
  font-weight: bold;
  color: #333333;
  margin: 0;
  text-decoration: none;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

const NewsContent = styled.a`
  font-size: 3.5vw;
  font-weight: regular;
  color: #333333;
  text-decoration: none;
  margin-bottom: 10px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;

  &:hover {
    text-decoration: underline;
  }
`;

const NewsCompany = styled.p`
  font-size: 3.5vw;
  color: rgba(51, 51, 51, 0.6);
  margin-bottom: 10px;
`;

const NewsItemDivider = styled.div`
  width: 100%;
  height: 1px;
  background-color: rgba(51, 51, 51, 0.2);
  margin: 10px 0;
`;

const StoryTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 800;
  font-size: 5vw;
  color: #333333;
`;

const UserName = styled.span`
  font-family: 'Pretendard Variable';
  font-weight: bold;
`;

const CaseTitle = styled.h3`
  font-family: 'Pretendard Variable';
  font-weight: 600;
  font-size: 5vw;
  margin-top: -1vh;
  margin-bottom: -1vh;
  color: #333333;
  position: relative;
  text-align: center;
`;

const Divider = styled.hr`
  width: 100%;
  border: none;
  border-top: 1px solid rgba(51, 51, 51, 0.2);
`;

const LawDivider = styled.hr`
  width: 100%;
  border: none;
  border-top: 3px solid rgba(51, 51, 51, 0.2);
`;

const LawInfoContainer = styled.div`
  width: 100%;
  height: 23vh;
  background-color: #ffffff;
  border-radius: 10px;
  padding: 3vw 5%;
  position: relative;
  margin-bottom: 3vh;
  cursor: pointer;
  border: 2px solid rgba(121, 121, 130, 0.2);
`;

const LawHeader = styled.div`
  display: flex;
  align-items: center;
`;

const LawIcon = styled.img`
  width: 8vw;
  height: 8vw;
  margin-right: 5vw;
`;

const LawTitle = styled.div`
  font-size: 4vw;
  font-weight: bold;
  color: #333333;
  word-break: keep-all;
  white-space: normal;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const LawUse = styled.div`
  font-size: 4vw;
  font-weight: 800;
  color: rgba(51, 51, 51, 0.8);
  margin-top: 1vw;
`;

const LawNumber = styled.div`
  font-size: 4vw;
  font-weight: bold;
  color: #00c99c;
  position: absolute;
  right: 5%;
  bottom: 5vh;
`;

const LawType = styled.div`
  font-size: 4vw;
  font-weight: bold;
  color: #333333;
  text-align: center;
  position: absolute;
  bottom: 2vh;
  width: 100%;
`;

const StoryAnalysisResult = () => {
  const [newsData, setNewsData] = useState<any[]>([]);
  const [lawsData, setLawsData] = useState<any[]>([]);
  const navigate = useNavigate();
  const userInfo = useSelector((state: RootState) => state.user); // Redux에서 사용자 이름 가져오기
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null); // 선택된 법령 정보 상태
  const [story, setStory] = useState<string>(''); // 최신 스토리 저장할 상태
  // 모달을 위한 상태 추가
  const [isPreviousStoryModalOpen, setIsPreviousStoryModalOpen] =
    useState(false); // 이전 사연 모달 상태

  const [storyList, setStoryList] = useState<string[]>([]); // 전체 스토리 리스트
  // 모달 열기 및 닫기 핸들러
  const openPreviousStoryModal = () => {
    setIsPreviousStoryModalOpen(true);
  };

  const closePreviousStoryModal = () => {
    setIsPreviousStoryModalOpen(false);
  };
  const goBack = () => {
    // navigate(-1);
    navigate('/story-analysis');
  };

  useEffect(() => {
    const fetchData = async () => {
      // 스토리 받아오기
      const storyData = await storyAxios(); // 최신 스토리 불러오기
      // console.log('스토리 데이터:', storyData); // 데이터를 콘솔에 출력해 확인

      if (storyData && storyData.length > 0) {
        const latestStory =
          storyData[storyData.length - 1]?.story ||
          '스토리를 불러올 수 없습니다.'; // 가장 최신 스토리 가져오기
        setStory(latestStory); // 가장 최신 스토리 저장
        setStoryList(storyData.map((s: any) => s.story)); // 전체 스토리 리스트 저장

        // 스토리를 기반으로 뉴스 및 판례 데이터 불러오기
        const fetchedNewsData = await elasticNewsAxios(latestStory); // 변수명 수정
        if (fetchedNewsData) {
          const originalNewsData = fetchedNewsData.map(
            // eslint-disable-next-line no-underscore-dangle
            (item: any) => item._source.original_data,
          );
          setNewsData(originalNewsData);
        }

        const fetchedLawsData = await elasticLawsAxios(latestStory); // 변수명 수정
        if (fetchedLawsData) {
          const originalLawsData = fetchedLawsData.map(
            // eslint-disable-next-line no-underscore-dangle
            (item: any) => item._source.original_data,
          );
          setLawsData(originalLawsData);
        }
      } else {
        setStory('스토리를 불러올 수 없습니다.'); // 스토리 데이터가 없을 경우 기본 메시지 설정
      }
    };

    fetchData(); // 데이터 fetching 함수 실행
  }, []); // story를 디펜던시로 설정하지 않음, 스토리 기반 데이터는 스토리 받아온 후에 처리됨

  const handleOpenModal = (item: any) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <Container>
        <HeaderContainer>
          <Title>
            <BackIcon src={backIcon} alt="뒤로 가기 아이콘" onClick={goBack} />
            사연 분석 결과
          </Title>
          <PreviousStoryButton onClick={openPreviousStoryModal}>
            <BeforeStoryIcon src={beforeStoryIcon} alt="이전 사연 아이콘" />
            이전 사연
          </PreviousStoryButton>
        </HeaderContainer>

        <StoryTitle>
          <UserName>{userInfo.name}</UserName>님의 최근 사연
        </StoryTitle>

        <StoryContainer>
          <CaseTitle>사연</CaseTitle>
          <Divider />
          <p>{story}</p>
        </StoryContainer>

        <StoryTitle>사연 분석 결과</StoryTitle>

        <NewsContainer>
          <NewsHeader>
            <NewsIcon src={newsIcon} alt="뉴스 아이콘" />
            <h4>분석된 유사 뉴스</h4>
          </NewsHeader>
          {newsData.length > 0 ? (
            newsData.map((item, index) => (
              <div key={index}>
                <NewsTitle
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.title || '제목 없음'}
                </NewsTitle>
                <NewsContent
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {item?.article || '내용 없음'}
                </NewsContent>
                <NewsCompany>
                  by {item?.company || '알 수 없는 회사'}
                </NewsCompany>
                {index < newsData.length - 1 && <NewsItemDivider />}
              </div>
            ))
          ) : (
            <p>유사한 뉴스가 없습니다.</p>
          )}
        </NewsContainer>
        <LawsContainer>
          <NewsHeader>
            <LawsIcon src={lawsIcon} alt="판례 아이콘" />
            <h4>분석된 유사 판례</h4>
          </NewsHeader>
          <LawDivider />
          {lawsData.length > 0 ? (
            lawsData.map((item, index) => (
              <LawInfoContainer
                key={index}
                onClick={() => handleOpenModal(item)}
              >
                <LawHeader>
                  <LawIcon src={lawsIcon} />
                  <LawTitle>{item.사건명}</LawTitle>
                </LawHeader>
                <LawUse>{item.사건종류명}</LawUse>
                <LawNumber>{item.사건번호}</LawNumber>
                <LawType>{item.판결유형}</LawType>
              </LawInfoContainer>
            ))
          ) : (
            <p>유사한 판례가 없습니다.</p>
          )}
        </LawsContainer>
      </Container>
      {selectedItem && (
        <PrecedentDetailModal
          isOpen={isModalOpen}
          onRequestClose={handleCloseModal}
          item={selectedItem}
        />
      )}
      {isPreviousStoryModalOpen && (
        <StoryListModal
          isOpen={isPreviousStoryModalOpen}
          stories={storyList}
          onClose={closePreviousStoryModal}
          onSelectStory={async (selectedStory) => {
            setStory(selectedStory); // 선택한 사연으로 업데이트

            // 선택한 사연을 기반으로 뉴스 및 판례 다시 불러오기
            const fetchedNewsData = await elasticNewsAxios(selectedStory);
            if (fetchedNewsData) {
              const originalNewsData = fetchedNewsData.map(
                // eslint-disable-next-line no-underscore-dangle
                (item: any) => item._source.original_data,
              );
              setNewsData(originalNewsData);
            }

            const fetchedLawsData = await elasticLawsAxios(selectedStory);
            if (fetchedLawsData) {
              const originalLawsData = fetchedLawsData.map(
                // eslint-disable-next-line no-underscore-dangle
                (item: any) => item._source.original_data,
              );
              setLawsData(originalLawsData);
            }

            closePreviousStoryModal(); // 모달 닫기
          }}
        />
      )}
    </div>
  );
};

export default StoryAnalysisResult;
