import { Button, Card, Col, Form, Input, Row, Spin, message } from 'antd';
import { generateToken } from '../../helpers/generateToken';
import * as company from "../../services/companyService";
import { useNavigate } from "react-router-dom";
import { useState } from 'react';


function Register() {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [xoay, setXoay] = useState(false);


  const onFinish = async (values) => {
    setXoay(true);
    // console.log(values);
    values.token = generateToken();
    const newValue={
      ...values,
      role: "admin"

  };
  
    const checkExistEmail = await company.checkExist("email", newValue.email);
    const checkExistPhone = await company.checkExist("phone", newValue.phone)
    if (checkExistEmail.length > 0) {
      setXoay(false);
      messageApi.open({
        type: 'error',
        content: 'Email đã tồn tại',
      });

    } else if (checkExistPhone.length > 0) {
      setXoay(false);
      messageApi.open({
        type: 'error',
        content: 'Số điện thoại đã tồn tại',
      });
    } else {

      const result = await company.creatCompany(newValue);
      const valueCompany = {
        ...newValue,
        id : result.id
      }
      const result1 = await company.creatCompany1(valueCompany);
      console.log(result1);
      
      if (result) {
        setXoay(false)
        alert("Đăng ký thành công!")
        navigate("/login")
      }
    }

  }

  return (
    <>
      {contextHolder}
      <Row justify="center">
        <Col span={12}>
          <Spin spinning={xoay} tip="vui lòng chờ...">
            <Card title="Đăng ký tài khoản">
              <Form onFinish={onFinish} layout='vertical'>
                <Form.Item label="Tên công ty" name="companyName" rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập tên công ty!',
                  },
                ]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Email" name="email" rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập đúng email!',
                    type: 'email',
                  },
                ]}>
                  <Input />
                </Form.Item>

                <Form.Item label="Số điện thoại" name="phone">
                  <Input />
                </Form.Item>

                <Form.Item label="Password" name="password" rules={[
                  {
                    required: true,
                    message: 'Vui lòng nhập password!',
                  },
                ]}>
                  <Input.Password />
                </Form.Item>

                <Form.Item>
                  <Button type="primary" htmlType='submit'>Đăng ký</Button>
                </Form.Item>

              </Form>
            </Card>
          </Spin>

        </Col>
      </Row>
    </>
  )
}
export default Register;