import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import { getListJob } from "../../services/jobService";
import { Card } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import "./dashboard.scss";

function JobStatistic() {
  const idCompany = getCookie("id");
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListJob(idCompany);
      if (response) {
        let obj = {
          total: 0,
          statusTrue: 0,
          statusFalse: 0,
        };
        obj.total = response.length;
        response.forEach((item) => {
          item.status ? obj.statusTrue++ : obj.statusFalse++;
        });
        setData(obj);
      }
    };
    fetchApi();
  }, []);
  // console.log(data);
  return (
    <>
      {data && (
        <>
          <Card
            style={{ height: "200px" }}
            title="Thông tin job đang tuyển"
            className="info-job"
          >
            <div className="info-job__tt">
              <PlusSquareOutlined className="info-job__icon" />
              <div className="info-job__text">
                <div>{data.total} job đang tuyển</div>
                <div>{data.statusTrue} job dang bat</div>
                <div>{data.statusFalse} job dang tat</div>
              </div>
            </div>
          </Card>

          {/* <p>Số lượng job :<strong>{data.total}</strong></p>
                    <p>Job đang bật :<strong>{data.statusTrue}</strong></p>
                    <p>Job đang tắt :<strong>{data.statusFalse}</strong></p> */}
        </>
      )}
    </>
  );
}
export default JobStatistic;
