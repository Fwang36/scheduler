// name:String the name of the day
// spots:Number the number of spots remaining
// selected:Boolean true or false declaring that this day is selected
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";
import classNames from "classnames";
import DayListItem from "./DayListItem";


export default function Daylist(props) {

  const dayList = props.days.map((day) => {
    
    return (
      <DayListItem
        key={day.key}
        name={day.name}
        spots={day.spots}
        selected={day.name === props.day}
        setDay={props.setDay}
        />
    )
  })
  return (
    <ul>{dayList}</ul>
  )

} 
