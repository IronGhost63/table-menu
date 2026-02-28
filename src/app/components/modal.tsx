import { useRef, useEffect, ReactNode } from 'react';

type ModalProps = {
  children: ReactNode;
  className?: string;
  modalState: boolean;
  closeHandler?: () => void;
  actionHandler?: () => void;
  closeLabel?: string;
  actionLabel?: string;
  hideControl?: boolean;
}

const Modal = ({
  children,
  className,
  modalState,
  closeHandler,
  actionHandler,
  closeLabel,
  actionLabel,
  hideControl = false
}: ModalProps) => {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (modalState) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [modalState]);
  return (
    <dialog ref={ref} className={`modal ${className || ''}`} onCancel={closeHandler}>
      <div className="modal-content">
        {children}
      </div>
      {!hideControl && (
        <div className="modal-control">
          {closeHandler && (
            <button className="button dismiss-button" onClick={closeHandler}>{closeLabel}</button>
          )}
          {actionHandler && (
            <button className="button action-button" onClick={actionHandler}>{actionLabel}</button>
          )}
        </div>
      )}
    </dialog>
  );
}

export default Modal;
