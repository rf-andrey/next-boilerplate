import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";

export const database = new PrismaClient().$extends({
  query: {
    user: {
      $allOperations({ operation, args, query }) {
        if (
          (operation === "create" || operation === "update") &&
          args.data["password"] &&
          typeof args.data["password"] === "string"
        ) {
          args.data["password"] = bcrypt.hashSync(args.data["password"], 12);
        }
        return query(args);
      },
    },
  },
});
