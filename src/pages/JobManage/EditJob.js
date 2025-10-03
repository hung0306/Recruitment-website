import React, { useEffect, useState } from "react";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Spin,
  Switch,
  Tooltip,
  message,
} from "antd";
import { getTimeCurrent } from "../../helpers/getTime";
import { updateJob } from "../../services/jobService";
import { getListCity } from "../../services/cityService";
import { getListTag } from "../../services/tagService";
import { EditOutlined } from "@ant-design/icons";

const { Option } = Select;

function EditJob(props) {
  const { record, reload } = props;
  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm();
  const [tags, setTags] = useState([]);
  const [city, setCity] = useState([]);
  const [initialValues, setInitialValues] = useState(record);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCityList = async () => {
      const response = await getListCity();
      setCity(response);
    };
    fetchCityList();
  }, []);

  useEffect(() => {
    const fetchTagList = async () => {
      const response = await getListTag();
      setTags(response);
    };
    fetchTagList();
  }, []);

  useEffect(() => {
    setInitialValues(record);
  }, [record]);

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    form.resetFields();
    setIsModalOpen(false);
  };

  const handleFinish = async (values) => {
    setLoading(true);
    values.updateAt = getTimeCurrent();
    const response = await updateJob(record.id, values);

    setTimeout(() => {
      if (response) {
        messageApi.open({
          type: "success",
          content: "Cập nhật thành công",
          duration: 3,
        });
        reload();
        setIsModalOpen(false);
      } else {
        messageApi.open({
          type: "error",
          content: "Cập nhật thất bại",
          duration: 3,
        });
      }
      setLoading(false);
    }, 1000);
  };

  return (
    <>
      {contextHolder}
      <Tooltip title="Chỉnh sửa">
        <Button type="primary" onClick={showModal}>
          <EditOutlined />
        </Button>
        <Modal
          title="Chỉnh sửa"
          visible={isModalOpen}
          onCancel={handleCancel}
          footer={null}
        >
          <Spin spinning={loading} tip="Đang cập nhật...">
            <Form
              initialValues={initialValues}
              layout="vertical"
              onFinish={handleFinish}
              form={form}
            >
              <Row>
                <Col xl={24}>
                  <Form.Item
                    label="Tên job"
                    name="name"
                    rules={[
                      { required: true, message: "Vui lòng nhập tên job" },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col xl={12}>
                  <Form.Item
                    label="Tags"
                    name="tags"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ít nhất một tag",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                    >
                      {tags.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={24}>
                  <Form.Item
                    label="Mức lương"
                    name="salary"
                    rules={[
                      { required: true, message: "Vui lòng nhập mức lương" },
                    ]}
                  >
                    <InputNumber style={{ width: "100%" }} />
                  </Form.Item>
                </Col>
                <Col xl={12}>
                  <Form.Item
                    label="Thành phố"
                    name="city"
                    rules={[
                      {
                        required: true,
                        message: "Vui lòng chọn ít nhất một thành phố",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                    >
                      {city.map((item, index) => (
                        <Option key={index} value={item.value}>
                          {item.value}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col xl={24}>
                  <Form.Item
                    label="Trạng thái"
                    name="status"
                    valuePropName="checked"
                    initialValue={initialValues.status}
                  >
                    <Switch checkedChildren="Bật" unCheckedChildren="Tắt" />
                  </Form.Item>
                </Col>
                <Col xl={24}>
                  <Form.Item
                    name="description"
                    label="Mô tả"
                    rules={[{ required: true, message: "Vui lòng nhập mô tả" }]}
                  >
                    <Input.TextArea showCount maxLength={100} />
                  </Form.Item>
                </Col>
                <Col xl={24}>
                  <Form.Item>
                    <Button type="primary" htmlType="submit">
                      Cập nhật
                    </Button>
                  </Form.Item>
                </Col>
              </Row>
            </Form>
          </Spin>
        </Modal>
      </Tooltip>
    </>
  );
}

export default EditJob;
