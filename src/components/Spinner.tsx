import React from "react";
import style from "./Spinner.module.css";

type SpinnerProps = {
  label?: string;
};

export const Spinner: React.FC<SpinnerProps> = ({ label = "Loading..." }) => {
  return (
    <div
      className={style.loader}
      role="status"
      aria-label={label}
      aria-live="polite"
    ></div>
  );
};
