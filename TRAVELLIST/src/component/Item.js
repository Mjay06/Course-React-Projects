function Item({ item, onDelete, onUpdateItem }) {
    return (
      <li>
        <input
          onChange={() => onUpdateItem(item.id)}
          type="checkbox"
          value={item.packed}
        />
        <span style={item.packed ? { textDecoration: "line-through " } : {}}>
          {item.quantity} {item.description}
        </span>
        <button onClick={() => onDelete(item.id)}>❌</button>
      </li>
    );
  }
  export default Item