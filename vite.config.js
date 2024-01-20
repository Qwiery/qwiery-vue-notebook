import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import * as path from "path";
import dts from "vite-plugin-dts";
// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        dts({
            rollupTypes: true,
            entryRoot: "src",
            tsconfigPath: path.join(__dirname, "tsconfig.json")
        })
    ],
    resolve: {
        alias: [
            {
                find: "~",
                replacement: path.resolve(__dirname, "./src")
            }
        ]
    },
    build: {
        minify: false,
        rollupOptions: {
            external: [
                "@vue/composition-api",
                "vue",
                "tailwindcss",
                "postcss",
                "autoprefixer",
                "vue3-apexcharts",
                "@bhplugin/vue3-datatable"

            ]
        },
        lib: {
            entry: path.resolve(__dirname, "src/install.ts"),
            fileName: "index",
            // es is for browser, cjs is for node
            formats: ["es"]
        }
    }
})
