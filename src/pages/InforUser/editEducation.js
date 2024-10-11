import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification } from 'antd';
import { useState } from 'react';
import { editEducation } from '../../services/userService'; // Changed from editSkill

function EditEducation(props) { // Renamed to PascalCase
    const [formEducation] = Form.useForm(); // Changed formSkill to formEducation
    const [isModalEditEducation, setIsModalEditEducation] = useState(false); // Changed isModalEditSkill to isModalEditEducation
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;

    const handleFinishEditEducation = async (values) => { // Changed handleFinishEditSkill to handleFinishEditEducation
        console.log(item);
        const result = await editEducation(item.id, values); // Changed editSkill to editEducation
        if (result) {
            // Success notification
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin học vấn thành công.`,
                duration: 10,  // Display duration in seconds
                // icon: <SmileOutlined style={{ color: '#108ee9' }} />, // Optional: Customize icon
            });
            onReload();
            setIsModalEditEducation(false);
        } else {
            // Error notification
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin học vấn. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    const showModalEditEducation = () => { // Changed modalEditSkil to showModalEditEducation
        setIsModalEditEducation(true);
     
    };

    const handleCancelEditEducation = () => { // Changed handleCancelEditSkill to handleCancelEditEducation
        setIsModalEditEducation(false);
    };

    return (
        <>
            {contextHolder}
            <Button 
                onClick={showModalEditEducation} 
                type="link" 
                icon={<EditOutlined />} 
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal for Education */}
                <Modal 
                    title="Chỉnh sửa Học vấn" 
                    footer={null} 
                    onCancel={handleCancelEditEducation} 
                    open={isModalEditEducation}
                >
                    <Form initialValues={item}
                        layout="vertical" 
                        onFinish={handleFinishEditEducation} 
                        form={formEducation}
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item 
                                    label="Trường học" 
                                    name="school" 
                                    rules={[{ required: true, message: 'Vui lòng nhập trường học!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Chuyên ngành" 
                                    name="major" 
                                    rules={[{ required: true, message: 'Vui lòng nhập chuyên ngành!' }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item 
                                    label="Mô tả" 
                                    name="description"
                                >
                                    <TextArea rows={4} />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item>
                                    <Button type="primary" htmlType="submit">
                                        Cập nhật
                                    </Button>
                                </Form.Item>
                            </Col>
                        </Row>
                    </Form>
                </Modal>
            </Col>
        </>
    );
}

export default EditEducation; // Exported with PascalCase
