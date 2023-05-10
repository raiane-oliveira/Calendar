import React from "react";

interface IModalProps {
  children: JSX.Element;
  bgColor: string;
  padding: number;
}

export const Modal: React.FC<IModalProps> = ({
  children,
  bgColor,
  padding,
}) => {
  return (
    <div
      className={`bg-${bgColor} rounded-xl p-${padding} shadow-md absolute top-2/4 left-2/4 -translate-x-2/4 -translate-y-2/4`}
    >
      {children}
    </div>
  );
};
