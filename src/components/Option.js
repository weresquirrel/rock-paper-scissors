import React from "react";

function Option({ sign, onActivate, isActivatable, activatedChoice }) {
  return (
    <button 
      disabled={isActivatable} 
      onClick={() => onActivate(sign)}
      className={activatedChoice === sign ? 'selected' : null}
    >
      {sign}
    </button>
  );
}

export default Option;
