# Interview Scheduler

## Description

Interview Scheduler is a single page application for scheduling interviews.  Students can select the day and time slot and see available interviewers for the day.  Application is created through React and uses PostgreSQL to persist data.

## Screenshots

### Application Start
!["Main Page](https://github.com/Fwang36/scheduler/blob/master/docs/main.png)

### Create Appointment Form
!["Form"](https://github.com/Fwang36/scheduler/blob/master/docs/createAppointmentForm.png)

### Delete Appointment Confirmation

!["Confirm"](https://github.com/Fwang36/scheduler/blob/master/docs/deleteConfirmation.png)

## Setup

Install dependencies with `npm install`.

## Running Webpack Development Server

```sh
npm start
```

## Running Jest Test Framework

```sh
npm test
```

## Running Storybook Visual Testbed

```sh
npm run storybook
```

## Api server

Fork and clone the scheduler-api [here](https://github.com/lighthouse-labs/scheduler-api). Run this server along with this interview scheduler concurrently to test out the features.

## Depedencies

- Axios
- Classnames
- Normalize.css
- React
- React-dom
- React-scripts
