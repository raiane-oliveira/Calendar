import React from "react";

interface IModalProps {
  children: JSX.Element;
  classes: string;
}

export const Modal: React.FC<IModalProps> = ({ children, classes }) => {
  return (
    <div
      className={`${classes} rounded-xl shadow-md absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
    >
      {children}
    </div>
  );
};
