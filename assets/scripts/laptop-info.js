const laptopBrand = document.getElementById("brand-selection");
const laptopNameElement = document.getElementById("laptop-name");
const laptopNameRegex = /^[a-zA-Z 0-9!@#$%^&*()_+=]+$/;
const cpuSelection = document.getElementById("cpu-selection");
const cpuCoreElement = document.getElementById("cpu-core-amount");
const cpuStreamElement = document.getElementById("cpu-stream-input");
const ramElement = document.getElementById("ram-info-input");
const memoryTypeRadioButtons = document.querySelectorAll('input[name = "memory-type-radio-btn"]');
const laptopConditionRadioButtons = document.querySelectorAll('input[name ="condition-radio-btn"]');
const laptopPriceElement = document.getElementById("price-info-input");
const purchaseDate = document.getElementById("purchase-info-input");

let laptopBrandIdForLocalstorage;
let cpuSelectionValue;

fetch("https://pcfy.redberryinternship.ge/api/brands")
  .then((response) => response.json())
  .then((brands) => {
    brands = Object.entries(brands)[0][1];
    brands.forEach((brand) => {
      laptopBrand.innerHTML += `
        <option value=${brand.name} id=${brand.id}>${brand.name}</option>
    `;
    });
  });

fetch("https://pcfy.redberryinternship.ge/api/cpus")
  .then((response) => response.json())
  .then((cpus) => {
    cpus = Object.entries(cpus)[0][1];
    cpus.forEach((cpu) => {
      cpuSelection.innerHTML += `
      <option value=${cpu.name.replace(/\s+/g, ",")} id=${cpu.id}>${cpu.name}</option>
    `;
    });
  });

// when page is refreshed, the values remain;

window.onbeforeunload = function () {
  sessionStorage.setItem("laptopName", laptopNameElement.value);
  sessionStorage.setItem("cpuCore", cpuCoreElement.value);
  sessionStorage.setItem("cpuStream", cpuStreamElement.value);
  sessionStorage.setItem("ram", ramElement.value);
  sessionStorage.setItem("price", laptopPriceElement.value);
  sessionStorage.setItem("purchase_date", purchaseDate.value);
};

window.onload = function () {
  let laptopName = sessionStorage.getItem("laptopName");
  let cpuCore = sessionStorage.getItem("cpuCore");
  let cpuStream = sessionStorage.getItem("cpuStream");
  let ram = sessionStorage.getItem("ram");
  let price = sessionStorage.getItem("price");
  let purchase_date = sessionStorage.getItem("purchase_date");

  laptopNameElement.value = laptopName;
  cpuCoreElement.value = cpuCore;
  cpuStreamElement.value = cpuStream;
  ramElement.value = ram;
  laptopPriceElement.value = price;
  purchaseDate.value = purchase_date;
};

function validateInputs() {
  let formIsValid = true;
  const laptopNameElementValue = laptopNameElement.value.trim();
  const brandSelectionValue = laptopBrand.value;
  const cpuSelectionValue = cpuSelection.value.split(",").join(" ");
  const cpuCoreElementValue = cpuCoreElement.value.trim();
  const cpuStreamElementValue = cpuStreamElement.value.trim();
  const ramElementValue = ramElement.value.trim();
  const memoryTypeLabel = document.getElementById("memory-type-label");
  const laptopPriceElementValue = laptopPriceElement.value.trim();
  const laptopConditionLabel = document.getElementById("laptop-condition-radioBtn-label");

  const imageInputElement = document.getElementById("image-upload-input");
  const laptop_img_prompt = document.getElementById("drop-zone-words");
  const img_warning_sign_element = document.getElementById("img-warning-sign");
  const drop_zone_element = document.querySelector(".drop-zone");

  //picture upload validation

  if (imageInputElement.value === "") {
    formIsValid = false;
    drop_zone_element.style.backgroundColor = "#FFEAEA";
    drop_zone_element.style.border = "2px dashed #E52F2F";
    img_warning_sign_element.innerHTML = `<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1474 1.79208L21.5538 14.1933C22.6182 15.9744 22.0954 18.3178 20.3855 19.4267C19.8117 19.8002 19.1427 19.9993 18.4591 20H3.64517C1.63248 20 0 18.3 0 16.2011C0 15.4911 0.191211 14.7966 0.550423 14.1933L7.95792 1.79208C9.02118 0.0109538 11.2693 -0.534606 12.9791 0.574292C13.4522 0.880961 13.8523 1.29763 14.1474 1.79208ZM11.0527 15.5555C11.3458 15.5555 11.6269 15.4385 11.8342 15.2301C12.0415 15.0217 12.1579 14.7391 12.1579 14.4444C12.1579 14.1497 12.0415 13.8671 11.8342 13.6587C11.6269 13.4503 11.3458 13.3333 11.0527 13.3333C10.7595 13.3333 10.4784 13.4503 10.2711 13.6587C10.0638 13.8671 9.9474 14.1497 9.9474 14.4444C9.9474 14.7391 10.0638 15.0217 10.2711 15.2301C10.4784 15.4385 10.7595 15.5555 11.0527 15.5555V15.5555ZM11.0527 5.55544C10.7595 5.55544 10.4784 5.67251 10.2711 5.88088C10.0638 6.08926 9.9474 6.37187 9.9474 6.66656V11.111C9.9474 11.4057 10.0638 11.6883 10.2711 11.8967C10.4784 12.1051 10.7595 12.2222 11.0527 12.2222C11.3458 12.2222 11.6269 12.1051 11.8342 11.8967C12.0415 11.6883 12.1579 11.4057 12.1579 11.111V6.66656C12.1579 6.37187 12.0415 6.08926 11.8342 5.88088C11.6269 5.67251 11.3458 5.55544 11.0527 5.55544Z" fill="#C9CB52"/>
    </svg>`;
    laptop_img_prompt.style.color = "#E52F2F";
    laptop_img_prompt.innerHTML = "ჩააგდე ან ატვირთე <br> ლეპტოპის ფოტო <br>";
  } else {
    drop_zone_element.style.backgroundColor = "#F7F7F7";
    drop_zone_element.style.border = "2px dashed #09c352";
  }

  //   laptop name and brand validation

  if (!isFilled(laptopNameElementValue)) {
    formIsValid = false;
    setError(laptopNameElement, "ლათინური ასოები, ციფრები, !@#$%^&*()_+=");
  } else if (!laptopNameRegex.test(laptopNameElementValue)) {
    formIsValid = false;
    setError(laptopNameElement, "ლათინური ასოები, ციფრები, !@#$%^&*()_+=");
  } else {
    setSuccess(laptopNameElement, "ლათინური ასოები, ციფრები, !@#$%^&*()_+=");
  }

  if (brandSelectionValue === "ლეპტოპის ბრენდი") {
    formIsValid = false;
    laptopBrand.style.marginTop = "0px";
    laptopBrand.parentElement.style.borderRadius = "12px";
    laptopBrand.parentElement.style.border = "3px solid #ff3860";
  } else {
    laptopBrand.style.marginTop = "0px";
    laptopBrand.parentElement.style.borderRadius = "12px";
    laptopBrand.parentElement.style.border = "3px solid #09c352";
  }

  // cpu stuff(name, core etc) fields validation
  if (cpuSelectionValue === "CPU") {
    formIsValid = false;
    cpuSelection.style.marginTop = "0px";
    cpuSelection.parentElement.style.borderRadius = "12px";
    cpuSelection.parentElement.style.border = "3px solid #ff3860";
  } else {
    cpuSelection.style.marginTop = "0px";
    cpuSelection.parentElement.style.borderRadius = "12px";
    cpuSelection.parentElement.style.border = "3px solid #09c352";
  }

  if (!isFilled(cpuCoreElementValue) || isNaN(cpuCoreElementValue)) {
    formIsValid = false;
    setError(cpuCoreElement, "მხოლოდ ციფრები");
  } else {
    setSuccess(cpuCoreElement, "მხოლოდ ციფრები");
  }

  if (!isFilled(cpuStreamElementValue) || isNaN(cpuStreamElementValue)) {
    formIsValid = false;
    setError(cpuStreamElement, "მხოლოდ ციფრები");
  } else {
    setSuccess(cpuStreamElement, "მხოლოდ ციფრები");
  }

  // laptop Ram and Hard drive type validation

  if (!isFilled(ramElementValue) || isNaN(ramElementValue)) {
    formIsValid = false;
    setError(ramElement, "მხოლოდ ციფრები");
  } else {
    setSuccess(ramElement, "მხოლოდ ციფრები");
  }

  if (!memoryTypeRadioButtons[0].checked && !memoryTypeRadioButtons[1].checked) {
    formIsValid = false;
    memoryTypeLabel.style.color = "#ff3860";
    memoryTypeLabel.style.marginTop = "5px";
    memoryTypeLabel.innerHTML =
      "მეხსიერების ტიპი" +
      "  " +
      `<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14.1474 1.79208L21.5538 14.1933C22.6182 15.9744 22.0954 18.3178 20.3855 19.4267C19.8117 19.8002 19.1427 19.9993 18.4591 20H3.64517C1.63248 20 0 18.3 0 16.2011C0 15.4911 0.191211 14.7966 0.550423 14.1933L7.95792 1.79208C9.02118 0.0109538 11.2693 -0.534606 12.9791 0.574292C13.4522 0.880961 13.8523 1.29763 14.1474 1.79208ZM11.0527 15.5555C11.3458 15.5555 11.6269 15.4385 11.8342 15.2301C12.0415 15.0217 12.1579 14.7391 12.1579 14.4444C12.1579 14.1497 12.0415 13.8671 11.8342 13.6587C11.6269 13.4503 11.3458 13.3333 11.0527 13.3333C10.7595 13.3333 10.4784 13.4503 10.2711 13.6587C10.0638 13.8671 9.9474 14.1497 9.9474 14.4444C9.9474 14.7391 10.0638 15.0217 10.2711 15.2301C10.4784 15.4385 10.7595 15.5555 11.0527 15.5555V15.5555ZM11.0527 5.55544C10.7595 5.55544 10.4784 5.67251 10.2711 5.88088C10.0638 6.08926 9.9474 6.37187 9.9474 6.66656V11.111C9.9474 11.4057 10.0638 11.6883 10.2711 11.8967C10.4784 12.1051 10.7595 12.2222 11.0527 12.2222C11.3458 12.2222 11.6269 12.1051 11.8342 11.8967C12.0415 11.6883 12.1579 11.4057 12.1579 11.111V6.66656C12.1579 6.37187 12.0415 6.08926 11.8342 5.88088C11.6269 5.67251 11.3458 5.55544 11.0527 5.55544Z" fill="#C9CB52"/>
    </svg>`;
  } else {
    memoryTypeLabel.style.color = "#09c352";
    memoryTypeLabel.innerHTML = "მეხსიერების ტიპი";
  }

  // laptop price & laptop condition Validation
  if (!isFilled(laptopPriceElementValue) || isNaN(laptopPriceElementValue)) {
    formIsValid = false;
    setError(laptopPriceElement, "მხოლოდ ციფრები");
  } else {
    setSuccess(laptopPriceElement, "მხოლოდ ციფრები");
  }

  if (!laptopConditionRadioButtons[0].checked && !laptopConditionRadioButtons[1].checked) {
    formIsValid = false;
    laptopConditionLabel.style.color = "#ff3860";
    laptopConditionLabel.style.marginTop = "5px";
    laptopConditionLabel.innerHTML =
      "ლეპტოპის მდგომარეობა" +
      "  " +
      `<svg width="23" height="20" viewBox="0 0 23 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.1474 1.79208L21.5538 14.1933C22.6182 15.9744 22.0954 18.3178 20.3855 19.4267C19.8117 19.8002 19.1427 19.9993 18.4591 20H3.64517C1.63248 20 0 18.3 0 16.2011C0 15.4911 0.191211 14.7966 0.550423 14.1933L7.95792 1.79208C9.02118 0.0109538 11.2693 -0.534606 12.9791 0.574292C13.4522 0.880961 13.8523 1.29763 14.1474 1.79208ZM11.0527 15.5555C11.3458 15.5555 11.6269 15.4385 11.8342 15.2301C12.0415 15.0217 12.1579 14.7391 12.1579 14.4444C12.1579 14.1497 12.0415 13.8671 11.8342 13.6587C11.6269 13.4503 11.3458 13.3333 11.0527 13.3333C10.7595 13.3333 10.4784 13.4503 10.2711 13.6587C10.0638 13.8671 9.9474 14.1497 9.9474 14.4444C9.9474 14.7391 10.0638 15.0217 10.2711 15.2301C10.4784 15.4385 10.7595 15.5555 11.0527 15.5555V15.5555ZM11.0527 5.55544C10.7595 5.55544 10.4784 5.67251 10.2711 5.88088C10.0638 6.08926 9.9474 6.37187 9.9474 6.66656V11.111C9.9474 11.4057 10.0638 11.6883 10.2711 11.8967C10.4784 12.1051 10.7595 12.2222 11.0527 12.2222C11.3458 12.2222 11.6269 12.1051 11.8342 11.8967C12.0415 11.6883 12.1579 11.4057 12.1579 11.111V6.66656C12.1579 6.37187 12.0415 6.08926 11.8342 5.88088C11.6269 5.67251 11.3458 5.55544 11.0527 5.55544Z" fill="#C9CB52"/>
      </svg>`;
  } else {
    laptopConditionLabel.style.color = "#09c352";
    laptopConditionLabel.innerHTML = "ლეპტოპის მდგომარეობა";
  }

  // retrive laptopBrand Id for local storage
  fetch("https://pcfy.redberryinternship.ge/api/brands")
    .then((response) => response.json())
    .then((brands) => {
      brands = Object.entries(brands)[0][1];
      brands.forEach((brand) => {
        if (brandSelectionValue === brand.name) {
          laptopBrandIdForLocalstorage = brand.id;
        }
      });
    });

  return formIsValid;
}

//preparing data from this page and from previous page to send

document.getElementById("submitButton").addEventListener("click", (e) => {
  let chosenHardDriveType;
  let laptopState;
  let cpuSelectionValueForLocalstorage = cpuSelection.value.split(",").join(" ");

  let emplyoyeeInfo = JSON.parse(localStorage.getItem("employee-info"));
  let laptopImg = localStorage.getItem("laptop-image");

  let image = document.getElementById("image-upload-input");

  let formData = new FormData();
  if (validateInputs()) {
    setTimeout(() => {
      //creating string values for condition radio Btn and laptop state
      laptopConditionRadioButtons[0].checked
        ? (chosenHardDriveType = "HDD")
        : (chosenHardDriveType = "SSD");
      laptopConditionRadioButtons[0].checked ? (laptopState = "new") : (laptopState = "used");

      window.localStorage.setItem(
        "laptop-info",
        JSON.stringify({
          laptop_name: laptopNameElement.value,
          laptop_image: laptopImg,
          laptop_brand_id: laptopBrandIdForLocalstorage,
          laptop_cpu: cpuSelectionValueForLocalstorage,
          laptop_cpu_cores: cpuCoreElement.value,
          laptop_cpu_threads: cpuStreamElement.value,
          laptop_ram: ramElement.value,
          laptop_hard_drive_type: chosenHardDriveType,
          laptop_state: laptopState,
          laptop_purchase_date: purchaseDate.value,
          laptop_price: laptopPriceElement.value,
        })
      );
      let laptopInfo = JSON.parse(localStorage.getItem("laptop-info"));
      formData.append("name", emplyoyeeInfo.name);
      formData.append("surname", emplyoyeeInfo.surname);
      formData.append("team_id", emplyoyeeInfo.team_id);
      formData.append("position_id", emplyoyeeInfo.position_id);
      formData.append("phone_number", emplyoyeeInfo.phone_number);
      formData.append("email", emplyoyeeInfo.email);
      formData.append("token", emplyoyeeInfo.token);
      formData.append("laptop_name", laptopInfo.laptop_name);
      formData.append("laptop_image", image.files[0]);
      formData.append("laptop_brand_id", laptopInfo.laptop_brand_id);
      formData.append("laptop_cpu", laptopInfo.laptop_cpu);
      formData.append("laptop_cpu_cores", laptopInfo.laptop_cpu_cores);
      formData.append("laptop_cpu_threads", laptopInfo.laptop_cpu_threads);
      formData.append("laptop_ram", laptopInfo.laptop_ram);
      formData.append("laptop_hard_drive_type", laptopInfo.laptop_hard_drive_type);
      formData.append("laptop_state", laptopInfo.laptop_state);
      formData.append("laptop_purchase_date", laptopInfo.laptop_purchase_date);
      formData.append("laptop_price", laptopInfo.laptop_price);
    }, 2000);

    // "SENDING INFO TO SERVER LOGIC"

    setTimeout(() => {
      fetch("https://pcfy.redberryinternship.ge/api/laptop/create", {
        method: "POST",
        body: formData,
      })
        .then((response) => {
          console.log(response.json());
          if (response.status <= 299) {
            document.getElementById("popup-wrapper").classList.add("display");
            localStorage.clear();
            sessionStorage.clear();
          }
        })
        .catch((error) => {
          alert(error);
        });
    }, 3000);
  }
});

document.getElementById("popup-laptop-list-btn").addEventListener("click", () => {
  window.location.href = "./laptop-list.html";
});
