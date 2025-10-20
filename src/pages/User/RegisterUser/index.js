import { Button, Card, Col, Form, Input, Row, Spin, message } from "antd";
import { generateToken } from "../../../helpers/generateToken";
import * as company from "../../../services/companyService";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { createInforUser } from "../../../services/userService";
import {
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
  LockOutlined,
} from "@ant-design/icons";
import "../Login/login.scss";

function RegisterUser() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [xoay, setXoay] = useState(false);

  const onFinish = async (values) => {
    setXoay(true);
    // console.log(values);
    values.token = generateToken();
    const newValue = {
      ...values,
      role: "user",
    };
    // console.log(newValue);

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

      if (result) {
        if (result) {
          setXoay(false);
          message.success("Đăng ký thành công!");
          navigate("/login");
        } else {
          setXoay(false);
          message.error("Đăng ký không thành công, vui lòng thử lại!");
        }
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
                  label="Họ tên"
                  name="nameUser"
                  rules={[
                    {
                      required: true,
                      message: "Vui lòng nhập họ tên",
                    },
                  ]}
                >
                  <Input
                    size="large"
                    prefix={<UserOutlined />}
                    placeholder="Nguyễn Văn A"
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
                    placeholder="you@example.com"
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
export default RegisterUser;
