import * as actionTypes from "../actionTypes";

let initState = {
  source: "",
  destination: "",
  marketDataInStore: [],
  portDataInStore: [],
  typeOfDataRange: "mean"
};

function rootReducer(state = initState, action) {

  switch (action.type) {
    case actionTypes.SOURCE:
      return {
        ...state,
        source: action.payload.source, 
      };
    case actionTypes.DESTINATION:
      return {
        ...state,
        destination: action.payload.destination,
      };
    case actionTypes.MARKET_DATA:
      return {
        ...state,
        marketDataInStore: action.payload.marketDataInStore,
      };
    case actionTypes.PORT_DATA:
      return {
        ...state,
        portDataInStore: action.payload.portDataInStore,
      };

      case actionTypes.RANGE_TYPE:
        return {
          ...state,
          typeOfDataRange: action.payload.typeOfDataRange,
        };

    default:
      return state;
  }
}

export default rootReducer;
