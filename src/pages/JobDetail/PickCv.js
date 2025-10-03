import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, notification, Empty, Typography } from "antd";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { getListCvUser, submitCv } from "../../services/cvService";
import { getCookie } from "../../helpers/cookies";
// import "./CvListUser.scss"
import { Link, useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobService";
import { getDetailCompany } from "../../services/companyService";
import { getTimeCurrent } from "../../helpers/getTime";

function PickCv(props) {
  const [cv, setCv] = useState([]);
  const [job, setJob] = useState();
  const [api, contextHolder] = notification.useNotification();
  const { handleCancel } = props;
  const idUser = getCookie("id");
  const params = useParams();

  useEffect(() => {
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

  useEffect(() => {
    const fetchApi = async () => {
      const response = await getListCvUser(idUser);
      if (response) {
        setCv(response);
      }
    };
    fetchApi();
  }, []);

  const handleCardClick = async (item) => {
    const submit = {
      idcv: item.id, // Giả sử bạn cần gửi id của CV
      idJob: job.id,
      idCompany: job.infoCompany.id,
      createAt: getTimeCurrent(),
    };

    const response = await submitCv(submit);
    if (response) {
      api.success({
        message: "Đã nộp CV thành công",
        description: `Hãy chờ nhà tuyển dụng phản hồi.`,
        duration: 5,
      });
      handleCancel();
    }

    // item.idJob = job.id;
    // item.idCompany = job.infoCompany.id;
    // item.createAt = getTimeCurrent();
    // const response = await submitCv(item);
    // console.log(item);
  };

  return (
    <>
      {contextHolder}
      {cv.length > 0 ? (
        <>
          <Row gutter={[16, 16]}>
            {cv.map((item) => (
              <Col span={12} key={item.id}>
                <Card
                  hoverable
                  onClick={() => handleCardClick(item)}
                  className="cv-card"
                  title={<strong>CV - {item.nameUser}</strong>}
                >
                  <div style={{ color: "#64748b", marginBottom: 6 }}>
                    Cập nhật: {item.updateAt}
                  </div>
                  <div>
                    <strong>Vị trí ứng tuyển:</strong> {item.jobPosition}
                  </div>
                </Card>
              </Col>
            ))}
          </Row>
        </>
      ) : (
        <Empty description="Bạn chưa có CV nào để ứng tuyển.">
          <Link to="/template">
            <Button type="primary">Tạo CV mới</Button>
          </Link>
        </Empty>
      )}
    </>
  );
}

export default PickCv;
