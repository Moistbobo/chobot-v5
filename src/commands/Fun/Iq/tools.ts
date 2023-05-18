import fs from 'fs';

import Jimp from 'jimp';

const images = {
  iqChart: 'https://i.imgur.com/UqvsPYQ.png',
  iqMark: 'https://i.imgur.com/OOjW16r.png',
};

const makeIQFolderIfNotExists = () => {
  if (!fs.existsSync('./iqTest')) {
    fs.mkdirSync('./iqTest');
  }
};

const generateIQImage = async (iq: number) => {
  console.log('[DEBUG]: generating iq image');
  const iqMark = await Jimp.read(images.iqMark);
  const iqChart = await Jimp.read(images.iqChart);

  return iqChart.composite(iqMark, iq - iqMark.getWidth() / 2, 5);
};

export default {
  makeIQFolderIfNotExists,
  generateIQImage,
};
