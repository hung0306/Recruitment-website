import * as company from "../../../services/companyService";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Input, Row, Spin, message } from "antd";
import { setCookie } from "../../../helpers/cookies";
import { checkLogin } from "../../../actions/login";
import { useState } from "react";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  const navigate = useNavigate();
  const [xoay, setXoay] = useState(false);
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.loginReducer);

  const onFinish = async (values) => {
    setXoay(true);
    const data = await company.login(values.email, values.password);
    // console.log(data);

    if (data.length > 0) {
      setXoay(false);
      const time = 1;

      const userRole = data[0].role;

      dispatch(checkLogin(!islogin));

      if (userRole === "admin") {
        setCookie("id", data[0].id, time);
        setCookie("email", data[0].email, time);
        setCookie("companyName", data[0].companyName, time);

        setCookie("email", data[0].email, time);
        setCookie("token", data[0].token, time);
        setCookie("role", userRole, time);
        message.success("Đăng nhập thành công!");
        navigate("/admin");
      } else if (userRole === "user") {
        setCookie("id", data[0].id, time);
        setCookie("nameUser", data[0].nameUser, time);
        setCookie("email", data[0].email, time);
        setCookie("token", data[0].token, time);
        setCookie("role", userRole, time);
        message.success("Đăng nhập thành công!");
        navigate("/");
        // const result = createInforUser()
      } else {
        console.error("Unrecognized user role:", userRole);
        alert("Invalid user role. Please contact support.");
      }
    } else {
      setXoay(false);
      message.error("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <>
      <Row justify="center" className="auth-wrap">
        <Col xs={24} sm={18} md={12} lg={8}>
          <Spin spinning={xoay} tip="vui lòng chờ...">
            <Card className="auth-card" title="Đăng nhập">
              <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    { required: true, message: "Vui lòng nhập Email" },
                    { type: "email", message: "Email không hợp lệ" },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="you@example.com"
                  />
                </Form.Item>

                <Form.Item
                  label="Mật khẩu"
                  name="password"
                  rules={[
                    { required: true, message: "Vui lòng nhập mật khẩu" },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                  />
                </Form.Item>

                <Form.Item className="auth-actions">
                  <Button block size="large" htmlType="submit" type="primary">
                    Đăng nhập
                  </Button>
                </Form.Item>
              </Form>
            </Card>
          </Spin>
        </Col>
      </Row>
    </>
  );
}

export default Login;
