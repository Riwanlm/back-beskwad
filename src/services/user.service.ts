import * as userRepository from "../repositories/user.repository";

export const getAllUsers = async () => {
  return await userRepository.getAllUsers();
};
