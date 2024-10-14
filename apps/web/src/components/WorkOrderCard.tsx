import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { format } from "date-fns";

interface WorkOrderCardProps {
  orderNumber: string;
  status: string;
  stationId: number;
  timeOfOrder: Date;
}

const WorkOrderCard: React.FC<WorkOrderCardProps> = ({
  orderNumber,
  status,
  stationId,
  timeOfOrder,
}) => {
  const result = new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  });

  const createdAt = format(new Date(timeOfOrder), "dd MMM yyyy, HH:mm:ss");

  return (
    <Card>
      <div className="flex flex-row items-center justify-between bg-[#e5f3f6] p-4">
        <span className="font-semibold">{orderNumber}</span>
        <Badge>Work Order</Badge>
      </div>
      <div className="space-y-2 p-4">
        <div className="rounded-md bg-neutral-100 p-2 text-center">
          {status}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <p>Station:</p>
            <p className="line-clamp-2 max-w-[16ch] break-all">{stationId === 1 ? "Washing" : stationId === 2 ? "Ironing" : "Packing"}</p>
          </div>
          <div className="flex items-center justify-between">
            <p>Time order:</p>
            <p>{createdAt}</p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WorkOrderCard;