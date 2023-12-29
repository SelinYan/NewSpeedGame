function Circle({ id, clickHandler, current }) {
  console.log(current);
  return (
    <div
      className={`circle ${current ? "active" : ""}`}
      onClick={() => clickHandler(id)}></div>
  );
}

export default Circle;
