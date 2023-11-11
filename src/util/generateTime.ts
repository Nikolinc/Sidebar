export default function generateTime() {
  const hoursList: number[] = Initialization(24);
  const minuteList: number[] = Initialization(60);

  return { hoursList, minuteList };
}

function Initialization(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    arr.push(i);
  }
  return arr;
}
