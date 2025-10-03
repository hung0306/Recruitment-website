import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editPrize } from "../../../services/userService";

function PrizeSection({
  prizes,
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
      prizeName: item.prizeName,
      organization: item.organization,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const payload = {
      ...values,
      date: values.date ? values.date.format("MM/YYYY") : editingItem.date,
    };
    const success = await editPrize(editingItem.id, payload);
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
          Thêm giải thưởng
        </Button>
      }
      title="Giải thưởng"
    >
      {prizes && prizes.length > 0 ? (
        prizes.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.prizeName}
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
            <p>Thời gian: {item.date}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có giải thưởng nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-prize.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Giải thưởng"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên giải thưởng"
                name="prizeName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên giải thưởng" },
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
            <Col span={24}>
              <Form.Item
                label="Thời gian"
                name="date"
                rules={[{ required: true, message: "Vui lòng chọn thời gian" }]}
              >
                <DatePicker picker="month" style={{ width: "100%" }} />
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
        title="Sửa giải thưởng"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên giải thưởng" name="prizeName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Tổ chức" name="organization">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thời gian" name="date">
                <DatePicker picker="month" style={{ width: "100%" }} />
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

export default PrizeSection;
