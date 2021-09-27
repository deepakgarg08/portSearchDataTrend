import MarketData from "./MarketData";
import PortData from "./PortData";
import SelectInput from "./SelectInput";
import Graph from "./graph/Graph";
import { connect } from "react-redux";

const Home = (props) => {
  const source = props.init.source;
  const destination = props.init.destination;

  // All components are rendered here
  
  return (
    <div>
      <PortData />
      <SelectInput />
      {source && destination && <MarketData />}
      <Graph />
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

export default connect(mapStateToProps)(Home);
