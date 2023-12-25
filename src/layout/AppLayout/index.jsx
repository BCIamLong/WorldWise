import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import { useAuth } from "../../contexts/authContext";
import Map from "../../components/Map";
import Sidebar from "../../components/Sidebar";
import Account from "../../components/Account";
import Layout from "../../components/Layout";
import Content from "../../components/Content";
// import styles from "./AppLayout.module.css";

// import { useEffect } from "react";
// import ProtectedRoute from "./ProtectedRoute";

AppLayout.propTypes = {
  isLoading: PropTypes.bool,
};

// function AppLayout({ isLoading }) {
function AppLayout() {
  const { isLoading } = useCities();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleClick = () => {
    logout();
    navigate("/login");
  };

  // useEffect(() => {
  //   if (!isAuthenticated) navigate("/login");
  // }, []);

  return (
    <Layout>
      <Account user={user} onClick={handleClick} />
      <Content>
        <Sidebar isLoading={isLoading} />
        <Map />
      </Content>
    </Layout>
  );
}

export default AppLayout;
