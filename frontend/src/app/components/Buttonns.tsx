"use client";
const Buttons = () => {
  const handleClick = () => {
    console.log("yes i'm here!!!");
  };
  return (
    <div >
      <button onClick={() => handleClick()}>CLick me!</button>
    </div>
  );
};
export default Buttons;
