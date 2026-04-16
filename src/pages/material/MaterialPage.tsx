import { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  ShoppingCart,
  Heart,
  Star,
  FileText,
  Globe,
  Calendar,
  Layers,
  CheckCircle2,
  ArrowLeft,
  Share2,
  MessageSquare,
} from "lucide-react";

import { addToCart, addToCollection } from "@/entities/user/lib/storage";

interface MaterialDetail {
  id: number;
  title: string;
  author: string;
  description: string;
  priceType: "free" | "paid";
  price: number;
  image: string;
  pages: number;
  language: string;
  year: number;
  format: string;
  rating: number;
  reviewsCount: number;
  fileUrl: string;
}

export const MaterialPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [isFavorite, setIsFavorite] = useState(false);
  const [isBought, setIsBought] = useState(false);

  const stateMaterial = location.state?.material;

  const materials: MaterialDetail[] = [
    {
      id: 1,
      title: "Методы анализа данных в экономике",
      author: "Айбек Назаров",
      description: "Описание...",
      priceType: "paid",
      price: 500,
      image: "https://images.unsplash.com/photo-1543004402-6199320b336a",
      pages: 320,
      language: "Русский",
      year: 2024,
      format: "PDF",
      rating: 4.9,
      reviewsCount: 42,
      fileUrl: "/mock.pdf",
    },
  ];

  const material =
    stateMaterial || materials.find((m) => m.id === Number(id));

  // 🔥 Проверка при загрузке (если уже куплено или в избранном)
  useEffect(() => {
    const collection = JSON.parse(localStorage.getItem("collection") || "[]");

    const exists = collection.some((item: any) => item.id === material?.id);

    if (exists) {
      setIsBought(true);
      setIsFavorite(true);
    }
  }, [material?.id]);

  if (!material) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-xl font-bold text-slate-400">
          Материал не найден
        </h1>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 text-blue-600 font-bold underline"
        >
          Вернуться назад
        </button>
      </div>
    );
  }

  // 🔥 ЛОГИКА
  const handleAddToCart = () => {
    addToCart(material);
    alert("Добавлено в корзину 🛒");
  };

  const handleBuyNow = () => {
    addToCollection(material);

    setIsBought(true);
    setIsFavorite(true);

    alert("Покупка успешна 🎉");
  };

  const handleAddToCollection = () => {
    const collection = JSON.parse(localStorage.getItem("collection") || "[]");

    if (isFavorite) {
      const updated = collection.filter(
        (item: any) => item.id !== material.id
      );
      localStorage.setItem("collection", JSON.stringify(updated));
      setIsFavorite(false);
    } else {
      addToCollection(material);
      setIsFavorite(true);
    }
  };

  return (
    <div className="min-h-screen bg-white pb-20">
      {/* HEADER */}
      <div className="max-w-7xl mx-auto px-4 py-6 flex justify-between items-center">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-semibold"
        >
          <ArrowLeft size={20} /> Назад
        </button>

        <button className="p-2.5 rounded-full hover:bg-slate-100">
          <Share2 size={20} />
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 pt-4 flex flex-col lg:flex-row gap-16">
        {/* LEFT */}
        <div className="lg:w-[380px]">
          <div className="sticky top-10">
            <img
              src={material.image}
              className="rounded-3xl shadow-xl mb-6"
            />

            {/* КНОПКИ */}
            {material.priceType === "free" ? (
              <>
                <button
                  onClick={() =>
                    window.open(material.fileUrl, "_blank")
                  }
                  className="w-full py-4 bg-blue-600 text-white rounded-xl mb-3"
                >
                  📖 Читать онлайн
                </button>

                <a
                  href={material.fileUrl}
                  download
                  className="block text-center py-3 border rounded-xl"
                >
                  📥 Скачать PDF
                </a>
              </>
            ) : (
              <>
                <div className="p-4 bg-slate-100 rounded-xl mb-3">
                  <div className="text-2xl font-bold">
                    {material.price} сом
                  </div>
                </div>

                {!isBought ? (
                  <>
                    <button
                      onClick={handleBuyNow}
                      className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold"
                    >
                      Купить сейчас
                    </button>

                    <button
                      onClick={handleAddToCart}
                      className="w-full py-4 border rounded-xl text-blue-600 mt-3"
                    >
                      В корзину
                    </button>
                  </>
                ) : (
                  <>
                    <div className="w-full py-3 rounded-xl bg-green-50 text-green-600 text-center font-bold border border-green-200">
                      ✅ Куплено
                    </div>

                    <button
                      onClick={() =>
                        window.open(material.fileUrl, "_blank")
                      }
                      className="w-full mt-3 py-4 bg-blue-600 text-white rounded-xl"
                    >
                      📖 Читать
                    </button>

                    <a
                      href={material.fileUrl}
                      download
                      className="block text-center py-3 border rounded-xl mt-2"
                    >
                      📥 Скачать
                    </a>
                  </>
                )}
              </>
            )}

            {/* ❤️ ИЗБРАННОЕ */}
            <button
              onClick={handleAddToCollection}
              className={`w-full mt-3 flex items-center gap-3 px-4 py-3 rounded-xl border transition-all ${
                isFavorite
                  ? "text-rose-500 border-rose-200 bg-rose-50"
                  : "text-slate-500 border-slate-200 hover:bg-slate-50"
              }`}
            >
              <Heart
                size={20}
                fill={isFavorite ? "currentColor" : "none"}
              />
              <span className="font-semibold">
                {isFavorite
                  ? "В избранном"
                  : "Добавить в избранное"}
              </span>
            </button>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex-1">
          <h1 className="text-4xl font-bold mb-2">
            {material.title}
          </h1>

          <p className="text-blue-600 font-semibold mb-6">
            {material.author}
          </p>

          {/* Рейтинг */}
          <div className="flex items-center gap-3 mb-6">
            <Star className="text-yellow-400" />
            <span>{material.rating}</span>
            <span className="text-gray-400">
              ({material.reviewsCount} отзывов)
            </span>
          </div>

          {/* Характеристики */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { label: "Страниц", val: material.pages, icon: Layers },
              { label: "Язык", val: material.language, icon: Globe },
              { label: "Год", val: material.year, icon: Calendar },
              { label: "Формат", val: material.format, icon: FileText },
            ].map((stat, i) => (
              <div
                key={i}
                className="p-4 rounded-xl bg-slate-50 border flex flex-col gap-2"
              >
                <stat.icon size={18} className="text-slate-400" />
                <span className="text-xs text-slate-400">
                  {stat.label}
                </span>
                <span className="font-semibold">{stat.val}</span>
              </div>
            ))}
          </div>

          {/* Описание */}
          <p className="text-gray-600 mb-10">
            {material.description}
          </p>

          {/* Preview */}
          <div className="border rounded-2xl p-6">
            <h3 className="font-bold mb-4">Предпросмотр</h3>

            <div className="h-[300px] flex items-center justify-center bg-gray-50 rounded-xl">
              PDF Viewer
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};