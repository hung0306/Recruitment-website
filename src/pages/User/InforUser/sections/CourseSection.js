import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editCourse } from "../../../../services/userService";
const { TextArea } = Input;

function CourseSection({
  courses,
  onShowModal,
  isModalOpen,
  onCancel,
  onDelete,
  onFinish,
  form,
  onReload,
}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [editForm] = Form.useForm();

  const openEdit = (item) => {
    setEditingItem(item);
    setIsEditOpen(true);
    editForm.setFieldsValue({
      courseName: item.courseName,
      organization: item.organization,
      description: item.description,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const payload = {
      ...values,
      startYear: values.startYear
        ? values.startYear.format("YYYY")
        : editingItem.startYear,
      endYear: values.endYear
        ? values.endYear.format("YYYY")
        : editingItem.endYear,
    };
    const success = await editCourse(editingItem.id, payload);
    if (success) {
      onReload?.();
      setIsEditOpen(false);
      setEditingItem(null);
      editForm.resetFields();
    }
  };
  return (
    <Card
      extra={
        <Button
          style={{
            backgroundColor: "green",
            borderColor: "green",
            color: "white",
          }}
          onClick={onShowModal}
          type="primary"
        >
          Thêm khóa học
        </Button>
      }
      title="Khóa học"
    >
      {courses && courses.length > 0 ? (
        courses.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.courseName}
            style={{ marginBottom: "10px" }}
            extra={
              <>
                <Button
                  type="link"
                  icon={<EditOutlined />}
                  onClick={() => openEdit(item)}
                >
                  Sửa
                </Button>
                <Button
                  onClick={() => onDelete(item.id)}
                  type="link"
                  icon={<DeleteOutlined />}
                  style={{ color: "#ff4d4f" }}
                >
                  Xóa
                </Button>
              </>
            }
          >
            <p>Tổ chức: {item.organization}</p>
            <p>
              Thời gian: {item.startYear} - {item.endYear}
            </p>
            <p>Mô tả: {item.description}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có khóa học nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-course.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Khóa học"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên khóa học"
                name="courseName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khóa học" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Tổ chức"
                name="organization"
                rules={[
                  { required: true, message: "Vui lòng nhập tên tổ chức" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Năm bắt đầu"
                name="startYear"
                rules={[
                  { required: true, message: "Vui lòng chọn năm bắt đầu" },
                ]}
              >
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Năm kết thúc"
                name="endYear"
                rules={[
                  { required: true, message: "Vui lòng chọn năm kết thúc" },
                ]}
              >
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "green",
                    borderColor: "green",
                    color: "white",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Thêm
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        title="Sửa khóa học"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên khóa học" name="courseName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tổ chức" name="organization">
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Năm bắt đầu" name="startYear">
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Năm kết thúc" name="endYear">
                <DatePicker picker="year" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả" name="description">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item>
                <Button
                  style={{
                    backgroundColor: "green",
                    borderColor: "green",
                    color: "white",
                  }}
                  type="primary"
                  htmlType="submit"
                >
                  Cập nhật
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </Card>
  );
}

export default CourseSection;
