import React from "react";

const Button = ({
    onClick,
    className,
    children,
    type = "button",
    bgColor = "secondary",
    full = false,
}) => {
    let bgClassName = "bg-primary";

    switch (bgColor) {
        case "primary":
            bgClassName = "bg-primary";
            break;
        case "secondary":
            bgClassName = "bg-secondary";
            break;
        default:
            break;
    }
    return (
        <button
            type={type}
            className={`py-3 px-6 rounded-lg capitalize  ${
                full ? "w-full" : "w-auto"
            }  mt-auto ${bgClassName} ${className}`}
            onClick={onClick}
        >
            {children}
        </button>
    );
};

export default Button;
