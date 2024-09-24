import VerifyEmailPage from "@/features/verify-email";

const verifyEmail = ({
  params,
}: {
  params: { token: string; email: string };
}) => {
  return <VerifyEmailPage token={params.token} email={params.email} />;
};

export default verifyEmail;
