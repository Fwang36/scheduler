// const interviewer = {
//   id: 1,
//   name: "Sylvia Palmer",
//   avatar: "https://i.imgur.com/LpaY82x.png"
// };

import React, {useState} from "react";

import "components/InterviewerListItem.scss"

import classNames from "classnames";


export default function InterviewerListItem(props) {


let interviewerClass = classNames("interviewers__item", {
  "interviewers__item--selected": props.selected,
})
let name = ""
if (props.selected) {
  name = props.name
}

  return (
    <li className={interviewerClass} onClick={() => props.setInterviewer(props.id)}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {name}
  </li>
  )

} 