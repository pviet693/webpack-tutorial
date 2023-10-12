## Overview

This repository was designed to help you with learning Webpack 5.

This repository is a supplementary resource to the course ["Webpack 5: The Complete Guide For Beginners"](https://www.udemy.com/course/webpack-from-beginner-to-advanced/?referralCode=6348A0DAFB30D091F7F3).

If you want to get a discount (up to 70%) on one of my other courses, feel free to send me an email at vp.online.courses@gmail.com, and I will try to get the best offer for you.

## Clone This Repository

1. ```git clone https://github.com/vp-online-courses/webpack-tutorial.git```
1. ```cd webpack-tutorial```

## Branches

This repository consists of many branches, which correspond to different lessons of the course.
Every lesson that requires code changes has 2 branches associated with it:

1. First branch points to the beginning of the lesson.
1. Second branch points to the end of the lesson.

Let's take as an example *"Minification Of The Resulting JavaScript Bundles"* lesson.
There are 2 branches associated with it:
1. *minification-of-the-resulting-javascript-bundles-begin*. You can check out this branch right before starting the lesson and repeat all the steps from the lesson while watching it.
2. *minification-of-the-resulting-javascript-bundles-end*. If you want to see how the application looks like at the end of this lesson, you can check out this branch.

Don't forget to run ```npm install``` when switching branches.
- ```git checkout minification-of-the-resulting-javascript-bundles-begin```
- ```npm install```

There are 2 special branches that you may want to check out:
- single-page-application. Contains webpack configuration for a Single Page Application.
- multiple-page-application. Contains webpack configuration for a Multiple Page Application.


#### Please don't use the master branch

There are separate git branches in this repository related to each Lesson. They are usually named the same as the Lessons are named. For example, if you are watching Lesson 33 "How To Generate Multiple HTML Files", there are 2 branches related to this lesson:

- how-to-generate-multiple-html-files-begin
- how-to-generate-multiple-html-files-end

There is a separate video explaining how to use Github repository in this course. 
In this video I talk about how to switch between branches and how to use the repository.

## Single Page Application

#### Run in Development Mode

1. ```git checkout single-page-application```
1. ```npm run dev```

Application will be served on the ```http://localhost:9000/```.

#### Run in Production Mode

1. ```git checkout single-page-application```
1. ```npm run build```
1. ```npm start```

Application will be served on the ```http://localhost:3000/```.

## Multiple Page Application

#### Run in Development Mode

1. ```git checkout multiple-page-application```
1. ```npm run dev```

Application will be served on the ```http://localhost:9000/```.
It will show an empty page.

In order to go to the "Hello World" page, go to ```http://localhost:9000/hello-world.html```.

In order to go to the "Kiwi" page, go to ```http://localhost:9000/kiwi.html```.


#### Run in Production Mode

1. ```git checkout multiple-page-application```
1. ```npm run build```
1. ```npm start```

Application will be served on the ```http://localhost:3000/```.
It will show an empty page.

In order to go to the "Hello World" page, go to ```http://localhost:3000/hello-world```.

In order to go to the "Kiwi" page, go to ```http://localhost:3000/kiwi```.

### Asset Modules cho phép bạn import images, fonts, plain text files
- Asset modules là new feature ở v5
    - asset/resource: dùng cho images, fonts, plaint text, sẽ bundle ra file mới trong dist
    - asset/inline: không bundle ra file mới, base 64 data URI
    - asset: nếu file bundle size nhỏ hơn 8kb thì dùng inline, lớn hơn thì dùng resource, có thể thay đổi số này
    - asset/source: dùng cho plain text
    - publicPath: "auto" - v5; "" - v4; chỉ cho webpack biết URL nào để load tất cả các file generated

### Loader cho phép bạn import tất cả các loại file khác mà asset modules không support
- chỉ cần loader và plugin chỉ cần trong quá trình build nên chỉ install ở devDependencies
npm i -D style-loader
npm i -D css-loader
npm i -D sass-loader sass

- "style-loader", "css-loader", "sass-loader": chạy từ phải sang trái, dùng sass-loader để chuyển về css, css-loader sẽ lấy converted CSS và chuyển thành css in js, style-loader xác định vị trí sẽ chèn vào trong file html
- "file-loader": để lấy đường dẫn tới các file tài nguyên

babel là js compiler
dùng babel để chuyển modern js về js support cho tất cả các trình duyệt

### Plugins là những JS library thêm vào để làm những việc mà loaders không thể làm
- TerserPlugin: dùng để minimize bundle size, khi dùng webpack 5 đã có sẵn

npm i -D mini-css-extract-plugin
- MiniCssExtractPlugin(), // tách css thành file riêng để giảm dung lượng của file js, load nhanh hơn, load song song js và css

- Browser Caching: trình duyệt sẽ lưu lại các file đã được tải, nó sẽ ghi nhớ filename, nên khi update code cần build 1 filename mới, chúng ta dùng md5 để hash, md5 sẽ hash dựa trên nội dung của file đã update để tạo ra filename mới, thêm [name] vào filename

- CleanWebpackPlugin: xoá bỏ dist folder trước khi build