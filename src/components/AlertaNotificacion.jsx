import { useEffect } from "react";
import "./AlertaNotificacion.css";

function AlertaNotificacion({ mensaje, onCerrar }) {
    useEffect(() => {
        const temporizador = setTimeout(() => {
            onCerrar();
        }, 3000);
        return () => clearTimeout(temporizador);

    }, [onCerrar]);
    return (
        <div className="toast">
            {mensaje}
        </div>
    );
}

export default AlertaNotificacion;