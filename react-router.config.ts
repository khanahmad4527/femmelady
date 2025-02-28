import type { Config } from '@react-router/dev/config';
import { AVAILABLE_LANGUAGES, STATIC_PAGES } from './app/constant';

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  ssr: true,

  // return a list of URLs to prerender at build time
  // async prerender() {
//    return AVAILABLE_LANGUAGES.flatMap(p =>
  //    STATIC_PAGES.map(s => `/${p}/${s}`)
 //   );
 // }

  // future: {
  //   unstable_optimizeDeps: true,
  //   unstable_splitRouteModules: true,
  //   unstable_viteEnvironmentApi: true
  // }
} satisfies Config;
