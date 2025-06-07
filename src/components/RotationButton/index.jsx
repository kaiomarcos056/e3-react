import { FaTrash } from "react-icons/fa";

export function RotationButton({ x, y }) {
    return (
        <div
            style={{
                position: "absolute",
                left: x,
                top: y,
                zIndex: 10,
                background: "#019FCE",
                padding: "5px",
                borderRadius: "4px",
                color: "#fff",
                cursor: "pointer",
            }}
            onClick={() => console.log("Botão clicado!")}
        >
            <FaTrash />
        </div>
    );
};