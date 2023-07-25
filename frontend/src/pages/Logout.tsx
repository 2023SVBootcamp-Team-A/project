import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authActions";

export default function Logout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // 컴포넌트가 처음 렌더링될 때 실행되는 로직.
    localStorage.removeItem("id");
    dispatch(logout());
    alert("로그아웃되었습니다.");
    navigate("/");
  }, []);

  return <></>;
}
