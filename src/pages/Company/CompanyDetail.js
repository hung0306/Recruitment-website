import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailCompany } from "../../services/companyService";
import { getListJob } from "../../services/jobService";
import { Card, Col, Row } from "antd";
import Jobitem from "../../Components/Jobitem";

import "./CompanyDetail.scss";
import {
  ClockCircleOutlined,
  FlagOutlined,
  TeamOutlined,
  PhoneOutlined,
  CompassOutlined,
  AimOutlined,
  MedicineBoxOutlined,
  HeatMapOutlined,
} from "@ant-design/icons";

function CompanyDetail() {
  const params = useParams();
  const [infoCompany, setInfoCompany] = useState([]);
  const [jobs, setJobs] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getDetailCompany(params.id);
      setInfoCompany(response);
    };
    fetchAPI();
  }, []);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListJob(params.id);
      setJobs(response);
    };
    fetchAPI();
  }, []);
  // console.log(jobs);
  // console.log(infoCompany);
  // console.log(jobs);

  return (
    <>
      {infoCompany && (
        <>
          <div className="Title__company">
            <div className="Title__company__img">
              <img src={infoCompany.website} alt="Company Logo" />
            </div>
            <div>
              <h1 className="Title__company__h1">{infoCompany.companyName}</h1>
              <div className="Title__company__p">
                <MedicineBoxOutlined /> {jobs.length} công việc đang tuyển
              </div>
              <div className="Title__company__p1">
                <HeatMapOutlined /> Địa chỉ: {infoCompany.address}
              </div>
            </div>
            <div className="rating-block">
              <div className="rating-info">
                <div className="rating-number">4.8</div>
                <div className="stars">★★★★★</div>
                <div className="reviews">99 đánh giá</div>
              </div>
              <div className="recommendation">
                <span className="percentage">94%</span>
                <br />
                Khuyến khích làm việc tại đây
              </div>
            </div>
          </div>

          <Card className="companydetail" title="Thông tin chung">
            <Row gutter={[16, 30]}>
              <Col span={8}>
                <div className="titlee">
                  {" "}
                  <AimOutlined /> Địa chỉ
                </div>
                <br />
                <div>{infoCompany.address}</div>
              </Col>

              <Col span={8}>
                <div className="titlee">
                  {" "}
                  <FlagOutlined /> Quốc gia
                </div>
                <br />
                <div>Vietnam</div>
              </Col>
              <Col span={8}>
                <div className="titlee">
                  <ClockCircleOutlined /> Thời gian làm việc
                </div>
                <br />
                <div>{infoCompany.workingTime}</div>
              </Col>
              <Col span={8}>
                <div className="titlee">
                  <TeamOutlined /> Quy mô công ty
                </div>
                <br />
                <div>{infoCompany.quantityPeople} nhân viên</div>
              </Col>
              <Col span={8}>
                <div className="titlee">
                  <CompassOutlined /> Fanpage
                </div>
                <br />
                <div>{`https:/${infoCompany.companyName}`}</div>
              </Col>

              <Col span={8}>
                <div className="titlee">
                  <PhoneOutlined /> HotLine
                </div>
                <br />
                <div>{infoCompany.phone}</div>
              </Col>
              <Col span={24}>
                <div className="titlee">Mô tả công ty</div>
                <br />
                <div>{infoCompany.description}</div>
              </Col>
            </Row>
          </Card>
          {/*                     
                    <div className="mb-10 fs-20">Mô tả ngắn: <strong>{infoCompany.description}</strong> </div>

                    <div className="mb-10 fs-20">Mô tả chi tiết: <strong>{infoCompany.detail}</strong></div>
                    <div className="mb-10 fs-20">Địa chỉ: <strong>{infoCompany.address}</strong></div>

                    <div className="mb-10 fs-20">Số lượng nhân sự: <strong>{infoCompany.quantityPeople}</strong></div>

                    <div className="mb-10 fs-20">Thời gian làm việc:<strong>{infoCompany.workingTime}</strong></div>

                    <div className="mb-10 fs-20">Link website: <strong>{infoCompany.website}</strong></div> */}

          <div style={{ width: "1100px", margin: "auto" }}>
            <strong className="fs-20">Việc làm đang tuyển dụng:</strong>
            <div>
              {jobs.length > 0 ? (
                <Row gutter={[20, 20]} className="mt-20">
                  {jobs.map((item) => (
                    <Col span={8} key={item.id}>
                      <Jobitem item={item} />
                    </Col>
                  ))}
                </Row>
              ) : (
                <p>Không có công việc nào để hiển thị.</p>
              )}
            </div>
          </div>
        </>
      )}
    </>
  );
}
export default CompanyDetail;
