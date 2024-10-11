import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editProject } from '../../services/userService'; // Cập nhật import
import moment from 'moment'; // Import moment

function EditProject(props) { // Đổi tên component thành EditProject
    const [formProject] = Form.useForm(); // Đổi tên formPrize thành formProject
    const [isModalEditProject, setIsModalEditProject] = useState(false); // Đổi tên isModalEditPrize thành isModalEditProject
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    // Cập nhật initialValues với định dạng 'MM/YYYY' cho startDate và endDate
    const initialValues = {
        ...item,
        startDate: item.startDate ? moment(item.startDate, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
        endDate: item.endDate ? moment(item.endDate, 'MM/YYYY') : null, // Sử dụng định dạng 'MM/YYYY'
    };

    // Handler cho việc submit form chỉnh sửa dự án
    const handleFinishEditProject = async (values) => { // Đổi tên hàm thành handleFinishEditProject
        const result = await editProject(item.id, { // Đổi editPrize thành editProject
            ...values,
            startDate: values.startDate ? values.startDate.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
            endDate: values.endDate ? values.endDate.format('MM/YYYY') : null, // Định dạng lại khi gửi dữ liệu
        });
        if (result) {
            // Thông báo thành công
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin dự án thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditProject(false);
        } else {
            // Thông báo lỗi
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin dự án. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Hàm để hiển thị modal và đặt giá trị cho form
    const showModalEditProject = () => { // Đổi tên hàm
        setIsModalEditProject(true);
    };

    // Handler để hủy modal
    const handleCancelEditProject = () => { // Đổi tên handler
        setIsModalEditProject(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditProject} // Cập nhật onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal cho Dự án */}
                <Modal
                    title="Chỉnh sửa Dự án" // Cập nhật tiêu đề
                    footer={null}
                    onCancel={handleCancelEditProject} // Cập nhật handler
                    open={isModalEditProject} // Cập nhật state
                >
                    <Form
                        initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditProject} // Cập nhật handler
                        form={formProject} // Cập nhật form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Tên dự án" 
                                    name="projectName" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên dự án" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Khách hàng" 
                                    name="client" 
                                    rules={[{ required: true, message: "Vui lòng nhập tên khách hàng" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Số thành viên" 
                                    name="teamSize" 
                                    rules={[{ required: true, message: "Vui lòng nhập số thành viên" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Vị trí" 
                                    name="position" 
                                    rules={[{ required: true, message: "Vui lòng nhập vị trí" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Nhiệm vụ" 
                                    name="responsibility" 
                                    rules={[{ required: true, message: "Vui lòng nhập nhiệm vụ" }]}
                                >
                                    <TextArea />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Công nghệ sử dụng" 
                                    name="technology" 
                                    rules={[{ required: true, message: "Vui lòng nhập công nghệ sử dụng" }]}
                                >
                                    <TextArea />
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
    )
}


    export default EditProject; // Cập nhật export
