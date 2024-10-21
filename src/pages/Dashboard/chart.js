import { Pie } from '@ant-design/plots';
import { useEffect, useState } from "react"
import { getListCv } from '../../services/cvService';
import { getCookie } from '../../helpers/cookies';
function Char(){
    const [datachart, setDatachart] = useState([]);
    const idCompany = getCookie("id");
    useEffect(() => {
        const fetchApi = async () => {
            const response = await getListCv(idCompany);
            console.log(response);
            if (response) {
                let obj = {
                    total: 0,
                    statusTrue: 0,
                    statusFalse: 0,
                };
                obj.total = response.length;
                response.forEach((item) => {
                    item.statusRead ? obj.statusTrue++ : obj.statusFalse++;
                    //    if (item.statusRead == false || undefined) {
                    //     obj.statusFalse++
                    //    } else if(item.statusRead == true) {
                    //     obj.statusTrue++
                    //    }
                })

                const data = [
                    { type: 'Chưa đọc', value: obj.statusFalse },
                    { type: 'Đã đọc', value: obj.statusTrue }
                    

                  ];
                setDatachart(data)
            }
        }
        fetchApi()
    }, [])
    console.log("HI", datachart);
    
    const config = {
        data : datachart,
        angleField: "value",
        colorField: "type",

    }
    

    return(
    <>
   
    <Pie {...config} />
    </>
    )
}
export default Char;