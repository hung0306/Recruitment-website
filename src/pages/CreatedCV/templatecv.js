import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";
import "./templatecv.scss";

function Templatecv() {
  return (
    <div className="template-container">
      <div className="template-header">
        <Typography.Title level={2} className="template-title">
          Chọn mẫu CV để bắt đầu
        </Typography.Title>
        <Typography.Paragraph className="template-subtitle">
          Mỗi mẫu có bố cục khác nhau. Bạn có thể chỉnh sửa nội dung sau khi
          chọn.
        </Typography.Paragraph>
      </div>

      <Row gutter={[24, 24]}>
        <Col xs={24} md={12}>
          <Link to="/create-CV2">
            <Card hoverable className="template-card" title="Mẫu CV 1">
              <div className="template-card__preview placeholder-1" />
              <Typography.Text type="secondary">
                Kiểu truyền thống, nhập thủ công.
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col xs={24} md={12}>
          <Link to="/create-CV1">
            <Card hoverable className="template-card" title="Mẫu CV 2">
              <div className="template-card__preview placeholder-2" />
              <Typography.Text type="secondary">
                Kiểu hiện đại, bố cục khác.
              </Typography.Text>
            </Card>
          </Link>
        </Col>
      </Row>
    </div>
  );
}
export default Templatecv;
