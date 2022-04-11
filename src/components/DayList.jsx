import React from "react";
import DayListItem from "./DayListItem";

//maps and displays list of days
export default function Daylist(props) {

  const dayList = props.days.map((day) => {

    return (
      <DayListItem
        key={day.name}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.value}
        setDay={props.onChange}
        />
    );
  });
  return (
    <ul>{dayList}</ul>
  );

} 
