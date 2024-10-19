import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { getAllJob } from "../../services/jobService"
import { Tag } from "antd";
import SearchList from "./SearchList";
import Goback from "../../Components/Goback";

function Search() {
    const [searchParam, setSearchParam] = useSearchParams();
    const [data, setData] = useState([])
    const citySearch = searchParam.get("city" || "")
    // console.log(citySearch);
    const keywordSearch = searchParam.get("keyword" || "")
    // console.log(keywordSearch);
    useEffect(() => {
        const fetchAPI = async () => {
            const response = await getAllJob();
            // console.log(response);
            if (response) {
                const newData = response.filter((item) => {
                    const city = citySearch ? item.city?.includes(citySearch) : true;
                    const keyword = keywordSearch ? item.tags.some(tag => tag.includes(keywordSearch)) : true;
                    const status = item.status;
                    return city && keyword && status;
                });
                setData(newData.reverse())
            }
        };
        fetchAPI()
    }, []);
    // console.log(data);
    return (
        <>
            <Goback />
            <div className="mb-30 mt-30" >
                <strong className="mr-20" >Kết quả:</strong>
                {citySearch && <Tag color="red">{citySearch}</Tag>}
                {keywordSearch && <Tag color="blue">{keywordSearch}</Tag>}

            </div>

            {data && (
                <SearchList data={data} />
            )}
        </>
    );
}
export default Search