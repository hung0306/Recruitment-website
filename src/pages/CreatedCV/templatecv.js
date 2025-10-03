import { Card, Col, Row, Typography } from "antd";
import { Link } from "react-router-dom";

function Templatecv() {
  return (
    <>
      <Row gutter={[20, 20]}>
        <Col span={12}>
          <Link to="/create-CV1">
            <Card
              hoverable
              title="Mẫu CV 1"
              bordered
              style={{ minHeight: 160 }}
            >
              <Typography.Text>
                Kiểu truyền thống, nhập thủ công.
              </Typography.Text>
            </Card>
          </Link>
        </Col>
        <Col span={12}>
          <Link to="/create-CV2">
            <Card
              hoverable
              title="Mẫu CV 2"
              bordered
              style={{ minHeight: 160 }}
            >
              <Typography.Text>Kiểu hiện đại, bố cục khác.</Typography.Text>
            </Card>
          </Link>
        </Col>
      </Row>
    </>
  );
}
export default Templatecv;
