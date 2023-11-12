/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import './range.css'



function InputRange({ filters }: any) {

  const { min, max, step, from } = filters.values[0];
  const [count, setCount] = useState(from);

  return (
    <div className="range">
      <input type="range"
        max={max}
        min={min}
        step={step}
        value={count}
        onChange={(e) => setCount(e.target.valueAsNumber)} />
      <div className="between" >
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
}


export default InputRange