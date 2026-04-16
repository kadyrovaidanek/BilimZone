import { Link } from "react-router-dom";

export const BooksGrid = ({ books }: any) => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      {books.map((book: any) => (
        <Link
          key={book.id}
          to={`/material/${book.id}`}
          state={{ material: book }}
          className="border p-4 rounded-xl hover:shadow"
        >
          <img src={book.image} className="mb-3 rounded" />

          <h3 className="font-bold">{book.title}</h3>
          <p className="text-sm text-gray-500">{book.author}</p>

          <div className="mt-2">
            {book.priceType === "free"
              ? "Бесплатно"
              : `${book.price} сом`}
          </div>
        </Link>
      ))}
    </div>
  );
};