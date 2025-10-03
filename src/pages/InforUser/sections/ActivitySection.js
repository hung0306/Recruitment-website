import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editActivity } from "../../../services/userService";
const { TextArea } = Input;

function ActivitySection({
  activities,
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
      activityName: item.activityName,
      position: item.position,
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
    const success = await editActivity(editingItem.id, payload);
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
          Thêm hoạt động
        </Button>
      }
      title="Hoạt động"
    >
      {activities && activities.length > 0 ? (
        activities.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.activityName}
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
            <p>Vị trí tham gia: {item.position}</p>
            <p>
              Thời gian: {item.startDate} - {item.endDate}
            </p>
            <p>Mô tả: {item.description}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có hoạt động nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-volunteer.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Hoạt động"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên hoạt động"
                name="activityName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên hoạt động" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Vị trí tham gia"
                name="position"
                rules={[
                  { required: true, message: "Vui lòng nhập vị trí tham gia" },
                ]}
              >
                <Input />
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
        title="Sửa hoạt động"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên hoạt động" name="activityName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Vị trí tham gia" name="position">
                <Input />
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

export default ActivitySection;
