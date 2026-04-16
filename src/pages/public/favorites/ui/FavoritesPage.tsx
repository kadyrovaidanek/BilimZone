import { useFavorites } from "@/entities/favorite/model/useFavorites";
import { BookCard } from "@/entities/book/ui/BookCard";
import type { Book } from "@/entities/book/model/types";

import img1 from "@/assets/images/1.jpg";
import img2 from "@/assets/images/2.jpg";

export const FavoritesPage = () => {
  const { favorites } = useFavorites();

  const allBooks: Book[] = [
    {
      id: 1,
      title: "48 законов власти",
      author: "Роберт Грин",
      description: "Описание...",
      image: img1,
    },
    {
      id: 2,
      title: "Самодисциплина",
      author: "Майкл Уилсон",
      description: "Описание...",
      image: img2,
    },
  ];

  const favoriteBooks = allBooks.filter((b) =>
    favorites.includes(b.id)
  );

  return (
    <div className="p-10">
      <h1 className="text-2xl font-bold mb-6">
        Избранные книги
      </h1>

      {favoriteBooks.length === 0 ? (
        <p>Нет избранных</p>
      ) : (
        <div className="space-y-4">
          {favoriteBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      )}
    </div>
  );
};