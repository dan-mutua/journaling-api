interface objShouldHaveId {
  id: number;
}

export default function arrToObjById(arr: Array<objShouldHaveId>): object {
  const data = {};
  arr.map((item) => {
    data[item.id] = item;
  });
  return data;
}
