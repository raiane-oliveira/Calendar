import React from "react";

interface IModalProps {
  children: JSX.Element;
  classes: string;
  position: {
    y: string;
    x: string;
  };
}

export const Modal: React.FC<IModalProps> = ({
  children,
  classes,
  position,
}) => {
  return (
    <div
      style={{ top: position.y, left: position.x }}
      className={`absolute rounded-xl shadow-md ${classes}`}
    >
      {children}
    </div>
  );
};
