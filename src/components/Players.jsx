import { useState } from "react";

export default function Players({ name, symbol, isActive }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(name);

  const handleEdit = () => {
    setIsEditing((isEditing) => !isEditing);
  };

  const handleOnChange = (value) => {
    setPlayerName(value);
  };

  let playerFeild = <span className="player-name">{playerName}</span>;
  let btnCaption = "Edit";
  if (isEditing) {
    playerFeild = (
      <input
        value={playerName}
        type="text"
        required
        onChange={(e) => {
          handleOnChange(e.target.value);
        }}
      ></input>
    );

    btnCaption = "Save";
  }

  return (
    <li className={isActive ? "active" : ""}>
      <span className="player">
        {playerFeild}
        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEdit}>{btnCaption}</button>
    </li>
  );
}
