import { useNotifications } from "@/entities/notification/useNotifications";

export const NotificationsPage = () => {
  const { notifications, markRead } = useNotifications();

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Уведомления</h1>

      <div className="space-y-3">
        {notifications.map((n) => (
          <div
            key={n.id}
            className={`p-4 rounded-lg border ${
              n.read ? "bg-gray-100" : "bg-blue-50"
            }`}
            onClick={() => markRead(n.id)}
          >
            {n.text}
          </div>
        ))}
      </div>
    </div>
  );
};