import ProfileDetailPage from "@/features/profile/ProfileDetail";

const ProfileDetail = ({ params }: { params: { id: string } }) => {
  return <ProfileDetailPage userId={Number(params.id)} />;
};

export default ProfileDetail;
