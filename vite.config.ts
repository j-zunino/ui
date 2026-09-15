import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { TanStackRouterVite } from "@tanstack/router-plugin/vite";

const config = defineConfig({
    resolve: { tsconfigPaths: true },
    plugins: [
        TanStackRouterVite({ target: "react", autoCodeSplitting: true }),
        tailwindcss(),
        viteReact(),
    ],
});

export default config;
