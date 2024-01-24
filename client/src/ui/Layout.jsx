import { Outlet } from "react-router-dom";

// import Header from "./Header";
import NaviBar from "./NaviBar";
import Banner from "../ui/Banner";
import PopTags from "../components/PopTags";
import TopWriters from "../components/TopWriters";
import ProfileBox from "../components/ProfileBox";
import { Link, useLocation } from "react-router-dom";

const Layout = () => {
  const { pathname } = useLocation();
  // const displaySidebar = pathname === "/userinfo";
  const conditions = pathname.startsWith("/userinfo");
  const eventcondition = pathname.startsWith("/event");
  const displaySidebar = conditions;
  return (
    <div className="flex h-lvh  flex-col bg-white">
      <div className="sticky top-0 z-50">
        <NaviBar />
      </div>
      {/* <div className="flex-grow"> */}
      <Banner />
      <div className="box-border flex justify-center">
        <div className="box-border flex w-[80rem] gap-4">
          <div className="flex flex-col gap-2">
            {displaySidebar && <ProfileBox />}
            {/* {eventcondition && (
              <Link to="write">
                <button className="flex h-12 w-full flex-col items-center justify-center rounded-2xl  bg-indigo-700 text-xl text-white">
                  <div className="flex items-center">
                    <div>게시글 작성</div>
                  </div>
                </button>
              </Link>
            )} */}
            {!displaySidebar && !eventcondition && (
              <Link to="write">
                <button className="flex h-12 w-full flex-col items-center justify-center rounded-2xl  bg-indigo-700 text-xl text-white">
                  <div className="flex items-center">
                    <div>게시글 작성</div>
                  </div>
                </button>
              </Link>
            )}
            {!displaySidebar && !eventcondition && <PopTags />}
            {!displaySidebar && !eventcondition && <TopWriters />}
          </div>
          <div className="flex w-full flex-col items-start text-center">
            <Outlet />
          </div>
        </div>
      </div>
      {/* </div> */}
    </div>
  );
};

export default Layout;
