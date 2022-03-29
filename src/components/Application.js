import React, {useState, useEffect} from "react";

import "components/Application.scss";

import Daylist from "./DayList";

import Appointment from "./Appointment";


import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "helpers/selectors";
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {state, setDay, bookInterview, deleteInterview} = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  
  
  const appointmentArr = dailyAppointments.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
    const interviewers = getInterviewersForDay(state, state.day);
   return  <Appointment
      key={appointment.id}
      id={appointment.id}
      interviewer={interviewers}
      interview = {interview}
      bookInterview = {bookInterview}
      deleteInterview = {deleteInterview}
      {...appointment}
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
