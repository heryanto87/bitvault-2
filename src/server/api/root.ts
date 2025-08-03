import { createTRPCRouter } from './trpc';
import { generalRouter } from './routers/general';
import { userRouter } from './routers/user';
import { symbolRouter } from './routers/symbol';
import { riskProfileRouter } from './routers/riskProfile';
import { vaultRouter } from './routers/vault';
import { challengeRouter } from './routers/challenge';
import { positionRouter } from './routers/position';
import { tradeRouter } from './routers/trade';

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
  general: generalRouter,
  user: userRouter,
  symbol: symbolRouter,
  riskProfile: riskProfileRouter,
  vault: vaultRouter,
  challenge: challengeRouter,
  position: positionRouter,
  trade: tradeRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;