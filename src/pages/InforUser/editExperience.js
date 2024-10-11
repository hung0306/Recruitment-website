import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row, notification, DatePicker } from 'antd';
import { useState } from 'react';
import { editExperience } from '../../services/userService'; // Updated import
import moment from 'moment'; // Import momen

function EditExperience(props) { // Renamed component to EditExperience
    const [formExperience] = Form.useForm(); // Renamed formEducation to formExperience
    const [isModalEditExperience, setIsModalEditExperience] = useState(false); // Renamed isModalEditEducation
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props;
    const initialValues = {
        ...item,
        startYear: item.startYear ? moment(item.startYear, 'YYYY') : null,
        endYear: item.endYear ? moment(item.endYear, 'YYYY') : null,
    };
    

    // Handler for form submission
    const handleFinishEditExperience = async (values) => {
        const result = await editExperience(item.id, {
            ...values,
            startYear: values.startYear ? values.startYear.format('YYYY') : null,
            endYear: values.endYear ? values.endYear.format('YYYY') : null,
        });
        if (result) {
            // Success notification
            api.success({
                message: "Cập nhật thành công",
                description: `Bạn đã cập nhật thông tin kinh nghiệm thành công.`,
                duration: 10,
            });
            onReload();
            setIsModalEditExperience(false);
        } else {
            // Error notification
            api.error({
                message: "Cập nhật thất bại",
                description: 'Không thể cập nhật thông tin kinh nghiệm. Vui lòng thử lại!',
                duration: 6,
            });
        }
    };

    // Function to show the modal and set form values
    const showModalEditExperience = () => { // Renamed function
        setIsModalEditExperience(true);

    };

    // Handler to cancel the modal
    const handleCancelEditExperience = () => { // Renamed handler
        setIsModalEditExperience(false);
    };

    return (
        <>
            {contextHolder}
            <Button
                onClick={showModalEditExperience} // Updated onClick handler
                type="link"
                icon={<EditOutlined />}
                style={{ color: '#1890ff' }}
            >
                Sửa
            </Button>

            <Col span={24}>
                {/* Modal for Experience */}
                <Modal
                    title="Chỉnh sửa Kinh nghiệm" // Updated title
                    footer={null}
                    onCancel={handleCancelEditExperience} // Updated handler
                    open={isModalEditExperience} // Updated state
                >
                    <Form initialValues={initialValues}
                        layout="vertical"
                        onFinish={handleFinishEditExperience} // Updated handler
                        form={formExperience} // Updated form instance
                    >
                        <Row gutter={20}>
                            <Col span={24}>
                                <Form.Item
                                    label="Tên công ty"
                                    name="companyName"
                                    rules={[{ required: true, message: "Vui lòng nhập tên công ty" }]}
                                >
                                    <Input />
                                </Form.Item>
                            </Col>
                            <Col span={24}>
                                <Form.Item
                                    label="Chức vụ"
                                    name="position"
                                    rules={[{ required: true, message: "Vui lòng nhập chức vụ" }]}
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
                                    <DatePicker
                                        picker="year"
                                        style={{ width: "100%" }}
                                        format="YYYY"
                                        placeholder="Chọn năm"
                                    />
                                </Form.Item>
                            </Col>
                            <Col span={12}>
                                <Form.Item
                                    label="Năm kết thúc"
                                    name="endYear"
                                    rules={[{ required: true, message: "Vui lòng chọn năm kết thúc" }]}
                                >
                                    <DatePicker
                                        picker="year"
                                        style={{ width: "100%" }}
                                        format="YYYY"
                                        placeholder="Chọn năm"
                                    />
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

export default EditExperience; // Updated export

