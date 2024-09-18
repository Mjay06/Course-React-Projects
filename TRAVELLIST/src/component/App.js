import { useState } from "react";
import Logo from "./Logo";
import Form from "./Form";
import PackingList from "./PackingList";
import Stats from "./Stats";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: true },
]; */

function App() {
  const [item, setItem] = useState([]);
  function updatePacked(id) {
    setItem((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function addToItem(item) {
    setItem((items) => [...items, item]);
  }
  function deleteFromItem(id) {
    setItem((items) => items.filter((item) => item.id !== id));
  }
  function deleteItem() {
    if (item.length === 0) return;
    const confirmed = window.confirm("Are you sure you want to clear the list");
    if (confirmed) setItem([]);
  }
  return (
    <div className="app">
      <Logo />
      <Form onAddItem={addToItem} />
      <PackingList
        onUpdateItem={updatePacked}
        handleDelete={deleteItem}
        onDelete={deleteFromItem}
        PackingItem={item}
      />
      <Stats statItem={item} />
    </div>
  );
}
export default App;


/*
import "./styles.css";
import {useState} from "react"

const faqs = [
  {
    title: "Where are these chairs assembled?",
    text:
      "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Accusantium, quaerat temporibus quas dolore provident nisi ut aliquid ratione beatae sequi aspernatur veniam repellendus."
  },
  {
    title: "How long do I have to return my chair?",
    text:
      "Pariatur recusandae dignissimos fuga voluptas unde optio nesciunt commodi beatae, explicabo natus."
  },
  {
    title: "Do you ship to countries outside the EU?",
    text:
      "Excepturi velit laborum, perspiciatis nemo perferendis reiciendis aliquam possimus dolor sed! Dolore laborum ducimus veritatis facere molestias!"
  }
];

export default function App() {

  return (
    <div className="content-box">
      <Accordion data={faqs}/>
    </div>
  );
}
function Accordion({data}){
  
  return <div className="accordion">
    {data.map((datum, i)=> < AccordionItem num={i+1}  title={datum.title} text={datum.text} />)}
   </div>
}


function AccordionItem({num, title, text, id}){
  
  const [open, setOpen] = useState(false)
  function handleOpen(){
    setOpen((s)=> !s)
  }

  return (<div className={open ? 'item open' : 'item'} onClick={handleOpen}>
  <p className="number"> {String(num).padStart(2,'0')} </p>
  <p className="title"> {title} </p>
  <p className="icons" onClick={handleOpen}>{open ? '-' : '+'} </p>

  {open && <div className="content-box">
  {text}
  </div>}
  </div>)
}


*/