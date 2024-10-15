import { Card, Col, Row } from "antd"
import { Link } from "react-router-dom"

function Templatecv() {
    return (
        <>
            <Row gutter={[20,20]}>

                <Col span={12}><Link to="/create-CV1"><Card></Card></Link></Col>
                <Col span={12}><Link to="/create-CV2"><Card></Card></Link></Col>
              
               
            </Row>

        </>
    )
}
export default Templatecv