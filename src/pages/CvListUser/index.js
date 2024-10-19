import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col } from 'antd';
import { DeleteOutlined,EditOutlined } from '@ant-design/icons';
import { deleteCvUser, getListCvUser } from '../../services/cvService';
import { getCookie } from '../../helpers/cookies';
import "./CvListUser.scss"
import { Link } from 'react-router-dom';

function CvListUser() {
    const [cv, setCv] = useState([]);
    const idUser = getCookie("id");
    const [load,setLoad] = useState(false)

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCvUser(idUser);
            if (response) {
                setCv(response);
            }
        };
        fetchApi();
    }, [load]);
    const handleDelete =async(id)=>{
        const deleteCV = await deleteCvUser(id);
        setLoad(!load)

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
                                         
                                        <Card  
                                            className="cv-card"
                                            actions={[
                                                <Link to={`/editCvUser/${item.id}`}><Button type="link" icon={<EditOutlined />} className="edit-btn"></Button></Link>,
                                                <Button onClick={() => handleDelete(item.id)} icon={<DeleteOutlined />} className="delete-btn"></Button>
                                                
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
