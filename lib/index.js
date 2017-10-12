"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _d = require("d3");

var d3 = _interopRequireWildcard(_d);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// import { h, Component } from "preact";
var React = require('react');
// import * as styles from "./style.scss";

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