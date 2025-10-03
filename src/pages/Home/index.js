import SearcchForm from "../../Components/SearchForm";
import "./home.scss";
import SkillList from "../../Components/SkillList";
import CompanyList from "../../Components/CompanyList";
import Goback from "../../Components/Goback";
import { Button } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAllJob } from "../../services/jobService";
import SearchList from "../Search/SearchList";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ city: "", keyword: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [bestJobs, setBestJobs] = useState([]);
  const location = useLocation();

  const fetchJobs = async (cityFilter = "", keywordFilter = "") => {
    const response = await getAllJob();
    if (response) {
      const filtered = response.filter((item) => {
        const cityOk = cityFilter ? item.city?.includes(cityFilter) : true;
        const keywordOk = keywordFilter
          ? item.tags?.some((tag) => tag.includes(keywordFilter))
          : true;
        return cityOk && keywordOk && item.status;
      });
      setJobs(filtered.reverse());
      // Smooth scroll to results when triggered by a search/filter
      if (cityFilter || keywordFilter) {
        setTimeout(() => {
          const el = document.querySelector(".item-search");
          if (el) {
            const rect = el.getBoundingClientRect();
            const absoluteY = window.scrollY + rect.top;
            const centerY =
              absoluteY - window.innerHeight / 2 + rect.height / 2;
            window.scrollTo({ top: centerY, behavior: "smooth" });
          }
        }, 50);
      }
    } else {
      setJobs([]);
    }
  };

  useEffect(() => {
    fetchJobs();
    // Load best jobs for homepage
    (async () => {
      const all = await getAllJob();
      if (all) {
        const active = all.filter((j) => j.status);
        const sorted = active.sort((a, b) => (b.salary || 0) - (a.salary || 0));
        setBestJobs(sorted.slice(0, 6));
      }
    })();
    const handler = (e) => {
      const { city, keyword } = e.detail || {};
      handleInlineSearch({ city: city || "", keyword: keyword || "" });
    };
    window.addEventListener("inline-search", handler);
    return () => window.removeEventListener("inline-search", handler);
  }, []);

  // Reset to default view when navigating back to Home without filters
  useEffect(() => {
    if (location.pathname === "/") {
      setFilters({ city: "", keyword: "" });
      setJobs([]);
      setIsSearching(false);
    }
  }, [location.pathname]);

  const handleInlineSearch = ({ city, keyword }) => {
    setFilters({ city, keyword });
    // Hiển thị tất cả job khi không nhập gì hoặc chọn All (city/keyword rỗng)
    setIsSearching(true);
    fetchJobs(city, keyword);
  };

  return (
    <>
      <Goback />
      <div className="home">
        <div className="bgr">
          <div className="hero">
            <div className="hero__left">
              <SearcchForm onSearch={handleInlineSearch} />
            </div>
            <div className="hero-tags">
              <SkillList />
            </div>
          </div>
        </div>

        {!isSearching && (
          <section className="home-stats">
            <div className="home-stats__container">
              <div className="home-stats__item">
                <div className="home-stats__number">40,000+</div>
                <div className="home-stats__label">Tin tuyển dụng mỗi ngày</div>
              </div>
              <div className="home-stats__item">
                <div className="home-stats__number">10,000+</div>
                <div className="home-stats__label">Doanh nghiệp uy tín</div>
              </div>
              <div className="home-stats__item">
                <div className="home-stats__number">1,000,000+</div>
                <div className="home-stats__label">Ứng viên tin dùng</div>
              </div>
            </div>
          </section>
        )}

        {!isSearching && (
          <section className="home-cta">
            <div className="home-cta__container">
              <div className="home-cta__left">
                <h3>Tìm công việc phù hợp hôm nay</h3>
                <p>
                  Khám phá hàng ngàn việc làm chất lượng cao, cập nhật mỗi ngày.
                </p>
              </div>
              <div className="home-cta__actions">
                <Button
                  type="primary"
                  style={{ backgroundColor: "#00b14f" }}
                  onClick={() => {
                    setIsSearching(true);
                    fetchJobs(filters.city, filters.keyword);
                  }}
                >
                  Tìm việc ngay
                </Button>
                <Link to="/registerUser" style={{ marginLeft: 12 }}>
                  <Button>Đăng ký ứng viên</Button>
                </Link>
              </div>
            </div>
          </section>
        )}
        {!isSearching && bestJobs && bestJobs.length > 0 && (
          <section className="home-best">
            <div className="home-best__container">
              <h3 className="home-best__title">Việc làm tốt nhất</h3>
              <SearchList data={bestJobs} />
            </div>
          </section>
        )}
        {isSearching && jobs && jobs.length > 0 && <SearchList data={jobs} />}
        <CompanyList />
      </div>
    </>
  );
}
export default Home;
