import PropTypes from "prop-types";

Layout.propTypes = {
  children: PropTypes.any,
};

function Layout({ children }) {
  return <div className="container">{children}</div>;
}

export default Layout;
