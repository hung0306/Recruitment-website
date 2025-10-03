import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookies";
import "../layout.scss";

import { Button, Col, Layout, Row } from "antd";
import { Link, Outlet } from "react-router-dom";
import MenuIn4User from "../../Components/MenuIn4User";
import Footer1 from "../../Components/Footer/footer";
// import logoTimviec from "../../image/logotimviec.png"

const { Header, Footer, Content } = Layout;

function LayoutDefault() {
  const token = getCookie("token");
  const user = getCookie("fullname");
  const role = getCookie("role");
  const islogin = useSelector((state) => state.loginReducer);
  console.log(islogin);

  return (
    <>
      <Layout className="site-layout">
        <Header className="site-header" role="banner">
          <div
            className="site-header__container"
            role="navigation"
            aria-label="Header"
          >
            <div className="site-header__logo">
              <Link className="site-logo" to="/" aria-label="Trang chủ">
                <img
                  style={{ height: "40px" }}
                  alt="Logo"
                  loading="eager"
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTABSta4ztO2Z73YCEvZDFgCPesndhqt-seBg&s"
                />
              </Link>
            </div>
            <div className="site-header__actions">
              {token ? (
                <>
                  {role === "admin" && (
                    <Link to="admin" aria-label="Đi tới trang quản lý">
                      <Button size="large" type="primary">
                        Quản lý
                      </Button>
                    </Link>
                  )}
                  {role === "user" && (
                    <div className="site-header__menu">
                      <MenuIn4User />
                    </div>
                  )}
                  <Link to="/logout" aria-label="Đăng xuất">
                    <Button size="large">Đăng xuất</Button>
                  </Link>
                </>
              ) : (
                <>
                  <Link to="/login" aria-label="Đăng nhập">
                    <Button size="large">Đăng nhập</Button>
                  </Link>
                  <Link to="/registerUser" aria-label="Đăng ký ứng viên">
                    <Button size="large">Đăng ký</Button>
                  </Link>
                  <Link to="/Register" aria-label="Đăng ký cho doanh nghiệp">
                    <Button size="large" type="primary">
                      Đăng ký cho doanh nghiệp
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </Header>

        <Content className="site-content">
          <Outlet />
        </Content>
        <div>
          <Footer1 />
        </div>
      </Layout>
    </>
  );
}

export default LayoutDefault;
