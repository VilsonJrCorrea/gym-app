import _ from "lodash";

export default function (list) {
  const dataWithoutLastPosition = _.cloneDeep(list);
  if (dataWithoutLastPosition.length > 1) {
    const lastPosition = dataWithoutLastPosition.length - 1;
    delete dataWithoutLastPosition[lastPosition];
    return dataWithoutLastPosition;
  }
  return dataWithoutLastPosition;
}
