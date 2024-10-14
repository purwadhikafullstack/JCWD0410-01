import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface NotificationCardProps {
  title: string;
  message: string;
  timeOfOrder: Date;
}

const NotificationCard: React.FC<NotificationCardProps> = ({
  title,
  message,
  timeOfOrder,
}) => {
  const createdAt = format(new Date(timeOfOrder), "dd MMM yyyy, HH:mm:ss");

  return (
    <Card>
      <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
        <span className="font-semibold">{createdAt}</span>
        <Badge>Notifikasi</Badge>
      </div>
      <div className="space-y-2 p-4">
        <div className="rounded-md bg-neutral-100 p-2 text-center">{title}</div>
        <div className="flex flex-col gap-2">
            <p className="line-clamp-4">{message}</p>
        </div>
      </div>
    </Card>
  );
};

export default NotificationCard;
