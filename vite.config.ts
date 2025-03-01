import { reactRouter } from '@react-router/dev/vite';
import path from 'path';
import { defineConfig } from 'vite';
import tsconfigPaths from 'vite-tsconfig-paths';
import { cloudflareDevProxy } from '@react-router/dev/vite/cloudflare';

export default defineConfig({
  plugins: [
    cloudflareDevProxy({
      getLoadContext({ context }) {
        return { cloudflare: context.cloudflare };
      }
    }),
    ,
    reactRouter(),
    tsconfigPaths()
  ],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, 'assets')
    }
  },
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern-compiler',
        additionalData: `@use "${path
          .join(process.cwd(), '_mantine')
          .replace(/\\/g, '/')}" as mantine;`
      }
    }
  },
  server: {
    open: true,
    port: 3000,
    allowedHosts: process.env?.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS
      ? [process.env.__VITE_ADDITIONAL_SERVER_ALLOWED_HOSTS]
      : ['localhost']
  }
});
