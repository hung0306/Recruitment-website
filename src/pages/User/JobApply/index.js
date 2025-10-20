import { useEffect, useState } from "react";
import {
  Card,
  Table,
  Tag,
  Button,
  message,
  Row,
  Col,
  Statistic,
  Progress,
  Modal,
  Typography,
} from "antd";
import {
  EyeOutlined,
  CalendarOutlined,
  DollarOutlined,
  EnvironmentOutlined,
  ClockCircleOutlined,
  CheckCircleOutlined,
  CloseCircleOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";
import { getCookie } from "../../../helpers/cookies";

import { getJobApplications } from "../../../services/jobApplicationService";
import { get } from "../../../utils/request";

function JobApply() {
  const [applyHistory, setApplyHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState(null);
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const idUser = getCookie("id");

  useEffect(() => {
    const fetchApplyHistory = async () => {
      try {
        setLoading(true);

        // Fetch job applications from database
        const applications = await getJobApplications(idUser);

        if (applications && applications.length > 0) {
          // Fetch jobs and companies data to enrich applications
          const jobsResponse = await get("jobs");
          const companiesResponse = await get("account");

          const jobs = jobsResponse || [];
          const companies = companiesResponse || [];

          // Enrich applications with job and company details
          const enrichedApplications = applications.map((app) => {
            const job = jobs.find((j) => j.id === app.jobId);
            const company = companies.find((c) => c.id === job?.idCompany);

            // console.log("App:", app);
            // console.log("Job:", job);
            // console.log("Company:", company);
            // console.log("Company Logo:", company?.website);

            return {
              ...app,
              jobTitle: job?.name || "N/A",
              companyName: company?.companyName || "N/A",
              companyLogo: company?.website || null,
              salary: job?.salary ? `${job.salary}$` : app.salary || "N/A",
              location: job?.city ? job.city.join(", ") : app.location || "N/A",
              applyDate: new Date(app.applyDate).toLocaleDateString("vi-VN"),
              interviewDate: app.interviewDate
                ? new Date(app.interviewDate).toLocaleDateString("vi-VN")
                : null,
            };
          });

          setApplyHistory(enrichedApplications);

          // Calculate stats
          const statsData = {
            total: enrichedApplications.length,
            pending: enrichedApplications.filter(
              (app) => app.status === "pending"
            ).length,
            reviewed: enrichedApplications.filter(
              (app) => app.status === "reviewed"
            ).length,
            accepted: enrichedApplications.filter(
              (app) => app.status === "accepted"
            ).length,
            rejected: enrichedApplications.filter(
              (app) => app.status === "rejected"
            ).length,
          };

          setStats(statsData);
        } else {
          // No applications found
          setApplyHistory([]);
          setStats({
            total: 0,
            pending: 0,
            reviewed: 0,
            accepted: 0,
            rejected: 0,
          });
        }
      } catch (error) {
        message.error("Không thể tải lịch sử ứng tuyển");
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchApplyHistory();
  }, [idUser]);

  const getStatusColor = (status) => {
    switch (status) {
      case "pending":
        return "orange";
      case "reviewed":
        return "blue";
      case "accepted":
        return "green";
      case "rejected":
        return "red";
      default:
        return "default";
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case "pending":
        return "Chờ xem xét";
      case "reviewed":
        return "Đã xem";
      case "accepted":
        return "Chấp nhận";
      case "rejected":
        return "Từ chối";
      default:
        return "Không xác định";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "pending":
        return <ClockCircleOutlined />;
      case "reviewed":
        return <ExclamationCircleOutlined />;
      case "accepted":
        return <CheckCircleOutlined />;
      case "rejected":
        return <CloseCircleOutlined />;
      default:
        return <ClockCircleOutlined />;
    }
  };

  const showApplicationDetails = (application) => {
    setSelectedApplication(application);
    setModalVisible(true);
  };

  const columns = [
    {
      title: "Vị trí ứng tuyển",
      dataIndex: "jobTitle",
      key: "jobTitle",
      render: (text, record) => (
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          {record.companyLogo ? (
            <img
              src={record.companyLogo}
              alt={record.companyName}
              style={{
                width: "40px",
                height: "40px",
                borderRadius: "8px",
                objectFit: "cover",
                border: "1px solid #e0e0e0",
              }}
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            style={{
              display: record.companyLogo ? "none" : "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "40px",
              height: "40px",
              borderRadius: "8px",
              backgroundColor: "#00b14f",
              color: "white",
              fontSize: "14px",
              fontWeight: "bold",
              border: "1px solid #e0e0e0",
            }}
          >
            {record.companyName
              ? record.companyName.charAt(0).toUpperCase()
              : "C"}
          </div>
          <div>
            <div style={{ fontWeight: 600, color: "#1890ff" }}>{text}</div>
            <div style={{ fontSize: "12px", color: "#666" }}>
              {record.companyName}
            </div>
          </div>
        </div>
      ),
    },
    {
      title: "Mức lương",
      dataIndex: "salary",
      key: "salary",
    },
    {
      title: "Địa điểm",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Ngày ứng tuyển",
      dataIndex: "applyDate",
      key: "applyDate",
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag color={getStatusColor(status)}>{getStatusText(status)}</Tag>
      ),
    },
    {
      title: "Hành động",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<EyeOutlined />}
          size="small"
          onClick={() => showApplicationDetails(record)}
        >
          Xem chi tiết
        </Button>
      ),
    },
  ];

  return (
    <>
      <div style={{ padding: "16px 24px" }}>
        <h2 style={{ marginBottom: 24 }}>Lịch sử ứng tuyển</h2>

        {/* Statistics Cards */}
        {stats && (
          <Row gutter={[16, 16]} style={{ marginBottom: 24 }}>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Tổng số đơn"
                  value={stats.total}
                  prefix={<CalendarOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Chờ xem xét"
                  value={stats.pending}
                  prefix={<ClockCircleOutlined />}
                  valueStyle={{ color: "#faad14" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Đã xem"
                  value={stats.reviewed}
                  prefix={<ExclamationCircleOutlined />}
                  valueStyle={{ color: "#1890ff" }}
                />
              </Card>
            </Col>
            <Col xs={24} sm={12} md={6}>
              <Card>
                <Statistic
                  title="Chấp nhận"
                  value={stats.accepted}
                  prefix={<CheckCircleOutlined />}
                  valueStyle={{ color: "#52c41a" }}
                />
              </Card>
            </Col>
          </Row>
        )}

        {/* Progress Overview */}
        {stats && (
          <Card style={{ marginBottom: 24 }}>
            <Typography.Title level={4}>Tỷ lệ thành công</Typography.Title>
            <Row gutter={[16, 16]}>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <Progress
                    type="circle"
                    percent={
                      Math.round((stats.accepted / stats.total) * 100) || 0
                    }
                    format={(percent) => `${percent}%`}
                    strokeColor="#52c41a"
                  />
                  <div style={{ marginTop: 8, fontWeight: "bold" }}>
                    Tỷ lệ chấp nhận
                  </div>
                </div>
              </Col>
              <Col span={12}>
                <div style={{ textAlign: "center" }}>
                  <Progress
                    type="circle"
                    percent={
                      Math.round((stats.reviewed / stats.total) * 100) || 0
                    }
                    format={(percent) => `${percent}%`}
                    strokeColor="#1890ff"
                  />
                  <div style={{ marginTop: 8, fontWeight: "bold" }}>
                    Tỷ lệ phản hồi
                  </div>
                </div>
              </Col>
            </Row>
          </Card>
        )}

        {/* Applications Table */}
        <Card>
          <Table
            columns={columns}
            dataSource={applyHistory}
            rowKey="id"
            loading={loading}
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showQuickJumper: true,
              showTotal: (total, range) =>
                `${range[0]}-${range[1]} của ${total} đơn ứng tuyển`,
            }}
          />
        </Card>

        {/* Application Details Modal */}
        <Modal
          title="Chi tiết đơn ứng tuyển"
          open={modalVisible}
          onCancel={() => setModalVisible(false)}
          footer={[
            <Button key="close" onClick={() => setModalVisible(false)}>
              Đóng
            </Button>,
            <Button key="viewJob" type="primary">
              <Link to={`/job/${selectedApplication?.jobId}`}>
                Xem công việc
              </Link>
            </Button>,
          ]}
          width={800}
        >
          {selectedApplication && (
            <div>
              <Row gutter={[16, 16]}>
                <Col span={24}>
                  <Card size="small">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "16px",
                      }}
                    >
                      {selectedApplication.companyLogo ? (
                        <img
                          src={selectedApplication.companyLogo}
                          alt={selectedApplication.companyName}
                          style={{
                            width: "60px",
                            height: "60px",
                            borderRadius: "12px",
                            objectFit: "cover",
                            border: "1px solid #e0e0e0",
                          }}
                          onError={(e) => {
                            e.target.style.display = "none";
                            e.target.nextSibling.style.display = "flex";
                          }}
                        />
                      ) : null}
                      <div
                        style={{
                          display: selectedApplication.companyLogo
                            ? "none"
                            : "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: "60px",
                          height: "60px",
                          borderRadius: "12px",
                          backgroundColor: "#00b14f",
                          color: "white",
                          fontSize: "20px",
                          fontWeight: "bold",
                          border: "1px solid #e0e0e0",
                        }}
                      >
                        {selectedApplication.companyName
                          ? selectedApplication.companyName
                              .charAt(0)
                              .toUpperCase()
                          : "C"}
                      </div>
                      <div>
                        <Typography.Title level={4} style={{ margin: 0 }}>
                          {selectedApplication.jobTitle}
                        </Typography.Title>
                        <Typography.Text
                          type="secondary"
                          style={{ fontSize: "16px" }}
                        >
                          {selectedApplication.companyName}
                        </Typography.Text>
                      </div>
                    </div>
                  </Card>
                </Col>

                <Col span={12}>
                  <Card size="small" title="Thông tin cơ bản">
                    <p>
                      <DollarOutlined /> Mức lương: {selectedApplication.salary}
                    </p>
                    <p>
                      <EnvironmentOutlined /> Địa điểm:{" "}
                      {selectedApplication.location}
                    </p>
                    <p>
                      <CalendarOutlined /> Ngày ứng tuyển:{" "}
                      {selectedApplication.applyDate}
                    </p>
                    {selectedApplication.interviewDate && (
                      <p>
                        <ClockCircleOutlined /> Lịch phỏng vấn:{" "}
                        {selectedApplication.interviewDate}
                      </p>
                    )}
                  </Card>
                </Col>

                <Col span={12}>
                  <Card size="small" title="Trạng thái">
                    <Tag
                      color={getStatusColor(selectedApplication.status)}
                      icon={getStatusIcon(selectedApplication.status)}
                      style={{ fontSize: "16px", padding: "8px 16px" }}
                    >
                      {getStatusText(selectedApplication.status)}
                    </Tag>
                    {selectedApplication.notes && (
                      <div style={{ marginTop: 16 }}>
                        <Typography.Text strong>Ghi chú:</Typography.Text>
                        <p>{selectedApplication.notes}</p>
                      </div>
                    )}
                  </Card>
                </Col>

                {selectedApplication.companyResponse && (
                  <Col span={24}>
                    <Card size="small" title="Phản hồi từ công ty">
                      <Typography.Paragraph>
                        {selectedApplication.companyResponse}
                      </Typography.Paragraph>
                    </Card>
                  </Col>
                )}
              </Row>
            </div>
          )}
        </Modal>
      </div>
    </>
  );
}

export default JobApply;
