// EditPublicationButton.tsx

import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

export const EditPublicationButton = ({ id }: { id: number }) => {
  const navigate = useNavigate();

  return (
    <button onClick={() => navigate(`/publications/edit/${id}`)}>
      <FaEdit /> Редактировать
    </button>
  );
};