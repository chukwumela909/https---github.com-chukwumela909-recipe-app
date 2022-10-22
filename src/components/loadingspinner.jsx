import React from "react";

export default function LoadingSpinner() {
    return (
        <div style={mystyle}>
            <div class="spinner-border text-info"></div>
        </div>
    );
}

const mystyle = {
    display: "grid",
    justifyContent: "center",
    alignItems: "center",
    height: "350px"
};