import { useEffect, useState } from "react";
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
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  GlobalOutlined,
  EnvironmentOutlined,
  UserOutlined,
  SendOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import { getCookie } from "../../helpers/cookies";
import { getDetailUser } from "../../services/userService";
import { createCv } from "../../services/cvService";
import "./createCV.scss";

const { Content } = Layout;
const { Title } = Typography;

function CreateCV1() {
  const [form] = Form.useForm();
  const idUser = getCookie("id");

  const [info, setInfo] = useState();
  const [avatar, setAvatar] = useState(null);
  const [imageName, setImageName] = useState("");

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
  }, [idUser]);
  console.log(info);

  const onFinish = async (values) => {
    const data = { ...values, avatar: imageName, idUser: idUser };

    const result = await createCv(data);
    console.log(result);

    if (result) {
      message.success("CV created successfully");

      form.resetFields();
      setAvatar(null);
      setImageName("");
    } else {
      message.error("Failed to create CV");
    }
  };

  const handleUpload = (file) => {
    const isImage = file.type.startsWith("image/");
    if (!isImage) {
      message.error("You can only upload image files!");
      return false;
    }

    // Optionally, validate file size (e.g., less than 2MB)
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must be smaller than 2MB!");
      return false;
    }

    // Read the file and set the avatar preview
    const reader = new FileReader();
    reader.onload = () => {
      setAvatar(reader.result);
    };
    reader.readAsDataURL(file);

    setImageName(file.name);

    return false;
  };

  return (
    <>
      <div className="container" style={{ padding: "24px" }}>
        {info ? (
          <Layout>
            <Content>
              <Form
                form={form}
                initialValues={info}
                onFinish={onFinish}
                layout="vertical"
                className="cv cv--classic cv1"
              >
                <Card>
                  {/* Professional Header Section */}
                  <div className="cv1-header">
                    <Row gutter={[24, 24]} align="top">
                      <Col xs={24} md={6}>
                        <div className="cv1-photo-section">
                          <Form.Item name="avatar">
                            <Upload
                              listType="picture-card"
                              showUploadList={false}
                              beforeUpload={handleUpload}
                              className="cv1-avatar-upload"
                            >
                              {avatar ? (
                                <div className="cv1-avatar-container">
                                  <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="cv1-avatar-image"
                                  />
                                </div>
                              ) : (
                                <div className="cv1-avatar-placeholder">
                                  <UserOutlined className="cv1-avatar-icon" />
                                  <div className="cv1-upload-hint">
                                    <UploadOutlined />
                                    <span>Upload ảnh</span>
                                  </div>
                                </div>
                              )}
                            </Upload>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col xs={24} md={18}>
                        <div className="cv1-personal-info">
                          <Form.Item
                            name="nameUser"
                            rules={[{ message: "Please enter your full name" }]}
                          >
                            <Input
                              placeholder="Họ và tên"
                              className="cv1-name-input"
                            />
                          </Form.Item>

                          <Form.Item
                            name="position"
                            rules={[
                              {
                                message:
                                  "Please enter the position you are applying for",
                              },
                            ]}
                          >
                            <Input
                              placeholder="Vị trí ứng tuyển"
                              className="cv1-position-input"
                            />
                          </Form.Item>

                          <div className="cv1-contact-grid">
                            <Form.Item
                              name="phone"
                              rules={[
                                { message: "Please enter your phone number" },
                                {
                                  pattern: /^\+?\d{10,15}$/,
                                  message: "Please enter a valid phone number",
                                },
                              ]}
                            >
                              <Input
                                prefix={<PhoneOutlined />}
                                placeholder="Số điện thoại"
                                className="cv1-contact-input"
                              />
                            </Form.Item>
                            <Form.Item
                              name="email"
                              rules={[
                                {
                                  type: "email",
                                  message: "Please enter a valid email",
                                },
                                { message: "Please enter your email" },
                              ]}
                            >
                              <Input
                                prefix={<MailOutlined />}
                                placeholder="Email"
                                className="cv1-contact-input"
                              />
                            </Form.Item>
                            <Form.Item name="website">
                              <Input
                                prefix={<GlobalOutlined />}
                                placeholder="Website/LinkedIn"
                                className="cv1-contact-input"
                              />
                            </Form.Item>
                            <Form.Item name="location">
                              <Input
                                prefix={<EnvironmentOutlined />}
                                placeholder="Địa chỉ"
                                className="cv1-contact-input"
                              />
                            </Form.Item>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>

                  <Divider />

                  {/* Career Objective Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        MỤC TIÊU NGHỀ NGHIỆP
                      </Title>
                    </div>
                    <Form.Item
                      name="introduction"
                      rules={[
                        {
                          message:
                            "Please enter your career objective or introduction",
                        },
                      ]}
                    >
                      <Input.TextArea
                        rows={3}
                        placeholder="Mô tả mục tiêu nghề nghiệp của bạn..."
                        className="cv1-textarea"
                      />
                    </Form.Item>
                  </div>

                  <Divider />

                  {/* Education Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        HỌC VẤN
                      </Title>
                    </div>
                    <Form.List name="education">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className="cv1-education-item">
                              <Row gutter={[16, 16]}>
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "period"]}
                                    rules={[
                                      {
                                        message:
                                          "Please enter the study period",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Thời gian học" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={18}>
                                  <div className="cv1-education-content">
                                    <Form.Item
                                      {...restField}
                                      name={[name, "school"]}
                                      rules={[
                                        {
                                          message:
                                            "Please enter the school name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Tên trường"
                                        className="cv1-school-input"
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "degree"]}
                                      rules={[
                                        {
                                          message:
                                            "Please enter your degree or major",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Chuyên ngành" />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "description"]}
                                    >
                                      <Input.TextArea
                                        rows={3}
                                        placeholder="Mô tả thêm về quá trình học tập, thành tích..."
                                      />
                                    </Form.Item>
                                  </div>
                                </Col>
                              </Row>
                              <Button
                                type="text"
                                danger
                                onClick={() => remove(name)}
                                className="cv1-remove-btn"
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
                              Thêm học vấn
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>

                  <Divider />

                  {/* Work Experience Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        KINH NGHIỆM LÀM VIỆC
                      </Title>
                    </div>
                    <Form.List name="workExperience">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div key={key} className="cv1-work-item">
                              <Row gutter={[16, 16]}>
                                <Col xs={24} md={6}>
                                  <Form.Item
                                    {...restField}
                                    name={[name, "period"]}
                                    rules={[
                                      {
                                        message: "Please enter the work period",
                                      },
                                    ]}
                                  >
                                    <Input placeholder="Thời gian làm việc" />
                                  </Form.Item>
                                </Col>
                                <Col xs={24} md={18}>
                                  <div className="cv1-work-content">
                                    <Form.Item
                                      {...restField}
                                      name={[name, "company"]}
                                      rules={[
                                        {
                                          message:
                                            "Please enter the company name",
                                        },
                                      ]}
                                    >
                                      <Input
                                        placeholder="Tên công ty"
                                        className="cv1-company-input"
                                      />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "position"]}
                                      rules={[
                                        {
                                          message: "Please enter your position",
                                        },
                                      ]}
                                    >
                                      <Input placeholder="Vị trí" />
                                    </Form.Item>
                                    <Form.Item
                                      {...restField}
                                      name={[name, "description"]}
                                      rules={[
                                        {
                                          message:
                                            "Please enter the job description",
                                        },
                                      ]}
                                    >
                                      <Input.TextArea
                                        rows={4}
                                        placeholder="Mô tả công việc, trách nhiệm và thành tích..."
                                      />
                                    </Form.Item>
                                  </div>
                                </Col>
                              </Row>
                              <Button
                                type="text"
                                danger
                                onClick={() => remove(name)}
                                className="cv1-remove-btn"
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
                              Thêm kinh nghiệm làm việc
                            </Button>
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                  </div>

                  <Divider />

                  {/* Skills Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        KỸ NĂNG
                      </Title>
                    </div>
                    <Form.List name="skills">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                            >
                              <Form.Item
                                {...restField}
                                name={name}
                                rules={[{ message: "Please enter a skill" }]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Input placeholder="Kỹ năng" />
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

                  {/* Languages Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        NGÔN NGỮ
                      </Title>
                    </div>
                    <Form.List name="languages">
                      {(fields, { add, remove }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <div
                              key={key}
                              style={{ display: "flex", marginBottom: 8 }}
                            >
                              <Form.Item
                                {...restField}
                                name={name}
                                rules={[{ message: "Please enter a language" }]}
                                style={{ flex: 1, marginRight: 8 }}
                              >
                                <Input placeholder="Ngôn ngữ" />
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

                  <Divider />

                  {/* Projects Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        DỰ ÁN
                      </Title>
                    </div>
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
                                name={[name, "name"]}
                                label="Tên dự án"
                                rules={[
                                  {
                                    message: "Please enter the project name",
                                  },
                                ]}
                              >
                                <Input placeholder="Project Name" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "period"]}
                                label="Thời gian thực hiện"
                                rules={[
                                  {
                                    message: "Please enter the project period",
                                  },
                                ]}
                              >
                                <Input placeholder="Project Period" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "role"]}
                                label="Vai trò của bạn"
                                rules={[
                                  {
                                    message: "Please enter your role",
                                  },
                                ]}
                              >
                                <Input placeholder="Your Role" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "description"]}
                                label="Mô tả dự án"
                                rules={[
                                  {
                                    message:
                                      "Please enter the project description",
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
                                name={[name, "technologies"]}
                                label="Công nghệ sử dụng"
                                rules={[
                                  {
                                    message:
                                      "Please enter the technologies used",
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

                  {/* Certifications & Awards Section */}
                  <div className="cv1-section">
                    <div className="cv1-section-header">
                      <Title level={3} className="cv1-section-title">
                        CHỨNG CHỈ & GIẢI THƯỞNG
                      </Title>
                    </div>
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
                                name={[name, "name"]}
                                label="Tên chứng chỉ / Giải thưởng"
                                rules={[
                                  {
                                    message:
                                      "Please enter the certification or award name",
                                  },
                                ]}
                              >
                                <Input placeholder="Certification/Award Name" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "date"]}
                                label="Ngày nhận"
                                rules={[
                                  {
                                    message: "Please enter the date received",
                                  },
                                ]}
                              >
                                <Input placeholder="Date Received" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "description"]}
                                label="Mô tả (Tùy chọn)"
                                rules={[
                                  {
                                    message: "Please enter the description",
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
                    Tạo CV
                  </Button>
                </Form.Item>
              </Form>
            </Content>
          </Layout>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default CreateCV1;
