import { useParams, useNavigate } from "react-router-dom";
import { usePublications } from "@/entities/publication/model/usePublications";
import { AddPublicationForm } from "@/features/publication/ui/AddPublicationForm";
import type { PublicationItem } from "@/entities/publication/model/usePublications";

export const EditPublicationPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { publications, updatePublication } = usePublications();

  const pub = publications.find((p) => String(p.id) === id);

  if (!pub) return <div className="p-6">Не найдено</div>;

  return (
    <div className="p-6 md:p-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Редактировать материал
      </h1>

      <div className="bg-white p-6 rounded-xl shadow">
        <AddPublicationForm
          initialData={pub}
          onSubmit={(data: PublicationItem) => {
            updatePublication(data);
            navigate("/publications");
          }}
          onCancel={() => navigate("/publications")}
        />
      </div>
    </div>
  );
};