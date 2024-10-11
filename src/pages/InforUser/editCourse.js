import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editCourse } from '../../services/userService'; // Cập nhật import
import moment from 'moment'; // Import moment

function EditCourse(props) { // Đổi tên component thành EditCourse
    const [formCourse] = Form.useForm(); // Đổi tên formExperience thành formCourse
    const [isModalEditCourse, setIsModalEditCourse] = useState(false); // Đổi tên isModalEditExperience thành isModalEditCourse
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;
    const initialValues = {
        ...item,
        startYear: item.startYear ? moment(item.startYear, 'YYYY') : null,
        endYear: item.endYear ? moment(item.endYear, 'YYYY') : null,
    };

    // Handler cho việc submit form chỉnh sửa khóa học
    const handleFinishEditCourse = async (values) => { // Đổi tên hàm thành handleFinishEditCourse
        const result = await editCourse(item.id, { // Đổi editExperience thành editCourse
            ...values,
            startYear: values.startYear ? values.startYear.format('YYYY') : null,
            endYear: values.endYear ? values.endYear.format('YYYY') : null,
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin khóa học thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditCourse(false); // Đổi tên hàm
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin khóa học. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditCourse = () => { // Đổi tên hàm
        setIsModalEditCourse(true);
    };

    // Handler để hủy modal
    const handleCancelEditCourse = () => { // Đổi tên handler
        setIsModalEditCourse(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditCourse} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Khóa học */}
                <Modal
                    title="Chỉnh sửa Khóa học" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditCourse} // Cập nhật handler
                    open={isModalEditCourse} // Cập nhật state
                >
                    <Form 
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditCourse} // Cập nhật handler
                        form={formCourse} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên khóa học" 
                                    name="courseName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên khóa học" }]}
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
                            <Col span={12}>
                                <Form.Item 
                                    label="Năm bắt đầu" 
                                    name="startYear" 
                                    rules={[{ required: true, message: "Vui lòng chọn năm bắt đầu" }]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }} />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item 
                                    label="Năm kết thúc" 
                                    name="endYear" 
                                    rules={[{ required: true, message: "Vui lòng chọn năm kết thúc" }]}
                                >
                                    <DatePicker picker="year" style={{ width: "100%" }} />
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

export default EditCourse; // Cập nhật export
