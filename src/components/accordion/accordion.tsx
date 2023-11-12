/* eslint-disable @typescript-eslint/no-explicit-any */
import { RoomFilter } from '../../types/roomFilter';
import CategoriesJSON from '../../data/categories.json';
import React from 'react';
import Radiobox from '../radiobox/radiobox';
import InputRange from '../range/range';
import Checkbox from '../checkbox/checkbox';
import './accordion.css';

function Acardeon() {
  const roomFilters: RoomFilter[] = CategoriesJSON as RoomFilter[]

  return (
    <section className="categories-list">
      {roomFilters?.map((filter: RoomFilter, index) => {
        return (
          <React.Fragment key={index}>
            <RecursiveFilterComponent filters={filter.sidebar_filters} />
          </React.Fragment>
        )
      })}
    </section>
  )
}

const RecursiveFilterComponent = ({ filters }: any) => {
  return (
    <div>
      {Object.entries(filters).map(([key, value]) => {
        return (

          <React.Fragment key={key}>
            {value && typeof value === 'object' && !('type' in value) ? (
              <details className={`filter`} >
                <summary className={`details-summary`}> <h2>{key}</h2></summary>
                <div className="content">
                  <RecursiveFilterComponent filters={value} />
                </div>
              </details>
            ) : (
              <details className={`filter-content`}>
                <summary className={"content-summary"}> <p>{key}</p></summary>
                <div className="content">
                  <SelectType filters={value} />
                </div>
              </details>
            )}

          </React.Fragment>

        )
      })}
    </div>
  );
};


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


export default Acardeon