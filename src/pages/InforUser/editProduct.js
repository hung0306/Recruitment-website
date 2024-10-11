import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editProduct } from '../../services/userService'; // Cập nhật import
import moment from 'moment'; // Import moment

function EditProduct(props) { // Đổi tên component thành EditProduct
    const [formProduct] = Form.useForm(); // Đổi tên formProject thành formProduct
    const [isModalEditProduct, setIsModalEditProduct] = useState(false); // Đổi tên isModalEditProject thành isModalEditProduct
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    // Cập nhật initialValues với định dạng 'MM/YYYY' cho completionDate
    const initialValues = {
        ...item,
        completionDate: item.completionDate ? moment(item.completionDate, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
    };

    // Handler cho việc submit form chỉnh sửa sản phẩm
    const handleFinishEditProduct = async (values) => { // Đổi tên hàm thành handleFinishEditProduct
        const result = await editProduct(item.id, { // Đổi editProject thành editProduct
            ...values,
            completionDate: values.completionDate ? values.completionDate.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin sản phẩm thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditProduct(false);
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin sản phẩm. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditProduct = () => { // Đổi tên hàm
        setIsModalEditProduct(true);
    };

    // Handler để hủy modal
    const handleCancelEditProduct = () => { // Đổi tên handler
        setIsModalEditProduct(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditProduct} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Sản phẩm */}
                <Modal
                    title="Chỉnh sửa Sản phẩm" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditProduct} // Cập nhật handler
                    open={isModalEditProduct} // Cập nhật state
                >
                    <Form
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditProduct} // Cập nhật handler
                        form={formProduct} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên sản phẩm" 
                                    name="productName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên sản phẩm" }]}
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
                                    rules={[{ required: true, message: "Vui lòng chọn thời gian hoàn thành" }]}
                                >
                                    <DatePicker 
                                        picker="month" 
                                        format="MM/YYYY" // Định dạng hiển thị
                                        style={{ width: "100%" }} 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Mô tả" 
                                    name="description"
                                >
                                    <TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">Cập nhật</Button> {/* Cập nhật nhãn nút */}
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Col>
        </>
    );
}

export default EditProduct; // Cập nhật export
