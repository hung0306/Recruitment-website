import { EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Button, Col, Form, Input, Modal, Row,notification} from 'antd';
import { useState } from 'react';
import { editSkill } from '../../services/userService';
function EditInfor(props) {
    const [formSkill] = Form.useForm();
    const [isModalEditSkill, setIsModalEditSkill] = useState(false);
    const { TextArea } = Input;
    const [api, contextHolder] = notification.useNotification();
    const { item, onReload } = props

    const handleFinishEditSkill = async(e) => {
        console.log(item);
        const result = await editSkill(item.id, e)
        if (result) {
            // message
            api.success({
                message: "hihi",
                description: `Cập nhật thành công `,
                duration: 10,  //thời gian hiển thị
                // icon: <SmileOutlined style={{ color: '#108ee9' }} />,

            });
            onReload()
           
            setIsModalEditSkill(false)
            

            // end message



        } else {
            api.error({
                message: "haha",
                description: 'Cập nhật không thành công!',
                duration: 6
            });


        }


    }

    const modalEditSkil =()=>{
        setIsModalEditSkill(true)

    }
    const handleCancelEditSkill =()=>{
        setIsModalEditSkill(false)

    }

    return (
        <>
        {contextHolder}
            <Button onClick={modalEditSkil} type="link" icon={<EditOutlined />} style={{ color: '#1890ff' }}>Sửa</Button>

            <Col span={24}>
                {/* Card Kỹ năng */}              

                    <Modal title="Kỹ năng" footer={null} onCancel={handleCancelEditSkill} open={isModalEditSkill}>
                        <Form initialValues={item}  layout="vertical" onFinish={handleFinishEditSkill} form={formSkill}>  {/* Đảm bảo truyền đúng form */}
                            <Row gutter={20}>
                                <Col span={24}>
                                    <Form.Item label="Tên kỹ năng" name="skillName">
                                        <Input />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item label="Mô tả kỹ năng" name="description">
                                        <TextArea />
                                    </Form.Item>
                                </Col>
                                <Col span={24}>
                                    <Form.Item>
                                        <Button type="primary" htmlType="submit">Sửa</Button>
                                    </Form.Item>
                                </Col>
                            </Row>
                        </Form>
                    </Modal>
                
            </Col>
        </>
    )
}
export default EditInfor