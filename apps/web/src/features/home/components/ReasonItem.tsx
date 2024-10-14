import Image from "next/image";
import { FC } from "react";

interface ReasonItemProps {
  src: string;
  alt: string;
  title: string;
  description: string;
}

const ReasonItem: FC<ReasonItemProps> = ({ src, alt, title, description }) => {
  return (
    <div className="flex flex-col items-center gap-6">
      <div className="relative h-40 w-40 overflow-hidden">
        <Image src={src} alt={alt} fill className="object-contain" />
      </div>
      <h2 className="text-xl text-[#37bae3]">{title}</h2>
      <p className="text-center text-sm text-neutral-500">{description}</p>
    </div>
  );
};

export default ReasonItem;
