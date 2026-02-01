import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Avatar,
  Button,
} from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import toast from "react-hot-toast";
import ConfirmModal from "../../shared/ConfirmModal";

export default function UserDropdown() {
  const navigate = useNavigate();
  const { isLoggedIn, setIsLoggedIn  } = useContext(AuthContext);

  {/* Modal Show */}
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleConfirmLogout() {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    toast.success("Logged out successfully");
    navigate('/login');
  }

  return (
    <>
      {/* Confirm Modal Component */}
      <ConfirmModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Confirm Logout"
        description="Are you sure you want to log out?"
        confirmText="Log Out"
        cancelText="Cancel"
        confirmColor="danger"
        onConfirm={handleConfirmLogout}
      />

      <Dropdown placement="bottom-end">
        <DropdownTrigger>
          <Avatar
            isBordered
            alt="User"
            as="button"
            className="transition-transform hover:scale-105 border-2 border-blue-500"
            color="primary"
            size="sm"
            src="https://i.pravatar.cc/150?u=a042581f4e29026704d"
          />
        </DropdownTrigger>

        <DropdownMenu
          aria-label="User Actions"
          variant="flat"
          className="min-w-[200px]"
        >
          {isLoggedIn ? (
            <>
              <DropdownItem key="profile" className="h-12">
                <Link to="/profile" className="w-full flex items-center">
                  <div>
                    <p className="font-semibold">John Doe</p>
                    <p className="text-sm text-gray-500">View profile</p>
                  </div>
                </Link>
              </DropdownItem>

              <DropdownItem key="settings">
                <Link to="/settings" className="w-full">
                  Settings
                </Link>
              </DropdownItem>

              {/* Log Out Model */}
              <DropdownItem key="logout" className="p-0">
                <Button
                  onPress={() => setIsModalOpen(true)}
                  color="danger"
                  variant="light"
                  className="w-full text-danger font-semibold justify-start"
                >
                  Log Out
                </Button>
              </DropdownItem>
            </>
          ) : (
            <>
              <DropdownItem key="login" className="h-12">
                <Link to="/login" className="w-full flex items-center">
                  <div>
                    <p className="font-semibold">Welcome</p>
                    <p className="text-sm text-gray-500">
                      Sign in to your account
                    </p>
                  </div>
                </Link>
              </DropdownItem>

              <DropdownItem key="register">
                <Link to="/register" className="w-full">
                  Create Account
                </Link>
              </DropdownItem>
            </>
          )}
        </DropdownMenu>
      </Dropdown>
    </>
  );
}
