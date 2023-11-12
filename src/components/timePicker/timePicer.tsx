import { useRef, useState } from 'react';
import './timePicker.css';
import dayjs from 'dayjs';
import generateTime from '../../util/generateTime';
import useModal from '../../hooks/useModal';
import { ITooltipProps } from '../../types/tooltipProps';

interface ICalendarModal extends ITooltipProps {
  date: Date,
  type: string
}

function lengthСheck(item: string | number) {

  const sItem: string = String(item)

  if (sItem.length === 1) return (`0${sItem}`)
  return (`${sItem}`)
}

function TimePicker(props: { date: Date, type: string }) {
  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const onClose = () => {
    setOpened(false);
  };

  return (<>
    <button className={`time-picer ${opened ? 'active' : ''}`} onClick={() => setOpened(true)} ref={buttonRef}>
      {lengthСheck(props.date.getHours())}:{lengthСheck(props.date.getMinutes())}
    </button>
    <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} date={props.date} type={props.type} />
  </>)
}


function Modal(props: ICalendarModal) {
  const currentDate = dayjs(props.date);
  const { hoursList, minuteList } = generateTime();
  const [hour, setHour] = useState(String(currentDate.hour()));
  const [minute, setMinute] = useState(String(currentDate.minute()));
  const tooltipRef = useRef<HTMLDivElement>(null);

  const onClose = () => {
    const date: Date = props.date;
    date.setHours(Number(hour));
    date.setMinutes(Number(minute));
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

  function setTextInput(e: React.ChangeEvent<HTMLInputElement>, arr: string[], push: (num: string) => void) {
    const limit: number = 2;
    const number = Number(e.target.value.slice(0, limit));
    if (number < arr.length - 1 && number > 0) {
      push(lengthСheck(String(number)));
    }
  }

  const pref = (item: string, arr: string[], push: (num: string) => void) => {
    const index = arr.indexOf(item);
    if (index <= 0) {
      push(lengthСheck(arr[arr.length - 1]));
      return
    }
    push(lengthСheck(arr[index - 1]));
  }

  const next = (item: string, arr: string[], push: (num: string) => void) => {
    const index = arr.indexOf(item);
    if (index >= arr.length - 1) {
      push(lengthСheck(arr[0]));
      return
    }
    push(lengthСheck(arr[index + 1]));
  }

  return (
    <div className="timepicer-area" ref={tooltipRef}>

      <div className="hours-list">
        <button onClick={() => next(hour, hoursList, setHour)}>&#9650;</button>
        <input type='number'
          onChange={(e) => setTextInput(e, hoursList, setHour)}
          value={hour}
          style={{
            color: `${Number(hour) === currentDate.hour() ? "var(--color-active)" : "var(--text)"}`
          }} />
        <button onClick={() => pref(hour, hoursList, setHour)}>&#9660;</button>
      </div>
      <div className="minutes-list">
        <button onClick={() => next(minute, minuteList, setMinute)}>&#9650;</button>
        <input type='number'
          onChange={(e) => setTextInput(e, minuteList, setMinute)}
          value={minute}
          style={{
            color: `${Number(minute) === currentDate.minute() ? "var(--color-active)" : "var(--text)"}`
          }} />
        <button onClick={() => pref(minute, minuteList, setMinute)}>&#9660;</button>
      </div>
    </div>
  );
}



export default TimePicker