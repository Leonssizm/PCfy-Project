let params = new URLSearchParams(document.location.search);
let laptopId = params.get("laptopId");
fetch(
  `https://pcfy.redberryinternship.ge/api/laptop/${laptopId}?token=1577d148fddc21da5ab7053a98fe95f5`
)
  .then((response) => response.json())
  .then((data) => {
    data = Object.entries(data)[0][1];
    console.log(data);
  });
