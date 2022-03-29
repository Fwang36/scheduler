

export function getAppointmentsForDay(state, day) {
  let result = []
  let result2 = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      result = dayObj.appointments
    }
    return result
  })
  for (let item of result) {
    if (state.appointments[item]) {
      result2.push(state.appointments[item])
    }
  }
  return result2;
}

export function getInterview(state, interview) {
  // console.log("interviewers obj", state.interviewers[interview.interviewer])
  if (!interview) {
    return null
  } else {
      interview = {
      student: interview.student,
      interviewer: state.interviewers[interview.interviewer] 
    }
  }
  return interview
}

export function getInterviewersForDay(state, day) {
  let result = []
  let result2 = []
  let result3 = []
  state.days.map(dayObj => {
    if (dayObj.name === day) {
      result = dayObj.appointments
    }
    return result
  })

  for (let item of result) {
    if (state.appointments[item].interview) {
      result3.push(state.appointments[item].interview.interviewer)
    }
  }

  let filtered = [...new Set(result3)]
  
  for (let item of filtered) {
    result2.push(state.interviewers[item])
  }
  return result2;
}