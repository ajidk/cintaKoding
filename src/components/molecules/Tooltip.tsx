import React, { createRef } from "react";

interface TooltipState {
  children: any;
  tooltipText: string;
  className?: string;
}
const Tooltip: React.FC<TooltipState> = ({
  children,
  tooltipText,
  className,
}) => {
  const tipRef: any = createRef<any>();

  function handleMouseEnter() {
    tipRef.current.style.opacity = 1;
    tipRef.current.style.marginBottom = "20px";
  }

  function handleMouseLeave() {
    tipRef.current.style.opacity = 0;
    tipRef.current.style.marginBottom = "10px";
  }
  return (
    <div
      className={`relative flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <div
        className="absolute whitespace-no-wrap bg-gradient-to-r from-black to-gray-700 text-white px-4 py-1 rounded flex items-center transition-all duration-150"
        style={{ top: "100%", opacity: 0 }}
        ref={tipRef}
      >
        <div
          className="bg-black text-sm pb-6 h-2 w-2 absolute"
          style={{ top: "-6px", transform: "rotate(45deg)" }}
        />
        {tooltipText}
      </div>
      {children}
    </div>
  );
};

export default Tooltip;
