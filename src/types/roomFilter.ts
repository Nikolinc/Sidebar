interface RoomFilterValue {
  name: string;
  state: boolean;
}

interface RoomFilterOneSelect {
  type: "one_select";
  name: string;
  values: RoomFilterValue[];
}

interface RoomFilterRange {
  type: "range";
  name: string;
  values: {
    min: number;
    max: number;
    from: number;
    step: number;
    state: number;
  }[];
}

export interface RoomFilterMultiSelect {
  type: "multi_select";
  name: string;
  values: RoomFilterValue[];
}

export interface RoomFilterGroup {
  "Популярные фильтры": {
    Вместимость: RoomFilterOneSelect;
    "Площадь (кв.м)": RoomFilterRange;
  };
  Дополнительно: {
    Зонирование: RoomFilterMultiSelect;
    Условия: RoomFilterMultiSelect;
  };
}

export interface RoomFilter {
  id: number;
  title: string;
  sidebar_filters: RoomFilterGroup;
}
