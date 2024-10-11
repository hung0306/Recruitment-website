import { Menu } from "antd"
import { ClockCircleOutlined,  CodepenOutlined, CiCircleOutlined,  WhatsAppOutlined } from "@ant-design/icons"
import { Link } from "react-router-dom"

function MenuUser() {

    const items = [
        {
            key: "1",
            icon: <ClockCircleOutlined />,
            label: <Link to="/profile">Thông tin cá nhân</Link>,


        },

        {
            key: "4",
            icon: <CodepenOutlined />,
            label: <Link to="/created-cv">Quản lý cv</Link>,


        },
        {
            key: "5",
            icon: <CiCircleOutlined />,
            label: <Link to="/job-apply">Quản lý việc làm</Link>,

        }



    ]

    return (
        <>
            <Menu
                mode="inline"
                items={items} defaultSelectedKeys={["1"]}
            // mode có các giá trị vertical, inline, horizontal
            />

            {/* vertical */}
        </>
    )
};
export default MenuUser

