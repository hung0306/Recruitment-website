import SearcchForm from "../../../Components/SearchForm";
import "./home.scss";
import SkillList from "../../../Components/SkillList";
import CompanyList from "../../../Components/CompanyList";
import { Button, Skeleton } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CountUp from "react-countup";
import { getAllJob } from "../../../services/jobService";
import SearchList from "../Search/SearchList";

function Home() {
  const [jobs, setJobs] = useState([]);
  const [filters, setFilters] = useState({ city: "", keyword: "" });
  const [isSearching, setIsSearching] = useState(false);
  const [bestJobs, setBestJobs] = useState([]);
  const [loading, setLoading] = useState(true);
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
    const loadData = async () => {
      setLoading(true);
      await fetchJobs();
      // Load best jobs for homepage
      const all = await getAllJob();
      if (all) {
        const active = all.filter((j) => j.status);
        const sorted = active.sort((a, b) => (b.salary || 0) - (a.salary || 0));
        setBestJobs(sorted.slice(0, 6));
      }
      setLoading(false);
    };
    loadData();
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

        {!isSearching && !loading && (
          <section className="home-stats">
            <div className="home-stats__container">
              <div className="home-stats__item">
                <div className="home-stats__number">
                  <CountUp
                    end={40000}
                    duration={2.5}
                    separator=","
                    suffix="+"
                  />
                </div>
                <div className="home-stats__label">Tin tuyển dụng mỗi ngày</div>
              </div>
              <div className="home-stats__item">
                <div className="home-stats__number">
                  <CountUp
                    end={10000}
                    duration={2.5}
                    separator=","
                    suffix="+"
                  />
                </div>
                <div className="home-stats__label">Doanh nghiệp uy tín</div>
              </div>
              <div className="home-stats__item">
                <div className="home-stats__number">
                  <CountUp
                    end={1000000}
                    duration={2.5}
                    separator=","
                    suffix="+"
                  />
                </div>
                <div className="home-stats__label">Ứng viên tin dùng</div>
              </div>
            </div>
          </section>
        )}
        {!isSearching && loading && (
          <section className="home-stats">
            <div className="home-stats__container">
              <div className="home-stats__item">
                <Skeleton.Input
                  active
                  size="large"
                  style={{ width: 120, height: 40 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 180, height: 20, marginTop: 8 }}
                />
              </div>
              <div className="home-stats__item">
                <Skeleton.Input
                  active
                  size="large"
                  style={{ width: 120, height: 40 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 180, height: 20, marginTop: 8 }}
                />
              </div>
              <div className="home-stats__item">
                <Skeleton.Input
                  active
                  size="large"
                  style={{ width: 120, height: 40 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 180, height: 20, marginTop: 8 }}
                />
              </div>
            </div>
          </section>
        )}

        {!isSearching && !loading && (
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
        {!isSearching && loading && (
          <section className="home-cta">
            <div className="home-cta__container">
              <div className="home-cta__left">
                <Skeleton.Input
                  active
                  size="large"
                  style={{ width: 300, height: 32, marginBottom: 12 }}
                />
                <Skeleton.Input
                  active
                  size="small"
                  style={{ width: 400, height: 20 }}
                />
              </div>
              <div className="home-cta__actions">
                <Skeleton.Button
                  active
                  size="large"
                  style={{ width: 120, height: 40 }}
                />
                <Skeleton.Button
                  active
                  size="large"
                  style={{ width: 140, height: 40, marginLeft: 12 }}
                />
              </div>
            </div>
          </section>
        )}
        {!isSearching && !loading && bestJobs && bestJobs.length > 0 && (
          <section className="home-best">
            <div className="home-best__container">
              <h3 className="home-best__title">Việc làm tốt nhất</h3>
              <SearchList data={bestJobs} />
            </div>
          </section>
        )}
        {!isSearching && loading && (
          <section className="home-best">
            <div className="home-best__container">
              <Skeleton.Input
                active
                size="large"
                style={{ width: 200, height: 32, marginBottom: 24 }}
              />
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 20,
                }}
              >
                {[...Array(6)].map((_, i) => (
                  <div
                    key={i}
                    style={{
                      border: "1px solid #e0e0e0",
                      borderRadius: 8,
                      padding: 16,
                    }}
                  >
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "100%", height: 20, marginBottom: 8 }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "80%", height: 16, marginBottom: 8 }}
                    />
                    <Skeleton.Input
                      active
                      size="small"
                      style={{ width: "60%", height: 16, marginBottom: 12 }}
                    />
                    <Skeleton.Button
                      active
                      size="small"
                      style={{ width: 80, height: 32 }}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        )}
        {isSearching && (
          <div
            className="home-results-banner"
            style={{
              background: "#f0fdf4",
              border: "1px solid #bbf7d0",
              padding: 12,
              borderRadius: 8,
              maxWidth: 1200,
              margin: "24px auto 0",
            }}
          >
            Tìm thấy {jobs.length} việc làm phù hợp
          </div>
        )}
        {isSearching && jobs && <SearchList data={jobs} />}
        <CompanyList />
      </div>
    </>
  );
}
export default Home;
