import { AddPublicationForm } from "@/features/publication/ui/AddPublicationForm";
import { usePublications } from "@/entities/publication/model/usePublications";
import { useNavigate } from "react-router-dom";
import type { PublicationItem } from "@/entities/publication/model/usePublications";

export const AddPublicationPage = () => {
  const { addPublication } = usePublications();
  const navigate = useNavigate();

  return (
    <div className="p-6 md:p-10 max-w-3xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Добавление материала
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <AddPublicationForm
          onSubmit={(data: PublicationItem) => {
            addPublication(data);
            navigate("/publications");
          }}
          onCancel={() => navigate("/publications")}
        />
      </div>
    </div>
  );
};