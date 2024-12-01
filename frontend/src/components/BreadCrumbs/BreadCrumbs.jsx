import { useNavigate } from "react-router";
import "./BreadCrumbs.css";
import { PropTypes } from "prop-types";

export default function BreadCrumbs(props) {
  const navigate = useNavigate();

  const moveToUserHome = () => {
    navigate("/user-home");
  };

  return (
    <div className="bread-crumbs-container">
      <div className="bread-crumbs-item">
        <i className="bread-crumb-icon fa-solid fa-house icon" onClick={moveToUserHome}></i>
      </div>
      <div className="bread-crumbs-item">/</div>
      <div className="bread-crumbs-item">{props.item}</div>
    </div>
  );
}

BreadCrumbs.propTypes = {
  item: PropTypes.string,
};
