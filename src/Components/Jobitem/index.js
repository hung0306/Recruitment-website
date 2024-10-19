import React from 'react';
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import "./Jobitem.scss"

function Jobitem({ item }) {
    console.log(item);

    // Kiểm tra nếu item không tồn tại hoặc không có status
    if (!item || !item.status) {
        return null;
    }

    return (
        <Link to={`/job/${item.id}`}>
            <Card className='item__job' title={null}>
            <div>
                    <strong className="date-post">Ngày đăng</strong>
                    <strong className='date-post'>{item.createAt || 'Không có thông tin'}</strong>
                </div>
                <div>

                    <div className='title-job'>{item.name || 'Không có thông tin'}</div>
                </div>
               

                <div className="info-cty">
                    <img style={{ width: "60px" }} src='https://cdn-new.topcv.vn/unsafe/200x/https://static.topcv.vn/company_logos/cong-ty-co-phan-falcon-technology-81320f9a475dbf9285bacb89bcf6daa3-651398605552d.jpg' />
                    <strong className='name-company'>{item?.infoCompany?.companyName || ''}</strong>
                </div>
                <div style={{marginRight:"10px", marginTop:"12px",borderTop:"1px dashed black", }}  className="mb-10">
                    
                    {Array.isArray(item.city) && item.city.length > 0 ? (
                        item.city.map((city, index) => (
                            <span style={{marginRight:"10px", fontSize:"14px", fontWeight:"500", color:"#a6a6a6", }} key={index}>{city}</span>
                        ))
                    ) : (
                        <span>Không có thành phố nào.</span>
                    )}
                </div>

                <div className="mb-10">
                    <span className="mr-10">Lương:</span>
                    <Tag >{item.salary ? `${item.salary}$` : 'Không có thông tin'}</Tag>
                </div>

                <div className="quantity">
                    <span className="mr-10">Số lượng tuyển:</span>
                    <span>{item.quantityJob !== undefined ? item.quantityJob : 'Không có thông tin'} người</span>
                </div>


                <div className="mb-10">

                    {Array.isArray(item.tags) && item.tags.length > 0 ? (
                        item.tags.map((tag, index) => (
                            <Tag  key={index}>{tag}</Tag>
                        ))
                    ) : (
                        <span>Không có ngôn ngữ nào.</span>
                    )}
                </div>


            </Card>
        </Link>
    );
}

// Jobitem.propTypes = {
//     item: PropTypes.shape({
//         id: PropTypes.number.isRequired,
//         name: PropTypes.string,
//         tags: PropTypes.arrayOf(PropTypes.string),
//         city: PropTypes.arrayOf(PropTypes.string),
//         salary: PropTypes.number,
//         quantityJob: PropTypes.number,
//         infoCompany: PropTypes.shape({
//             companyName: PropTypes.string,
//         }),
//         createAt: PropTypes.string,
//         status: PropTypes.bool,
//     }).isRequired,
// };

export default Jobitem;
