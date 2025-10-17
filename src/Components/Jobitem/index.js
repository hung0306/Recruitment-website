import React from "react";
import { Card, Tag } from "antd";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import "./Jobitem.scss";

function Jobitem({ item, hideApply = false }) {
  // console.log(item);

  // Kiểm tra nếu item không tồn tại hoặc không có status
  if (!item || !item.status) {
    return null;
  }

  return (
    <Card className="item__job" title={null}>
      <div>
        <strong className="date-post">Ngày đăng</strong>
        <strong className="date-post">
          {item.createAt || "Không có thông tin"}
        </strong>
      </div>
      <div>
        <div className="title-job">{item.name || "Không có thông tin"}</div>
      </div>

      <div className="info-cty">
        {(() => {
          const companyName = item?.infoCompany?.companyName || "Company";
          const logoUrl = item?.infoCompany?.website; // trong project, website đang chứa link logo công ty
          const fallback = `https://ui-avatars.com/api/?name=${encodeURIComponent(
            companyName
          )}&background=00b14f&color=fff&size=64&rounded=true`;
          return (
            <img
              className="company-logo"
              src={logoUrl || fallback}
              alt={companyName}
              onError={(e) => {
                e.currentTarget.src = fallback;
              }}
            />
          );
        })()}
        <strong className="name-company">
          {item?.infoCompany?.companyName || ""}
        </strong>
      </div>
      <div
        style={{
          marginRight: "10px",
          marginTop: "12px",
          borderTop: "1px dashed black",
        }}
        className="mb-10"
      >
        {Array.isArray(item.city) && item.city.length > 0 ? (
          item.city.map((city, index) => (
            <span
              style={{
                marginRight: "10px",
                fontSize: "14px",
                fontWeight: "500",
                color: "#a6a6a6",
              }}
              key={index}
            >
              {city}
            </span>
          ))
        ) : (
          <span>Không có thành phố nào.</span>
        )}
      </div>

      <div className="mb-10">
        <span className="mr-10">Lương:</span>
        <Tag>{item.salary ? `${item.salary}$` : "Không có thông tin"}</Tag>
      </div>

      <div className="quantity">
        <span className="mr-10">Số lượng tuyển:</span>
        <span>
          {item.quantityJob !== undefined
            ? item.quantityJob
            : "Không có thông tin"}{" "}
          người
        </span>
      </div>

      <div className="mb-10">
        {Array.isArray(item.tags) && item.tags.length > 0 ? (
          item.tags.map((tag, index) => <Tag key={index}>{tag}</Tag>)
        ) : (
          <span>Không có ngôn ngữ nào.</span>
        )}
      </div>
      {!hideApply && (
        <div className="apply-row">
          <Link to={`/job/${item.id}`} className="apply-link">
            Ứng tuyển
          </Link>
        </div>
      )}
    </Card>
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
