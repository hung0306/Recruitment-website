import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import "./login.scss";
import { useDispatch, useSelector } from "react-redux";
import { Button, Card, Col, Form, Input, Row, Spin } from "antd";
import { setCookie } from "../../helpers/cookies";
import { checkLogin } from "../../actions/login";
import { useState } from "react";
import { createInforUser } from "../../services/userService";
import { MailOutlined, LockOutlined } from "@ant-design/icons";

function Login() {
  const navigate = useNavigate();
  const [xoay, setXoay] = useState(false);
  const dispatch = useDispatch();
  const islogin = useSelector((state) => state.loginReducer);

  const onFinish = async (values) => {
    setXoay(true);
    const data = await company.login(values.email, values.password);
    console.log(data);

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
        navigate("/admin");
      } else if (userRole === "user") {
        setCookie("id", data[0].id, time);
        setCookie("nameUser", data[0].nameUser, time);
        setCookie("email", data[0].email, time);
        setCookie("token", data[0].token, time);
        setCookie("role", userRole, time);
        navigate("/");
        // const result = createInforUser()
      } else {
        console.error("Unrecognized user role:", userRole);
        alert("Invalid user role. Please contact support.");
      }
    } else {
      setXoay(false);
      alert("Sai tài khoản hoặc mật khẩu");
    }
  };

  return (
    <>
      <Row justify="center">
        <Col span={12}>
          <Spin spinning={xoay} tip="vui lòng chờ...">
            <Card title="Đăng nhập">
              <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                  label={
                    <div>
                      <MailOutlined />
                      <span style={{ marginLeft: "20px" }}>Email</span>
                    </div>
                  }
                  name="email"
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  label={
                    <div>
                      <LockOutlined />
                      <span style={{ marginLeft: "20px" }}>Password</span>
                    </div>
                  }
                  name="password"
                >
                  <Input.Password />
                </Form.Item>{" "}
                 
                <Form.Item>
                  <Button htmlType="submit" type="primary">
                    {" "}
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
