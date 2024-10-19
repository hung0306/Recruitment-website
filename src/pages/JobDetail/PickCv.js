import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { getListCvUser, submitCv} from '../../services/cvService';
import { getCookie } from '../../helpers/cookies';
// import "./CvListUser.scss"
import { Link, useParams } from 'react-router-dom';
import { getDetailJob } from '../../services/jobService';
import { getDetailCompany } from '../../services/companyService';
import { getTimeCurrent } from '../../helpers/getTime';

function PickCv() {
    const [cv, setCv] = useState([]);
    const [job, setJob] = useState()
    const idUser = getCookie("id");
    const params = useParams()

    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getDetailJob(params.id);
            const infoCompany = await getDetailCompany(response.idCompany)
            const dataFinal = {
                ...response,
                infoCompany: infoCompany,
            };
            setJob(dataFinal)
        }
        fetchAPI()
    }, [])

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCvUser(idUser);
            if (response) {
                setCv(response);
            }
        };
        fetchApi();
    }, []);



    const handleCardClick = async(item) => {

        const submit = {
            idcv: item.id, // Giả sử bạn cần gửi id của CV
            idJob: job.id,
            idCompany: job.infoCompany.id,
            createAt: getTimeCurrent(),
        };

        const response = await submitCv(submit);
      
        // item.idJob = job.id;
        // item.idCompany = job.infoCompany.id;
        // item.createAt = getTimeCurrent();
        // const response = await submitCv(item);
        // console.log(item);
      
}
    

return (
    <>
        {cv ? (
            <>
                {/* CV Card List */}


                <Card className="cv-list-container">
                    <Row gutter={[25, 20]}>
                        {cv.map((item, index) => (



                            <Col span={12} key={index}>

                                <Card onClick={() => handleCardClick(item)}
                                    className="cv-card"

                                    title={[
                                        <strong>CV-{item.nameUser}-{item.position}</strong>
                                    ]}
                                >
                                    <p className="cv-description">
                                        Last updated: {item.lastUpdated} <br />
                                        Position: {item.position}
                                    </p>
                                </Card>


                            </Col>

                        ))}
                    </Row>
                </Card>

            </>
        ) : (
            <></>
        )}
    </>
);
}

export default PickCv;
