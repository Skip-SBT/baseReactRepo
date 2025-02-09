const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    mode: process.env.NODE_ENV || "development",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "bundle.[contenthash].js",
        clean: true,
        assetModuleFilename: "images/[hash][ext][query]",
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                use: "ts-loader",
            },
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env", "@babel/preset-react"],
                    },
                },
            },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"],
                include: [path.resolve(__dirname, "src"), path.resolve(__dirname, "node_modules")],
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"],
                include: path.resolve(__dirname, "src/styles"),
            },
            {
                test: /\.(jpg|jpeg|png|gif)$/i,
                type: "asset/resource",
                generator: {
                    filename: "images/[hash][ext][query]",
                },
                include: path.resolve(__dirname, "src/images"),
            },
            {
                test: /\.svg$/,
                use: ["@svgr/webpack"],
                include: path.resolve(__dirname, "src/images"),
            },
        ],
    },
    resolve: {
        extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", ".scss", ".css"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            inject: "body",
            hash: true,
        }),
    ],
    devServer: {
        static: {
            directory: path.join(__dirname, "dist"),
        },
        compress: true,
        port: 3000,
        hot: true,
        historyApiFallback: true,
    },
};
