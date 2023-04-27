const imagemin = require("imagemin"),
  imageminWebp = require("imagemin-webp"),
  imageminJpegtran = require("imagemin-jpegtran");
const imageminPngquant = require("imagemin-pngquant");

// import imagemin from "imagemin";
// import imageminWebp from "imagemin-webp";
// import imageminJpegtran from "imagemin-jpegtran";
const fs = require('fs');

const path = require("path");
// 待压缩的图片所在的文件夹
const sourcePath = path.resolve("./out/pic");

// 压缩后的图片的输出路径
const targetPath = path.resolve("./images");

/**
 * 读取文件夹下的所有图片列表
 * @param {Function} cb
 */
const getImagesList = (cb) => {
  fs.readdir(sourcePath, (err, files) => {
    if (!err) {
      return cb(files.map((name) => path.join(sourcePath, name)));
    }

    console.log(err);
  });
};

/**
 * 压缩图片
 * @param {Array} files
 */
const compress = async (files) => {
  return await imagemin(files, {
    destination: targetPath,
    plugins: [
      imageminJpegtran(),
    //   imageminPngquant({
    //     quality: [0.2, 0.2],
    //   }),
      imageminWebp({
        quality: 10,
      }),
    ],
  });
};

const run = () => {
  getImagesList(async (files) => {
    for (let index = 0; index < files.length; index++) {
      try {
        console.log(`${index + 1}/${files.length}`);

        // 图片一张一张处理，降低处理失败的概率。
        await compress([files[index]]);
      } catch (error) {
        console.log(error);
      }
    }
  });
};

run();
/** 以上代码是copy的，忘了出处。sry */
