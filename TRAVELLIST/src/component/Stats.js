function Stats({ statItem }) {
    if (statItem.length === 0) {
      return (
        <footer className="stats">
          <em>Start Packing 🚀</em>
        </footer>
      );
    }
    const numItem = statItem.length;
    const packedItem = statItem.filter((item) => item.packed === true).length;
    const percentage = Math.round((+packedItem / +numItem) * 100);
  
    return (
      <footer className="stats">
        {percentage === 100 ? (
          <em>You are ready to go 🚀</em>
        ) : (
          <em>
            {" "}
            🦍 You have {numItem} items on your list, and you already packed{" "}
            {packedItem} ({percentage}%)
          </em>
        )}
      </footer>
    );
  }

  export default Stats