import { useEffect, useState } from "react"
import { getCompany } from "../../services/companyService"
import { Button, Card, Col, Row, Skeleton, Spin, Tag } from "antd"
import { Link } from "react-router-dom";
import "./companyList.scss"
import { getAllJob, getListJob } from "../../services/jobService";

function CompanyList() {
    const [data, setData] = useState([]);
    const [xoay, setXoay] = useState(true);

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getCompany();
            const job = await getAllJob()
            let result = [];
            for (let i = 0; i < response.length; i++) {
                result.push({
                    ...job.find(item => item.idCompany === response[i].id),
                    ...response[i]
                })

            }
            setData(result);
            if (data) {
                setXoay(false);
            }

        }
        fetchAPI()
    }, [])

    console.log(data);
    return (
        <>
            <h2 className="listcompany">Nhà tuyển dụng hàng đầu</h2>
            <div className="container_company">
                <Spin spinning={xoay} tip="vui lòng chờ...">
                    <div className="list">
                        {xoay ? (<>
                            {[...Array(6)].map((item, index) => (
                                <div className="listcompany__item" >
                                    <div className="listcompany__row">
                                        <div >

                                            <Skeleton className="listcompany__img"/>

                                        </div>
                                      

                                    </div>
                                </div>
                            ))}
                        </>) : (
                            <>
                                {data.map(item => (
                                    <Link className="listcompany__item" style={{ color: "grey" }} to={`/company/${item.id}`}>
                                        <div className="listcompany__row" key={item.id}>

                                            <div >

                                                <img className="listcompany__img"
                                                    src={item.website}

                                                />

                                            </div>
                                            <div >
                                                <div className="companyName">{item.companyName}</div>
                                                <div style={{ marginTop: 11, display: 'flex', }}>


                                                    <Tag color="default">Hà Nội</Tag>
                                                    <Tag color="default">{item.salary}$/Tháng</Tag>
                                                </div>

                                                <div style={{ marginTop: "10px" }}>Hơn {item.quantityPeople} nhân sự </div>

                                                <div style={{ marginTop: "10px" }}>Cần tuyển thêm {item.quantityJob} nhân sự</div>






                                            </div>




                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}

                    </div>
                </Spin>
            </div>


            <Link to="/company">
                <Button type="primary">Xem thêm</Button>
            </Link>
        </>
    )
}
export default CompanyList