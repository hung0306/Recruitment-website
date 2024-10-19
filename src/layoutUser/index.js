// import { Button, Layout } from "antd";


// import logo from "../image/logo.png";
// import logofold from "../image/logo-fold.png"
// import {  MenuUnfoldOutlined } from "@ant-design/icons"
// import { useState } from "react";

// import MenuSider from "../Components/MenuSider/index";
// import { Link, Outlet } from "react-router-dom";
// import MenuUser from "../Components/MenuUser";
// const { Sider, Content, Header } = Layout;
// function LayoutUser() {
    
//     return (
//         <>
//             <>
//                 <Layout >

//                     <header className="headerr">
                        
                       
                            
//                             <div className="headerr__nav-right">
//                                 <Link className="mr-20" to="/"><Button>Trang chủ</Button></Link>
//                                 <Link to="/logout"><Button>Đăng xuất</Button></Link>
//                             </div>
                        
//                     </header>

//                     <Layout>
//                         <Sider theme="light">
//                             <MenuUser />
//                         </Sider>

//                         <Content  className="contentUser">
//                             <Outlet />


//                         </Content>
//                     </Layout>
//                 </Layout>


//                 {/* <div className={collapse ? "header__logo header__logo--collapsed" : "header__logo"}>
//                 <img src={collapse ? logofold : logo} alt="logo" />
//             </div>
//             HOAC
//             <div className={"header__logo" + (collapse && "header__logo--collapsed" )}>
//                 <img src={collapse ? logofold : logo} alt="logo" />
//             </div> */}
//             </>
//         </>
//     )
// }
// export default LayoutUser