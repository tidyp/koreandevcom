import { Link, Outlet } from "react-router-dom";
import Group from "./Group";
import Button from "../../components/Button";

const index = () => {
  const gl = [
    {
      postid: 1,
      title: "프론트엔드 스터디 그룹 모집",
      content: "프론트엔드 스터디 그룹을 모집합니다. 함께 공부하며 성장해봐요!",
      curUser: 1,
      maxUser: 3,
      cate: "프론트엔드",
      tools: "기타등",
    },
    {
      postid: 2,
      title: "백엔드 스터디 그룹 모집",
      content:
        "백엔드 개발에 관심 있는 분들을 모집합니다. 꾸준한 학습과 실습을 통해 전문가가 되어보아요!",
      curUser: 10,
      maxUser: 100,
      cate: "백엔드",
      tools: "기타등",
    },
    {
      postid: 3,
      title: "디자이너 스터디 그룹 모집",
      content:
        "디자인에 관심 있는 분들을 모집합니다. 함께 아이디어를 나누며 창의적인 작업을 해봐요!",
      curUser: 2,
      maxUser: 4,
      cate: "디자이너",
      tools: "기타등",
    },
    {
      postid: 4,
      title: "프론트엔드 스터디 그룹 모집",
      content: "프론트엔드 스터디 그룹을 모집합니다. 함께 공부하며 성장해봐요!",
      curUser: 1,
      maxUser: 3,
      cate: "프론트엔드",
      tools: "기타등",
    },
    {
      postid: 5,
      title: "백엔드 스터디 그룹 모집",
      content:
        "백엔드 개발에 관심 있는 분들을 모집합니다. 꾸준한 학습과 실습을 통해 전문가가 되어보아요!",
      curUser: 10,
      maxUser: 100,
      cate: "백엔드",
      tools: "기타등",
    },
    {
      postid: 6,
      title: "디자이너 스터디 그룹 모집",
      content:
        "디자인에 관심 있는 분들을 모집합니다. 함께 아이디어를 나누며 창의적인 작업을 해봐요!",
      curUser: 2,
      maxUser: 4,
      cate: "디자이너",
      tools: "기타등",
    },
    {
      postid: 7,
      title: "프론트엔드 스터디 그룹 모집",
      content: "프론트엔드 스터디 그룹을 모집합니다. 함께 공부하며 성장해봐요!",
      curUser: 1,
      maxUser: 3,
      cate: "프론트엔드",
      tools: "기타등",
    },
    {
      postid: 8,
      title: "백엔드 스터디 그룹 모집",
      content:
        "백엔드 개발에 관심 있는 분들을 모집합니다. 꾸준한 학습과 실습을 통해 전문가가 되어보아요!",
      curUser: 10,
      maxUser: 100,
      cate: "백엔드",
      tools: "기타등",
    },
    {
      postid: 9,
      title: "디자이너 스터디 그룹 모집",
      content:
        "디자인에 관심 있는 분들을 모집합니다. 함께 아이디어를 나누며 창의적인 작업을 해봐요!",
      curUser: 2,
      maxUser: 4,
      cate: "디자이너",
      tools: "기타등",
    },
  ];

  return (
    <>
      <Outlet />
      <div className="mt-16 flex w-full flex-col items-center justify-center gap-2 ">
        <div className="flex w-[80rem] items-center justify-center gap-8 px-4 text-3xl font-bold">
          <h2>GROUP</h2>
        </div>
        <div className="my- flex w-[80rem] items-center justify-between px-4">
          <ul className="flex items-start gap-2 text-left text-xl">
            <li>전체</li>
            <li>프로젝트</li>
            <li>자격증</li>
            <li>코딩테스트</li>
          </ul>
          <Link to="write">
            <Button color="bg-black" px="8">
              글 작성
            </Button>
          </Link>
        </div>
        <div className="flex w-[80rem] flex-col items-center justify-center gap-4">
          <div className="box-border grid w-full grid-cols-4  flex-wrap items-start">
            {gl.map((el, index) => (
              <Group key={index} {...el} />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default index;
