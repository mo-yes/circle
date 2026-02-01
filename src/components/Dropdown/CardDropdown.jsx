import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@heroui/react'
import { MoreHorizontal } from 'lucide-react'

export default function CardDropdown({onDelete, onEdit }) {
  return (
    <>
      <Dropdown placement="bottom-end">
              <DropdownTrigger>
                <button className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition">
                  <MoreHorizontal className="w-5 h-5 text-gray-500 dark:text-gray-300 rotate-90" />
                </button>
              </DropdownTrigger>

              <DropdownMenu aria-label="Post actions">
                <DropdownItem key="edit" onPress={onEdit}>Edit</DropdownItem>

                <DropdownItem
                  key="delete"
                  color="danger"
                  className="text-danger"
                  onPress={onDelete}
                >
                  Delete
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
    </>
  )
}
