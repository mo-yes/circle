{/* Heroui components */}
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@heroui/react";

export default function ConfirmModal({
  isOpen,
  onClose,
  title = "Are you sure?",
  description = "Please confirm your action.",
  onConfirm,
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmColor = "danger",
}) {
  function handleConfirm(){
    onConfirm(); // onConfirm={handleConfirmLogout}
    onClose();   // ConfirmModal onClose
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={onClose} placement="center">
      <ModalContent>
        <ModalHeader>{title}</ModalHeader>
        <ModalBody>
          <p className="text-gray-600 dark:text-gray-300">{description}</p>
        </ModalBody>
        <ModalFooter>
          <Button variant="light" onPress={onClose}>
            {cancelText}
          </Button>
          <Button color={confirmColor} onPress={handleConfirm}>
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
