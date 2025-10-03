import { useState } from "react";
import { Button, Card, Col, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editSkill } from "../../../services/userService";
const { TextArea } = Input;

function SkillSection({
  skill,
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
      skillName: item.skillName,
      description: item.description,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const success = await editSkill(editingItem.id, values);
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
          Thêm kỹ năng
        </Button>
      }
      title="Kỹ năng"
    >
      {skill && skill.length > 0 ? (
        skill.map((item) => (
          <Card
            key={item.id}
            type="inner"
            title={item.skillName}
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
            <p>Mô tả: {item.description}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có kỹ năng nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-skills.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Kỹ năng"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên kỹ năng" name="skillName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả kỹ năng" name="description">
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
        title="Sửa kỹ năng"
        footer={null}
        open={isEditOpen}
        onCancel={() => setIsEditOpen(false)}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên kỹ năng" name="skillName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Mô tả kỹ năng" name="description">
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

export default SkillSection;
