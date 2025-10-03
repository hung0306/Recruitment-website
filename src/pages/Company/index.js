import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";
import { Col, Row, Card } from "antd";
import { Link } from "react-router-dom";
import Goback from "../../Components/Goback";

function Company() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getCompany();
      setData(response);
    };
    fetchAPI();
  }, []);
  return (
    <>
      <Goback />
      <h1 className="center">Danh sách công ty</h1>
      <Row gutter={[20, 20]}>
        {data.map((item) => (
          <Col key={item.id}>
            <Link to={`/company/${item.id}`}>
              <Card>
                <div>Công ty: {item.companyName}</div>
                <div>Số nhân sự: {item.quantityPeople}</div>
                <div>Địa chỉ: {item.address}</div>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
}
export default Company;
