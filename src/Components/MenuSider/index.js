import { Menu } from "antd";
import {
  ClockCircleOutlined,
  CodepenOutlined,
  CiCircleOutlined,
  WhatsAppOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

function MenuSider() {
  const items = [
    {
      key: "1",
      icon: <ClockCircleOutlined />,
      label: <Link to="/admin">Tổng quan</Link>,
    },

    {
      key: "4",
      icon: <CodepenOutlined />,
      label: <Link to="/info-company">Thông tin công ty</Link>,
    },
    {
      key: "5",
      icon: <CiCircleOutlined />,
      label: <Link to="/job-manage">Quản lý việc làm</Link>,
    },

    {
      key: "9",
      label: <Link to="/cv-manage">Quản lý CV</Link>,
      icon: <WhatsAppOutlined />,
    },
  ];

  return (
    <>
      <Menu
        mode="inline"
        items={items}
        defaultSelectedKeys={["1"]}
        // mode có các giá trị vertical, inline, horizontal
      />

      {/* vertical */}
    </>
  );
}
export default MenuSider;
