import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editPrize } from '../../services/userService'; // Cập nhật import
import moment from 'moment'; // Import moment

function EditPrize(props) { // Đổi tên component thành EditPrize
    const [formPrize] = Form.useForm(); // Đổi tên formCertificate thành formPrize
    const [isModalEditPrize, setIsModalEditPrize] = useState(false); // Đổi tên isModalEditCertificate thành isModalEditPrize
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    // Cập nhật initialValues với định dạng 'MM/YYYY'
    const initialValues = {
        ...item,
        date: item.date ? moment(item.date, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
    };

    // Handler cho việc submit form chỉnh sửa giải thưởng
    const handleFinishEditPrize = async (values) => { // Đổi tên hàm thành handleFinishEditPrize
        const result = await editPrize(item.id, { // Đổi editCertificate thành editPrize
            ...values,
            date: values.date ? values.date.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin giải thưởng thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditPrize(false);
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin giải thưởng. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditPrize = () => { // Đổi tên hàm
        setIsModalEditPrize(true);
    };

    // Handler để hủy modal
    const handleCancelEditPrize = () => { // Đổi tên handler
        setIsModalEditPrize(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditPrize} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Giải thưởng */}
                <Modal
                    title="Chỉnh sửa Giải thưởng" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditPrize} // Cập nhật handler
                    open={isModalEditPrize} // Cập nhật state
                >
                    <Form
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditPrize} // Cập nhật handler
                        form={formPrize} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên giải thưởng" 
                                    name="prizeName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên giải thưởng" }]}
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

export default EditPrize; // Cập nhật export
