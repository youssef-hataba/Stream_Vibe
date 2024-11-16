"use client";
import { useState, useEffect } from "react";

const Alert = ({ message, type = 'info', duration = 5000 }) => {
  const alertStyles = {
    info: { backgroundColor: '#a8dadc', color: '#1d3557' },
    success: { backgroundColor: '#90e0ef', color: '#023e8a' },
    warning: { backgroundColor: '#ffb703', color: '#d00000' },
    danger: { backgroundColor: '#f94144', color: '#fff' },
  };

  const [showAlert, setShowAlert] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowAlert(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  if (!showAlert) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: '20px',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: '9999',
        padding: '15px 30px',
        borderRadius: '8px',
        marginBottom: '10px',
        boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        alignItems: 'center',
        ...alertStyles[type],
      }}
    >
      <span style={{ fontSize: '16px', fontWeight: 'bold' }}>{message}</span>
      <button
        onClick={() => setShowAlert(false)}
        style={{
          background: 'none',
          border: 'none',
          fontSize: '20px',
          marginLeft: '15px',
          cursor: 'pointer',
          color: 'inherit',
        }}
      >
        &times;
      </button>
    </div>
  );
};

export default Alert;
