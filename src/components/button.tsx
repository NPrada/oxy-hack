import * as React from "react";

interface ButtonProps {
  children: string;
  onClick?: () => void;
  type?: "primary" | "secondary";
}

export const Button = ({ children, onClick, type = "primary" }: ButtonProps) => {
  const baseClasses = "font-bold py-2 px-4 rounded mt-4";
  const primaryClasses = "bg-blue-500 hover:bg-blue-700 text-white";
  const secondaryClasses = "bg-gray-400/70 hover:bg-gray-600 text-white";

  const finalClasses = `${baseClasses} ${type === "primary" ? primaryClasses : secondaryClasses}`;

  return (
    <button
      className={finalClasses}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
