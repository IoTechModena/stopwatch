import { useState } from "react";

interface AlertProps {
  type: "info" | "error";
  message: string;
  prefix: string;
}

interface ColorClass {
  alert: string;
  svg: string;
}

export const Alert = ({ prefix, message, type }: AlertProps) => {
  const [isOpen, setIsOpen] = useState(true);

  const colorClasses: Record<"info" | "error", ColorClass> = {
    info: {
      alert: "bg-blue-100 border-blue-400 text-blue-700",
      svg: "text-blue-500",
    },
    error: {
      alert: "bg-red-100 border-red-400 text-red-700",
      svg: "text-red-500",
    },
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="flex justify-center my-20">
      <div
        className={`inline-block mx-auto border ${colorClasses[type].alert} px-4 py-3 rounded relative`}
      >
        <strong className="font-bold">{prefix}</strong>
        <span className="block sm:inline mr-10">{message}</span>
        <span
          className="absolute top-0 bottom-0 right-0 px-4 py-3"
          onClick={() => setIsOpen(false)}
        >
          <svg
            className={`fill-current h-6 w-6 ${colorClasses[type].svg}`}
            role="button"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
          >
            <title>Close</title>
            <path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" />
          </svg>
        </span>
      </div>
    </div>
  );
};
