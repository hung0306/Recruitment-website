import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Modal, message } from "antd";
import { getDetailJob } from "../../../services/jobService";
import { getDetailCompany } from "../../../services/companyService";

import PickCv from "./PickCv";
import { getCookie } from "../../../helpers/cookies";
import "./jobDetail.css";
import { SendOutlined } from "@ant-design/icons";

// const [messageApi, contextHolder] = message.useMessage();

function JobDetail() {
  const [messageApi, contextHolder] = message.useMessage();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const params = useParams();
  const [job, setJob] = useState();
  const [form] = Form.useForm();
  useEffect(() => {
    // Always start at top when navigating to job detail to avoid residual scroll
    window.scrollTo({ top: 0, behavior: "instant" });
    const fetchAPI = async () => {
      const response = await getDetailJob(params.id);
      const infoCompany = await getDetailCompany(response.idCompany);
      const dataFinal = {
        ...response,
        infoCompany: infoCompany,
      };
      setJob(dataFinal);
    };
    fetchAPI();
  }, []);
  // console.log(job);

  const showModal = () => {
    const token = getCookie("token");
    setIsModalOpen(true);
    if (!token) {
      message.warning("Bạn cần đăng nhập trước khi ứng tuyển.");
      navigate("/login"); // Chuyển hướng tới trang đăng ký
    } else {
      setIsModalOpen(true); // Mở modal để chọn CV
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {contextHolder}
      {job && (
        <>
          <div className="card">
            <h1 className="title_job_des ">{`${job.name}/ Thu nhập up to ${job.salary}$`}</h1>
            <div className="wrap">
              <div className="info">
                <div className="icon">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1.41 16.09V20h-2.67v-1.93c-1.71-.36-3.16-1.46-3.27-3.4h1.96c.1 1.05.82 1.87 2.65 1.87 1.96 0 2.4-.98 2.4-1.59 0-.83-.44-1.61-2.67-2.14-2.48-.6-4.18-1.62-4.18-3.67 0-1.72 1.39-2.84 3.11-3.21V4h2.67v1.95c1.86.45 2.79 1.86 2.85 3.39H14.3c-.05-1.11-.64-1.87-2.22-1.87-1.5 0-2.4.68-2.4 1.64 0 .84.65 1.39 2.67 1.91s4.18 1.39 4.18 3.91c-.01 1.83-1.38 2.83-3.12 3.16z'/%3E%3C/svg%3E"
                    alt="Salary icon"
                  />
                </div>
                <div>
                  <div className="text__title">Mức lương</div>
                  <div className="text__des">{`Tới ${job.salary}$`}</div>
                </div>
              </div>
              <div className="info">
                <div className="icon">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z'/%3E%3C/svg%3E"
                    alt="Location icon"
                  />
                </div>
                <div>
                  <div className="text__title">Địa điểm</div>
                  <div className="text__des">
                    {job.city.map((item, index) => (
                      <strong key={`${item}-${index}`}>{`${item}, `}</strong>
                    ))}
                  </div>
                </div>
              </div>
              <div className="info">
                <div className="icon">
                  <img
                    src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='white' viewBox='0 0 24 24'%3E%3Cpath d='M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.28 2.54.72-1.21-3.5-2.08V8H12z'/%3E%3C/svg%3E"
                    alt="Experience icon"
                  />
                </div>
                <div>
                  <div className="text__title">Kinh nghiệm</div>
                  <div className="text__des">1 năm</div>
                </div>
              </div>
            </div>

            <div className="buttons">
              <button onClick={showModal} className="apply-btn">
                <SendOutlined /> Ứng tuyển ngay
              </button>
              <button className="save-btn">Lưu tin</button>
            </div>
          </div>

          <div className="des-job">
            <h2>Mô tả công việc</h2>
            <p>{job.description}</p>

            <h2>Yêu Cầu ứng viên</h2>
            <p>
              Hiểu biết các ngôn ngữ lập trình{" "}
              {job.tags.map((item, index) => (
                <strong key={`${item}-${index}`}>{`${item}, `}</strong>
              ))}
            </p>

            <h2>Quyền lợi</h2>
            <strong>Lương up to {job.salary}$/tháng</strong>

            <h2>Địa điểm làm việc</h2>
            <p>- {job.infoCompany.address}</p>

            <h2>Thời gian làm việc</h2>
            <ul>
              <li>{job.infoCompany.workingTime}</li>
            </ul>

            <h2>Cách thức ứng tuyển</h2>
            <p>
              Ứng viên nộp hồ sơ trực tuyến bằng cách bấm{" "}
              <span className="highlight">Ứng tuyển</span>{" "}
            </p>
          </div>

          {/* <Button onClick={showModal} className="mb-20" type="primary" size="large">Ứng tuyển ngay</Button>
                    <div>
                        <span className="mr-20">Tags:</span>
                        {(job.tags || []).map((item, index) => (
                            <Tag color="blue" key={index}>{item}</Tag>
                        ))}
                    </div>

                    <div className="mt-10">
                        <span className="mr-20 ">Thành phố:</span>
                        {(job.city || []).map((item, index) => (
                            <Tag color="orange" key={index}>{item}</Tag>
                        ))}
                    </div>
                    <div className="mt-10">
                        Lương: <strong>{job.salary}$</strong>

                    </div>


                    <div className="mt-10">
                        Địa chỉ: <strong>{job.infoCompany.address}</strong>

                    </div>

                    <div className="mt-10">
                        Ngày tạo: <strong>{job.createAt}</strong>

                    </div>

                    <div className="mt-10">
                        <div>Mô tả công việc:</div>
                        <strong>{job.description}</strong>
                    </div>

                    <div className="mt-10">
                        <div>Giới thiệu công ty:</div>
                        <strong>{job.infoCompany.description}</strong>
                    </div> */}
          {/* <Spin spinning={xoay} tip="vui lòng chờ...">
                        <Card className="mt-20" title="Ứng Tuyển Ngay" id="formApply"  >
                            <Form layout="vertical" name="form_apply" form={form} onFinish={onFinish}>
                                <Row gutter={[20, 50]}>
                                    <Col xxl={6} xl={6}>
                                        <Form.Item label="Họ tên" name="name" rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập tên!',
                                            },
                                        ]}>
                                            <Input />

                                        </Form.Item>
                                    </Col>


                                    <Col xxl={6} xl={6}>
                                        <Form.Item label="Số điện thoại" name="phone">
                                            <Input />

                                        </Form.Item>



                                    </Col>

                                    <Col>
                                        <Form.Item label="Email" name="email" rules={[
                                            {
                                                required: true,
                                                message: 'Vui lòng nhập email!',
                                                type:'email'
                                            },
                                        ]}>
                                            <Input />

                                        </Form.Item>
                                    </Col>



                                    <Col xxl={6} xl={6}>
                                        <Form.Item label="Thành phố" name="city">
                                            <Select>
                                                {job.city.map((item, index) => (
                                                    <Option value={item} label={item} key={index}>

                                                    </Option>
                                                ))}

                                            </Select>

                                        </Form.Item>
                                    </Col>
                                    <Col xxl={12} xl={12}>
                                        <Form.Item label="Giới thiệu bản thân" name="description">
                                            <Input.TextArea rows={6}>

                                            </Input.TextArea>
                                        </Form.Item>
                                    </Col>








                                    <Col xxl={12} xl={12}>
                                        <Form.Item label="Project đã làm" name="linkProject">
                                            <Input.TextArea rows={6}>

                                            </Input.TextArea>
                                        </Form.Item>
                                    </Col>

                                    <Col offset={12}>
                                        <Form.Item >
                                            <Button type="primary" htmlType="submit">Gửi yêu cầu</Button>
                                        </Form.Item>
                                    </Col>


                                </Row>
                            </Form>

                        </Card>

                    </Spin> */}
          <Modal
            footer={null}
            title="Chọn CV bạn muốn dùng để ứng tuyển"
            open={isModalOpen}
            onCancel={handleCancel}
          >
            <PickCv handleCancel={handleCancel} />
          </Modal>
        </>
      )}
    </>
  );
}
export default JobDetail;
