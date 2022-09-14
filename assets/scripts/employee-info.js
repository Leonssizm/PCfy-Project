const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const geoLettersRegex = /^[ა-ჰ]+$/;
const redberryEmailRegex = /^[a-zA-Z0-9+_.-]+@redberry.ge$/;
const phoneNumberRegex = /^[+]995 5[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}$/;
const teamSelection = document.getElementById("teams");
const positionSelection = document.getElementById("positions");
const emailElement = document.getElementById("email");
const phoneNumberElement = document.getElementById("phoneNumber");

fetch("https://pcfy.redberryinternship.ge/api/teams")
  .then((response) => response.json())
  .then((data) => {
    data = Object.entries(data)[0][1];
    data.forEach((position, index) => {
      document.getElementById("teams").innerHTML += `
      <option value=${position.name} id=${index}>${position.name}</option>`;
    });
  });

// document.getElementById("teams").addEventListener("change", () => {
//   if (document.getElementById("teams").value === "გაყიდვები") {
//     fetch("https://pcfy.redberryinternship.ge/api/positions")
//       .then((response) => response.json())
//       .then((data) => {
//         data = Object.entries(data)[0][1];
//         console.log(data);
//       });
//   }
// });

document.getElementById("nextPage").addEventListener("click", validateInputs);

function validateInputs() {
  let formIsValid = true;
  const firstnameValue = firstNameElement.value.trim();
  const lastnameValue = lastNameElement.value.trim();
  const emailValue = emailElement.value.trim();
  const phoneNumberValue = phoneNumberElement.value.trim();

  //   firstname & lastname validation:

  if (!isFilled(firstnameValue) || !lengthIsLonger(firstnameValue, 2)) {
    formIsValid = false;
    setError(firstName, "მინიმუმ 2 სიმბოლო, ქართული ასოები");
  } else if (!geoLettersRegex.test(firstnameValue)) {
    formIsValid = false;
    setError(firstNameElement, "გამოიყენე ქართული ასოები");
  } else {
    setSuccess(firstNameElement, "მინიმუმ 2 სიმბოლო, ქართული ასოები");
  }

  if (!isFilled(lastnameValue) || !lengthIsLonger(lastnameValue, 3)) {
    formIsValid = false;
    setError(lastNameElement, "მინიმუმ 3 სიმბოლო, ქართული ასოები");
  } else if (!geoLettersRegex.test(lastnameValue)) {
    formIsValid = false;
    setError(lastNameElement, "გამოიყენე ქართული ასოები");
  } else {
    setSuccess(lastNameElement, "მინიმუმ 3 სიმბოლო, ქართული ასოები");
  }

  // team and position selection Validation

  if (teamSelection.value === "თიმი") {
    formIsValid = false;
    teamSelection.parentElement.style.borderRadius = "12px";
    teamSelection.parentElement.style.border = "3px solid #ff3860";
  } else {
    teamSelection.parentElement.style.borderRadius = "12px";
    teamSelection.parentElement.style.border = "3px solid #09c352";
  }

  if (positionSelection.value === "პოზიცია") {
    formIsValid = false;
    positionSelection.parentElement.style.borderRadius = "12px";
    positionSelection.parentElement.style.border = "3px solid #ff3860";
  } else {
    positionSelection.parentElement.style.borderRadius = "12px";
    positionSelection.parentElement.style.border = "3px solid #09c352";
  }

  // email & phone Number Validation:
  if (!redberryEmailRegex.test(emailValue)) {
    formIsValid = false;
    setError(emailElement, "უნდა მთავრდებოდეს redberry.ge-თი");
  } else {
    setSuccess(emailElement, "უნდა მთავრდებოდეს redberry.ge-თი");
  }

  if (!phoneNumberRegex.test(phoneNumberValue)) {
    formIsValid = false;
    setError(phoneNumberElement, "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს");
  } else {
    setSuccess(phoneNumberElement, "უნდა აკმაყოფილებდეს ქართული მობ-ნომრის ფორმატს");
  }
}
