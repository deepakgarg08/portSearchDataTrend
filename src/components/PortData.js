import { useEffect } from "react";
import { connect } from "react-redux";
import { PORT_DATA } from "../redux/actionTypes";
/**
 * 
 * PortData is fetched, Then stored into redux store. 
 */

const PortData = (props) => {
  const port_request = new Request(
    "https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/ports",
    {
      method: "GET",
      headers: {
        "x-api-key": process.env.REACT_APP_AUTH_TOKEN
      },
    }
  );

  useEffect(() => {
    fetch(port_request)
      .then((response) => response.json())
      .then((result) => {
        props.portData(result);
      });
  }, []);

  return <div />;
};

const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    portData: (portData) => {
      dispatch({ type: PORT_DATA, payload: { portDataInStore: portData } });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PortData);
