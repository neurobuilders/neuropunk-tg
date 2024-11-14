import { Snackbar } from "@telegram-apps/telegram-ui";
import React, { createContext, useContext, useState, useCallback } from "react";

interface Toast {
  id: number;
  title: string;
  message: React.ReactNode;
  duration?: number;
  type: "success" | "error" | "warning" | "info";
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, "id"> & { duration?: number }) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const useToast = () => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }
  return context;
};

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback(
    ({
      title,
      message,
      type = "success",
      duration = 3000,
    }: Omit<Toast, "id"> & { duration?: number }) => {
      const id = Date.now();
      setToasts((prev) => [...prev, { id, title, message, type, duration }]);

      setTimeout(() => {
        setToasts((prev) => prev.filter((toast) => toast.id !== id));
      }, duration);
    },
    []
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastsContainer toasts={toasts} />
    </ToastContext.Provider>
  );
};

const ToastsContainer: React.FC<{ toasts: Toast[] }> = ({ toasts }) => {
  return (
    <div className="snackbar-container">
      {toasts.map(({ id, title, message, type, duration }) => (
        <Snackbar
          key={id}
          className={`snackbar snackbar--${type}`}
          onClose={() => {}}
          duration={duration}
          description={message}
        >
          {title}
        </Snackbar>
      ))}
    </div>
  );
};
