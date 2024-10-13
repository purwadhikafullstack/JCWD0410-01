import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FC } from "react";

interface ReviewCardProps {
  image: string;
  name: string;
  review: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ image, name, review }) => {
  return (
    <Card className="ml-10 flex h-52 w-80 flex-col gap-2 p-6">
      <Avatar>
        <AvatarImage src={image} className="object-cover" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <p className="text-lg font-semibold">{name}</p>

      <p className="text-neutral-600">{review}</p>
    </Card>
  );
};

export default ReviewCard;
