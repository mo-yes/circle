import { Button, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@heroui/react'

export default function CardModal({openDeleteModal, setOpenDeleteModal, loading, handleDelete , title , description}) {
  return (
    <>
      <Modal
              isOpen={openDeleteModal}
              onClose={() => setOpenDeleteModal(false)}
              placement="center"
            >
              <ModalContent>
                <ModalHeader className="text-danger">
                  {title}
                </ModalHeader>

                <ModalBody>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    Are you sure you want to delete this {description}?  
                    <span className="font-semibold text-danger block mt-2">
                      This action cannot be undone.
                    </span>
                  </p>
                </ModalBody>

                <ModalFooter>
                  <Button
                    variant="light"
                    onPress={() => setOpenDeleteModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    color="danger"
                    isLoading={loading}
                    onPress={handleDelete}
                  >
                    Delete
                  </Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
    </>
  )
}
