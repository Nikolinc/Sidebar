export default function generateTime() {
  const hoursList: string[] = Initialization(24);
  const minuteList: string[] = Initialization(60);

  return { hoursList, minuteList };
}

function Initialization(length: number) {
  const arr = [];
  for (let i = 0; i < length; i++) {
    if (i < 10) {
      arr.push(`0${i}`);
    } else {
      arr.push(`${i}`);
    }
  }
  return arr;
}
