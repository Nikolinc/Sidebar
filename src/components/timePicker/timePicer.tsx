import { useRef, useState } from 'react';
import './timePicker.css';
import dayjs from 'dayjs';
import generateTime from '../../util/generateTime';
import useModal from '../../hooks/useModal';
import { ITooltipProps } from '../../types/tooltipProps';
import { useSearchParams } from 'react-router-dom';

interface ICalendarModal extends ITooltipProps {
  date: Date,
  type: string
}

function TimePicker(props: { date: Date, type: string }) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };

  return (<>
    <button className={`time-picer ${opened ? 'active' : ''}`} onClick={() => setOpened(true)} ref={buttonRef}>
      {props.date.toLocaleTimeString()}
    </button>
    <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} date={props.date} type={props.type} />
  </>)
}



function Modal(props: ICalendarModal) {
  const currentDate = dayjs(props.date);
  const { hoursList, minuteList } = generateTime()
  const [hour, setHour] = useState(currentDate.hour());
  const [minute, setMinute] = useState(currentDate.minute());
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [, setSearchParams] = useSearchParams();

  const onClose = () => {
    const date: Date = props.date;
    date.setHours(hour);
    date.setMinutes(minute);

    setSearchParams((prev) => {
      prev.set(props.type, String(date.toJSON()));
      return prev;
    });
    props.onClose();
  }

  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: onClose,
    enabled: props.opened,
  });

  if (!props.opened) {
    return null;
  }

  function setTextInput(e: React.ChangeEvent<HTMLInputElement>, arr: number[], push: (num: number) => void) {
    const limit: number = 2;
    const number = Number(e.target.value.slice(0, limit));
    if (number < arr.length - 1 && number > 0) {
      push(number);
    }
  }

  const pref = (item: number, arr: number[], push: (num: number) => void) => {
    const index = arr.indexOf(item);
    if (index <= 0) {
      push(arr[arr.length - 1]);
      return
    }
    push(arr[index - 1]);
  }

  const next = (item: number, arr: number[], push: (num: number) => void) => {
    const index = arr.indexOf(item);
    if (index >= arr.length - 1) {
      push(arr[0]);
      return
    }
    push(arr[index + 1]);
  }

  return (
    <div className="timepicer-area" ref={tooltipRef}>

      <div className="hours-list">
        <button onClick={() => next(hour, hoursList, setHour)}>&#9650;</button>
        <input type='number'
          onChange={(e) => setTextInput(e, hoursList, setHour)}
          value={hour}
          style={{
            color: `${hour === currentDate.hour() ? "var(--secondary)" : "var(--text)"}`
          }} />
        <button onClick={() => pref(hour, hoursList, setHour)}>&#9660;</button>
      </div>
      <div className="minutes-list">
        <button onClick={() => next(minute, minuteList, setMinute)}>&#9650;</button>
        <input type='number'
          onChange={(e) => setTextInput(e, minuteList, setMinute)}
          value={minute}
          style={{
            color: `${minute === currentDate.minute() ? "var(--secondary)" : "var(--text)"}`
          }} />
        <button onClick={() => pref(minute, minuteList, setMinute)}>&#9660;</button>
      </div>
    </div>
  );
}



export default TimePicker