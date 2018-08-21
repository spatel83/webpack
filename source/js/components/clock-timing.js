/* jshint esversion: 6 */
/* eslint-env browser */
/* eslint-disable global-require */
/* eslint no-plusplus: ["error", { "allowForLoopAfterthoughts": true }] */
/* eslint-disable import/prefer-default-export */
/* eslint no-console: 0 */
/* eslint no-undef: 0 */

/**
 * Clock Timing.
 */
export function startClock() {
  let time = $('#dvWeather > .left-side > .timing > #lblTime').text().trim();
  let hour = parseInt(time.substring(0, 2), 10);
  let min = parseInt(time.substring(3, 5), 10);
  let ampm = time.substring(6, 8);
  let currentLocation = $('#dvWeather > .left-side > .location').text().trim();
  let previousLocation = $('#dvWeather > .left-side > .location').text().trim();
  let textMinute = null;
  let textHour = null;
  let textTime = null;
  let twelveHourReset = false;

  /**
   * Check Current Location Time.
   */
  function checkCurrentLocationTime() {
    currentLocation = $('#dvWeather > .left-side > .location').text().trim();
    if (currentLocation !== previousLocation) {
      time = $('#dvWeather > .left-side > .timing > #lblTime').text().trim();
      hour = parseInt(time.substring(0, 2), 10);
      min = parseInt(time.substring(3, 5), 10);
      ampm = time.substring(6, 8);
    }
    previousLocation = currentLocation;
  }

  /**
   * Increment Clock
   */
  function incrementClock() {
    if (min < 59) {
      min += 1;
    } else {
      min = 0;
      if (hour <= 11) {
        hour += 1;
        if (hour === 12 && twelveHourReset === false) {
          ampm = (ampm === 'AM') ? 'PM' : 'AM';
          twelveHourReset = true;
        }
      } else {
        hour = 1;
        twelveHourReset = false;
      }
    }
    textMinute = (min < 10) ? `0${min}` : min;
    textHour = (hour < 10) ? `0${hour}` : hour;
    if (textHour.length === 3) {
      textHour = textHour.substring(1, 3);
    }
    textTime = `${textHour}:${textMinute} ${ampm}`;
    $('#dvWeather > .left-side > .timing > #lblTime').text(textTime);
  }

  if (time !== null) {
    setInterval(() => {
      checkCurrentLocationTime();
      incrementClock();
    }, 60000);
  }
}
