import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import ConfirmModal from './ConfirmModal';
import { ConfirmModalProps } from 'types/interfaces';

export function useConfirmModal() {
  const [modalProps, setModalProps] = useState<ConfirmModalProps | null>(null);

  const confirm = (props: ConfirmModalProps) => {
    setModalProps(props);
  };

  const close = () => {
    setModalProps(null);
  };

  const modalNode = modalProps
    ? ReactDOM.createPortal(
        <ConfirmModal isOpen={true} close={close} {...modalProps} />,
        document.body,
      )
    : null;

  return { confirm, modalNode };
}
