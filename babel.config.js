module.exports = function (api) {
    api.cache(true);
    return {
        presets: [
            ["babel-preset-expo", { jsxImportSource: "nativewind" }],
            "nativewind/babel",
        ],
        plugins: [
            "react-native-reanimated/plugin",
            [
                "module-resolver",
                {
                    root: ["./"],
                    extensions: [
                        ".ios.js",
                        ".android.js",
                        ".js",
                        ".ts",
                        ".tsx",
                        ".json",
                    ],
                    alias: {
                        // Define your aliases here
                        "@components": "./src/components",
                        "@screens": "./src/screens",
                        "@utils": "./src/utils",
                        // Add more aliases as needed
                    },
                },
            ],
        ],
    };
};
