"use client";
import NotFound from "@/app/not-found";
import useGetUser from "@/hooks/api/user/useGetUser";
import Image from "next/image";
import { CiUser } from "react-icons/ci";
import { FaClock } from "react-icons/fa6";
import ChangeEmail from "./components/ChangeEmail";
import ChangePassword from "./components/ChangePassword";
import UpdateProfile from "./components/UpdateProfile";
import { MdVerified } from "react-icons/md";

const ProfileDetailPage = () => {
  const { data, isPending, refetch } = useGetUser();

  // if (isPending) {
  //   // return NotFound();
  //   return <div>fetching</div>;
  // }

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
          <div className="flex items-center justify-center gap-1">
            <h3 className="text-2xl">{data?.name}</h3>
            {data?.isVerified === true && (
              <MdVerified className="text-[#37bae3]" size={18} />
            )}
          </div>
          <p>{data?.email}</p>
          <div className="flex items-center justify-center gap-2">
            <FaClock />
            <p>
              Join since{" "}
              {data?.createdAt && new Date(data.createdAt).getFullYear()}
            </p>
          </div>
        </div>
      </div>

      <div className="col-span-1 space-y-10 md:col-span-2">
        {!isPending && (
          <UpdateProfile
            profilePicture={data?.profilePicture}
            name={data?.name!}
            phoneNumber={data?.phoneNumber ? data.phoneNumber : ""}
          />
        )}

        <ChangeEmail />
        <ChangePassword />
      </div>
    </div>
  );
};

export default ProfileDetailPage;
