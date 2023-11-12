/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import './checkbox.css'



function Checkbox({ filters }: any) {
  return (
    <div className="checkbox">
      {filters.values.map((item: any, index: number) => {
        return (
          <React.Fragment key={index}>
            <CheckItem item={item} />
          </React.Fragment>
        )
      })}
    </div>);
}

function CheckItem(props: { item: any }) {

  const [checked, setChecked] = useState<boolean>(props.item.state as boolean);
  return (
    <div>
      <input
        type="checkbox"
        id={props.item.name}
        onChange={e => setChecked(e.target.checked)}
        checked={checked} />
      <label htmlFor={props.item.name}>{props.item.name}</label>
    </div>
  )
}


export default Checkbox