import { useEffect, useState } from "react";


function App() {
  const [showAddForm, setShowAddForm] = useState(false);
  const [updateData, setUpdateData] = useState(false);
  const [data, setdata] = useState(()=>{
    const inidata = JSON.parse(localStorage.getItem('stocks'))
    if (!inidata) return []
    return inidata
  });
  function handleshowAddform() {
    setShowAddForm((s) => !s);
  }
  function handleUpdateform(value) {
    setUpdateData(value);
  }
  useEffect(function(){
    localStorage.setItem('stocks', JSON.stringify(data))
  }, [data])

  return (
    <div className="App">
      <div className="container">
        <Balance data={data} />
        <InventList
          updateData={updateData}
          handleUpdateform={handleUpdateform}
          data={data}
          setdata={setdata}
        />
        {showAddForm && (
          <FormAdd showAddForm={setShowAddForm} setdata={setdata} />
        )}
        <Button
          onClick={handleshowAddform}
          backgroundcolor={showAddForm ? "red" : "black"}
        >
          {showAddForm ? "Close" : "Add Inventory"}
        </Button>
      </div>

      <div>
        {updateData && (
          <FormUpdate
            setdata={setdata}
            setUpdateData={setUpdateData}
            updateData={updateData}
          />
        )}
      </div>
    </div>
  );
}
function Balance({ data }) {
  const total = data.map((datum) => +datum.cost);
  function findSum(total) {
    let tots = 0;
    total.forEach((val) => (tots += val));
    return tots;
  }
  const totalPrice = findSum(total);
  console.log(totalPrice);

  return (
    <div className="balcontainer">
      <h3>Total cost</h3>
      <div className="balancebox">
        <span>NGN{totalPrice.toFixed(2)}</span>{" "}
        <h1>
          <strong></strong>
        </h1>
      </div>
    </div>
  );
}

function InventList({ handleUpdateform, updateData, data, setdata }) {
  return (
    <div className="cards">
      {data.length > 0 &&
        data.map((data) => (
          <Card
            updateData={updateData}
            handleUpdateform={handleUpdateform}
            info={data}
            key={data.name}
            setdata={setdata}
          />
        ))}
      {data.length === 0 && (
        <p style={{ textAlign: "center" }}>Start Adding your inventory</p>
      )}
    </div>
  );
}

function Card({ info, handleUpdateform, updateData, setdata }) {
  function handleupdate() {
    if (condition === true) {
      handleUpdateform(null);
      return;
    }
    handleUpdateform(info);
  }

  let condition = updateData === info;
  function deleteform(info) {
    setdata((data) => data.filter((datum) => datum !== info));
  }

  return (
    <div className="list">
      <div
        style={{
          backgroundImage: `url(${info.image})`,
        }}
        className="image"
      ></div>
      <div className="infos">
        <div className="inventname">
          <h1>{info.name}</h1>
          <Button
            backgroundcolor={condition ? "red" : "green"}
            onClick={handleupdate}
          >
            {condition ? "Close" : "Update"}
          </Button>
          <p onClick={() => deleteform(info)}>❌</p>
        </div>
        <div className="inventquant">
          <h4>Quantity: {info.quantity}</h4>
          <h4>Price-Per-Unit: {info.unitPrice}</h4>
          <h4>Cost: N{info.cost}</h4>
        </div>
      </div>
    </div>
  );
}
function Button({ children, onClick, backgroundcolor }) {
  return (
    <button
      style={{ backgroundColor: backgroundcolor }}
      onClick={onClick}
      className="button"
    >
      {children}
    </button>
  );
}
function FormAdd({ setdata, showAddForm }) {
  const [name, setname] = useState("");
  const [unitPrice, setUnitPrice] = useState("");
  const [image, setImage] = useState(
    "https://th.bing.com/th/id/OIP.VdHwv3Pd75tvtrlJEgyR6wHaE8?pid=ImgDet&rs=1"
  );

  function handleSubmit(e) {
    e.preventDefault();
    if (!name || !unitPrice || !image) return;
    const newForm = {
      name,
      unitPrice: `N${unitPrice}`,
      image,
      quantity: 0,
      cost: 0,
    };
    setdata((olddata) => [...olddata, newForm]);
    showAddForm(false);
    setname("");
    setUnitPrice("");
    setImage("");
  }

  return (
    <form onSubmit={handleSubmit} className="formadd">
      <div className="upperform">
        <label>
          Inventory name
          <input
            onChange={(e) => setname(e.target.value)}
            value={name}
            className="formaddinput"
            type="text"
          ></input>
        </label>

        <label>
          Price-Per-Unit:
          <input
            onChange={(e) => setUnitPrice(e.target.value)}
            value={unitPrice}
            className="formaddinput"
            type="value"
          />
        </label>
      </div>
      <div className="lowerform">
        <label>
          Inventory Image:
          <input
            className="formaddinput"
            style={{ width: "70%" }}
            type="text"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
      </div>
      <Button>Add</Button>
    </form>
  );
}
function FormUpdate({ updateData, setUpdateData, setdata }) {
  const [neededquant, setneededquant] = useState(updateData.quantity);
  const [quantgot, setquantgot] = useState("");
  const quantleft = neededquant - quantgot;
  const price = quantleft * +updateData.unitPrice.slice(1);
  function handleUpdate() {
    setdata((data) =>
      data.map((datum) =>
        datum === updateData
          ? { ...datum, quantity: quantleft, cost: `${price}` }
          : datum
      )
    );
    setUpdateData(null);
  }

  return (
    <form onSubmit={handleUpdate} className="formupdate">
      <h1>{updateData.name} Data</h1>
      <label>
        Quantity needed:
        <input
          onChange={(e) => setneededquant(+e.target.value)}
          value={neededquant}
          className="updateform"
          type="text"
        ></input>
      </label>
      <label>
        Unit Price:
        <input
          value={updateData.unitPrice}
          className="updateform"
          type="text"
        ></input>
      </label>
      <label>
        Quantity gotten:
        <input
          onChange={(e) =>
            setquantgot(
              +e.target.value > neededquant ? quantgot : +e.target.value
            )
          }
          value={quantgot}
          className="updateform"
          type="text"
        ></input>
      </label>
      <label>
        Quantity left:
        <input
          value={quantleft}
          className="updateform"
          type="text"
          disabled
        ></input>
      </label>
      <h1>Price: N{price.toFixed(2)}</h1>
      <Button>Update</Button>
    </form>
  );
}

export default App;
