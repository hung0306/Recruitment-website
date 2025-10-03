import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies";
import { Link } from "react-router-dom";
import { getListJob } from "../../services/jobService";
import { Button, Col, Row, Table, Tag, Tooltip } from "antd";
import EditJob from "./EditJob";
import DeleteJob from "./DeleteJob";
import { EyeOutlined } from "@ant-design/icons";

function JobList(props) {
  const idCompany = getCookie("id");
  const { className = "" } = props;
  const [reload, setReload] = useState(false);
  const [jobs, setJobs] = useState();
  const fetchApi = async () => {
    const response = await getListJob(idCompany);
    setJobs(response.reverse());
  };
  useEffect(() => {
    fetchApi();
  }, [reload]);

  const handleReload = () => {
    setReload(!reload);
  };

  const columns = [
    {
      title: "Tên job",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      render: (_, record) =>
        record.tags.map((item, index) => (
          <Tag className="mr-10" color="blue" key={index}>
            {item}
          </Tag>
        )),
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Thời gian",
      dataIndex: "createAt",
      key: "createAt",
      render: (_, record) => (
        <>
          <small>Ngày tạo:{record.createAt}</small>
          <br />
          <small>Cập nhật: {record.updateAt}</small>
        </>
      ),
    },

    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <>
          {record.status ? (
            <Tag color="green">Đang bật</Tag>
          ) : (
            <Tag color="red">Đang tắt</Tag>
          )}
        </>
      ),
    },
    {
      title: "Hành động",

      key: "actions",
      render: (_, record) => (
        <>
          <Row gutter={[10, 0]}>
            <Col>
              <Link to={`/detail-job/${record.id}`}>
                <Tooltip title="xem chi tiết">
                  <Button>
                    <EyeOutlined />
                  </Button>
                </Tooltip>
              </Link>
            </Col>
            <Col>
              <EditJob reload={handleReload} record={record} />
            </Col>
            <Col>
              <DeleteJob reload={handleReload} record={record} />
            </Col>
          </Row>
        </>
      ),
    },
  ];
  return (
    <>
      <div className={className}>
        <Table dataSource={jobs} columns={columns} rowKey="id" />
      </div>
    </>
  );
}
export default JobList;
