/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './radiobox.css'


function Radiobox({ filters }: any) {
  return (
    <div className="radiobox">
      {filters.values.map((item: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <RadioItem item={item} index={index} />
          </React.Fragment>)
      })}
    </div>);
}

function RadioItem(props: { item: any, index: number }) {
  const [checked, setChecked] = useState<boolean>(props.item.state as boolean);
  return (
    <label className='label-radio' htmlFor={`muhRadio${props.index}`} key={`muhRadio${props.index}`}>
      <input type="radio"
        id={`muhRadio${props.index}`}
        name="muhRadio"
        checked={checked}
        onChange={e => setChecked(e.target.checked)} />
      {props.item.name}
    </label>
  )
}

export default Radiobox