import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="header">
      <h1> Fast React Pizza Co. </h1>
    </header>
  );
}

function Menu() {
  const Pizzas = pizzaData;
  const numPizza = Pizzas.length;
  return (
    <main className="menu">
      <h2> Our Menu </h2>

      {numPizza > 0 ? (
        <React.Fragment> 
          <p>
            Authentic italian cuisine. 6 create dishes to choose from. All from
            our stove oven, all organic, all delicious.
          </p>
          <ul className="pizzas">
            {Pizzas.map((pizza) => (
              <Pizza data={pizza} key={pizza.name} />
            ))}
          </ul>
        </React.Fragment>
      ) : (
        <p> We are still working on our menu please come back later</p>
      )}

      {/*<Pizza
        ingredients="Bread with italian olive oil and rosemary"
        name="Focaccia"
        photoName="pizzas/focaccia.jpg"
        price="6"
      />
      <Pizza
        ingredients="Tomato and mozarella"
        name="Pizza Margherita"
        photoName="pizzas/margherita.jpg"
        price="6"
  /> */}
    </main>
  );
}

function Pizza({ data }) {
  return (
    <li className={`pizza ${data.soldOut ? 'sold-out': '' }`}>
      <img src={data.photoName} alt={data.name}></img>
      <div>
        <h3>{data.name}</h3>
        <p>{data.ingredients}</p>
        <span>{data.soldOut ? 'SOLD OUT' : `$ ${data.price}`}</span>
      </div>
    </li>
  );
}
function Footer() {
  const hour = new Date().getHours();
  const openHour = 12;
  const closeHour = 22;
  const isOpen = hour >= openHour && hour < closeHour;
  console.log(hour);
  return (
    <footer className="footer">
      {isOpen ? (
        <Order closeHour={closeHour} />
      ) : (
        <p>
          We are closed now! We are happy to welcome you between {openHour}:00
          and {closeHour}:00{" "}
        </p>
      )}
    </footer>
  );
}
function Order({ closeHour }) {
  return (
    <div className="order">
      <p>
        We are currently opened untill {closeHour}:00. Come order your pizza
        online
      </p>
      <button className="btn"> Order Now </button>
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
