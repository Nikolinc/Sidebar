/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useMemo, useRef, useState } from 'react';
import './districts.css'
import useModal from '../../hooks/useModal';
import { ITooltipProps } from '../../types/tooltipProps';
import { distrectList } from '../../data/district';
import { useSearchParams } from 'react-router-dom';



function Districts() {

  const [opened, setOpened] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const districtsSearch = searchParams.get("districts") || "";
  const [search, setSearch] = useState(districtsSearch);

  const onClose = () => {
    setOpened(false);
  };

  const handleDistrict = (state: string) => {
    setSearchParams((prev) => {
      prev.set("districts", String(state));
      return prev;
    });
    setSearch(state);
  }

  useEffect(() => {
    setSearch(districtsSearch)
  }, [districtsSearch])

  return (<>
    <button className={`button-districts ${opened ? 'active' : ''}`} onClick={() => setOpened(true)} ref={buttonRef}>
      <input type="districts" placeholder='любой' onChange={(e) => handleDistrict(e.target.value)} value={search} />
    </button>
    <Modal opened={opened} triggerRef={buttonRef} onClose={onClose} />
  </>
  )
}


function Modal(props: ITooltipProps) {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const districtsSearch = searchParams.get("districts") || "";


  const districts = useMemo(() => {

    const districtsList = distrectList.map((item) => {
      return {
        id: Math.random().toString(36).slice(2),
        text: item
      }
    });

    function Search(district: any) {
      return district.text.toUpperCase().indexOf(districtsSearch.toUpperCase()) !== -1;
    }


    return districtsSearch ? districtsList.filter(Search) : districtsList;

  }, [districtsSearch])


  useModal({
    elementRef: tooltipRef,
    triggerRef: props.triggerRef,
    onOutsideClick: props.onClose,
    enabled: props.opened,
  });


  const onHandleChange = (event: any) => {
    const { innerText } = event.target;
    console.log("id", innerText);
    setSearchParams((prev) => {
      prev.set("districts", String(innerText));
      return prev;
    });
  }

  if (!props.opened) {
    return null;
  }

  return (
    <div
      className='districts-area'
      ref={tooltipRef}
      onClick={onHandleChange}
    >
      <div>
        {districts.map((virtualItem) => {
          return (
            <div className='districts-item' key={virtualItem.id}>
              {virtualItem.text}
            </div>
          );
        })}
      </div>
    </div>
  )
}

export default Districts 