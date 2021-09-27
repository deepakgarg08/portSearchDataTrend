import Buttons from "./Buttons.js";
import { connect } from "react-redux";
import Chart from "./Chart";

/**
 * According to MarketAPi, 3 types of data possible
 * 1)either data not found,
 * 2)proper data is coming.
 * 3) all the null data are coming from the APi.
 *  
 * //ASSUMED: if first value of data fetched is null, then whole received data is null
 * 
 * Graph child components are only rendered when proper data is coming
 */
const Graph = (props) => {
  const marketDataFromStore = props.init.marketDataInStore;

  if (marketDataFromStore.length === 0) {
    return <div />;
  } else if (marketDataFromStore.message === "Not found") {
    return <div className="errormessage">Data Not Found!!</div>;
  } else if (marketDataFromStore[0].low === null) {
    return <div className="errormessage">Null Data Found!!</div>;
  } else {
    return (
      <div>
        <Buttons />
        <Chart />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

export default connect(mapStateToProps)(Graph);
