import React, { useEffect, useState } from "react";
import { Form, Input, Button, Row, Col, message } from "antd";
import "./createCV.scss";
import {
  MailOutlined,
  PhoneOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";
import { createCv } from "../../services/cvService";
import { getCookie } from "../../helpers/cookies";
import { getDetailUser } from "../../services/userService";
import { useNavigate } from "react-router-dom";
import { getTimeCurrent } from "../../helpers/getTime";

const { TextArea } = Input;

function CreateCV2() {
  const [info, setInfo] = useState([]);
  const [form] = Form.useForm();
  const idUser = getCookie("id");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailUser(idUser);
      if (response) {
        setInfo(response);
        form.setFieldsValue({
          nameUser: response.nameUser,
          phone: response.phone,

          email: response.email,
        });
      }
    };
    fetchApi();
  }, [idUser, form]);

  const onFinish = async (values) => {
    values.updateAt = getTimeCurrent();
    const data = { ...values, idUser: parseInt(idUser) };

    const result = await createCv(data);
    // console.log(values);

    if (result) {
      message.success("Bạn đã tạo CV thành công");
      navigate("/manager-Cv-user");
    } else {
      message.error("Failed to create CV");
    }
  };
  // console.log(info);

  return (
    <>
      {info ? (
        <Form
          form={form}
          onFinish={onFinish}
          className="cv cv--modern"
          layout="vertical"
          style={{ maxWidth: "800px", margin: "0 auto" }}
          initialValues={{
            careerObjectives: [{}],
            workExperience: [{}],
            education: [{}],
            skills: [{}],
            awards: [{}],
            certificates: [{}],
            hobbies: [{}],
            info: info,
          }}
        >
          <Row gutter={16} align="middle">
            {/* Tên và vị trí ứng tuyển */}
            <Col span={16}>
              <div className="personal_item">
                <Form.Item name="nameUser">
                  <Input className="border__none personal-info__name" />
                </Form.Item>
                <Form.Item name="jobPosition">
                  <Input
                    className="border__none personal-info__position"
                    placeholder={"Vị trí ứng tuyển"}
                  />
                </Form.Item>
              </div>
            </Col>

            {/* Thông tin liên lạc */}
            <Col span={8}>
              <div className="personal-info__contact">
                <div className="contact-item">
                  <PhoneOutlined className="icon" />
                  <Form.Item name="phone">
                    <Input className="border__none personal-info__phone" />
                  </Form.Item>
                </div>
                <div className="contact-item">
                  <MailOutlined className="icon" />
                  <Form.Item
                    name="email"
                    rules={[{ type: "email", message: "Email không hợp lệ!" }]}
                  >
                    <Input
                      className="border__none personal-info__email"
                      placeholder="Nhập email"
                    />
                  </Form.Item>
                </div>
                <div className="contact-item">
                  <EnvironmentOutlined className="icon" />
                  <Form.Item name="address">
                    <Input
                      className="border__none personal-info__address"
                      placeholder="Địa chỉ"
                    />
                  </Form.Item>
                </div>
              </div>
            </Col>
          </Row>

          {/* Mục tiêu nghề nghiệp - Dynamic List */}
          <div className="section">
            <h3 className="section-header">Mục tiêu nghề nghiệp</h3>
            <div className="section-content">
              <Form.List name="careerObjectives">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <Row key={key} gutter={16} align="middle">
                        <Col span={20}>
                          <Form.Item
                            {...restField}
                            name={[name, "objective"]}
                            fieldKey={[fieldKey, "objective"]}
                          >
                            <TextArea
                              className="border__none"
                              rows={3}
                              placeholder="Mô tả mục tiêu nghề nghiệp của bạn"
                            />
                          </Form.Item>
                        </Col>
                        <Col span={4}>
                          <Button
                            type="danger"
                            icon={<MinusCircleOutlined />}
                            onClick={() => remove(name)}
                          >
                            Xóa
                          </Button>
                        </Col>
                      </Row>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm mục tiêu
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          {/* Kinh nghiệm làm việc - Dynamic List */}
          <div className="section">
            <h3 className="section-header">Kinh nghiệm làm việc</h3>
            <div className="section-content">
              <Form.List name="workExperience">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key} className="timeline-item">
                        <Row gutter={16} align="middle">
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "companyName"]}
                              fieldKey={[fieldKey, "companyName"]}
                            >
                              <Input
                                className="border__none"
                                placeholder="Tên công ty"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "jobTitle"]}
                              fieldKey={[fieldKey, "jobTitle"]}
                            >
                              <Input
                                className="border__none"
                                placeholder="Vị trí công việc"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Button
                              type="danger"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            >
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                        <Row gutter={16} align="middle">
                          <Col span={10}>
                            {" "}
                            <Form.Item
                              {...restField}
                              name={[name, "jobDuration"]}
                              fieldKey={[fieldKey, "jobDuration"]}
                            >
                              <Input
                                className="border__none"
                                placeholder="Bắt đầu - Kết thúc"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "jobDescription"]}
                              fieldKey={[fieldKey, "jobDescription"]}
                            >
                              <TextArea
                                className="border__none"
                                rows={3}
                                placeholder="Mô tả kinh nghiệm làm việc của bạn"
                              />
                            </Form.Item>
                          </Col>
                        </Row>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm kinh nghiệm làm việc
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          {/* Học vấn - Dynamic List */}
          <div className="section">
            <h3 className="section-header">Học vấn</h3>
            <div className="section-content">
              <Form.List name="education">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, fieldKey, ...restField }) => (
                      <div key={key}>
                        <Row gutter={16} align="middle">
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "educationPeriod"]}
                              fieldKey={[fieldKey, "educationPeriod"]}
                            >
                              <Input
                                className="border__none"
                                placeholder="Bắt đầu - Kết thúc"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={10}>
                            <Form.Item
                              {...restField}
                              name={[name, "educationSchool"]}
                              fieldKey={[fieldKey, "educationSchool"]}
                            >
                              <Input
                                className="border__none"
                                placeholder="Tên trường học"
                              />
                            </Form.Item>
                          </Col>
                          <Col span={4}>
                            <Button
                              type="danger"
                              icon={<MinusCircleOutlined />}
                              onClick={() => remove(name)}
                            >
                              Xóa
                            </Button>
                          </Col>
                        </Row>
                        <Form.Item
                          {...restField}
                          name={[name, "educationField"]}
                          fieldKey={[fieldKey, "educationField"]}
                        >
                          <Input
                            className="border__none"
                            placeholder="Ngành học / Môn học"
                          />
                        </Form.Item>
                      </div>
                    ))}

                    <Form.Item>
                      <Button
                        type="dashed"
                        onClick={() => add()}
                        block
                        icon={<PlusOutlined />}
                      >
                        Thêm học vấn
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </div>
          </div>

          {/* Kỹ năng - Dynamic List */}

          {/* Danh hiệu - Dynamic List */}
          <Row gutter={20}>
            <Col span={7}>
              <div className="section">
                <h3 className="section-header">Danh hiệu</h3>
                <div className="section-content">
                  <Form.List name="awards">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Row key={key} gutter={16} align="middle">
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "awardPeriod"]}
                                fieldKey={[fieldKey, "awardPeriod"]}
                              >
                                <Input
                                  className="border__none"
                                  placeholder="Bắt đầu - Kết thúc"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "awardName"]}
                                fieldKey={[fieldKey, "awardName"]}
                              >
                                <Input
                                  className="border__none"
                                  placeholder="Tên danh hiệu"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Button
                                type="danger"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                              >
                                Xóa
                              </Button>
                            </Col>
                          </Row>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm danh hiệu
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              </div>
            </Col>
            <Col span={7}>
              <div className="section">
                <h3 className="section-header">Chứng chỉ</h3>
                <div className="section-content">
                  <Form.List name="certificates">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Row key={key} gutter={16} align="middle">
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "certificatePeriod"]}
                                fieldKey={[fieldKey, "certificatePeriod"]}
                              >
                                <Input
                                  className="border__none"
                                  placeholder="Bắt đầu - Kết thúc"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "certificateName"]}
                                fieldKey={[fieldKey, "certificateName"]}
                              >
                                <Input
                                  className="border__none"
                                  placeholder="Tên chứng chỉ"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Button
                                type="danger"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                              >
                                Xóa
                              </Button>
                            </Col>
                          </Row>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm chứng chỉ
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              </div>
            </Col>
            <Col span={7}>
              {" "}
              <div className="section">
                <h3 className="section-header">Các kỹ năng</h3>
                <div className="section-content">
                  <Form.List name="skills">
                    {(fields, { add, remove }) => (
                      <>
                        {fields.map(({ key, name, fieldKey, ...restField }) => (
                          <Row key={key} gutter={16} align="middle">
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "skillName"]}
                                fieldKey={[fieldKey, "skillName"]}
                              >
                                <Input
                                  className="border__none"
                                  placeholder="Tên kỹ năng"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={24}>
                              <Form.Item
                                {...restField}
                                name={[name, "skillDescription"]}
                                fieldKey={[fieldKey, "skillDescription"]}
                              >
                                <TextArea
                                  className="border__none"
                                  rows={1}
                                  placeholder="Mô tả kỹ năng"
                                />
                              </Form.Item>
                            </Col>
                            <Col span={4}>
                              <Button
                                type="danger"
                                icon={<MinusCircleOutlined />}
                                onClick={() => remove(name)}
                              >
                                Xóa
                              </Button>
                            </Col>
                          </Row>
                        ))}

                        <Form.Item>
                          <Button
                            type="dashed"
                            onClick={() => add()}
                            block
                            icon={<PlusOutlined />}
                          >
                            Thêm kỹ năng
                          </Button>
                        </Form.Item>
                      </>
                    )}
                  </Form.List>
                </div>
              </div>
            </Col>
          </Row>

          {/* Chứng chỉ - Dynamic List */}

          {/* Sở thích - Dynamic List */}

          {/* Nút submit */}
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Tạo CV
            </Button>
          </Form.Item>
        </Form>
      ) : (
        <></>
      )}
    </>
  );
}

export default CreateCV2;
