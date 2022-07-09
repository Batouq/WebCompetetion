<script>
  import { onMount } from "svelte";

  // Getting The Current Date & Time And Setting It
  let currentDateTime = new Date();

  onMount(() => {
    const interval = setInterval(() => {
      currentDateTime = new Date();
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  function getWeekDay(c) {
    let daysList = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    return daysList[c.getDay()];
  }
  function getMonth(c) {
    let monthsList = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];
    return monthsList[c.getMonth()];
  }
  function getDate(c) {
    return c.getDate();
  }
  function getHour(c) {
    return c.getHours() % 12 || 12;
  }
  function getMinute(c) {
    return c.getMinutes() < 10 ? "0" + c.getMinutes() : c.getMinutes();
  }
  function getMeridiem(c) {
    return c.getHours() < 12 ? "AM" : "PM";
  }
</script>

<div class="container">
    <h1>Time and Date</h1>
    
  <div class="date-time">
    <span class="time"
      >{getHour(currentDateTime)}:{getMinute(currentDateTime)}
      {getMeridiem(currentDateTime)}</span>
    <span class="date">
      {getWeekDay(currentDateTime)}
      {getMonth(currentDateTime)}
      {getDate(currentDateTime)}</span
    >
  </div>
</div>

<style>
  .container {
    font-size: 50px;
    width: 25rem;
    height: 20rem;
    background-color: #f9f8fe;
    box-shadow: rgba(0, 0, 0, 0.25) 0px 54px 55px,
      rgba(0, 0, 0, 0.12) 0px -12px 30px, rgba(0, 0, 0, 0.12) 0px 4px 6px,
      rgba(0, 0, 0, 0.17) 0px 12px 13px, rgba(0, 0, 0, 0.09) 0px -3px 5px;
    border-radius: 50px;
    margin: 2rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .time{
    text-align: center;
  }
  .date {
    display: flex;
  }
  h1{
    border-bottom:2px solid black ;
  }
  .date-time {
    font-weight: 500;
    margin: auto auto;
  }
</style>
