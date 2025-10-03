import {
  Button,
  Card,
  Col,
  Form,
  Input,
  InputNumber,
  Row,
  Select,
  Switch,
  message,
} from "antd";
import { getCookie } from "../../helpers/cookies";
import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
import { getListCity } from "../../services/cityService";
import { getTimeCurrent } from "../../helpers/getTime";
import { createJob } from "../../services/jobService";
import Goback from "../../Components/Goback";
const { Option } = Select;

function CreateJob() {
  const idCompany = getCookie("id");
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListTag();
      setTags(response);
    };
    fetchApi();
  }, []);
  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCity();
      setCity(response);
    };
    fetchApi();
  }, []);

  const handleFinish = async (value) => {
    // console.log(value);
    value.idCompany = parseInt(idCompany);
    value.createAt = getTimeCurrent();
    const response = await createJob(value);
    if (response) {
      messageApi.open({
        type: "success",
        content: "Thêm job thành công",
        duration: 3,
      });
      form.resetFields();
    } else {
      messageApi.open({
        type: "error",
        content: "Thêm job thất bại",
        duration: 3,
      });
    }
  };
  // console.log(tags);
  return (
    <>
      {contextHolder}
      <Goback />
      <Card className="mt-20" title="Tạo job mới">
        <Form
          layout="vertical"
          name="create-job"
          onFinish={handleFinish}
          form={form}
        >
          {/* layout để set kiểu hiển thị: dọc ngang ... ví dụ: tên phòng ở trên, ô input ở dưới; 2 cái ở cùng hàng */}
          <Row>
            <Col xl={24}>
              <Form.Item
                label="Nhập tên job"
                name="name" // tự đặt để nó gửi lên object
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập tên job",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col xl={12}>
              <Form.Item label="Tags" name="tags">
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                >
                  {tags.map((item) => (
                    <Option key={item.key} value={item.value}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
              {/* mod multiple để chọn được nhiều */}
              {/* allowClear là cho phép xoá tất cả */}
            </Col>

            <Col xl={24}>
              <Form.Item
                label="Mức lương"
                name="salary" // tự đặt để nó gửi lên object
                rules={[
                  {
                    required: true,
                    message: "vui lòng nhập luong",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xl={24}>
              <Form.Item
                label="Số lượng tuyển"
                name="quantityJob" // tự đặt để nó gửi lên object
                rules={[
                  {
                    required: true,
                  },
                ]}
              >
                <InputNumber />
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item label="Thành phố" name="city">
                <Select
                  mode="multiple"
                  allowClear
                  style={{
                    width: "100%",
                  }}
                >
                  {city.map((item) => (
                    <Option key={item.key} value={item.value}>
                      {item.value}
                    </Option>
                  ))}
                </Select>
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item
                label="Mô tả"
                name="description" // tự đặt để nó gửi lên object
              >
                <Input.TextArea rows={5} />
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item
                label="Trạng thái"
                name="status"
                valuePropName="checked"
              >
                <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                {/* phải có cái valuePropName như trên nếu ko sẽ báo lỗi */}
              </Form.Item>
            </Col>

            <Col xl={24}>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Tạo mới
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Card>
    </>
  );
}
export default CreateJob;
