import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies"
import { getDetailCv, getListCv } from "../../services/cvService";
import { Button, Table, Tooltip } from "antd";
import { Tag } from "antd";
import { Link } from "react-router-dom";
import { EyeOutlined } from "@ant-design/icons"
import DeleteCv from "./DeleteCv";

function CvList(props) {
    const idCompany = getCookie("id");
    const { className = "" } = props;
    const [listCv, setListCv] = useState([])
    const [reload, setReload] = useState(false)

    const fetchApi = async () => {
        const response = await getListCv(idCompany);
        console.log(response);
        
        const cv = await fetch("http://localhost:3000/cv")
        const data = await cv.json();
        
        let result = [];
        for (let i = 0; i < response.length; i++) {
            result.push({
                ...data.find(item => item.id === response[i].idcv),
                ...response[i]

            }) 
        }


        setListCv(result.reverse())
    };
    useEffect(() => {
        fetchApi()
    }, [reload])

    console.log("hi",listCv);
    
    
    
    
    

    const handleReload = () => {
        setReload(!reload)

    }
    const columns = [
       
        {
            title: "Họ tên",
            dataIndex: "nameUser",
            key: "name",

        },
        {
            title: "Số điện thoại",
            dataIndex: "phone",
            key: "phone"
        },
        {
            title: "Email",
            dataIndex: "email",
            key: "email",

        },
        {
            title: "Ngày gửi",
            dataIndex: "createAt",
            key: "createAt",

        },

        {
            title: "Trạng thái",
            dataIndex: "status",
            key: "status",
            render: (_, record) => (
                <>
                    {record.statusRead ? (<Tag color="green">Đã đọc</Tag>) : (<Tag color="red">Chưa đọc</Tag>)}
                </>
            )
        },
        {
            title: "Hành động",

            key: "actions",
            render: (_, record) => (
                <>
                    <Link to={`/detail-cv/${record.id}`}>
                        <Tooltip title="xem chi tiết">
                            <Button className="mr-10" ><EyeOutlined /></Button>


                        </Tooltip>

                    </Link>
                    <DeleteCv reload={handleReload} record={record} />


                </>
            )
        },
    ]

    console.log(listCv);
    return (
        <>
            <div className={className}>
                <Table dataSource={listCv} columns={columns} rowKey="id" />
            </div>
        </>

    )
}
export default CvList