let cardTemplate = document.getElementById("laptop-card-template-wrapper");
let laptopImage = document.getElementById("laptopImg");
let userInfo = document.getElementById("userName");
let laptopName = document.getElementById("laptopModel");

fetch("https://pcfy.redberryinternship.ge/api/laptops?token=0289823908804c371c3805e1d5638baa")
  .then((response) => response.json())
  .then((laptopData) => {
    laptopData = Object.entries(laptopData)[0][1];
    laptopData.forEach((element) => {
      let laptopInfo = Object.entries(element)[0];
      let userInfo = Object.entries(element)[1];

      cardTemplate.innerHTML += `
      <div class="card">
          <img src="${
            "https://pcfy.redberryinternship.ge/" + laptopInfo[1].image
          }" alt="image" class="laptop-image" id="laptopImg">
            <div class="laptop-info">
                <h2>${userInfo[1].name}  ${userInfo[1].surname}</h2>
                <p>${laptopInfo[1].name}</p>
                <a href="./individual-laptop.html?laptopId=${laptopInfo[1].id}">მეტის ნახვა</a>
            </div>
      </div>
      `;
    });
  });
