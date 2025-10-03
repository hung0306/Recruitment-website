import { Col, Row } from "antd";
import JobStatistic from "./JobStatistic";
import CvStatistic from "./CvStatistic";
import InfoCompany from "./InfoCompany";
import Char from "./chart";
import Char1 from "./chart1";
import "./dashboard.scss";

function Dashboard() {
  return (
    <>
      <h1>Tổng quan</h1>
      <div className="dashboard">
        <Row gutter={[19, 20]} style={{ marginBottom: "20px" }}>
          <Col span={12}>
            {" "}
            <Char1 />
          </Col>
          <Col span={12}>
            <Char />
          </Col>

          <Col span={8}>
            <JobStatistic />
          </Col>

          <Col span={8}>
            <CvStatistic />
          </Col>

          <Col span={8}>
            <InfoCompany />
          </Col>
        </Row>
      </div>
    </>
  );
}
export default Dashboard;
