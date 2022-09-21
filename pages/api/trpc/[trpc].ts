import * as trpc from "@trpc/server";
import * as trpcNext from "@trpc/server/adapters/next";
import { z } from "zod";
import { generateChannelToken } from "../../../utils/generateChannelToken";
import { prisma } from "../../../lib/prisma";
export const appRouter = trpc
  .router()
  .query("getChannels", {
    async resolve() {
      const channels = await prisma.channel.findMany({
        select: {
          name: true,
          token: true,
        },
      });
      return channels;
    },
  })
  .mutation("createChannelToken", {
    input: z.object({
      channelName: z.string(),
    }),
    async resolve({ input }) {
      const token = generateChannelToken(input);
      console.log(token);
      const channel = await prisma.channel.create({
        data: {
          name: input.channelName,
          token,
        },
      });
      console.log(token);
      if (channel) {
        return { channel };
      }
      return { status: "error" };
    },
  });
export type AppRouter = typeof appRouter;

export default trpcNext.createNextApiHandler({
  router: appRouter,
  createContext: () => null,
});
