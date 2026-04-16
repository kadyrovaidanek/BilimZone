import { useCart } from "@/entities/cart/useCart";

export const CartPage = () => {
  const { items, removeFromCart } = useCart();

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Корзина</h1>

      {items.length === 0 && <p>Корзина пуста</p>}

      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={item.id}
            className="flex justify-between bg-white p-4 rounded-lg shadow"
          >
            <div>
              <h3>{item.title}</h3>
              <p>{item.price} сом</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-red-500"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};