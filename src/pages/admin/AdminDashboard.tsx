export const AdminDashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Админ панель</h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Материалы</h2>
          <p className="text-sm text-gray-500 mt-2">
            Проверка новых публикаций
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Соглашения</h2>
          <p className="text-sm text-gray-500 mt-2">
            Управление документами
          </p>
        </div>

        <div className="p-4 border rounded-lg">
          <h2 className="font-semibold">Уведомления</h2>
          <p className="text-sm text-gray-500 mt-2">
            Системные события
          </p>
        </div>

      </div>
    </div>
  );
};