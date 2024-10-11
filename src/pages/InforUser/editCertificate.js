import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editCertificate } from '../../services/userService'; // Đảm bảo hàm này đã được định nghĩa
import moment from 'moment'; // Import moment

function EditCertificate(props) { // Đổi tên component thành EditCertificate
    const [formCertificate] = Form.useForm(); // Đổi tên formCourse thành formCertificate
    const [isModalEditCertificate, setIsModalEditCertificate] = useState(false); // Đổi tên isModalEditCourse thành isModalEditCertificate
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    // Cập nhật initialValues với định dạng 'MM/YYYY'
    const initialValues = {
        ...item,
        date: item.date ? moment(item.date, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
    };

    // Handler cho việc submit form chỉnh sửa chứng chỉ
    const handleFinishEditCertificate = async (values) => {
        const result = await editCertificate(item.id, {
            ...values,
            date: values.date ? values.date.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin chứng chỉ thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditCertificate(false);
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin chứng chỉ. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditCertificate = () => {
        setIsModalEditCertificate(true);
    };

    // Handler để hủy modal
    const handleCancelEditCertificate = () => {
        setIsModalEditCertificate(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditCertificate} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Chứng chỉ */}
                <Modal
                    title="Chỉnh sửa Chứng chỉ" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditCertificate} // Cập nhật handler
                    open={isModalEditCertificate} // Cập nhật state
                >
                    <Form
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditCertificate} // Cập nhật handler
                        form={formCertificate} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên chứng chỉ" 
                                    name="certificateName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên chứng chỉ" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tổ chức" 
                                    name="organization" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên tổ chức" }]}
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

export default EditCertificate; // Cập nhật export
