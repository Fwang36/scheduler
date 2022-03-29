import React from "react";
import "components/Application.scss";

import Daylist from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {state, setDay, bookInterview, deleteInterview} = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers = getInterviewersForDay(state, state.day);
  
  console.log("daily",dailyAppointments)
  
  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    console.log(interview)
    console.log("interviewers", interviewers)
   return  <Appointment
      key={appointment.id}
      {...appointment}
      id={appointment.id}
      interviewers={interviewers}
      bookInterview = {bookInterview}
      deleteInterview = {deleteInterview}
      interview={interview}

    />
  })



  return (
    
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          
          <Daylist
            days={state.days}
            value={state.day}
            onChange={setDay}
            />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {appointmentArr}
        <Appointment key="last" time="5pm" />

      </section>
      
    </main>



  );
}
