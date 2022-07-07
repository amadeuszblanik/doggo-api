import * as bcrypt from 'bcrypt';

const hashPasswordUtils = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt();

  return await bcrypt.hash(password, salt);
};

export default hashPasswordUtils;
