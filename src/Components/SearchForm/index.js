import { Button, Col, Form, Input, Row, Select } from 'antd';
import { useEffect, useState } from 'react';
import { getListCity } from '../../services/cityService';
import { useNavigate } from 'react-router-dom';
import "./searchform.scss";
import { SearchOutlined } from "@ant-design/icons";
import { IoLocationOutline } from "react-icons/io5";


function SearchForm() {
    const navigate = useNavigate()
    const [city, setCity] = useState([])
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getListCity();
            // console.log(response);
            if (response) {
                const objAll = {
                    key: 0,
                    value: "All"
                };
                setCity([objAll, ...response])
            }
        }
        fetchAPI()

    }, [])

    // console.log(city);


    const handleFinish = (values) => {
        console.log(values);
        let city = values.city || "";
        city = values.city === "All" ? "" : city;
        navigate(
            `/Search?city=${city}&keyword=${values.keyword || ""}`
        )
    }
    return (
        <>
            <h1 className="title">Tìm việc làm nhanh 24h, việc làm mới nhất trên toàn quốc.</h1>
            <div className='sub-title'>Tiếp cận 40,000+ tin tuyển dụng việc làm mỗi ngày từ hàng nghìn doanh nghiệp uy tín tại Việt Nam</div>

            {city && (

                <Form

                    onFinish={handleFinish}

                >
                    <Row gutter={50} align="center">
                        <Col xxl={6}>
                            <Form.Item name="city"

                            >
                                <Select style={{height:"50px"}}
                                    options={city}
                                    placeholder={
                                        <>
                                            <IoLocationOutline /> Địa điểm
                                        </>
                                    }
                                />

                            </Form.Item>
                        </Col>



                        <Col xxl={6}>
                            <Form.Item name="keyword"

                            >
                                <Input style={{height:"50px"}} placeholder='Vị trí tuyển dụng' />

                            </Form.Item>
                        </Col>
                        <Col xxl={3}>

                            <Form.Item

                            >
                                <Button  type="primary"  style={{ backgroundColor: "#00b14f", height:"50px" }} htmlType="submit">
                                    <SearchOutlined /> Tìm kiếm
                                </Button>
                            </Form.Item>
                        </Col>
                    </Row>
                </Form>
            )}


        </>
    )
}
export default SearchForm