import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDetailJob } from "../../services/jobService";
import { Tag } from "antd";

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
      {data && (
        <div className="job-detail">
          <header className="job-detail__header">
            <h2 className="job-detail__title">{data.name}</h2>
            <div>
              {data.status ? (
                <Tag color="green">Đang bật</Tag>
              ) : (
                <Tag color="red">Đang tắt</Tag>
              )}
            </div>
          </header>

          <section className="job-detail__grid">
            <div className="job-detail__item">
              <div className="job-detail__label">Mức lương</div>
              <div className="job-detail__value">{data.salary}$</div>
            </div>
            <div className="job-detail__item">
              <div className="job-detail__label">Ngày tạo</div>
              <div className="job-detail__value">{data.createAt}</div>
            </div>
            <div className="job-detail__item">
              <div className="job-detail__label">Cập nhật</div>
              <div className="job-detail__value">{data.updateAt}</div>
            </div>
            <div className="job-detail__item">
              <div className="job-detail__label">Thành phố</div>
              <div className="job-detail__value">
                {data.city.map((c, idx) => (
                  <Tag key={`${c}-${idx}`} color="blue">
                    {c}
                  </Tag>
                ))}
              </div>
            </div>
            <div className="job-detail__item job-detail__item--full">
              <div className="job-detail__label">Tags</div>
              <div className="job-detail__value">
                {data.tags.map((t, idx) => (
                  <Tag key={`${t}-${idx}`} color="geekblue">
                    {t}
                  </Tag>
                ))}
              </div>
            </div>
          </section>

          <section className="job-detail__desc">
            <div className="job-detail__label">Mô tả</div>
            <div className="job-detail__description">{data.description}</div>
          </section>
        </div>
      )}
    </>
  );
}
export default JobDetailAdmin;
