import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Spin,
  message,
} from "antd";
import { editCompany, getDetailCompany } from "../../services/companyService";
const { TextArea } = Input;

function InforCompany() {
  const [xoay, setXoay] = useState(false);
  const [messageApi, contextHolder] = message.useMessage();
  const idCompany = getCookie("id");
  const [info, setInfo] = useState();
  const [isEdit, setIsEdit] = useState(false);
  const [form] = Form.useForm();

  const fetchApi = async () => {
    const response = await getDetailCompany(idCompany);
    if (response) {
      setInfo(response);
    }
  };

  useEffect(() => {
    fetchApi();
  }, []);
  console.log(info);

  const handleFinish = async (values) => {
    setXoay(true);
    const response = await editCompany(idCompany, values);
    if (response) {
      setTimeout(() => {
        if (response) {
          messageApi.open({
            type: "success",
            content: "Cập nhật công ty thành công",
            duration: 3,
          });
        } else {
          messageApi.open({
            type: "error",
            content: "Cập nhật công ty thất bại",
            duration: 3,
          });
        }
      }, 1000);

      setXoay(false);
      setIsEdit(false);
      // alert("ok")
      console.log(values);
    } else {
      alert("ko");
    }
  };

  const handleCancle = () => {
    setIsEdit(false);
    form.resetFields();
  };
  const handleEdit = () => {
    setIsEdit(true);
  };

  return (
    <>
      {contextHolder}
      {info && (
        <Spin spinning={xoay} tip="vui lòng chờ...">
          <Card
            title="Thông tin công ty"
            extra={
              !isEdit ? (
                <Button type="primary" onClick={handleEdit}>
                  Chỉnh sửa
                </Button>
              ) : (
                <Button onClick={handleCancle}>Hủy</Button>
              )
            }
          >
            <Form
              layout="vertical"
              onFinish={handleFinish}
              initialValues={info}
              form={form}
              disabled={!isEdit}
            >
              <Row gutter={20}>
                <Col span={6}>
                  <Form.Item label="Tên công ty" name="companyName">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Email" name="email">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Số điện thoại" name="phone">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item label="Địa chỉ" name="address">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Thời gian làm" name="workingTime">
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={8}>
                  <Form.Item label="Link ảnh" name="website">
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={8}>
                  <Form.Item label="Số lượng nhân sự" name="quantityPeople">
                    <InputNumber />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Mô tả ngắn" name="description">
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item label="Mô tả chi tiết" name="detail">
                    <TextArea rows={6} />
                  </Form.Item>
                </Col>

                {isEdit && (
                  <Col>
                    <Form.Item>
                      <Button
                        className="mr-10"
                        type="primary"
                        htmlType="submit"
                      >
                        Cập nhật
                      </Button>
                      <Button onClick={handleCancle}>Hủy</Button>
                    </Form.Item>
                  </Col>
                )}
              </Row>
            </Form>
          </Card>
        </Spin>
      )}
    </>
  );
}
export default InforCompany;
