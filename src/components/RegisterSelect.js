import React from "react";
import { alphabets } from "../constants";

export function RegisterSelect () {
  return (
    <select className="register-select" name="" id="">
      {alphabets.map((a) => (
        <option value={a}>{a}</option>
      ))}
    </select>
  );
};
