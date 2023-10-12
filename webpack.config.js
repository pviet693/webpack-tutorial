const path = require("path");
const TerserPlugin = require("terser-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

/**
 * Asset modules là new feature ở v5
 * asset/resource: dùng cho images, fonts, plaint text, sẽ bundle ra file mới trong dist
 * asset/inline: không bundle ra file mới, base 64 data URI
 * asset: nếu file bundle size nhỏ hơn 8kb thì dùng inline, lớn hơn thì dùng resource, có thể thay đổi số này
 * asset/source: dùng cho plain text
 * publicPath: "auto" - v5; "" - v4; chỉ cho webpack biết URL nào để load tất cả các file generated
 * 
 * Loaders cho phép import tất cả các file khác mà asset modules không hỗ trợ
 */

module.exports = {
    entry: "./src/index.js", // required
    output: { // required
        filename: "bundle.[contenthash].js",
        path: path.resolve(__dirname, "./dist"), // automatically create this folder if it doesn't exist
        publicPath: "./dist/"
    },
    mode: "none", // required
    module: {
        rules: [
            {
                test: /\.(ttf)$/,
                type: "asset/resource"
            },
            // {
            //     test: /\.(png|jpg)$/,
            //     type: "asset/resource"
            // }
            // {
            //     test: /\.(png|jpg)$/,
            //     type: "asset/inline"
            // }
            {
                test: /\.(png|jpg)$/,
                type: "asset",
                parser: {
                    dataUrlCondition: {
                        maxSize: 3 * 1024 * 1024 // nhỏ 3MB dùng inline, lớn hơn 3MB dùng resource
                    }
                }
            },
            {
                test: /\.(txt)$/,
                type: "asset/source"
            },
            {
                test: /\.css$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader"
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    // "style-loader",
                    MiniCssExtractPlugin.loader,
                    "css-loader",
                    "sass-loader" // chạy từ phải sang trái, dùng sass-loader để chuyển về css, css-loader sẽ lấy converted CSS và chuyển thành css in js, style-loader xác định vị trí sẽ chèn vào trong file html
                    // Sử dụng file-loader để lấy đường dẫn tới các file tài nguyên
                ]
            },
            {
                // npm i @babel/core babel-loader @babel/preset-env @babel/plugin-proposal-class-properties
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/env"], // preset ES6, 7, 8, 9, 10,... về ES5
                        plugins: ["@babel/plugin-proposal-class-properties"] // plugin này dùng để support cái class properties, nhưng mà standard ES đã support cái này r
                    }
                }
            }
        ]
    },
    plugins: [
        new TerserPlugin(), // minimize bundle size
        new MiniCssExtractPlugin({
            filename: "style.[contenthash].css", // tên của file css chứa các style được tách ra
            // thay thế style loader bằng MiniCssExtractPlugin.loader
        }), // tách css thành file riêng để giảm dung lượng của file js, load nhanh hơn, load song song js và css
        new CleanWebpackPlugin(), // xoá bỏ dist folder trước khi build
    ]
}