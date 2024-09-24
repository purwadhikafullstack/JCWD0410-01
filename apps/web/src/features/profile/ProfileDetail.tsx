"use client";
import useGetUser from "@/hooks/api/user/useGetUser";
import Image from "next/image";
import { FC } from "react";
import { CiUser } from "react-icons/ci";
import { FaClock } from "react-icons/fa6";
import UbahEmail from "./components/UbahEmail";
import UbahPassword from "./components/UbahPassword";
import UbahProfile from "./components/UbahProfile";
import { useSession } from "next-auth/react";
import NotFound from "@/app/not-found";

interface ProfileDetailProps {
  userId: number;
}

const ProfileDetailPage: FC<ProfileDetailProps> = ({ userId }) => {
  const { data: session } = useSession();
  const { data } = useGetUser(userId);

  if (session?.user) {
    if (data?.id != session.user.id) {
      return NotFound();
    }
  }

  return (
    <div className="mx-auto my-10 grid max-w-7xl grid-cols-1 gap-10 rounded-md p-6 text-neutral-600 md:grid-cols-3">
      <div className="flex flex-col items-center gap-4">
        <div>
          {data?.profilePicture ? (
            <div className="relative h-24 w-24 overflow-hidden rounded-full">
              <Image
                src={data.profilePicture}
                alt="jkkn"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <div className="rounded-full border-[1px] bg-[#e5f3f6] p-3">
              <CiUser className="h-24 w-24 text-[#37bae3]" />
            </div>
          )}
        </div>
        <div className="space-y-2 text-center text-sm">
          <h3 className="text-2xl">{data?.name}</h3>
          <p>{data?.email}</p>
          <div className="flex items-center gap-2">
            <FaClock />
            <p>
              Bergabung sejak{" "}
              {data?.createdAt && new Date(data.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-1 space-y-10 md:col-span-2">
        <UbahProfile
          name={data?.name ? data.name : ""}
          phoneNumber={data?.phoneNumber ? data.phoneNumber : ""}
        />
        <UbahEmail />
        <UbahPassword />
      </div>
    </div>
  );
};

export default ProfileDetailPage;
