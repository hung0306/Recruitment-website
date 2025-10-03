import { useState } from "react";
import { Button, Card, Col, DatePicker, Form, Input, Modal, Row } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { editProduct } from "../../../services/userService";
const { TextArea } = Input;

function ProductSection({
  products,
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
      productName: item.productName,
      category: item.category,
      description: item.description,
    });
  };

  const handleEditSubmit = async (values) => {
    if (!editingItem) return;
    const payload = {
      ...values,
      completionDate: values.completionDate
        ? values.completionDate.format("MM/YYYY")
        : editingItem.completionDate,
    };
    const success = await editProduct(editingItem.id, payload);
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
          Thêm sản phẩm
        </Button>
      }
      title="Sản phẩm"
    >
      {products && products.length > 0 ? (
        products.map((item, index) => (
          <Card
            key={index}
            type="inner"
            title={item.productName}
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
            <p>Thể loại: {item.category}</p>
            <p>Thời gian hoàn thành: {item.completionDate}</p>
            <p>Mô tả: {item.description}</p>
          </Card>
        ))
      ) : (
        <div style={{ display: "flex", justifyContent: "space-around" }}>
          <p>Không có sản phẩm nào.</p>
          <div style={{ alignItems: "top" }}>
            <img
              width={"90px"}
              src="https://www.topcv.vn/v3/profile/profile-png/profile-product.png"
            />
          </div>
        </div>
      )}

      <Modal
        title="Sản phẩm"
        footer={null}
        onCancel={onCancel}
        open={isModalOpen}
      >
        <Form layout="vertical" onFinish={onFinish} form={form}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Tên sản phẩm"
                name="productName"
                rules={[
                  { required: true, message: "Vui lòng nhập tên sản phẩm" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thể loại"
                name="category"
                rules={[{ required: true, message: "Vui lòng nhập thể loại" }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Thời gian hoàn thành"
                name="completionDate"
                rules={[
                  {
                    required: true,
                    message: "Vui lòng chọn thời gian hoàn thành",
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
        title="Sửa sản phẩm"
        footer={null}
        onCancel={() => setIsEditOpen(false)}
        open={isEditOpen}
      >
        <Form layout="vertical" onFinish={handleEditSubmit} form={editForm}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item label="Tên sản phẩm" name="productName">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thể loại" name="category">
                <Input />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item label="Thời gian hoàn thành" name="completionDate">
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

export default ProductSection;
