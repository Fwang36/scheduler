//days:Array a list of day objects (each object includes an id, name, and spots)
// day:String the currently selected day
// setDay:Function accepts the name of the day eg. "Monday", "Tuesday"

import React from "react";

import "components/DayListItem.scss"

import classNames from "classnames";
import { formatSpots } from "./helpers";
export default function DayListItem(props) {

  let dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  })

  const formatted = formatSpots(props.spots)
  
  return (
    <li className={dayClass} onClick={() => props.setDay(props.name)}>
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatted}</h3>
    </li>
  );
}