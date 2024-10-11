import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editActivity } from '../../services/userService'; // Cập nhật import
import moment from 'moment'; // Import moment

function EditActivity(props) { // Đổi tên component thành EditActivity
    const [formActivity] = Form.useForm(); // Đổi tên formProject thành formActivity
    const [isModalEditActivity, setIsModalEditActivity] = useState(false); // Đổi tên isModalEditProject thành isModalEditActivity
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    // Cập nhật initialValues với định dạng 'MM/YYYY' cho startDate và endDate
    const initialValues = {
        ...item,
        startDate: item.startDate ? moment(item.startDate, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
        endDate: item.endDate ? moment(item.endDate, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
    };

    // Handler cho việc submit form chỉnh sửa hoạt động
    const handleFinishEditActivity = async (values) => { // Đổi tên hàm thành handleFinishEditActivity
        const result = await editActivity(item.id, { // Đổi editProject thành editActivity
            ...values,
            startDate: values.startDate ? values.startDate.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
            endDate: values.endDate ? values.endDate.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin hoạt động thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditActivity(false);
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin hoạt động. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditActivity = () => { // Đổi tên hàm
        setIsModalEditActivity(true);
    };

    // Handler để hủy modal
    const handleCancelEditActivity = () => { // Đổi tên handler
        setIsModalEditActivity(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditActivity} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Hoạt động */}
                <Modal
                    title="Chỉnh sửa Hoạt động" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditActivity} // Cập nhật handler
                    open={isModalEditActivity} // Cập nhật state
                >
                    <Form
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditActivity} // Cập nhật handler
                        form={formActivity} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên hoạt động" 
                                    name="activityName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên hoạt động" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Vị trí tham gia" 
                                    name="position" 
                                    rules={[{ required: true, message: "Vui lòng nhập vị trí tham gia" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Thời gian bắt đầu" 
                                    name="startDate" 
                                    rules={[{ required: true, message: "Vui lòng chọn thời gian bắt đầu" }]}
                                >
                                    <DatePicker 
                                        picker="month" 
                                        format="MM/YYYY" // Định dạng hiển thị
                                        style={{ width: "100%" }} 
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Thời gian kết thúc" 
                                    name="endDate" 
                                    rules={[{ required: true, message: "Vui lòng chọn thời gian kết thúc" }]}
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

export default EditActivity; // Cập nhật export
