"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Joyplot = require("./Joyplot.scss");

var styles = _interopRequireWildcard(_Joyplot);

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { h, Component } from "preact";
var React = require('react');

var Joyplot = function (_React$Component) {
  _inherits(Joyplot, _React$Component);

  function Joyplot(props) {
    _classCallCheck(this, Joyplot);

    var _this = _possibleConstructorReturn(this, (Joyplot.__proto__ || Object.getPrototypeOf(Joyplot)).call(this, props));

    _this.state = {
      width: 960,
      height: 800
    };
    _this.createChart = _this.createChart.bind(_this); // Bind to access within method
    return _this;
  }

  _createClass(Joyplot, [{
    key: "componentWillMount",
    value: function componentWillMount() {}
  }, {
    key: "componentDidMount",
    value: function componentDidMount() {
      this.loadData();
    }
  }, {
    key: "componentDidUpdate",
    value: function componentDidUpdate() {
      this.loadData();
    }
  }, {
    key: "createChart",
    value: function createChart(error, dataFlat, cp1919) {
      // Inital variables
      var joyplotHeight = 100;
      var joyplotWidth = 700;
      var spacing = 16;

      // Set up a date parser
      var parseDate = d3.timeParse("%d/%m/%Y");

      // set the range scales
      var xScale = d3.scaleTime().range([0, joyplotWidth]);
      var yScale = d3.scaleLinear().range([joyplotHeight, 0]);

      console.log(dataFlat);

      var searchTerm = "Ankara bombing";

      // define the chart area
      var area = d3.area().x(function (d) {
        return xScale(d.Week);
      }).y1(function (d) {
        return yScale(d[searchTerm]);
      }).y0(yScale(0)).curve(d3.curveBasis);

      var line = d3.line().x(function (d) {
        return xScale(d.Week);
      }).y(function (d) {
        return yScale(d[searchTerm]);
      }).curve(d3.curveBasis);

      // Parse the dates to use full date format
      dataFlat.forEach(function (d) {
        d.Week = parseDate(d["Week"]);
      });

      // Convert the number strings to integers
      dataFlat.columns.forEach(function (d) {
        dataFlat.forEach(function (e) {
          if (d === "Week") return;
          e[d] = +e[d];
        });
      });

      // Draw the chart
      var svg = d3.select("svg").attr("width", this.state.width).attr("height", this.state.height);

      var g = svg.append("g");

      xScale.domain(d3.extent(dataFlat, function (d) {
        return d.Week;
      }));

      yScale.domain([0, d3.max(dataFlat, function (d) {
        return d["Sydney siege"];
      })]);

      dataFlat.columns.forEach(function (volume, i) {
        if (volume === "Week") return;

        area.y1(function (d) {
          return yScale(d[volume]);
        });

        line.y(function (d) {
          return yScale(d[volume]);
        });

        g.append("path").datum(dataFlat).attr("fill", '#C70039').attr("transform", "translate(0, " + spacing * i + ")").attr("d", area);

        g.append("path").datum(dataFlat).style("fill", "none").style("stroke", "#900C3F").style("stroke-width", 1.4).attr("transform", "translate(0, " + spacing * i + ")").attr("d", line);
      });
    }
  }, {
    key: "loadData",
    value: function loadData() {
      d3.queue(2) // Load 2 files concurrently (if there are more than 1)
      .defer(d3.csv, this.props.dataUrl).await(this.createChart);
    }
  }, {
    key: "render",
    value: function render(props, state) {
      return React.createElement(
        "div",
        { className: styles.root },
        React.createElement("svg", { "class": styles.joyplot })
      );
    }
  }]);

  return Joyplot;
}(React.Component);

module.exports = Joyplot;

// const React = require('react');
// const PropTypes = require('prop-types');


// const loading_style = {
//     position: 'relative',
//     margin: '0px auto',
//     width: '40px',
//     height: '40px',
// };

// const svg_style = {
//     animation: 'rotate 2s linear infinite',
//     height: '100%',
//     transformOrigin: 'center center',
//     width: '100%',
//     position: 'absolute',
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     margin: 'auto'
// };

// const circle_style = {
//     strokeDasharray: '1,200',
//     strokeDashoffset: '0',
//     animation: 'dash 1.5s ease-in-out infinite, color 6s ease-in-out infinite',
//     strokeLinecap: 'round'
// };


// const animation = `@keyframes rotate {
//     100% {
//         transform: rotate(360deg);
//     }
// }
// @keyframes dash {
//     0% {
//         stroke-dasharray: 1,200;
//         stroke-dashoffset: 0;
//     }
//     50% {
//         stroke-dasharray: 89,200;
//         stroke-dashoffset: -35px;
//     }
//     100% {
//         stroke-dasharray: 89,200;
//         stroke-dashoffset: -124px;
//     }
// }
// @keyframes color {
//     100%, 0% {
//         stroke: #d62d20;
//     }
//     40% {
//         stroke: #0057e7;
//     }
//     66% {
//         stroke: #008744;
//     }
//     80%, 90% {
//         stroke: #ffa700;
//     }
// }`;


// class Loading extends React.Component {
//     render () {
//         let { component, className, isLoading, children } = this.props;

//         if (isLoading) {
//             let { width, height, margin, style, strokeWidth } = this.props;

//             loading_style.width = width;
//             loading_style.height = height;
//             loading_style.margin = margin;

//             return React.createElement(
//                 component,
//                 { style: Object.assign({}, loading_style, style) },
//                 <style>{animation}</style>,
//                 <svg style={svg_style} viewBox="25 25 50 50">
//                     <circle style={circle_style} cx="50" cy="50" r="20" fill="none" strokeWidth={strokeWidth} strokeMiterlimit="10"/>
//                 </svg>
//             );
//         } else {
//             return React.createElement(component, { className }, children || null);
//         }
//     }
// }


// Loading.propTypes = {
//     className: PropTypes.string,
//     isLoading: PropTypes.bool,
//     style: PropTypes.object,
//     width: PropTypes.string,
//     height: PropTypes.string,
//     margin: PropTypes.string,
//     component: PropTypes.any
// };


// Loading.defaultProps = {
//     className: '',
//     isLoading: true,
//     style: {},
//     width: '40px',
//     height: '40px',
//     margin: '0 auto',
//     component: 'div',
//     strokeWidth: '7'
// };


// module.exports = Loading;


// // Polyfills
// if (typeof Object.assign != 'function') {
//     Object.assign = function(target, varArgs) { // .length of function is 2
//         'use strict';
//         if (target == null) { // TypeError if undefined or null
//             throw new TypeError('Cannot convert undefined or null to object');
//         }

//         var to = Object(target);

//         for (var index = 1; index < arguments.length; index++) {
//             var nextSource = arguments[index];

//             if (nextSource != null) { // Skip over if undefined or null
//                 for (var nextKey in nextSource) {
//                     // Avoid bugs when hasOwnProperty is shadowed
//                     if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
//                         to[nextKey] = nextSource[nextKey];
//                     }
//                 }
//             }
//         }
//         return to;
//     };
// }