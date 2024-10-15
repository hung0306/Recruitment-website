import { Menu } from 'antd';
import { Link } from "react-router-dom"

function MenuIn4User(){


    const items = [
        {
          key: 'sub1',
          label: 'Quản lý tài khoản',
          children: [
            {
              key: 'g1',
              label: <Link to="/profile">Thông tin cá nhân</Link>,
              type: 'group',
            },
            {
                key: 'g2',
                label: <Link to="/template">Tạo Cv</Link>,
                type: 'group',
              },
              {
                key: 'g3',
                label: <Link to="/manager-Cv-user">Quản lý Cv</Link>,
                type: 'group',
              },
        ]
       
          
        }
    
    ]
    return(
        <>
       <Menu
     
      style={{
        width: 256, 
      }}
      
      mode="inline"
      items={items}
    />
        </>
    )
}
export default MenuIn4User;