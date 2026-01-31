import { useEffect, useState } from 'react';

interface NotificationProps {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
}

export const Notification = ({ message, isVisible, onClose }: NotificationProps) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible && !show) return null;

  return (
    <div
      className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[1003] px-6 py-3 rounded-md bg-[#141414] border border-[#00ff41] text-white font-medium shadow-lg transition-all duration-300 ${
        show ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
      }`}
      role="alert"
      aria-live="polite"
    >
      {message}
    </div>
  );
};
