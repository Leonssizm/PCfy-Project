const firstNameElement = document.getElementById("firstName");
const lastNameElement = document.getElementById("lastName");
const geoLettersRegex = /^[ა-ჰ]+$/;
const redberryEmailRegex = /^[a-zA-Z0-9+_.-]+@redberry.ge$/;
const phoneNumberRegex = /^[+]9955[0-9]{2}[0-9]{2}[0-9]{2}[0-9]{2}$/;
const teamSelection = document.getElementById("teams");
const positionSelection = document.getElementById("positions");
const emailElement = document.getElementById("email");
const phoneNumberElement = document.getElementById("phoneNumber");

let teamIdForLocalStorage;
let positionIdForLocalStorage;

fetch("https://pcfy.redberryinternship.ge/api/teams")
  .then((response) => response.json())
  .then((teamsData) => {
    teamsData = Object.entries(teamsData)[0][1];
    teamsData.forEach((team, index) => {
      document.getElementById("teams").innerHTML += `
      <option value=${team.name} id=${index}>${team.name}</option>`;

      fetch("https://pcfy.redberryinternship.ge/api/positions")
        .then((response) => response.json())
        .then((positions) => {
          positions = Object.entries(positions)[0][1];

          teamSelection.addEventListener("change", () => {
            if (teamSelection.value === team.name) {
              positions.forEach((job) => {
                if (job.team_id === team.id) {
                  positionSelection.innerHTML +=
                    "<option value=" + job.name.replace(/\s+/g, ",") + ">" + job.name + "</option>";
                }
              });
            }
          });
        });
    });
  });

document.getElementById("nextPage").addEventListener("click", () => {
  if (validateInputs()) {
    setTimeout(() => {
      window.localStorage.setItem(
        "employee-info",
        JSON.stringify({
          name: firstNameElement.value,
          surname: lastNameElement.value,
          team_id: teamIdForLocalStorage,
          position_id: positionIdForLocalStorage,
          phone_number: phoneNumberElement.value,
          email: emailElement.value,
          token: "97d91ceeac715289ad07f7f2e3f16e23",
        })
      );
      window.location.href = "./laptop-info.html";
    }, 1000);
  } else {
    alert("Please provide valid information");
  }
});

function validateInputs() {
  let formIsValid = true;
  const firstnameValue = firstNameElement.value.trim();
  const lastnameValue = lastNameElement.value.trim();
  const emailValue = emailElement.value.trim();
  const phoneNumberValue = phoneNumberElement.value.trim();
  const positionSelectionValue = positionSelection.value.split(",").join(" ");
  const teamSelectionValue = teamSelection.value.trim();
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

  //retreiving team and position Id's for the object to be stored in local storage
  fetch("https://pcfy.redberryinternship.ge/api/positions")
    .then((response) => response.json())
    .then((positions) => {
      positions = Object.entries(positions)[0][1];
      positions.forEach((position) => {
        if (position.name.match(positionSelectionValue)) {
          positionIdForLocalStorage = position.id;
        }
      });
    });

  fetch("https://pcfy.redberryinternship.ge/api/teams")
    .then((response) => response.json())
    .then((teamsData) => {
      teamsData = Object.entries(teamsData)[0][1];

      teamsData.forEach((team) => {
        if (team.name.match(teamSelectionValue)) {
          teamIdForLocalStorage = team.id;
        }
      });
    });

  return formIsValid;
}
