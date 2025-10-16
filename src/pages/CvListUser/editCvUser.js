import React, { useEffect, useState } from "react";

import {
  Layout,
  Row,
  Col,
  Typography,
  Form,
  Input,
  Button,
  message,
} from "antd";
import { MailOutlined } from "@ant-design/icons";
import {
  PhoneOutlined,
  EnvironmentOutlined,
  PlusOutlined,
  MinusCircleOutlined,
} from "@ant-design/icons";

import {
  editCvUser,
  getDetailCvUser,
  timeUpDateCv,
} from "../../services/cvService";
import { useParams } from "react-router-dom";

import { getTimeCurrent } from "../../helpers/getTime";

const { TextArea } = Input;

function EditCvUser() {
  const [form] = Form.useForm();
  const params = useParams();

  const [info, setInfo] = useState();

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getDetailCvUser(params.id);
      if (response) {
        setInfo(response);
      }
    };
    fetchApi();
  }, []);
  // console.log(info.avatar);

  const onFinish = async (values) => {
    timeUpDateCv(params.id, { updateAt: getTimeCurrent() });

    console.log(values);

    const result = await editCvUser(params.id, values);

    if (result) {
      message.success("Sửa CV thành công.");
    } else {
      message.error("Failed to create CV");
    }
  };

  return (
    <>
      <div className="container" style={{ padding: "24px" }}>
        {info ? (
          <Form
            form={form}
            onFinish={onFinish}
            className="cv"
            layout="vertical"
            style={{ maxWidth: "800px", margin: "0 auto" }}
            initialValues={info}
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
                      <Input
                        className="border__none personal-info__phone"
                        placeholder="Số điện thoại"
                      />
                    </Form.Item>
                  </div>
                  <div className="contact-item">
                    <MailOutlined className="icon" />
                    <Form.Item
                      name="email"
                      rules={[
                        { type: "email", message: "Email không hợp lệ!" },
                      ]}
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
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
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
                            )
                          )}

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
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
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
                            )
                          )}

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
                          {fields.map(
                            ({ key, name, fieldKey, ...restField }) => (
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
                            )
                          )}

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
                Lưu thông tin
              </Button>
            </Form.Item>
          </Form>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </>
  );
}

export default EditCvUser;
