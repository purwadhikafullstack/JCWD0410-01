import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import { FC } from "react";
import { FaUser } from "react-icons/fa6";

interface ReviewCardProps {
  image: string;
  name: string;
  review: string;
}

const ReviewCard: FC<ReviewCardProps> = ({ image, name, review }) => {
  return (
    <Card className="ml-8 flex h-48 w-80 flex-col gap-2 border-[#37bae3] p-4">
      <Avatar>
        <AvatarImage src={image} className="h-10 w-10 object-cover" />
        <AvatarFallback>
          <FaUser />
        </AvatarFallback>
      </Avatar>
      <p className="font-semibold">{name}</p>
      <p className="line-clamp-3 text-sm text-neutral-600">{review}</p>
    </Card>
  );
};

export default ReviewCard;
