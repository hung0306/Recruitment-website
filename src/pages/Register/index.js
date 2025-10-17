import { Button, Card, Col, Form, Input, Row, Spin, message } from "antd";
import { generateToken } from "../../helpers/generateToken";
import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "../Login/login.scss";

function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [xoay, setXoay] = useState(false);

  const onFinish = async (values) => {
    setXoay(true);
    // console.log(values);
    values.token = generateToken();
    const newValue = {
      ...values,
      role: "admin",
    };

    const checkExistEmail = await company.checkExist("email", newValue.email);
    const checkExistPhone = await company.checkExist("phone", newValue.phone);
    if (checkExistEmail.length > 0) {
      setXoay(false);
      messageApi.open({
        type: "error",
        content: "Email đã tồn tại",
      });
    } else if (checkExistPhone.length > 0) {
      setXoay(false);
      messageApi.open({
        type: "error",
        content: "Số điện thoại đã tồn tại",
      });
    } else {
      const result = await company.creatCompany(newValue);
      const valueCompany = {
        ...newValue,
        id: result.id,
      };
      const result1 = await company.creatCompany1(valueCompany);
      // console.log(result1);

      if (result) {
        setXoay(false);
        message.success("Đăng ký thành công!");
        navigate("/login");
      }
    }
  };

  return (
    <>
      {contextHolder}
      <Row justify="center" className="auth-wrap">
        <Col xs={24} sm={20} md={14} lg={10}>
          <Spin spinning={xoay} tip="vui lòng chờ...">
            <Card className="auth-card" title="Đăng ký tài khoản">
              <Form onFinish={onFinish} layout="vertical">
                <Form.Item
                  label="Tên công ty"
                  name="companyName"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập tên công ty!",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Công ty ABC"
                  />
                </Form.Item>

                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập đúng email!",
                      type: "email",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<MailOutlined />}
                    placeholder="you@company.com"
                  />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phone">
                  <Input
                    size="large"
                    prefix={<PhoneOutlined />}
                    placeholder="09xx xxx xxx"
                  />
                </Form.Item>

                <Form.Item
                  label="Password"
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập password!",
                    },
                  ]}
                >
                  <Input.Password
                    size="large"
                    prefix={<LockOutlined />}
                    placeholder="••••••••"
                  />
                </Form.Item>

                <Form.Item className="auth-actions">
                  <Button block size="large" type="primary" htmlType="submit">
                    Đăng ký
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
export default Register;
