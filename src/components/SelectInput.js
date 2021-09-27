import "../index.css";
import { connect } from "react-redux";
import { DESTINATION, SOURCE } from "../redux/actionTypes";

/** 
 * currently selected source and destinations are stored into redux store
*/
const SelectInput = (props) => {
  const source = props.init.source;
  const destination = props.init.destination;
  return (
    <div>
      <select
        className="form-control"
        value={source}
        onChange={(e) => {
          props.source(e.target.value);
        }}
      >
        <option defaultValue ="Source">
          Source
        </option>
        {props.init.portDataInStore.map((place) => (
          <option value={place.code} key={place.code}>
            {place.name} ({place.code})
          </option>
        ))}
      </select>

      <select
        className="form-control"
        value={destination}
        onChange={(e) => {
          props.destination(e.target.value);

        }}
      >
        <option defaultValue ="Destination">
          Destination
        </option>
        {props.init.portDataInStore.map((place) => (
          <option value={place.code} key={place.code}>
            {place.name} ({place.code})
          </option>
        ))}
      </select>
      <br />
      <br />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    source: (source) => {
      dispatch({ type: SOURCE, payload: { source: source } });
    },

    destination: (destination) => {
      dispatch({ type: DESTINATION, payload: { destination: destination } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SelectInput);
