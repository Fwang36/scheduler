import React from "react";
import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";

import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application() {

  const { state, setDay, bookInterview, deleteInterview } = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);  //array of selected day's appointments
  const interviewers = getInterviewersForDay(state, state.day); //array of selected day's interviewers

  //maps and displays appointments for selected day
  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);

    return <Appointment
      key={appointment.id}
      {...appointment}
      id={appointment.id}
      interviewers={interviewers}
      bookInterview={bookInterview}
      deleteInterview={deleteInterview}
      interview={interview}

    />
  });



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
  {/* displays list of days on side */}
          <DayList
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
