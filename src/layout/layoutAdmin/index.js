import { Button, Layout } from "antd";
import { MenuUnfoldOutlined } from "@ant-design/icons";
import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import MenuSider from "../../Components/MenuSider/index";
import logo from "../../image/logo.png";
import logofold from "../../image/logo-fold.png";
import "./layoutAdmin.scss";

const { Sider, Content } = Layout;
function LayoutAdmin() {
  const [collapse, setCollapse] = useState(false);
  return (
    <>
      <>
        <Layout>
          <header className="headerr">
            <div
              className={
                collapse
                  ? "headerr__logo headerr__logo--collapsed"
                  : "headerr__logo"
              }
            >
              <img src={collapse ? logofold : logo} alt="logo" />
            </div>
            <div className="headerr__nav">
              <div className="headerr__nav-left">
                <div
                  className="headerr__collapse"
                  onClick={() => setCollapse(!collapse)}
                >
                  <MenuUnfoldOutlined />
                </div>
              </div>
              <div className="headerr__nav-right">
                <Link className="mr-20" to="/">
                  <Button>Trang chủ</Button>
                </Link>
                <Link to="/logout">
                  <Button>Đăng xuất</Button>
                </Link>
              </div>
            </div>
          </header>

          <Layout>
            <Sider theme="light" collapsed={collapse}>
              <MenuSider />
            </Sider>

            <Content className="content">
              <Outlet />
            </Content>
          </Layout>
        </Layout>
      </>
    </>
  );
}
export default LayoutAdmin;
