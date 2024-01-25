import { Link, useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/utils";
import { useEffect, useRef, useState } from "react";
import cookie from "react-cookies";
import NewPost from "../../feature/NewPost";
import { deletePost } from "../../api/apiDevko";
import Tags from "../../components/Tags";

import { VscKebabVertical } from "react-icons/vsc";
import { GoEye, GoComment, GoHeart, GoHeartFill } from "react-icons/go";

import Modal from "../../components/Model";

const Post = ({ post }) => {
  const navigate = useNavigate();
  const [isClickLike, setIsClickLike] = useState(false);

  const useruuid = cookie.load("uuid");

  const data = formatDate(post.createdAt);

  function getRandomColor() {
    const letters = "0123456789ABCDEF";
    let color = "#";
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  const tagss =
    typeof post.tagName === "string"
      ? post.tagName.split(",").map((el, index) => {
          if (el.trim() === "javascript") {
            return (
              <span className="rounded-lg bg-[#F7DF1E] px-4 py-1" key={index}>
                #{el.trim()}
              </span>
            );
          } else if (el.trim() === "mysql") {
            return (
              <span
                className="rounded-lg bg-[#4479A1] px-4 py-1 text-white"
                key={index}
              >
                #{el.trim()}
              </span>
            );
          } else {
            return (
              <span
                className="rounded-lg px-4"
                key={index}
                style={{ backgroundColor: getRandomColor() }}
              >
                #{el.trim()}
              </span>
            );
          }
        })
      : "";

  console.log(tagss);

  const dropdownRef = useRef(null);

  const [isOpenEdit, setIsOpenEdit] = useState(false);

  const handleOpen = () => {
    setIsOpenEdit((prev) => !prev);
  };

  const handleClose = () => {
    setIsOpenEdit(false);
  };

  const fetchData = async (id, isLike) => {
    try {
      const res = await fetch(`http://localhost:3000/api/like/${post.postId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: id,
          isLiked: isLike,
        }),
      });

      if (res.ok) {
      } else {
        console.error("Failed to like post");
      }
    } catch (error) {
      console.error("Error while liking post", error);
    }

    navigate("/");
  };

  // 좋아요 클릭 이벤트
  const handleLikeClick = async () => {
    // 좋아요 상태 변경
    await setIsClickLike((prev) => !prev);
    await fetchData(useruuid, isClickLike);
  };

  const clickdeletePost = async () => {
    await deletePost(post.postId);
    await handleClose();
    navigate("/");
  };

  return (
    <>
      <div className="m-2 flex h-fit w-[62rem] flex-col items-start justify-start gap-5 rounded-[10px] bg-slate-50 p-8">
        <div className="flex w-full justify-between">
          <div className="flex items-center justify-center gap-2.5 self-stretch">
            <Link to={`/userinfo/${post.userId}`}>
              <img
                className="h-12 rounded-lg"
                src={post.profileImage}
                alt={post.profileImage}
              />
            </Link>

            <div className="flex h-14 shrink grow basis-0 flex-col items-start justify-center">
              <div className="text-2xl font-semibold text-black">
                {post.title}
              </div>
              <div className="flex items-center justify-end gap-2.5">
                <div className="text-sm font-semibold text-blue-700">
                  {post.userName}
                </div>
                <div className="text-sm font-semibold text-zinc-500">
                  {data}
                </div>
              </div>
            </div>
          </div>
          <div className="relative " ref={dropdownRef}>
            <VscKebabVertical
              onClick={handleOpen}
              className="relative cursor-pointer"
            />
            {/* 수정-삭제 모달 데이터전달 */}
            {isOpenEdit && (
              <Modal onClose={handleClose}>
                <span className="bf w-8 cursor-pointer">
                  <Link to={`/edit/${post.postId}`}>수정</Link>
                </span>
                <span
                  className="w-8 cursor-pointer"
                  onClick={() => clickdeletePost(post.postId)}
                >
                  삭제
                </span>
                <span className="w-8 cursor-pointer">
                  <Link>신고</Link>
                </span>
              </Modal>
            )}
          </div>
        </div>
        <Link to={`/${post.category}/detail/${post.postId}`}>
          <div className="self-stretch  text-base font-medium text-zinc-500">
            {post.content}
          </div>
        </Link>

        <div className="flex items-start justify-between gap-2.5 self-stretch pr-8">
          <div className="flex gap-2">
            {tagss}

            {/* <span className="rounded-lg bg-indigo-400 px-4">태그2</span>
            <span className="rounded-lg bg-violet-400 px-4">태그3</span> */}
          </div>
          <div className="flex items-center justify-center gap-4">
            <GoComment />
            <span>{post.commentCnt > 0 ? post.commentCnt : 0}</span>
            <GoEye />
            <span>{post.viewCnt}</span>
            {/* {console.log(post.likeUser)}
            {console.log(useruuid)} */}
            {post.likeUser === useruuid ? (
              <GoHeartFill
                className="scale-150 transform text-red-600 hover:scale-150"
                onClick={handleLikeClick}
              />
            ) : (
              <GoHeart className="hover:scale-150" onClick={handleLikeClick} />
            )}

            <span>{post.likeCnt}</span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;
