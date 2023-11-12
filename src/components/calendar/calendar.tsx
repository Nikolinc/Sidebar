import { useEffect, useMemo, useRef, useState } from 'react';
import './calendar.css'
import { ITooltipProps } from '../../types/tooltipProps';
import { generateDate, months } from '../../util/generateDate';
import useModal from '../../hooks/useModal';
import dayjs from 'dayjs';
import cn from '../../util/cn';
import { useSearchParams } from 'react-router-dom';

interface ICalendarModal extends ITooltipProps {
  date: Date,
}

function Calendar(props: { date: Date }) {

  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams,] = useSearchParams();
  const dateSearch = searchParams.get("date") || "";

  const data = useMemo(() => {
    const data = new Date(dateSearch);
    return dateSearch ? data : props.date;
  }, [dateSearch, props.date,])

  const onClose = () => {
    setOpened(false);
  };


  return (
    <>
      <button className={`date-button ${opened ? 'active' : ''}`} onClick={() => setOpened(true)} ref={buttonRef}>
        {data.toLocaleDateString('en-US')}
        <div className="calindar-icon" />
      </button>
      <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} date={data} />
    </>
  )
}

function Modal(props: ICalendarModal) {

  const days = ["пн", "вт", "ср", "чт", "пт", "сб", "вс"];
  const currentDate = dayjs(props.date);
  const [today, setToday] = useState(currentDate);
  const [selectDate, setSelectDate] = useState(currentDate);
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();

  useEffect(() => {
    setSearchParams((prev) => {
      prev.set("date", String(selectDate.toJSON()));
      return prev;
    });
  }, [selectDate, setSearchParams])

  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: props.onClose,
    enabled: props.opened,
  });


  if (!props.opened) {
    return null;
  }

  return (
    <div className="calendar-area" ref={tooltipRef}>
      <div className="calendar">
        <div className="months">
          <div className="months-select">
            <button
              onClick={() => {
                setToday(today.month(today.month() - 1));
              }}
            >&#10094;</button>
            <h2
              onClick={() => {
                setToday(currentDate);
              }}
            >
              <div>{months[today.month()]}</div>
              <div className="year">{today.year()}</div>
            </h2>
            <button
              className='prev'
              onClick={() => {
                setToday(today.month(today.month()
                  + 1));
              }}
            >&#10095;</button>
          </div>
        </div>
        <div className="week">
          {days.map((day, index) => {
            return (
              <h4
                key={index}>
                {day}
              </h4>
            );
          })}
        </div>

        <div className="months-grid">
          {generateDate(today.month(), today.year()).map(
            ({ date, currentMonth, today }, index) => {
              return (
                <div
                  key={index}
                  className="day"
                >
                  <button
                    className={cn(
                      currentMonth ? "" : "currentMonth",
                      today
                        ? "today"
                        : "",
                      selectDate
                        .toDate()
                        .toDateString() ===
                        date.toDate().toDateString()
                        ? "selectDate"
                        : "",
                    )}
                    onClick={() => {
                      setSelectDate(date)
                      props.onClose();
                    }}
                  >
                    {date.date()}
                  </button>
                </div>
              );
            }
          )}
        </div>
      </div>

    </div>
  )
}

export default Calendar