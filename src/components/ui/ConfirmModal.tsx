import { FC } from "react";
import { ConfirmModalProps } from "types/interfaces";


interface InternalProps extends ConfirmModalProps {
  isOpen: boolean;
  close: () => void;
}

const ConfirmModal: FC<InternalProps> = ({
  isOpen,
  close,
  title,
  content,
  okText = "OK",
  cancelText = "Cancel",
  onOk,
  onCancel,
}) => {
  if (!isOpen) return null;

  const handleOk = async () => {
    await onOk?.();
    close();
  };

  const handleCancel = () => {
    onCancel?.();
    close();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md mx-4 p-6">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6 text-gray-700">{content}</p>
        <div className="flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={handleOk}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          >
            {okText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
