export const getEmailFromTokenService = async (email: string) => {
  try {
    return {
      email,
    };
  } catch (error) {
    throw error;
  }
};
