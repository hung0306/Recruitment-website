import { Menu } from 'antd';
import { Link } from "react-router-dom"
import {
  
  EditOutlined,UserAddOutlined, MenuOutlined
} from '@ant-design/icons';
import "./MenuIn4User.scss"

function MenuIn4User(){


    const items = [
        {
          key: '1',
          label: <div style={{fontWeight:"bold"}}>Quản lý tài khoản</div>,
          children: [
            {
              key: '2',
              label: <Link to="/profile" > <EditOutlined style={{ color: 'green', marginRight: '8px' }}/>  <span style={{ color: 'black' }}>Thông tin cá nhân</span></Link>,
              type: 'group',
            },
            {
                key: '3',
                label: <Link to="/template" ><UserAddOutlined style={{ color: 'green', marginRight: '8px' }} />  <span style={{ color: 'black' }}>Tạo CV mới</span></Link>,
                type: 'group',
              },
              {
                key: '4',
                label: <Link to="/manager-Cv-user"><MenuOutlined style={{ color: 'green', marginRight: '8px' }}/>  <span style={{ color: 'black' }}>Quản lý CV của bạn</span></Link>,
                type: 'group',
              },
        ]
       
          
        }
    
    ]
    return(
        <>
       <Menu style={{margin:"10px 0px"}}
     
      
      
      mode="inline"
      items={items}
    />
        </>
    )
}
export default MenuIn4User;