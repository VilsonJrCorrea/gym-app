import React, { Component } from "react";
import _ from "lodash";

class CustomTableBody extends Component {
  renderCell = (datum, column) => {
    if (column.content) return column.content(datum);
    return _.get(datum, column.path);
  };

  createKey = (datum, column, index) => {
    return datum._id + (column.path || column.key) + index;
  };

  render() {
    const { data, columns } = this.props;
    return (
      <tbody>
        {data.map(datum => (
          <tr key={datum._id}>
            {columns.map((column, index) => (
              <td key={this.createKey(datum, column, index)} align="left">
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
