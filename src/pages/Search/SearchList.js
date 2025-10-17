import { useEffect, useState } from "react";
import { getCompany } from "../../services/companyService";
import { Col, Row } from "antd";
import Jobitem from "../../Components/Jobitem";
import "./search.scss";

function SearchList(props) {
  const { data = [] } = props;
  // console.log(data);
  const [dataFinal, setDataFinal] = useState([]);
  useEffect(() => {
    const fetchAPI = async () => {
      const company = await getCompany();
      // console.log(company);
      const newdata = data.map((item) => {
        const infoCompany = company.find(
          (itemCompany) => itemCompany.id === item.idCompany && itemCompany
        );
        return {
          infoCompany: infoCompany,
          ...item,
        };
      });
      setDataFinal(newdata);
    };
    fetchAPI();
  }, [data]);
  // console.log(dataFinal);

  return (
    <>
      {dataFinal.length > 0 ? (
        <div className="item-search">
          <Row gutter={[30, 30]}>
            {dataFinal.map((item) => (
              <Col span={8} key={item.id}>
                <Jobitem item={item} />
              </Col>
            ))}
          </Row>
        </div>
      ) : (
        <div>Không tìm thấy job theo yêu cầu của bạn</div>
      )}
    </>
  );
}
export default SearchList;
