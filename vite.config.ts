import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import AutoImport from "unplugin-auto-import";

export default defineConfig(() => {
  return {
    plugins: [
      react(),
      AutoImport.vite({
        dts: true,
        imports: ["vitest"],
        // eslintrc: {
        //   enabled: true,
        // },
      }),
    ],
    test: {
      globals: true,
      environment: "jsdom",
      include: ["tests/**/*.{spec,test}.ts?(x)"],

      setupFiles: ["./tests/setup-tests.ts"],
    },

    resolve: {
      alias: [{ find: /^@\/(.+)/, replacement: "./src/" }],
    },
  };
});
