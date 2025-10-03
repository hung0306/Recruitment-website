import { Pie } from "@ant-design/plots";
import { useEffect, useState } from "react";
import { getListCv } from "../../services/cvService";
import { getCookie } from "../../helpers/cookies";
import { getListJob } from "../../services/jobService";
function Char1() {
  const [datachart, setDatachart] = useState([]);
  const idCompany = getCookie("id");
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
        const data = [
          { type: "Đang tắt", value: obj.statusFalse },
          { type: "Đang bật", value: obj.statusTrue },
          { type: "Đang tuyển", value: obj.total },
        ];
        setDatachart(data);
      }
    };
    fetchApi();
  }, []);
  console.log("HIehe", datachart);

  const config = {
    data: datachart,
    angleField: "value",
    colorField: "type",
  };

  return (
    <>
      <Pie {...config} />
    </>
  );
}
export default Char1;
