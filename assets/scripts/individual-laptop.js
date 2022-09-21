const laptopForm = document.getElementById("individual-laptop-form");
let params = new URLSearchParams(document.location.search);
let laptopId = params.get("laptopId");
fetch(
  `https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=0289823908804c371c3805e1d5638baa`
)
  .then((response) => response.json())
  .then((data) => {
    data = Object.entries(data)[0][1];
    let laptopData = data.laptop;
    let userData = data.user;
    fetch("https://pcfy.redberryinternship.ge/api/teams")
      .then((response) => response.json())
      .then((teamsData) => {
        let teamName;
        let teamPosition;
        let chosenBrand;
        let laptopConditionInGeorgian;
        let purchaseData;
        teamsData = Object.entries(teamsData)[0][1];

        teamsData.forEach((team) => {
          if (userData.team_id === team.id) {
            teamName = team.name;
          }
        });
        fetch("https://pcfy.redberryinternship.ge/api/positions")
          .then((response) => response.json())
          .then((positions) => {
            positions = Object.entries(positions)[0][1];
            positions.forEach((position) => {
              if (userData.position_id === position.id) {
                teamPosition = position.name;
              }
            });
            fetch("https://pcfy.redberryinternship.ge/api/brands")
              .then((response) => response.json())
              .then((brands) => {
                brands = Object.entries(brands)[0][1];
                brands.forEach((brand) => {
                  if (brand.id === laptopData.brand_id) {
                    chosenBrand = brand.name;
                  }
                });

                // conditionals for translating & changing data

                if (laptopData.state === "used") {
                  laptopConditionInGeorgian = "მეორადი";
                } else {
                  laptopConditionInGeorgian = "ახალი";
                }

                if (laptopData.laptop_purchase_date === null) {
                  purchaseData = " ";
                } else {
                  purchaseData = laptopData.laptop_purchase_date;
                }

                laptopForm.innerHTML += `
    <div class="form">
    <div class="img-personal-info-wrapper">
        <img src="${
          "https://pcfy.redberryinternship.ge/" + laptopData.image
        }" id="individual-laptop-image">
        <div class="personal-info-wrapper">
            <div class="personal-info-labels">
                <p><b>სახელი:</b></p>
                <p><b>თიმი:</b></p>
                <p><b>პოზიცია:</b></p>
                <p><b>მეილი:</b></p>
                <p><b>ტელ-ნომერი:</b></p>
            </div>
            <div class="personal-info-values">
                <p>${userData.name} ${userData.surname}</p>
                <p>${teamName}</p>
                <p>${teamPosition}</p>
                <p>${userData.email}</p>
                <p>${userData.phone_number}</p>
            </div>
        </div>

    </div>

    <hr>


    <div class="laptop-info-cpu">
        <div class="laptop-name-ram-wrapper">
            <div class="laptop-name-ram">
                <p><b>ლეპტოპის სახელი:</b></p>
                <p><b>ლეპტოპის ბრენდი:</b></p>
                <p><b>RAM:</b></p>
                <p><b>მეხსიერების ტიპი:</b></p>
            </div>
            <div class="laptop-name-ram-values">
                <p>${laptopData.name}</p>
                <p>${chosenBrand}</p>
                <p>${laptopData.ram}</p>
                <p>${laptopData.hard_drive_type}</p>
            </div>
        </div>
        <div class="cpu-info-wrapper">
            <div class="cpu-name">
                <p><b>CPU:</b></p>
                <p><b>CPU-ს ბირთვი:</b></p>
                <p><b>CPU-ს ნაკადი:</b></p>

            </div>
            <div class="cpu-values">
                <p>${laptopData.cpu.name}</p>
                <p>${laptopData.cpu.cores}</p>
                <p>${laptopData.cpu.threads}</p>

            </div>

        </div>

    </div>

    <hr>


    <div class="laptop-condition-fee">
        <div class="laptop-price-wrapper">
            <div class="price-condition">
                <p><b>ლეპტოპის მდგომარეობა:</b></p>
                <p><b>ლეპტოპის ფასი:</b></p>
            </div>
            <div class="price-condition-values">
                <p>${laptopConditionInGeorgian}</p>
                <p>${laptopData.price} ₾</p>
            </div>
        </div>
        <div class="purchase-date-wrapper">
            <div class="purchase-date">
                <p><b>შეძენის თარიღი:</b></p>
            </div>
            <div class="purchase-date-value">
                <p>${purchaseData}</p>
            </div>

        </div>

    </div>
</div>
    `;
              });
          });
      });
  });
