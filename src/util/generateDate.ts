import dayjs from "dayjs";
import "dayjs/locale/ru";
dayjs.locale("ru");

export const generateDate = (
  month = dayjs().month(),
  year = dayjs().year()
) => {
  const firstDateOfMonth = dayjs().year(year).month(month).startOf("month");
  const lastDateOfMonth = dayjs().year(year).month(month).endOf("month");

  const arrayOfDate = [];

  for (let i = 1; i < firstDateOfMonth.day(); i++) {
    const date = firstDateOfMonth.subtract(i, "day");

    arrayOfDate.unshift({
      currentMonth: false,
      date,
    });
  }

  for (let i = firstDateOfMonth.date(); i <= lastDateOfMonth.date(); i++) {
    arrayOfDate.push({
      currentMonth: true,
      date: firstDateOfMonth.date(i),
      today: firstDateOfMonth.date(i).isSame(dayjs(), "day"),
    });
  }

  const remaining = 35 - arrayOfDate.length;

  for (let i = 1; i <= remaining; i++) {
    const date = lastDateOfMonth.add(i, "day");

    arrayOfDate.push({
      currentMonth: false,
      date,
    });
  }
  return arrayOfDate;
};

export const months = [
  "Январь",
  "Февраль",
  "Март",
  "Апрель",
  "Май",
  "Июнь",
  "Июль",
  "Август",
  "Сентябрь",
  "Октябрь",
  "Ноябрь",
  "Декабрь",
];
