import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import inject from '@rollup/plugin-inject';

// Check this: https://github.com/solana-labs/wallet-adapter/issues/35#issuecomment-955996509 https://github.com/solana-labs/buffer-layout-utils/issues/7
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), svgr()],
  resolve: {
    alias: {
      '@assets': path.resolve(__dirname, './src/assets'),
      '@components': path.resolve(__dirname, './src/components'),
      '@features': path.resolve(__dirname, './src/features'),
      '@layouts': path.resolve(__dirname, './src/layouts'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@slices': path.resolve(__dirname, './src/slices'),
    },
    
  },
  build: {
    rollupOptions: {
			plugins: [inject({ Buffer: ['buffer', 'Buffer'] })],
		},
  },
});
