import "./footer.scss";
import { Link } from "react-router-dom";

function Footer1() {
  return (
    <footer className="app-footer">
      <div className="footer-container">
        <div className="footer-col footer-brand">
          <Link to="/" className="footer-logo" aria-label="Trang chủ">
            RecruitmentWeb
          </Link>
          <p className="footer-desc">
            Nền tảng tìm kiếm việc làm và tuyển dụng. Kết nối ứng viên và nhà
            tuyển dụng nhanh chóng, hiệu quả.
          </p>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Liên kết</h4>
          <ul className="footer-list">
            <li>
              <Link to="/search">Tìm việc</Link>
            </li>
            <li>
              <Link to="/company">Công ty</Link>
            </li>
            <li>
              <Link to="/template">Tạo CV</Link>
            </li>
            <li>
              <Link to="/profile">Hồ sơ cá nhân</Link>
            </li>
          </ul>
        </div>

        <div className="footer-col">
          <h4 className="footer-title">Liên hệ</h4>
          <ul className="footer-list">
            <li>Email: support@recruitmentweb.dev</li>
            <li>Hotline: 0123 456 789</li>
            <li>Địa chỉ: Hà Nội, Việt Nam</li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <span>
          © {new Date().getFullYear()} RecruitmentWeb. All rights reserved.
        </span>
      </div>
    </footer>
  );
}

export default Footer1;
