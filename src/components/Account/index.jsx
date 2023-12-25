import PropTypes from "prop-types";
import styles from "./Account.module.css";

Account.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
};

function Account({ user, onClick }) {
  return (
    <div className={styles.account}>
      <img src={user?.photo} alt="" />
      <p>Welcome, {user?.name?.split(" ")[0]}</p>
      <button className={styles.logout} onClick={onClick}>
        Logout
      </button>
    </div>
  );
}

export default Account;
