import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { getAllJob } from "../../../services/jobService";
import { Tag } from "antd";
import SearchList from "./SearchList";

function Search() {
  const [searchParam, setSearchParam] = useSearchParams();
  const [data, setData] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const citySearch = searchParam.get("city" || "");
  // console.log(citySearch);
  const keywordSearch = searchParam.get("keyword" || "");
  // console.log(keywordSearch);
  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getAllJob();
      // console.log(response);
      if (response) {
        const newData = response.filter((item) => {
          const city = citySearch ? item.city?.includes(citySearch) : true;
          const keyword = keywordSearch
            ? item.tags.some((tag) => tag.includes(keywordSearch))
            : true;
          const status = item.status;
          return city && keyword && status;
        });
        setData(newData.reverse());
        setLoaded(true);
      }
    };
    fetchAPI();
  }, [citySearch, keywordSearch]);
  // console.log(data);
  return (
    <>
      {loaded && (
        <div
          className="mb-30 mt-30"
          style={{
            background: "#f0fdf4",
            border: "1px solid #bbf7d0",
            padding: 12,
            borderRadius: 8,
          }}
        >
          <strong className="mr-20">Kết quả:</strong>
          {citySearch && <Tag color="red">{citySearch}</Tag>}
          {keywordSearch && <Tag color="blue">{keywordSearch}</Tag>}
          <span className="ml-10" style={{ color: "#065f46", fontWeight: 600 }}>
            Tìm thấy {data.length} việc làm phù hợp
          </span>
        </div>
      )}

      {data && <SearchList data={data} />}
    </>
  );
}
export default Search;
