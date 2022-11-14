const searchForm = document.querySelector("#search-form");
const input = document.querySelector("#search-input");
const pizzaContainer = document.querySelector("#pizza-container");

class Pizza {
  constructor(id, nombre, ingredientes, precio, imageURL) {
    this.id = id;
    this.nombre = nombre;
    this.ingredientes = ingredientes;
    this.precio = precio;
    this.imagen = imageURL;
  }
}

var pizzaArray = [];

function crearPizzaArray() {
  let pizza1 = new Pizza(
    1,
    "Muzzarella",
    ["Queso", "Orégano", "Salsa de tomate"],
    500,
    "images/muzzarella.jpg"
  );

  let pizza2 = new Pizza(
    2,
    "Morrón y panceta",
    ["Queso", "Salsa de tomate", "Morrón", "Panceta"],
    750,
    "images/morron_y_panceta.jpg"
  );

  let pizza3 = new Pizza(
    3,
    "Jamón",
    ["Queso", "Salsa de tomate", "Jamón"],
    600,
    "images/jamon.jpg"
  );

  let pizza4 = new Pizza(
    4,
    "Anchoas",
    ["Queso", "Anchoas", "Salsa de tomate"],
    750,
    "images/anchoas.jpg"
  );

  let pizza5 = new Pizza(
    5,
    "Cheddar",
    ["Queso muzzarella", "Queso cheddar", "Salsa de tomate", "Panceta"],
    550,
    "images/cheddar.jpg"
  );

  let pizza6 = new Pizza(
    6,
    "Fugazzeta",
    ["Queso", "Cebollas"],
    800,
    "images/fugazzeta.jpg"
  );

  pizzaArray = [pizza1, pizza2, pizza3, pizza4, pizza5, pizza6];
}

const searchPizza = (e) => {
  e.preventDefault();
  pizzaContainer.innerHTML = "";
  let searchValue = input.value.trim();
  input.value = "";
  console.log(searchValue);
  if (!searchValue) {
    pizzaContainer.innerHTML = `<span class="warning">Por favor ingrese un valor válido</span>`;
    return;
  }
  let selectedPizza = pizzaArray.find((x) => x.id == searchValue);

  if (selectedPizza) {
    renderPizza(selectedPizza);
    savePizza(selectedPizza);
  } else {
    console.log(searchValue);
    pizzaContainer.innerHTML = `<span class="warning">No hay una pizza con ese ID</span>`;
  }
};

function renderPizza(pizza) {
  pizzaContainer.innerHTML =
    `<h2>${pizza.nombre}</h2>
    <h3>$${pizza.precio}</h3>
    <ul>` +
    pizza.ingredientes
      .map((ingrediente) => `<li>` + ingrediente + `</li>`)
      .join("") +
    `</ul>
     <img src="${pizza.imagen}" class="pizza-image">`;
}

function savePizza(pizza) {
  if (localStorage.getItem("currentPizza"))
    localStorage.removeItem("currentPizza");

  localStorage.setItem("currentPizza", JSON.stringify(pizza));
}

function init() {
  crearPizzaArray();
  let storedPizza = JSON.parse(localStorage.getItem("currentPizza"));
  if (storedPizza) renderPizza(storedPizza);
  searchForm.addEventListener("submit", searchPizza);
}

init();
