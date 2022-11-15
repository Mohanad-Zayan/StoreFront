import bcrypt from "bcrypt";

export const hashPassword = async (password: string): Promise<string> => {
  const passwordWithPepper = password + process.env.PASS_PEPPER;
  return await bcrypt.hash(
    passwordWithPepper,
    parseInt(process.env.SALT_ROUNDS as string)
  );
};

export const comparePassword = async (
  inputPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  const passwordWithPepper = inputPassword + process.env.PASS_PEPPER;

  return await bcrypt.compare(passwordWithPepper, hashedPassword);
};
