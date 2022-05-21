const mapRacistLevel = (value: number) => {
  if (value > 951) {
    return 4;
  }
  if (value > 751) {
    return 3;
  }
  if (value > 501) {
    return 2;
  }
  if (value > 251) {
    return 1;
  }
  return 0;
};

const images = [
  [
    'https://i.imgur.com/ZzBdwlZ.png',
    'https://i.imgur.com/QV12TlA.png',
    'https://i.imgur.com/EzEHWkK.png',
  ], // 0 - 250
  [''], // 251 - 500,
  [''], // 501 - 750
  ['https://i.imgur.com/85gMRiT.jpg', 'https://i.imgur.com/WVVKqif.jpg'], // 751 - 950
  ['https://i.imgur.com/BN9BcV0.png'], // 951 - 1000
];

const description = [
  'and is now not racist at all! Wow!',
  'and is a little racist',
  'and is very racist',
  'and is KKK level racist',
  'and is a brandon.',
];

export default {
  mapRacistLevel,
  images,
  description,
};
