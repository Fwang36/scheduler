//Component for form
import React, { useState } from 'react';
import Button from '../Button';
import InterviewerList from 'components/InterviewerList';


export default function Form(props) {

  const [student, setStudent] = useState(props.interview ? props.interview.student : "");
  const [interviewer, setInterviewer] = useState(props.interview ? props.interview.interviewer.id : null);
  const [error, setError] = useState("");

  //function clears form
  const reset = () => {
    setStudent("");
    setInterviewer(null);
  }

  //function clears form and moves state back
  const cancel = () => {
    reset();
    setError("");
    props.onCancel();
  }


  //function displays error if student name is blank or if interviewer not selected
  //runs save function if both fields provided
  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select interviewer");
      return;
    }
    setError("");
    props.onSave(student, interviewer, props.id);
  }

  return (

    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          {/* input field for student name */}
          <input
            className="appointment__create-input text--semi-bold"
            name={props.name}
            type="text"
            value={student}
            onChange={(e) => setStudent(e.target.value)}
            placeholder="Enter Student Name"
            data-testid="student-name-input"
          />
          {/* displays error if exists */}
          <section className="appointment__validation">{error}</section>
        </form>
        {/* displays list of available interviewers for the day */}
        <InterviewerList
          interviewers={props.interviewers}
          value={interviewer}
          onChange={(e) => setInterviewer(e)}
        />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>


  );

}
