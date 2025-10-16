import React from "react";

function CardStats({ title, value, icon }) {
  return (
    <div className="card-stats">
      <div className="icon">{icon}</div>
      <div>
        <h4>{title}</h4>
        <p>{value}</p>
      </div>
    </div>
  );
}

export default CardStats;
