/* eslint-disable @typescript-eslint/no-explicit-any */

import './filterComponent.css'



function SelectType({ filters }: any) {
  switch (filters.type) {
    case "one_select":
      return <Radiobox filters={filters} />;
    case "range":
      return <InputRange filters={filters} />;
    case "multi_select":
      return <Checkbox filters={filters} />;
    default:
      (<></>);
  }
  return <></>;
}


function Radiobox({ filters }: any) {

  return (
    <div className="radiobox">
      {filters.values.map((item: any, index: number) => {
        return (
          <label htmlFor={`muhRadio${index}`} key={`muhRadio${index}`}>
            <input type="radio" id={`muhRadio${index}`} name="muhRadio" />
            {item.name}
          </label>
        )
      })}
    </div>);
}

function InputRange({ filters }: any) {

  const { min, max, step } = filters.values[0];

  return (
    <div className="range">
      <input type="range" max={max} min={min} step={step} />
      <div className="between" >
        <p>{min}</p>
        <p>{max}</p>
      </div>
    </div>
  );
}

function Checkbox({ filters }: any) {
  return (
    <div className="checkbox">
      {filters.values.map((item: any, index: number) => {
        return (
          <div key={`checkbox${index}`}>
            <input type="checkbox" id={item.name} />
            <label htmlFor={item.name}>{item.name}</label>
          </div>
        )
      })}
    </div>);
}

export default SelectType;
