//returns array of appointment ids of selected day
export function getAppointmentsForDay(state, day) {
  let dayAppointmentsArr = []
  let appointmentArrWithInterviews = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      dayAppointmentsArr = dayObj.appointments;
    }
    return dayAppointmentsArr;
    
  });
  for (let item of dayAppointmentsArr) {
    if (state.appointments[item]) {
      appointmentArrWithInterviews.push(state.appointments[item]);
    }
  }
  return appointmentArrWithInterviews;
}

//appends interview.interviewer object with interviewer information
export function getInterview(state, interview) {
  if (!interview) {
    return null;
  } else {
    interview = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer]
    }
  }
  return interview;
}

//gets array of available interviewers of selected day
export function getInterviewersForDay(state, day) {
  const current = state.days.filter(currentDay => currentDay.name === day);
  if(state.days.length===0 || current.length===0){
    return [];
  }

  const currentDayInterviewers = current[0].interviewers; 
  const interviewersArr = [];

  for(let interviewer of currentDayInterviewers) {
    interviewersArr.push(state.interviewers[interviewer]);
  }
  return interviewersArr;
}