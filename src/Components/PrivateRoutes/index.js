import { Navigate, Outlet } from "react-router-dom";
import { getCookie } from "../../helpers/cookies";

function PrivateRouter() {
  const token = getCookie("token");

  // phải dùng cái token để check vì nếu dùng (islogin ?) thì khi bấm vào cái load trang nó sẽ trả về giá trị ban đầu ( vi dụ ban đầu state = false, mình dispatch lên là true nhưng khi load trang nó lại quay về false mà false thì nó hiện trang login mà)

  return (
    <>
      {token.length > 0 ? <Outlet /> : <Navigate to="/login" />}
      {/* hinh nhu  (<Navigate to="/login"/>) chuyen thanh (<>Login</>) CUNG DC */}
      {/* navigate để chuyển hướng sang trang nào đó */}
    </>
  );
}
export default PrivateRouter;
