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
import { editCvUser, getDetailCvUser } from '../../services/cvService';
import { useParams } from 'react-router-dom';


const { Content } = Layout;
const { Title } = Typography;

function EditCvUser() {
  const [form] = Form.useForm();
  const params = useParams()
  const idUser = getCookie('id');

  const [info, setInfo] = useState();
  const [avatar, setAvatar] = useState(null); 
  

  useEffect(() => {
    const fetchApi = async () => {
     
        const response = await getDetailCvUser(params.id);
        if (response) {
          setInfo(response);
         
        }
    
    };
    fetchApi();
  }, []);
  console.log(info);
  

  const onFinish = async (values) => {
   
    
   
      const result = await editCvUser(params.id,values);
    
      
      if (result) {
        message.success('cap nhat');
       
      
      } else {
        message.error('Failed to create CV');
      }
    
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
            >
              <Card>
                <Row gutter={[24, 24]}>
                  {/* Left Column */}
                  <Col xs={24} md={8}>
                    <div style={{ textAlign: 'center' }}>
                      {/* Avatar Upload */}
                      <Form.Item name="avatar">
                       
                      </Form.Item>

                      {/* Full Name */}
                      <Form.Item
                        name="nameUser"
                        rules={[
                          { message: 'Please enter your full name' },
                        ]}
                      >
                        <Input placeholder="Full Name" />
                      </Form.Item>

                      {/* Position */}
                      <Form.Item
                        name="position"
                        rules={[
                          {
                            message: 'Please enter the position you are applying for',
                          },
                        ]}
                      >
                        <Input placeholder="Vị trí ứng tuyển" />
                      </Form.Item>
                    </div>

                    <Divider />

                    {/* Contact Information */}
                    <div>
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
                        <Input
                          prefix={<PhoneOutlined />}
                          placeholder="Số điện thoại"
                        />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          { type: 'email', message: 'Please enter a valid email' },
                          { message: 'Please enter your email' },
                        ]}
                      >
                        <Input prefix={<MailOutlined />} placeholder="Email" />
                      </Form.Item>
                      <Form.Item name="website">
                        <Input
                          prefix={<GlobalOutlined />}
                          placeholder="Link Facebook"
                        />
                      </Form.Item>
                      <Form.Item name="location">
                        <Input
                          prefix={<EnvironmentOutlined />}
                          placeholder="Địa chỉ"
                        />
                      </Form.Item>
                    </div>

                    <Divider />

                    {/* Skills */}
                    <div>
                      <Title level={4}>Kỹ năng</Title>
                      <Form.List name="skills">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <div
                                key={key}
                                style={{ display: 'flex', marginBottom: 8 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={name}
                                  rules={[
                                    { message: 'Please enter a skill' },
                                  ]}
                                  style={{ flex: 1, marginRight: 8 }}
                                >
                                  <Input placeholder="Skill" />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  onClick={() => remove(name)}
                                >
                                  Xóa
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
                                Thêm kỹ năng
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>

                    <Divider />

                    {/* Languages */}
                    <div>
                      <Title level={4}>Ngôn ngữ</Title>
                      <Form.List name="languages">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <div
                                key={key}
                                style={{ display: 'flex', marginBottom: 8 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={name}
                                  rules={[
                                    { message: 'Please enter a language' },
                                  ]}
                                  style={{ flex: 1, marginRight: 8 }}
                                >
                                  <Input placeholder="Language" />
                                </Form.Item>
                                <Button
                                  type="text"
                                  danger
                                  onClick={() => remove(name)}
                                >
                                  Xóa
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
                                Thêm ngôn ngữ
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </Col>

                  {/* Right Column */}
                  <Col xs={24} md={16}>
                    {/* Introduction */}
                    <div>
                      <Title level={3}>Giới thiệu</Title>
                      <Form.Item
                        name="introduction"
                        rules={[
                          {
                            message:
                              'Please enter your career objective or introduction',
                          },
                        ]}
                      >
                        <Input.TextArea
                          rows={4}
                          placeholder="Mục tiêu nghề nghiệp của bạn, bao gồm mục tiêu ngắn hạn và dài hạn."
                        />
                      </Form.Item>
                    </div>

                    <Divider />

                    {/* Work Experience */}
                    <div>
                      <Title level={3}>Kinh nghiệm làm việc</Title>
                      <Form.List name="workExperience">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card
                                key={key}
                                type="inner"
                                title={`Kinh nghiệm ${name + 1}`}
                                extra={
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                  >
                                    Xóa
                                  </Button>
                                }
                                style={{ marginBottom: 16 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'company']}
                                  label="Tên công ty"
                                  rules={[
                                    {
                                      message: 'Please enter the company name',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Company Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'position']}
                                  label="Vị trí"
                                  rules={[
                                    {
                                      message: 'Please enter your position',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Position" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'period']}
                                  label="Thời gian làm việc"
                                  rules={[
                                    {
                                      message: 'Please enter the work period',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Work Period" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description']}
                                  label="Mô tả công việc"
                                  rules={[
                                    {
                                      message: 'Please enter the job description',
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    rows={4}
                                    placeholder="Job Description"
                                  />
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
                                Thêm kinh nghiệm làm việc
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>

                    <Divider />

                    {/* Education */}
                    <div>
                      <Title level={3}>Học vấn</Title>
                      <Form.List name="education">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card
                                key={key}
                                type="inner"
                                title={`Học vấn ${name + 1}`}
                                extra={
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                  >
                                    Xóa
                                  </Button>
                                }
                                style={{ marginBottom: 16 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'school']}
                                  label="Tên trường"
                                  rules={[
                                    {
                                      message: 'Please enter the school name',
                                    },
                                  ]}
                                >
                                  <Input placeholder="School Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'degree']}
                                  label="Bằng cấp / Chuyên ngành"
                                  rules={[
                                    {
                                      message: 'Please enter your degree or major',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Degree / Major" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'period']}
                                  label="Thời gian học"
                                  rules={[
                                    {
                                      message: 'Please enter the study period',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Study Period" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description']}
                                  label="Mô tả (Tùy chọn)"
                                  rules={[
                                    {
                                      message: 'Please enter the description',
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    rows={4}
                                    placeholder="Description (Optional)"
                                  />
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
                                Thêm học vấn
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>

                    <Divider />

                    {/* Projects */}
                    <div>
                      <Title level={3}>Dự án</Title>
                      <Form.List name="projects">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card
                                key={key}
                                type="inner"
                                title={`Dự án ${name + 1}`}
                                extra={
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                  >
                                    Xóa
                                  </Button>
                                }
                                style={{ marginBottom: 16 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'name']}
                                  label="Tên dự án"
                                  rules={[
                                    {
                                      message: 'Please enter the project name',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Project Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'period']}
                                  label="Thời gian thực hiện"
                                  rules={[
                                    {
                                      message: 'Please enter the project period',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Project Period" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'role']}
                                  label="Vai trò của bạn"
                                  rules={[
                                    {
                                      message: 'Please enter your role',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Your Role" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description']}
                                  label="Mô tả dự án"
                                  rules={[
                                    {
                                      message: 'Please enter the project description',
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    rows={4}
                                    placeholder="Project Description"
                                  />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'technologies']}
                                  label="Công nghệ sử dụng"
                                  rules={[
                                    {
                                      message: 'Please enter the technologies used',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Technologies Used" />
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
                                Thêm dự án
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>

                    <Divider />

                    {/* Certifications & Awards */}
                    <div>
                      <Title level={3}>Chứng chỉ & Giải thưởng</Title>
                      <Form.List name="certifications">
                        {(fields, { add, remove }) => (
                          <>
                            {fields.map(({ key, name, ...restField }) => (
                              <Card
                                key={key}
                                type="inner"
                                title={`Chứng chỉ & Giải thưởng ${name + 1}`}
                                extra={
                                  <Button
                                    type="link"
                                    danger
                                    onClick={() => remove(name)}
                                  >
                                    Xóa
                                  </Button>
                                }
                                style={{ marginBottom: 16 }}
                              >
                                <Form.Item
                                  {...restField}
                                  name={[name, 'name']}
                                  label="Tên chứng chỉ / Giải thưởng"
                                  rules={[
                                    {
                                      message:
                                        'Please enter the certification or award name',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Certification/Award Name" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'date']}
                                  label="Ngày nhận"
                                  rules={[
                                    {
                                      message: 'Please enter the date received',
                                    },
                                  ]}
                                >
                                  <Input placeholder="Date Received" />
                                </Form.Item>
                                <Form.Item
                                  {...restField}
                                  name={[name, 'description']}
                                  label="Mô tả (Tùy chọn)"
                                  rules={[
                                    {
                                      message: 'Please enter the description',
                                    },
                                  ]}
                                >
                                  <Input.TextArea
                                    rows={4}
                                    placeholder="Description (Optional)"
                                  />
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
                                Thêm giải thưởng
                              </Button>
                            </Form.Item>
                          </>
                        )}
                      </Form.List>
                    </div>
                  </Col>
                </Row>
              </Card>

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
            </Form>
          </Content>
        </Layout>
      ) : (
        <div>Loading...</div>
      )}
    </div>
  );
}

export default EditCvUser;
