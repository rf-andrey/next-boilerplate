import { database } from "@/db";
import { UserInput } from "./user.schema";

export async function createUser(input: UserInput) {
  const user = await database.user.create({
    data: input,
  });

  return user;
}

export async function findUserByEmail(email: string) {
  return database.user.findUnique({
    where: { email },
  });
}

export async function findUsers() {
  return database.user.findMany({
    select: {
      email: true,
      name: true,
    },
  });
}

export async function findUser(id: number) {
  return database.user.findUnique({
    where: { id },
    select: {
      email: true,
      name: true,
    },
  });
}

export async function updateUser({
  name,
  email,
  password,
  id,
}: UserInput & { id: number }) {
  const user = await database.user.update({
    where: { id },
    data: {
      name,
      email,
      password,
    },
  });

  return user;
}

export async function deleteUser(id: number) {
  const user = await database.user.delete({
    where: { id },
  });

  return user;
}
