import { connect } from "react-redux";
import { RANGE_TYPE } from "../../redux/actionTypes";

/**  
 * Three buttons low, mean, high are added and controls of these buttons are stored in redux store
 * which triggers the chart components.
 */
function Buttons(props) {
  const handleSubmit = (e) => {
    props.changeDataRange(e);
  };

  return (
    <div className="Buttons">
      <button
        className="btn btn-primary"
        onClick={() => {
          handleSubmit("low");
        }}
      >
        low
      </button>
      <button
        className="btn  btn-primary"
        onClick={() => {
          handleSubmit("mean");
        }}
      >
        mean
      </button>
      <button
        className="btn btn-primary"
        onClick={() => {
          handleSubmit("high");
        }}
      >
        high
      </button>
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    init: state,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    changeDataRange: (typeofRange) => {
      dispatch({ type: RANGE_TYPE, payload: { typeOfDataRange: typeofRange } });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Buttons);
