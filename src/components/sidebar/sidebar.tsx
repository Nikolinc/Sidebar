import { useEffect, useState } from 'react';
import Calendar from '../calendar/calendar';
import './sidebar.css';
import TimePicker from '../timePicker/timePicer';
import Districts from '../districts/districts';
import Categories from '../categories/categories';
import { useSearchParams } from 'react-router-dom';

function Sidebar() {

  const [searchParams,] = useSearchParams();
  const startSearch = searchParams.get("start") || "";
  const finishSearch = searchParams.get("finish") || "";

  const [startData, setStartData] = useState(new Date)
  const [finishData, setFinishDate] = useState(new Date)

  useEffect(() => {
    if (startSearch) setStartData(new Date(startSearch));
    if (startSearch) setFinishDate(new Date(finishSearch));
  }, [startSearch, finishSearch])



  return (
    <aside id="sidebar">
      <h1 className='border-bottom'>
        Параметры подбора
      </h1>
      <section id="date">
        <p>Дата и время праздника</p>
        <Calendar date={new Date} />

        <section id="day">
          <section className="start"> <p>Начнем в</p> <TimePicker date={startData} type={'start'} /> </section>
          <section className="finish"><p>Закончим в</p> <TimePicker date={finishData} type={'finish'} /></section>
        </section>

        <section id="districts">
          <p>Район</p>
          <Districts />
        </section>
      </section>

      <Categories />
    </aside>
  )
}

export default Sidebar