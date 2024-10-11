import SearcchForm from "../../Components/SearchForm";
import "./home.scss"



import SkillList from "../../Components/SkillList";
import CompanyList from "../../Components/CompanyList";
import Goback from "../../Components/Goback";
function Home() {
  return (
    <>
      <Goback />
      <div className="bgr">
      <SearcchForm />
      <SkillList />
      </div>
     
      <CompanyList />
    </>
  )
}
export default Home;