import { authMiddleware } from "@clerk/nextjs";
import createMiddleware from 'next-intl/middleware';
import { i18n } from '@/config/i18n.config';

// export default createMiddleware(i18n);

export default authMiddleware({
  publicRoutes: ['/', '/api/webhook']
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
