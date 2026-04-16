// AddPublicationButton.tsx

import { Button } from "@/shared/ui/Button";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const AddPublicationButton = () => {
  const navigate = useNavigate();

  return (
    <Button onClick={() => navigate("/publications/add")}>
      <FaPlus className="mr-2" />
      Добавить материал
    </Button>
  );
};