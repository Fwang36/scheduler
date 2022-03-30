
import React from "react";
import "components/InterviewerListItem.scss"
import classNames from "classnames";

//contents of individual interviewer list item
export default function InterviewerListItem(props) {

let interviewerClass = classNames("interviewers__item", {
  "interviewers__item--selected": props.selected,
})
let name = ""
if (props.selected) {
  name = props.name
}

  return (
    <li className={interviewerClass} onClick={props.setInterviewer}>
  <img
    className="interviewers__item-image"
    src={props.avatar}
    alt={props.name}
  />
  {name}
  </li>
  )

} 