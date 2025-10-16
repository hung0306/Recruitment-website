import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, message, Popconfirm } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { deleteCvUser, getListCvUser } from "../../services/cvService";
import { getCookie } from "../../helpers/cookies";
import "./CvListUser.scss";
import { Link } from "react-router-dom";

function CvListUser() {
  const [cv, setCv] = useState([]);
  const idUser = getCookie("id");
  const [load, setLoad] = useState(false);

  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    const fetchApi = async () => {
      if (!idUser) {
        setCv([]);
        return;
      }
      const response = await getListCvUser(idUser);
      if (response) {
        setCv(response);
      } else {
        setCv([]);
      }
    };
    fetchApi();
  }, [idUser, load]);
  const handleDelete = async (id) => {
    const deleteCV = await deleteCvUser(id);
    if (deleteCV) {
      setLoad(!load);
      messageApi.open({
        type: "success",
        content: "Xoá thành công",
        duration: 3,
      });
    } else {
      messageApi.open({
        type: "error",
        content: "Xóa thất bại",
        duration: 3,
      });
    }
  };

  return (
    <>
      {contextHolder}

      {cv.length > 0 ? (
        <>
          {/* CV Card List */}

          <Card
            title={
              <>
                {" "}
                <div
                  style={{
                    textAlign: "center",
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "600",
                  }}
                >
                  CV đã tạo
                </div>
                <Link to="/template">
                  <Button className="buttonadd">
                    <PlusOutlined /> Tạo mới
                  </Button>
                </Link>
              </>
            }
            className="cv-list-container"
          >
            <Row gutter={[25, 20]}>
              {cv.map((item) => (
                <Col span={12} key={item.id}>
                  <Card
                    className="cv-card"
                    actions={[
                      <Link
                        key={`edit-${item.id}`}
                        to={`/editCvUser/${item.id}`}
                      >
                        <Button
                          type="link"
                          icon={<EditOutlined />}
                          className="edit-btn"
                        ></Button>
                      </Link>,
                      <Popconfirm
                        key={`delete-${item.id}`}
                        title="Bạn có chắc muốn xóa không?"
                        onConfirm={() => handleDelete(item.id)}
                      >
                        {" "}
                        <Button
                          icon={<DeleteOutlined />}
                          className="delete-btn"
                        ></Button>
                      </Popconfirm>,
                    ]}
                    title={
                      <strong>
                        CV-{item.nameUser}-{item.jobPosition}
                      </strong>
                    }
                  >
                    <p className="cv-description">
                      Cập nhật lần cuối: {item.updateAt} <br />
                      Vị trí ứng tuyển: {item.jobPosition}
                    </p>
                  </Card>
                </Col>
              ))}
            </Row>
          </Card>
        </>
      ) : (
        <div>Bạn chưa có CV nào.</div>
      )}
    </>
  );
}

export default CvListUser;
