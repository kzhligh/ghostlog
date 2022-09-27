import React from "react";
import Input from "./Input";

export default function MacrosCalculator() {
  return (
    <div>
      <label>Macros Calculator</label>
      <form className="form">
        <Input type="number" placeholder="Age" />
        <Input type="radio" placeholder="Gender" />
        <Input type="number" placeholder="cm" />
        <Input type="number" placeholder="lbs" />
        <Input type="number" placeholder="Age" />
        <Input type="number" placeholder="Age" />
        <button style={{ marginRight: "5px" }} type="submit">
          Calculate
        </button>
        <button style={{ marginLeft: "5px" }} type="reset">
          Clear
        </button>
      </form>
    </div>
  );
}
