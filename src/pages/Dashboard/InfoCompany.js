import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/cookies"
import { getDetailCompany } from "../../services/companyService";
import { Card } from "antd";
import {
    FormOutlined 
  } from '@ant-design/icons';

function InfoCompany() {
    const idCompany = getCookie("id");
    const [data, setData] = useState([])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailCompany(idCompany);
            setData(response)
        }
        fetchApi()
    }, [])
    console.log(data);
    return (
        <>
            {data && (
                <>
                   

                      {/* <div>so luong job</div>
                      <div>so</div> */}
                        {/* <p>Tên công ty :<strong>{data.companyName}</strong></p>
                    <p>Số điện thoạithoại :<strong>{data.phone}</strong></p>
                    <p>Email :<strong>{data.email}</strong></p>
                    <p>Số nhân viên :<strong>{data.quantityPeople}</strong></p> */}
                 

                    <Card style={{height:"200px"}} title="Thông tin công ty" className="info-job" >
                    <div className="info-job__tt">
                    <FormOutlined className="info-job__icon"/>
                        <div className="info-job__text">
                            <div>{data.companyName} </div>
                            <div>{data.phone}</div>
                            <div>{data.email}</div>
                            <div>{data.quantityPeople} nhân sự</div>
                        </div>
                    </div>
                    </Card>
                   

                </>
            )}

        </>
    )
}
export default InfoCompany