import { useSelector } from "react-redux";
import { getCookie } from "../../helpers/cookies";
import "../layout.scss";

import { Button, Col, Layout, Row } from 'antd';
import { Link, Outlet } from "react-router-dom";
import MenuIn4User from "../../Components/MenuIn4User";
import Footer1 from "../../Components/Footer/footer";
// import logoTimviec from "../../image/logotimviec.png"

const { Header, Footer, Content } = Layout;

function LayoutDefault() {
    const token = getCookie("token");
    const user = getCookie("fullname");
    const role = getCookie("role");
    const islogin = useSelector(state => state.loginReducer);
    console.log(islogin);

    return (
        <>
            <Layout >
                <Header className="header">
                    <Row justify="space-between">
                        <Col className="header__logo" span={16}>
                            <Link className="logo" to="/"><img style={{ height: "64px" }} src="https://media.istockphoto.com/id/1345681613/vi/vec-to/creative-people-logo-vector-thi%E1%BA%BFt-k%E1%BA%BF-c%C3%B3-th%E1%BB%83-thay-%C4%91%E1%BB%95i-eps-10.jpg?s=612x612&w=0&k=20&c=Tfj-b_0b8crwl6ewj3DVUHsNWjEKSchD3n3pknIOH4s=" /></Link>
                        </Col>
                        <Col span={8}>
                            <Row gutter={[10]}>
                                {token ? (
                                    <>
                                        {role === "admin" && (
                                            <Col>
                                                <Link to="admin">
                                                    <Button type="primary">Quản lý</Button>
                                                </Link>
                                            </Col>
                                        )}
                                        {role === "user" && (
                                            <Col style={{ zIndex: "999" }} span={16}>


                                                <MenuIn4User />

                                            </Col>
                                        )}
                                        <Col span={8}>
                                            <Link to="/logout">
                                                <Button>Đăng xuất</Button>
                                            </Link>
                                        </Col>
                                    </>
                                ) : (
                                    <>
                                        <Col span={8}>
                                            <Link to="/login">
                                                <Button>Đăng nhập</Button>
                                            </Link>
                                        </Col>
                                        <Col span={8}>
                                            <Link to="/registerUser">
                                                <Button>Đăng ký</Button>
                                            </Link>
                                        </Col>
                                        <Col span={8}>
                                            <Link to="/Register">
                                                <Button type="primary">Đăng ký cho doanh nghiệp</Button>
                                            </Link>
                                        </Col>
                                    </>
                                )}
                            </Row>
                        </Col>
                    </Row>
                </Header>

                <Content className="content">
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
