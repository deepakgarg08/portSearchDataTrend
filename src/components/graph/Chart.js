import React from "react";
import * as d3 from "d3";
import { connect } from "react-redux";

/**
 * LineChart
 * MarketData and dataTypeRange(low,mean,high) are fetched from redux store.
 */

const margin = { top: 40, right: 80, bottom: 60, left: 50 },
  width = 960 - margin.left - margin.right,
  height = 280 - margin.top - margin.bottom,
  color = "OrangeRed";

const Chart = (props) => {

  const [activeIndex, setActiveIndex] = React.useState("");

  const marketDataFromStore = props.init.marketDataInStore;
  const typeOfDataRange = props.init.typeOfDataRange;

  let tmp = marketDataFromStore === undefined ? [] : marketDataFromStore;
    const data = tmp?.reverse();

  const yMinValue = d3.min(data, (d) => d[typeOfDataRange]),
    yMaxValue = d3.max(data, (d) => d[typeOfDataRange]);

  const getX = d3
    .scaleTime()
    .domain(d3.extent(data, (d) => new Date(d.day)))
    .range([0, width]);

  const getY = d3
    .scaleLinear()
    .domain([yMinValue - 1, yMaxValue + 2])
    .range([height, 0]);

  const getXAxis = (ref) => {
    const xAxis = d3.axisBottom(getX);
    d3.select(ref).call(xAxis.tickFormat(d3.timeFormat("%b")));
  };

  const getYAxis = (ref) => {
    const yAxis = d3.axisLeft(getY).tickSize(-width).tickPadding(7);
    d3.select(ref).call(yAxis);
  };

  const linePath = d3
    .line()
    .x((d) => getX(new Date(d.day)))
    .y((d) => getY(d[typeOfDataRange]))
    .curve(d3.curveMonotoneX)(data);

  const areaPath = d3
    .area()
    .x((d) => getX(new Date(d.day)))
    .y0((d) => getY(d[typeOfDataRange]))
    .y1(() => getY(yMinValue - 1))
    .curve(d3.curveMonotoneX)(data);

  const handleMouseMove = (e) => {
    const bisect = d3.bisector((d) => new Date(d.day)).left,
      x0 = getX.invert(d3.pointer(e, this)[0]),
      index = bisect(data, x0, 1);
    setActiveIndex(index);
  };

  const handleMouseLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="wrapper">
      <svg
        viewBox={`0 0 ${width + margin.left + margin.right} 
                              ${height + margin.top + margin.bottom}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        <g className="axis" ref={getYAxis} />
        <g
          className="axis xAxis"
          ref={getXAxis}
          transform={`translate(0,${height})`}
        />
        <path fill={color} d={areaPath} opacity={0.3} />
        <path strokeWidth={3} fill="none" stroke={color} d={linePath} />

        <text x={width / 2} y={0 - margin.top / 2} textAnchor="middle">
          {"PORT DATA (USD)"}
        </text>

        {data.map((item, index) => {
          return (
            <g key={index}>
              <text
                fill="#666"
                x={getX(new Date(item.day))}
                y={getY(item[typeOfDataRange]) - 20}
                textAnchor="middle"
              >
                {index === activeIndex ? item[typeOfDataRange] : ""}
              </text>
              <circle
                cx={getX(new Date(item.day))}
                cy={getY(item[typeOfDataRange])}
                r={index === activeIndex ? 6 : 4}
                fill={color}
                strokeWidth={index === activeIndex ? 2 : 0}
                stroke="#fff"
                style={{ transition: "ease-out .1s" }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
};
const mapStateToProps = (state) => {
  return {
    init: state,
  };
};

export default connect(mapStateToProps)(Chart);
