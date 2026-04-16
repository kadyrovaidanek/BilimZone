import { useAuth } from "@/entities/user/model/useAuth";
import { usePublications } from "@/entities/publication/model/usePublications";
import { AddPublicationButton } from "@/features/publication/ui/AddPublicationButton";
import { EditPublicationButton } from "@/features/publication/ui/EditPublicationButton";

export const PublicationsPage = () => {
  const { user } = useAuth();
  const { publications, deletePublication } = usePublications();

  if (user?.role === 1) {
    return <div className="p-10">Нет доступа</div>;
  }

  return (
    <div className="p-6 md:p-10 max-w-5xl mx-auto">
      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <h1 className="text-2xl md:text-3xl font-bold text-[#1E3A5F]">
          Мои публикации
        </h1>

        <AddPublicationButton />
      </div>

      <div className="space-y-4">
        {publications.map((pub) => (
          <div
            key={pub.id}
            className="bg-[#EAF1F8] p-5 rounded-xl shadow flex flex-col md:flex-row md:justify-between gap-4"
          >
            <div>
              <h3 className="font-semibold text-lg">{pub.title}</h3>
              <p className="text-sm text-gray-600">{pub.description}</p>

              <div className="flex flex-wrap gap-2 mt-2">
                <span className="text-xs inline-block text-blue-600">
                  {pub.priceType === "free" ? "Бесплатно" : `${pub.price} сом`}
                </span>

                {pub.priceType === "paid" && (
                  <span
                    className={`text-xs inline-block px-2 py-1 rounded-full ${
                      pub.contractAccepted
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {pub.contractAccepted
                      ? "Договор принят"
                      : "Договор не принят"}
                  </span>
                )}
              </div>
            </div>

            <div className="flex gap-4">
              <EditPublicationButton id={pub.id} />

              <button
                onClick={() => deletePublication(pub.id)}
                className="text-red-500"
              >
                Удалить
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};