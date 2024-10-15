import React, { useEffect, useState } from 'react';
import {
  Layout,
  Row,
  Col,
  Typography,
  Card,
  Avatar,
  Divider,
  Form,
  Input,
  Button,
  message,
  Upload,
  Space,
} from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  UserOutlined,
  SendOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { getCookie } from '../../helpers/cookies';
import { getDetailUser } from '../../services/userService';
import { createCv } from '../../services/cvService';

const { Content } = Layout;
const { Title } = Typography;

function CreateCV2() {
  const [form] = Form.useForm();
  const idUser = getCookie('id');

  const [info, setInfo] = useState();
  const [avatar, setAvatar] = useState(null);
  const [imageName, setImageName] = useState('');

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailUser(idUser);
      if (response) {
        setInfo(response);
        if (response.avatarUrl) {
          setAvatar(response.avatarUrl);
        }
      }
    };
    fetchApi();
  }, []);

  const onFinish = async (values) => {
    const data = { ...values, avatar: imageName, idUser: idUser };
    const result = await createCv(data);

    if (result) {
      message.success('CV created successfully');
      form.resetFields();
      setAvatar(null);
      setImageName('');
    } else {
      message.error('Failed to create CV');
    }
  };

  const handleUpload = (file) => {
    const isImage = file.type.startsWith('image/');
    if (!isImage) {
      message.error('You can only upload image files!');
      return false;
    }

    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must be smaller than 2MB!');
      return false;
    }

    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);
    setImageName(file.name);
    return false;
  };

  return (
    <div className="container" style={{ padding: '24px' }}>
      {info ? (
        <Layout>
          <Content>
            <Form
              form={form}
              initialValues={info}
              onFinish={onFinish}
              layout="vertical"
              style={{ maxWidth: '800px', margin: '0 auto' }}
            >
              <Card>
                {/* Avatar and Personal Information Section */}
                <Space direction="vertical" style={{ width: '100%' }} size="large">
                  <Row justify="center">
                    <Form.Item name="avatar">
                      <Upload
                        listType="picture-card"
                        showUploadList={false}
                        beforeUpload={handleUpload}
                      >
                        {avatar ? (
                          <Avatar size={150} src={avatar} style={{ cursor: 'pointer' }} />
                        ) : (
                          <Avatar size={150} icon={<UserOutlined />} style={{ cursor: 'pointer' }} />
                        )}
                        {!avatar && (
                          <div>
                            <UploadOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                          </div>
                        )}
                      </Upload>
                    </Form.Item>
                  </Row>

                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="nameUser"
                        rules={[{ message: 'Please enter your full name' }]}
                      >
                        <Input placeholder="Full Name" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="position"
                        rules={[{ message: 'Please enter the position you are applying for' }]}
                      >
                        <Input placeholder="Position" />
                      </Form.Item>
                    </Col>
                  </Row>

                  {/* Contact Information */}
                  <Title level={4}>Contact Information</Title>
                  <Row gutter={24}>
                    <Col span={12}>
                      <Form.Item
                        name="phone"
                        rules={[
                          { message: 'Please enter your phone number' },
                          {
                            pattern: /^\+?\d{10,15}$/,
                            message: 'Please enter a valid phone number',
                          },
                        ]}
                      >
                        <Input prefix={<PhoneOutlined />} placeholder="Phone Number" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        name="email"
                        rules={[
                          { type: 'email', message: 'Please enter a valid email' },
                          { message: 'Please enter your email' },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="website">
                        <Input prefix={<GlobalOutlined />} placeholder="Website" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name="location">
                        <Input prefix={<EnvironmentOutlined />} placeholder="Address" />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Divider />

                  {/* Introduction Section */}
                  <Title level={4}>Introduction</Title>
                  <Form.Item
                    name="introduction"
                    rules={[{ message: 'Please enter your career objective or introduction' }]}
                  >
                    <Input.TextArea
                      rows={4}
                      placeholder="Your career objective, including short-term and long-term goals."
                    />
                  </Form.Item>

                  <Divider />

                  {/* Skills Section */}
                  <Title level={4}>Skills</Title>
                  <Form.List name="skills">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <div key={key} style={{ display: 'flex', marginBottom: 8 }}>
                            <Form.Item
                              {...restField}
                              name={name}
                              rules={[{ message: 'Please enter a skill' }]}
                              style={{ flex: 1, marginRight: 8 }}
                            >
                              <Input placeholder="Skill" />
                            </Form.Item>
                            <Button type="text" danger onClick={() => remove(name)}>
                              Delete
                            </Button>
                          </div>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<UploadOutlined />}
                          >
                            Add Skill
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  <Divider />

                  {/* Work Experience Section */}
                  <Title level={4}>Work Experience</Title>
                  <Form.List name="workExperience">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, ...restField }) => (
                          <Card
                            key={key}
                            type="inner"
                            title={`Work Experience ${name + 1}`}
                            extra={
                              <Button type="link" danger onClick={() => remove(name)}>
                                Delete
                              </Button>
                            }
                            style={{ marginBottom: 16 }}
                          >
                            <Form.Item
                              {...restField}
                              name={[name, 'company']}
                              label="Company Name"
                              rules={[{ message: 'Please enter the company name' }]}
                            >
                              <Input placeholder="Company Name" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'position']}
                              label="Position"
                              rules={[{ message: 'Please enter your position' }]}
                            >
                              <Input placeholder="Position" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'period']}
                              label="Work Period"
                              rules={[{ message: 'Please enter the work period' }]}
                            >
                              <Input placeholder="Work Period" />
                            </Form.Item>
                            <Form.Item
                              {...restField}
                              name={[name, 'description']}
                              label="Job Description"
                              rules={[{ message: 'Please enter the job description' }]}
                            >
                              <Input.TextArea rows={4} placeholder="Job Description" />
                            </Form.Item>
                          </Card>
                        ))}
                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<UploadOutlined />}
                          >
                            Add Work Experience
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>

                  {/* Submit Button */}
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      icon={<SendOutlined />}
                      size="large"
                      block
                    >
                      Submit CV
                    </Button>
                  </Form.Item>
                </Space>
              </Card>
            </Form>
          </Content>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default CreateCV2;