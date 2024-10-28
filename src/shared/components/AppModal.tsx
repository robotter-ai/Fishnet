import React from 'react';

interface AppModalProps {
  title?: string;
  isOpen: boolean;
  handleClose: () => void;
  handleSuccsessfulLogin: () => void;
  children: React.ReactNode;
}

const AppModal: React.FC<AppModalProps> = ({ title, isOpen, handleClose, handleSuccsessfulLogin, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal">
      <div className="modal-content">
        {title && <h2>{title}</h2>}
        <button onClick={handleClose}>Close</button>
        {children}
      </div>
    </div>
  );
};

export default AppModal;

