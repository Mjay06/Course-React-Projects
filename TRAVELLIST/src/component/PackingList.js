import Item from './Item'
import { useState } from "react";
function PackingList({ PackingItem, onDelete, onUpdateItem, handleDelete }) {
    const [sortBy, setSortBy] = useState("input");
    let sortedItems;
    if (sortBy === "input") sortedItems = PackingItem;
    if (sortBy === "description")
      sortedItems = PackingItem.slice().sort((a, b) =>
        a.description.localeCompare(b.description)
      );
  
    if (sortBy === 'packed') sortedItems = PackingItem.slice().sort((a,b)=> +a.packed - +b.packed)
    return (
      <div className="list">
        <ul>
          {sortedItems.map((item) => (
            <Item
              onUpdateItem={onUpdateItem}
              onDelete={onDelete}
              item={item}
              key={item.id}
            />
          ))}
        </ul>
        <div className="actions">
          <select onChange={(e) => setSortBy(e.target.value)} value={sortBy}>
            <option value="input"> Sort by input order</option>
            <option value="description"> Sort by description</option>
            <option value="packed"> Sort by packed status</option>
          </select>
          <button onClick={handleDelete}> clear list </button>
        </div>
      </div>
    );
  }

  export default PackingList