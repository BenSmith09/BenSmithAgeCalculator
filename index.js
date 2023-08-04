//select the output elements
const output_year = document.querySelector(".output-year");
const output_month = document.querySelector(".output-month");
const output_day = document.querySelector(".output-day");
const submit_btn = document.querySelector(".submit-btn");
//INPUT ELEMENTS
let isValid = false;
const input_year = document.querySelector("#year");
const input_month = document.querySelector("#month");
const input_day = document.querySelector("#day");
//ERROR ELEMENTS
const error_year = document.querySelector(".error-year");
const error_month = document.querySelector(".error-month");
const error_day = document.querySelector(".error-day");
submit_btn.addEventListener("click", CalculateDate);

input_day.addEventListener("input", (e) => {
  if (+input_day.value > 31) {
    error_day.textContent = "Must be a valid date";
    isValid = false;
    return;
  } else {
    isValid = true;
    error_day.textContent = "";
  }
  if (+input_day.value === 0) {
    isValid = false;
    error_day.textContent = "This field is required";
    isValid = false;
    return;
  } else {
    error_day.textContent = "";
  }
});

input_month.addEventListener("input", (e) => {
  if (+input_month.value > 12) {
    error_month.textContent = "Must be a valid date";
    isValid = false;
    return;
  } else {
    isValid = true;
    error_month.textContent = "";
  }
  if (+input_month.value === 0) {
    isValid = false;
    error_month.textContent = "This field is required";
    isValid = false;
    return;
  } else {
    error_month.textContent = "";
  }
});

input_year.addEventListener("input", (e) => {
  if (+input_year.value > 2023) {
    error_year.textContent = "Must be a valid date";
    isValid = false;
    return;
  } else {
    isValid = true;
    error_year.textContent = "";
  }
  if (+input_year.value === 0) {
    isValid = false;
    error_year.textContent = "This field is required";
    isValid = false;
    return;
  } else {
    error_year.textContent = "";
  }
});

function CalculateDate() {
  if (isValid) {
    let inputYear = parseInt(input_year.value);
    let inputMonth = parseInt(input_month.value);
    let inputDay = parseInt(input_day.value);

    // Check if the month is valid
    if (inputMonth > 12 || inputMonth < 1) {
      error_month.textContent = "Invalid month";
      return;
    } else {
      error_month.textContent = "";
    }

    // Check if the day is within the valid range for the selected month
    let daysInMonth;
    switch (inputMonth) {
      case 2: // February
        daysInMonth = isLeapYear(inputYear) ? 29 : 28;
        break;
      case 4: // April
      case 6: // June
      case 9: // September
      case 11: // November
        daysInMonth = 30;
        break;
      default:
        daysInMonth = 31;
        break;
    }

    if (inputDay > daysInMonth || inputDay < 1) {
      error_day.textContent = `Invalid day for ${inputMonth}/${inputYear}`;
      return;
    } else {
      error_day.textContent = "";
    }

    let birthday = `${input_month.value}/${input_day.value}/${input_year.value}`;
    console.log(birthday);
    let birthdayObj = new Date(birthday);
    let ageDiffMill = Date.now() - birthdayObj;
    let ageDate = new Date(ageDiffMill);
    let ageYears = ageDate.getUTCFullYear() - 1970;

    let birthdateThisYear = new Date();
    birthdateThisYear.setUTCMonth(birthdayObj.getUTCMonth());
    birthdateThisYear.setUTCDate(birthdayObj.getUTCDate());

    //Calculate the difference in months and days
    let ageMonth =
      birthdateThisYear <= Date.now()
        ? ageDate.getUTCMonth()
        : ageDate.getUTCMonth() - 1;
    let ageDay =
      birthdateThisYear <= Date.now()
        ? ageDate.getUTCDate() - 1
        : 31 - birthdayObj.getUTCDate() + ageDate.getUTCDate();

    output_day.textContent = ageDay;
    output_month.textContent = ageMonth;
    output_year.textContent = ageYears;

    let currentYear = 0;
    let currentMonth = 0;
    let currentDay = 0;
    const animationDuration = 1500; //Animation duration in milliseconds
    const startTime = Date.now();

    function updateAge() {
      const currentTime = Date.now();
      const elapsedTime = currentTime - startTime;
      const progress = Math.min(elapsedTime / animationDuration, 1);

      currentYear = Math.floor(ageYears * progress);
      currentMonth = Math.floor(ageMonth * progress);
      currentDay = Math.floor(ageDay * progress);

      output_day.textContent = currentDay;
      output_month.textContent = currentMonth;
      output_year.textContent = currentYear;

      if (progress < 1) {
        requestAnimationFrame(updateAge);
      }
    }

    updateAge();
  } else {
    alert("error");
  }
}
