export default function (data) {
  for (let i = 0; i < data.length; i+=1) {
    data[i]._id = i;
  }
  return data;
}
