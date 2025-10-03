import { Button } from "antd";
import { Link } from "react-router-dom";
import JobList from "./JobList";

function JobManage() {
  return (
    <>
      <h1>Danh sách việc làm</h1>
      <Link to="/create-job">
        <Button type="primary" className="mb-20">
          Tạo việc mới
        </Button>
      </Link>
      <JobList />
    </>
  );
}
export default JobManage;
