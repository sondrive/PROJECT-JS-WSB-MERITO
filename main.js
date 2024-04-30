// Pobieramy wszystkie przyciski potrzebne w projekcie
const buyButtons = document.querySelectorAll(".buyButton");
const backBtn = document.querySelector(".backBtn");
const finishBuy = document.querySelector(".finishBuy");
const backBtnFinal = document.querySelector(".backBtnFinal");

// Pobieramy całą sekcję produktów oraz formularz
const productSection = document.querySelector(".product_section");
const formSection = document.querySelector(".form");
const finalSection = document.querySelector(".finally_section");

// Pobieramy spany w których ma się znajdować wartość z klikniętego kafla produktu
const selectedMachine = document.querySelector(".selected_machine");
const basicPrice = document.querySelector(".final_price");
const yourChoice = document.querySelector(".choice");
const addItems = document.getElementById("addGPS");
const addItems2 = document.getElementById("addCamera");

// Pobieramy spany z błędami w formularzu

const name = document.getElementById("fname");
const errorName = document.querySelector(".nameError");
const dataName = document.querySelector(".dataError");
const paymentError = document.querySelector(".paymentError");

// Pobieramy przyciski dodawania akcesorii

const addGps = document.getElementById("addGps");
const subGps = document.getElementById("subGps");
const addCamera = document.getElementById("addCamera");
const subCamera = document.getElementById("subCamera");

// Pobieramy div ze zdjeciem finalnym
const machineImg = document.querySelector(".our_machine_photo");

// Iterujemy przez każdy przycisk i dodajemy nasłuchiwanie zdarzenia kliknięcia za pomocą forEach
buyButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Pobieramy informacje o maszynie na podstawie przycisku "Kup teraz" z div product_cart
    const productCart = button.closest(".product_cart");

    const brand = productCart.querySelector(".brand").textContent;
    const model = productCart.querySelector(".model").textContent;
    const price = productCart.querySelector(".price").textContent;
    const image = productCart.querySelector("img").src;

    // Tu wyrzucam zmienna do global
    window.image = image;

    // Implementujemy w spany wartości z obiektu
    selectedMachine.innerHTML = `${brand} ${model}`;
    yourChoice.innerHTML = `${brand} ${model}`;
    basicPrice.innerHTML = `${Number(price)}`;

    // Ukrywamy sekcję product_section
    productSection.classList.add("hidden");
    productSection.classList.remove("visible");
    formSection.classList.add("visible");
    formSection.classList.remove("hidden");
  });
});

// ============================================== FORMS

const radioButton1 = document.getElementById("cash");
const radioButton2 = document.getElementById("leasing");

// Dodajemy kwote w zależności od klikniętego + lub - . Ustawiamy flage

let gpsIsAdded = true;
let cameraIsAdded = true;
let finalPrice = parseInt(basicPrice.innerHTML);

addGps.addEventListener("click", () => {
  if (gpsIsAdded) {
    basicPrice.innerHTML = parseInt(basicPrice.innerHTML) + 10000;
    addGps.classList.add("green");
    gpsIsAdded = false;
    finalPrice = basicPrice;
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

// =============================================== Przemieszczanie sie po stronie oraz wykonywanie podstawowych funkcji strony

// Przycisk wróć do produktów i reset

backBtn.addEventListener("click", () => {
  productSection.classList.add("visible");
  formSection.classList.remove("visible");
  formSection.classList.add("hidden");
  addCamera.classList.remove("green");
  addGps.classList.remove("green");
  gpsIsAdded = true;
  cameraIsAdded = true;
});

// Funkcja przycisku "Kup"

finishBuy.addEventListener("click", () => {
  // Sprawdzanie imienia i nazwiska
  const value = name.value;

  // Nie ukrywam, że to znalazłem w internecie :))
  const regex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

  // Pobieranie aktualnej daty, oraz ustawienie na + 14 max

  const dataInput = document.getElementById("data").value;
  const finalData = document.querySelector(".finalData");

  const data = new Date(dataInput);
  const today = new Date();
  const dataMax = new Date(today);
  dataMax.setDate(dataMax.getDate() + 14);

  // PODMIANA HTML W DIV o class our_machine_photo

  machineImg.innerHTML = `<img src="${image}" class="img-fluid" alt="your new machine""/>`;

  // Sprawdzanie poprawnosci wypelnienia formularza

  if (
    value.includes(" ") &&
    regex.test(value) &&
    data < dataMax &&
    (radioButton1.checked || radioButton2.checked)
  ) {
    errorName.style.display = "none";
    finalSection.classList.remove("hidden");
    finalSection.classList.add("visible");
    formSection.classList.remove("visible");
    formSection.classList.add("hidden");
    finalData.textContent = data.toLocaleDateString();
    localStorage.setItem("fullName", value);
  } else if (!value.includes(" ") && !regex.test(value)) {
    errorName.style.display = "block";
  } else if (data > dataMax) {
    dataName.style.display = "block";
  } else if (!radioButton1.checked || !radioButton2.checked) {
    paymentError.style.display = "block";
  } else paymentError.style.display = "none";

  localStorage.setItem("fullName", name.value);
  const nameFull = localStorage.getItem("fullName");
  name.value = nameFull;
});

// RESET PO ZAKUPIE

backBtnFinal.addEventListener("click", () => {
  productSection.classList.add("visible");
  finalSection.classList.remove("visible");
  finalSection.classList.add("hidden");
  addCamera.classList.remove("green");
  addGps.classList.remove("green");
  gpsIsAdded = true;
  cameraIsAdded = true;

  // KASOWANIE LOCAL STORAGE
  localStorage.removeItem("fullName");
});
