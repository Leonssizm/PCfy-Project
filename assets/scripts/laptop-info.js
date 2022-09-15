const laptopBrand = document.getElementById("brand-selection");
const laptopNameElement = document.getElementById("laptop-name");
const laptopNameRegex = /^[a-zA-Z0-9!@#$%^&*()_+=]+$/;

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

document.getElementById("submitButton").addEventListener("click", validateInputs);

function validateInputs() {
  let formIsValid = true;
  const laptopNameElementValue = laptopNameElement.value.trim();
  const brandSelectionValue = laptopBrand.value;

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
    laptopBrand.parentElement.style.borderRadius = "12px";
    laptopBrand.parentElement.style.border = "3px solid #ff3860";
  }
}
