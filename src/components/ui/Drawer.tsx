"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { SheetProps } from "types/types";

const Sheet: React.FC<SheetProps> = ({
  children,
  drawerName,
  open,
  setOpen,
  selectedLabel,
  mobileBgColor,
  className,
}) => {
  const [showDrawer, setShowDrawer] = useState(open);

  useEffect(() => {
    if (open) {
      setShowDrawer(true);
    } else {
      const timer = setTimeout(() => setShowDrawer(false), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  return (
    <>
      <div onClick={() => setOpen(true)}>{drawerName}</div>
      {showDrawer &&
        createPortal(
          <div className="fixed inset-0 z-50 flex">
            <div
              className={`absolute inset-0 bg-black/50 transition-opacity duration-300 ${
                open ? "opacity-100" : "opacity-0"
              }`}
              onClick={() => setOpen(false)}
            />
            <div
              className={`absolute right-0 top-0 h-full w-full max-w-sm shadow-lg transform transition-all duration-300 ease-in-out bg-white ${className}
              ${
                open
                  ? "translate-x-0 opacity-100 scale-100"
                  : "translate-x-full opacity-0 scale-95"
              }`}
              style={{ backgroundColor: mobileBgColor || "white" }}
            >
              <div className="p-6 overflow-y-auto h-full">
                {selectedLabel ? (
                  children
                ) : (
                  <div>
                    {React.Children.map(children, (child) => {
                      if (
                        React.isValidElement<{ label?: string }>(child) &&
                        child.props.label === selectedLabel
                      ) {
                        return child;
                      }
                      return null;
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>,
          document.body
        )}
    </>
  );
};

export default Sheet;
