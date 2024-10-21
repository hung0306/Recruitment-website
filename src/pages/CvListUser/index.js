import React, { useEffect, useState } from 'react';
import { Card, Button, Row, Col, message,Popconfirm  } from 'antd';
import { DeleteOutlined,EditOutlined,PlusOutlined } from '@ant-design/icons';
import { deleteCvUser, getListCvUser } from '../../services/cvService';
import { getCookie } from '../../helpers/cookies';
import "./CvListUser.scss"
import { Link, useNavigate } from 'react-router-dom';
import Goback from '../../Components/Goback';

function CvListUser() {
    const [cv, setCv] = useState([]);
    const idUser = getCookie("id");
    const [load,setLoad] = useState(false);
    
    const [messageApi, contextHolder] = message.useMessage();

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
        if (deleteCV) {
            setLoad(!load)
            messageApi.open({
                type: 'success',
                content: 'Xoá thành công',
                duration: 3
            });
            







        } else {
            messageApi.open({
                type: 'error',
                content: 'Xóa thất bại',
                duration: 3
            });

        }

    }
        

    


   

    return (
        <>
        <Goback/>
        {contextHolder}
      
            {cv.length > 0 ? (
                <>
                    {/* CV Card List */}


                    <Card title={<>  <div style={{textAlign:"center", color:"black", fontSize:"20px", fontWeight:"600"}}>CV đã tạo</div><Link to="/create-CV1"><Button className='buttonadd'><PlusOutlined /> Tạo mới</Button></Link></>} className="cv-list-container">
                        <Row gutter={[25, 20]}>
                            {cv.map((item, index) => (

                               

                                    <Col span={12} key={index}>
                                         
                                        <Card  
                                            className="cv-card"
                                            actions={[
                                                <Link to={`/editCvUser/${item.id}`}><Button type="link" icon={<EditOutlined />} className="edit-btn"></Button></Link>,
                                                <Popconfirm title="Bạn có chắc muốn xóa không?" onConfirm={() => handleDelete(item.id)}> <Button  icon={<DeleteOutlined />} className="delete-btn"></Button>
                                                </Popconfirm>
                                               
                                            ]}
                                            title={[
                                                <strong>CV-{item.nameUser}-{item.jobPosition}</strong>
                                            ]}
                                        >
                                            <p className="cv-description">
                                                Cập nhật lần cuối: {item.updateAt} <br />
                                                Vị trí ứng tuyển: {item.jobPosition}
                                            </p>
                                        </Card>
                                       
                                    </Col>

                            ))}
                        </Row>
                    </Card>

                </>
            ) : (
                <div>Bạn chưa có CV nào.</div>
            )}
        </>
    );
}

export default CvListUser;
