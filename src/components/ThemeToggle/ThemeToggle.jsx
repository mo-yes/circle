import { useContext } from "react";
import { Button } from "@heroui/react";
import { Moon, Sun } from "lucide-react";
import { ThemeContext } from "../../context/ThemeContext";

  {/* ThemeMode toggle Component */}
export default function ThemeToggle() {
  const { darkMode, setDarkMode } = useContext(ThemeContext);

  return (
    <Button
      onPress={() => setDarkMode(!darkMode)}
      variant="light"
      className="rounded-full min-w-10 h-10"
      isIconOnly
    >
      {darkMode ? (
        <Sun size={20} className="text-yellow-400" />
      ) : (
        <Moon size={20} className="text-gray-600" />
      )}
    </Button>
  );
}
