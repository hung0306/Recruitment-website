import { useEffect, useState } from "react"
import { getCompany } from "../../services/companyService"
import { Button, Card, Col, Row, Spin, Tag } from "antd"
import { Link } from "react-router-dom";
import "./companyList.scss"

function CompanyList() {
    const [data, setData] = useState([]);
    const [xoay, setXoay] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getCompany();
            setData(response);
            if (data) {
                setXoay(false);
            }

        }
        fetchAPI()
    }, [])

    console.log(data);
    return (
        <>
            <h2 className="listcompany">Danh sách một số công ty</h2>
            <div className="container">
                <Spin spinning={xoay} tip="vui lòng chờ...">
                    <Row className="mb-30 mt-30" gutter={[20, 20]}>
                        {data.map(item => (
                            <Col span={6} key={item.id}>
                                <Link to={`/company/${item.id}`}>
                                    <Card className="listcompany__tag">
                                        {/* <div className="listcompany__company">Công ty: <strong>{item.companyName}</strong></div>
                                    <div>Số nhân sự: <strong>{item.quantityPeople}</strong></div>
                                    <div>Địa chỉ: <strong>{item.address}</strong> </div> */}
                                        <Row>
                                            <Col  span={8}>
                                                <div style={{ height: "78px", width: "78px" }}>
                                                    <img
                                                        src="https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/cong-ty-co-phan-falcon-technology-81320f9a475dbf9285bacb89bcf6daa3-651398605552d.jpg"
                                                        alt="Company Logo"
                                                        style={{ width: "78px", height: "78px" }}
                                                    />
                                                </div>
                                            </Col>
                                            <Col  span={16}>
                                            
                                                <Row>
                                                    <Col>  <div className="listcompany__company">{item.companyName}</div></Col>
                                                    
                                                   
                                                    <Col style={{marginTop:"15px"}} > <div><Tag style={{background:"#f4f5f5" }} >{item.quantityPeople} nhân sự</Tag>  <Tag style={{background:"#f4f5f5" }}>{item.address}</Tag></div> </Col>
                                                  
                                                </Row>
                                                <Col style={{marginTop:"15px"}}><Tag>Thời gian làm việc {item.workingTime}</Tag></Col>
                                            
                                               

                                               </Col>
                                        </Row>
                                    </Card>
                                </Link>
                            </Col>
                        ))}
                    </Row>
                </Spin>
            </div>


            <Link to="/company">
                <Button type="primary">Xem thêm</Button>
            </Link>
        </>
    )
}
export default CompanyList