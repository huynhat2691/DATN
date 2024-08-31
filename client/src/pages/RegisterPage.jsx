import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import Register from "../components/Register/Register.jsx";

const RegisterPage = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    if (isAuthenticated === true) {
      navigate("/");
    }
  }, [ isAuthenticated, navigate ]);

  return (
    <div>
      <Register />
    </div>
  );
};

export default RegisterPage;
