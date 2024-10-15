import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';
import { getListCvUser } from '../../services/cvService';
import { getCookie } from '../../helpers/cookies';
import "./CvListUser.scss"
import { Link } from 'react-router-dom';

function CvListUser() {
    const [cv, setCv] = useState([]);
    const idUser = getCookie("id");

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCvUser(idUser);
            if (response) {
                setCv(response);
            }
        };
        fetchApi();
    }, []);

    return (
        <>
            {cv ? (
                <>
                    {/* CV Card List */}


                    <Card className="cv-list-container">
                        <Row gutter={[25, 20]}>
                            {cv.map((item, index) => (

                               

                                    <Col span={12} key={index}>
                                         <Link to={`/editCvUser/${item.id}`}>
                                        <Card
                                            className="cv-card"
                                            actions={[
                                                <Button type="link" icon={<DeleteOutlined />} className="delete-btn"></Button>
                                            ]}
                                            title={[
                                                <strong>CV-{item.nameUser}-{item.position}</strong>
                                            ]}
                                        >
                                            <p className="cv-description">
                                                Last updated: {item.lastUpdated} <br />
                                                Position: {item.position}
                                            </p>
                                        </Card>
                                        </Link>
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

export default CvListUser;
