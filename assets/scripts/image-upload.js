document.querySelectorAll(".drop-zone-input").forEach((inputElement) => {
  const dropZoneElement = inputElement.closest(".drop-zone");

  dropZoneElement.addEventListener("click", () => {
    inputElement.click();
  });

  dropZoneElement.addEventListener("change", () => {
    if (inputElement.files.length) {
      updateThumbNail(dropZoneElement, inputElement.files[0]);
    }
  });

  dropZoneElement.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZoneElement.classList.add("drop-zone-over");
  });

  ["dragleave", "dragend"].forEach((type) => {
    dropZoneElement.addEventListener(type, (element) => {
      dropZoneElement.classList.remove("drop-zone-over");
    });
  });

  dropZoneElement.addEventListener("drop", (e) => {
    e.preventDefault();
    if (e.dataTransfer.files.length) {
      inputElement.files = e.dataTransfer.files;
      updateThumbNail(dropZoneElement, e.dataTransfer.files[0]);
    }

    dropZoneElement.classList.remove("drop-zone-over");
  });
});

function updateThumbNail(dropZoneElement, file) {
  let thumbnailElement = dropZoneElement.querySelector(".drop-zone-thumbnail");

  //   first time remove the prompt

  if (dropZoneElement.querySelector(".drop-zone-prompt")) {
    dropZoneElement.querySelector(".drop-zone-prompt").remove();
  }

  //   first time there is no thumbnail element

  if (!thumbnailElement) {
    thumbnailElement = document.createElement("div");
    thumbnailElement.classList.add("drop-zone-thumbnail");
    dropZoneElement.appendChild(thumbnailElement);
  }

  thumbnailElement.dataset.label = file.name;

  //   show thumbnail

  if (file.type.startsWith("image/")) {
    const reader = new FileReader();

    reader.readAsDataURL(file);
    reader.onload = () => {
      thumbnailElement.style.backgroundImage = `url(${reader.result})`;
    };
  }
}

let pictureInput = document.getElementById("image-upload-input");

pictureInput.addEventListener("change", function () {
  const reader = new FileReader();

  reader.addEventListener("load", () => {
    localStorage.setItem("laptop-image", reader.result);
  });

  reader.readAsDataURL(this.files[0]);
});

const laptopInfoForm = document.getElementById("laptop-info-form");
const laptopImg = document.getElementById("image-upload-input");
