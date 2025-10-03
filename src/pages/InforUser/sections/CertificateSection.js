import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editCertificate } from "../../../services/userService";

function CertificateSection({
  certificates,
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
      certificateName: item.certificateName,
      organization: item.organization,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const payload = {
      ...values,
      date: values.date ? values.date.format("MM/YYYY") : editingItem.date,
    };
    const success = await editCertificate(editingItem.id, payload);
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
          Thêm chứng chỉ
        </Button>
      }
      title="Chứng chỉ"
    >
      {certificates && certificates.length > 0 ? (
        certificates.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.certificateName}
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
          <p>Không có chứng chỉ.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-certificate.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Chứng chỉ"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên chứng chỉ"
                name="certificateName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên chứng chỉ" },
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
        title="Sửa chứng chỉ"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên chứng chỉ" name="certificateName">
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

export default CertificateSection;
