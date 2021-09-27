import { useEffect } from "react";
import { connect } from "react-redux";
import { MARKET_DATA } from "../redux/actionTypes";

/**
 * 
 * MarketData is fetched based on source and destination
 * when both source and destination values are present
 * Then stored into redux store. 
 */

const MarketData = (props) => {
  let source = props.init.source;
  let destination = props.init.destination;

  const market_api_url = `https://685rp9jkj1.execute-api.eu-west-1.amazonaws.com/prod/rates?origin=${source}&destination=${destination}`;

  const market_api = new Request(market_api_url, {
    method: "GET",
    headers: {
      "x-api-key": process.env.REACT_APP_AUTH_TOKEN
    },
  });
  useEffect(() => {
    fetch(market_api)
      .then((response) => response.json())
      .then((result) => {
        props.marketData(result);
      })
      .catch((error) => {
        console.log(error)
      });
  }, [source, destination]);

  return <div />;
};
const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    marketData: (marketData) => {
      dispatch({
        type: MARKET_DATA,
        payload: { marketDataInStore: marketData },
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MarketData);
