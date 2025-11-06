import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // tất cả request bắt đầu bằng /vnapp sẽ được proxy sang VNAppMob
      '/vnapp': {
        target: 'https://vapi.vnappmob.com', // giữ https
        changeOrigin: true,                   // giả Origin = target
        secure: true,                         // chấp nhận cert hợp lệ
        rewrite: (path) => path.replace(/^\/vnapp/, '/api/v2'), // /vnapp/... -> /api/v2/...
      },
    },
  },
})