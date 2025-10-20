import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editProject } from "../../../../services/userService";
const { TextArea } = Input;

function ProjectSection({
  projects,
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
      projectName: item.projectName,
      client: item.client,
      teamSize: item.teamSize,
      position: item.position,
      responsibility: item.responsibility,
      technology: item.technology,
      description: item.description,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const payload = {
      ...values,
      startDate: values.startDate
        ? values.startDate.format("MM/YYYY")
        : editingItem.startDate,
      endDate: values.endDate
        ? values.endDate.format("MM/YYYY")
        : editingItem.endDate,
    };
    const success = await editProject(editingItem.id, payload);
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
          Thêm dự án
        </Button>
      }
      title="Dự án"
    >
      {projects && projects.length > 0 ? (
        projects.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.projectName}
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
            <p>Khách hàng: {item.client}</p>
            <p>Số thành viên: {item.teamSize}</p>
            <p>Vị trí: {item.position}</p>
            <p>Nhiệm vụ: {item.responsibility}</p>
            <p>Công nghệ sử dụng: {item.technology}</p>
            <p>
              Thời gian: {item.startDate} - {item.endDate}
            </p>
            <p>Mô tả: {item.description}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có dự án nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-project.png"
            />
          </div>
        </div>
      )}

      <Modal title="Dự án" footer={null} onCancel={onCancel} open={isModalOpen}>
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên dự án"
                name="projectName"
                rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Khách hàng"
                name="client"
                rules={[
                  { required: true, message: "Vui lòng nhập tên khách hàng" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Số thành viên"
                name="teamSize"
                rules={[
                  { required: true, message: "Vui lòng nhập số thành viên" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Vị trí"
                name="position"
                rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Nhiệm vụ"
                name="responsibility"
                rules={[{ required: true, message: "Vui lòng nhập nhiệm vụ" }]}
              >
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Công nghệ sử dụng"
                name="technology"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng nhập công nghệ sử dụng",
                  },
                ]}
              >
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thời gian bắt đầu"
                name="startDate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian bắt đầu",
                  },
                ]}
              >
                <DatePicker picker="month" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Thời gian kết thúc"
                name="endDate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian kết thúc",
                  },
                ]}
              >
                <DatePicker picker="month" style={{ width: "100%" }} />
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
        title="Sửa dự án"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên dự án"
                name="projectName"
                rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Khách hàng" name="client">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Số thành viên" name="teamSize">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Vị trí" name="position">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Nhiệm vụ" name="responsibility">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Công nghệ sử dụng" name="technology">
                <TextArea />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Thời gian bắt đầu" name="startDate">
                <DatePicker picker="month" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item label="Thời gian kết thúc" name="endDate">
                <DatePicker picker="month" style={{ width: "100%" }} />
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

export default ProjectSection;
