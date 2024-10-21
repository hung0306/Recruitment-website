import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobService";
import { Tag } from "antd";
import Goback from "../../Components/Goback";
import "./jobdetail.scss";

function JobDetailAdmin() {
    const params = useParams();
    const [data, setData] = useState();

    useEffect(() => {
        const fetchApi = async () => {
            const response = await getDetailJob(params.id);
            setData(response);
        };
        fetchApi();
    }, [params.id]);

    return (
        <>
            <Goback />
            {data && (
                <div className="job-detail-container">
                    <div className="job-header">
                        <h1>Tên job: {data.name}</h1>
                    </div>

                    <div className="job-status mb-10">
                        <span className="label">Trạng thái:</span>
                        <div className="value">
                            {data.status ? (
                                <Tag color="green">Đang bật</Tag>
                            ) : (
                                <Tag color="red">Đang tắt</Tag>
                            )}
                        </div>
                    </div>

                    <div className="job-tags mb-10">
                        <span className="label">Tags:</span>
                        <div className="value">
                            {data.tags.map((item) => (
                                <Tag key={item.key} color="blue">{item}</Tag>
                            ))}
                        </div>
                    </div>

                    <div className="job-salary mb-10">
                        <span className="label">Mức lương:</span>
                        <div className="value">
                            <strong>{data.salary}$</strong>
                        </div>
                    </div>

                    <div className="job-created mb-10">
                        <span className="label">Ngày tạo:</span>
                        <div className="value">
                            <strong>{data.createAt}</strong>
                        </div>
                    </div>

                    <div className="job-updated mb-10">
                        <span className="label">Cập nhật:</span>
                        <div className="value">
                            <strong>{data.updateAt}</strong>
                        </div>
                    </div>

                    <div className="job-city mb-10">
                        <span className="label">Thành phố:</span>
                        <div className="value">
                            {data.city.map((item) => (
                                <Tag key={item.key} color="blue">{item}</Tag>
                            ))}
                        </div>
                    </div>

                    <div className="job-description">
                        <span className="label">Mô tả:</span>
                        <div className="description-content">{data.description}</div>
                    </div>
                </div>
            )}
        </>
    );
}
export default JobDetailAdmin;
