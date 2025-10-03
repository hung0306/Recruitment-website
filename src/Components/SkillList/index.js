import { useEffect, useState } from "react";
import { getListTag } from "../../services/tagService";
// removed Link to avoid unintended navigation when clicking tags
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
      <div className="skilllist-wrap">
        {tags.map((item) => (
          <Tag
            key={item.key}
            className="tagcss"
            style={{
              fontSize: "12px",
              height: "30px",
              margin: "10px 7px",
              fontWeight: "bold",
              cursor: "pointer",
            }}
            onClick={() => {
              const searchEvent = new CustomEvent("inline-search", {
                detail: { city: "", keyword: item.value || "" },
              });
              window.dispatchEvent(searchEvent);
            }}
          >
            {item.value}
          </Tag>
        ))}
      </div>
    </>
  );
}
export default SkillList;
