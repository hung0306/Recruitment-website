import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
import { Link } from "react-router-dom";
import { Tag } from "antd";
import "./SkillList.scss";

function SkillList() {
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const fetchAPI = async () => {
      const response = await getListTag();
      if (response) {
        setTags(response);
      }
    };
    fetchAPI();
  }, []);
  console.log(tags);
  return (
    <>
      <div>
        {tags.map((item) => (
          <Link to={`Search?keyword=${item.value || ""}`} key={item.key}>
            <Tag
              className="tagcss"
              style={{
                fontSize: "12px",
                height: "30px",
                width: "70px",
                margin: "60px 7px",
                fontWeight: "bold",
              }}
            >
              {item.value}
            </Tag>
          </Link>
        ))}
      </div>
    </>
  );
}
export default SkillList;
