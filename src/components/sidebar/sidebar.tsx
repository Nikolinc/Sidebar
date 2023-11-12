import Calendar from '../calendar/calendar';
import './sidebar.css';
import TimePicker from '../timePicker/timePicer';
import Districts from '../districts/districts';
import Acardeon from '../accordion/accordion';

function Sidebar() {

  return (
    <aside id="sidebar">
      <h1 className='border-bottom'>
        Параметры подбора
      </h1>
      <section id="date">
        <p>Дата и время праздника</p>
        <Calendar date={new Date} />

        <section id="day">
          <section className="start"> <p>Начнем в</p> <TimePicker date={new Date} type={'start'} /> </section>
          <section className="finish"><p>Закончим в</p> <TimePicker date={new Date} type={'finish'} /></section>
        </section>

        <section id="districts">
          <p>Район</p>
          <Districts />
        </section>
      </section>

      <Acardeon />
    </aside>
  )
}

export default Sidebar