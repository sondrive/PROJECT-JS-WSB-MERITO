// Pobieramy wszystkie przyciski "Kup teraz"
const buyButtons = document.querySelectorAll(".buyButton");

// Pobieramy całą sekcję produktów oraz formularz
const productSection = document.querySelector(".product_section");
const formSection = document.querySelector(".form");
const finalSection = document.querySelector(".finally_section");

//Pobieramy spany w których ma się znajdować wartość z klikniętego kafla produktu
const selectedMachine = document.querySelector(".selected_machine");
const basicPrice = document.querySelector(".final_price");
const yourChoice = document.querySelector(".choice");
const addItems = document.getElementById("addGPS");
const addItems2 = document.getElementById("addCamera");

// Iterujemy przez każdy przycisk i dodajemy nasłuchiwanie zdarzenia kliknięcia
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Pobieramy informacje o maszynie na podstawie przycisku "Kup teraz"
    const productDescription = button.parentElement;

    const brand = productDescription.querySelector(".brand").textContent;
    const model = productDescription.querySelector(".model").textContent;
    const price = productDescription.querySelector(".price").textContent;

    //implementujemy w spany wartości z obiektu
    selectedMachine.innerHTML = `${brand} ${model}`;
    yourChoice.innerHTML = `${brand} ${model}`;
    basicPrice.innerHTML = `${Number(price)}`;

    // ukrywamy sekcję product_section
    productSection.classList.add("hidden");
    productSection.classList.remove("visible");
    formSection.classList.add("visible");
    formSection.classList.remove("hidden");
  });
});

// ============================================== FORMS

// Add Accessories

const addGps = document.getElementById("addGps");
const subGps = document.getElementById("subGps");
const addCamera = document.getElementById("addCamera");
const subCamera = document.getElementById("subCamera");

let gpsIsAdded = true;
let cameraIsAdded = true;
let finalPrice = parseInt(basicPrice.innerHTML);

addGps.addEventListener("click", () => {
  if (gpsIsAdded) {
    basicPrice.innerHTML = parseInt(basicPrice.innerHTML) + 10000;
    addGps.classList.add("green");
    gpsIsAdded = false;
    finalPrice = basicPrice;
    console.log("dupa");
  }
});

subGps.addEventListener("click", () => {
  if (addGps.classList.contains("green")) {
    basicPrice.innerHTML = parseInt(basicPrice.innerHTML) - 10000;
    addGps.classList.remove("green");
    gpsIsAdded = true;
    finalPrice = basicPrice;
  }
});

addCamera.addEventListener("click", () => {
  if (cameraIsAdded) {
    finalPrice.innerHTML = parseInt(finalPrice.innerHTML) + 15000;
    addCamera.classList.add("green");
    cameraIsAdded = false;
  }
});

subCamera.addEventListener("click", () => {
  if (addCamera.classList.contains("green")) {
    finalPrice.innerHTML = parseInt(finalPrice.innerHTML) - 15000;
    addCamera.classList.remove("green");
    cameraIsAdded = true;
  }
});

// =============================================== Przemieszczanie sie po stronie
// Przycisk wróć do produktów
const backBtn = document.querySelector(".backBtn");

backBtn.addEventListener("click", () => {
  productSection.classList.add("visible");
  formSection.classList.remove("visible");
  formSection.classList.add("hidden");
  addCamera.classList.remove("green");
  addGps.classList.remove("green");
  gpsIsAdded = true;
  cameraIsAdded = true;
});

// Pobieranie przycisku "Kup"
const finishBuy = document.querySelector(".finishBuy");
const name = document.getElementById("fname");
const errorName = document.querySelector(".nameError");

finishBuy.addEventListener("click", () => {
  // Check Name and Surname
  const value = name.value;
  const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

  if (value.includes(" ") && regex.test(value)) {
    errorName.style.display = "none";
    finalSection.classList.remove("hidden");
    finalSection.classList.add("visible");
    formSection.classList.remove("visible");
    formSection.classList.add("hidden");
  } else {
    errorName.style.display = "block";
  }
});

const backBtnFinal = document.querySelector(".backBtnFinal");

backBtnFinal.addEventListener("click", () => {
  productSection.classList.add("visible");
  finalSection.classList.remove("visible");
  finalSection.classList.add("hidden");
  addCamera.classList.remove("green");
  addGps.classList.remove("green");
  gpsIsAdded = true;
  cameraIsAdded = true;
});
