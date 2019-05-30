/* eslint-disable react/prop-types */
import React, { Component } from "react";
// import TableBody from "@material-ui/core/TableBody";
// import TableCell from "@material-ui/core/TableCell";
// import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";

class CustomTableBody extends Component {
  renderCell = (datum, column) => {
    if (column.content) return column.content(datum);
    return _.get(datum, column.path);
  };

  createKey = (datum, column) => {
    return datum._id + (column.path || column.key);
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(datum => (
          <tr key={datum._id}>
            {columns.map(column => (
              <td key={this.createKey(datum, column)} align="left">
                {this.renderCell(datum, column)}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    );
  }
}
export default CustomTableBody;
