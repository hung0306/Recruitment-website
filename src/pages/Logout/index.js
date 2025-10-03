import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteAllCookies } from "../../helpers/cookies";
import { checkLogin } from "../../actions/login";
import { useEffect } from "react";

function Logout() {
  const islogin = useSelector((state) => state.loginReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  deleteAllCookies();
  useEffect(() => {
    if (islogin === true) {
      dispatch(checkLogin(false)); // đã sửa chỗ này (BAN ĐẦU KO CÓ IF) lý do: cái state đó phải thay đổi để load trang.nếu ko có if thì bấm login state sẽ là true, nhưng khi bấm load trang state sẽ quay về gtri ban đầu là false, xong bấm đăng xuất cũng set state là false nên state ko thay đổi (ko load lại)
    } else {
      dispatch(checkLogin(true));
    }

    navigate("/");
  }, []);

  return <>out</>;
}
export default Logout;
