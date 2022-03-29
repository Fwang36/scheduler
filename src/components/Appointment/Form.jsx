import React, {useState} from 'react'
import Button from '../Button'
import InterviewerList from 'components/InterviewerList'


export default function Form(props) {
  console.log("PRRRR", props)

  const [student, setStudent] = useState(props.interview ? props.interview.student : "");
  const [interviewer, setInterviewer] = useState(props.interview ? props.interview.interviewer.id : null);
  const [error, setError] = useState("");
  const reset = () => {
    setStudent("") 
    setInterviewer(null)
  }

  const cancel = () => {
    reset()
    props.onCancel()
  }

  const validate = () => {
    if (student === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (!interviewer) {
      setError("Please select interviewer")
      return;
    }
    props.onSave(student, interviewer, props.id);
  }

  return(

<main className="appointment__card appointment__card--create">
  <section className="appointment__card-left">
    <form autoComplete="off" onSubmit={event => event.preventDefault()}>
      <input

        className="appointment__create-input text--semi-bold"
        name={props.name}
        type="text"
        value={student}
        onChange={(e) => setStudent(e.target.value)}
        placeholder="Enter Student Name"
        data-testid="student-name-input"

      />
      <section className="appointment__validation">{error}</section>

    </form>

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


  )

}
