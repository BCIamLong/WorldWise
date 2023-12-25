import PropTypes from "prop-types";
import styles from "./Content.module.css";

Content.propTypes = {
  children: PropTypes.any,
};

function Content({ children }) {
  return (
    <div className={styles.app}>
      <main className={styles.main}>{children}</main>
    </div>
  );
}

export default Content;
