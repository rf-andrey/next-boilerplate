import bcrypt from "bcrypt";

import {
  createUser,
  deleteUser,
  findUser,
  findUserByEmail,
  findUsers,
  updateUser,
} from "./user.service";
import { UserInput } from "./user.schema";

export async function createUserUseCase(
  email: string,
  password: string,
  name: string
) {
  const existingUser = await findUserByEmail(email);

  if (existingUser) {
    throw new Error(); // existing email
  }

  const user = await createUser({ email, password, name });

  return user;
}

export async function findUserUseCase(email: string) {
  const user = await findUserByEmail(email);

  return user;
}

export async function findUserByIdUseCase(id: number) {
  const user = await findUser(id);

  return user;
}

export async function findAllUsersUseCase() {
  const users = await findUsers();

  return users;
}

export async function signInUseCase(email: string, password: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    throw new Error(); // Login Error
  }

  const isPasswordCorrect = await verifyPassword(email, password);

  if (!isPasswordCorrect) {
    throw new Error(); // Login Error
  }

  return {
    id: user.id,
    email: user.email,
    name: user.name,
  };
}

async function verifyPassword(email: string, rawPassword: string) {
  const user = await findUserByEmail(email);

  if (!user) {
    return false;
  }

  return await bcrypt.compare(rawPassword, user.password);
}

export async function updateUserUseCase(id: number, input: UserInput) {
  const existingUser = await findUser(id);

  if (!existingUser) {
    throw new Error(); // Update Error
  }

  const user = await updateUser({
    id,
    email: input.email,
    password: input.password,
    name: input.name,
  });

  return user;
}

export async function deleteUserUseCase(id: number) {
  const user = await deleteUser(id);

  return user;
}
