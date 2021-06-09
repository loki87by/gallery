const albums = {
  day: [],
  evening: [],
  night: [],
  morning: [],
};

const basicAlbums = [];

Object.keys(albums).forEach((key) => {
  basicAlbums.push(key);
  for (let i = 1; i <= 20; i++) {
    let number;
    if (i < 10) {
      number = '0' + i;
    } else {
      number = i;
    }
    albums[key].push(
      `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${key}/${number}.jpg`,
    );
  }
});

const total = [];

const keys = Object.keys(albums);

for (let i = 0; i < keys.length; i++) {
  total.push(...albums[keys[i]]);
}

const FILTERS_DATA = [
  { name: 'blur', size: 'px', value: '0', min: 0, max: 10 },
  { name: 'invert', size: '%', value: '0', min: 0, max: 100 },
  { name: 'sepia', size: '%', value: '0', min: 0, max: 100 },
  { name: 'saturate', size: '%', value: '100', min: 0, max: 200 },
  { name: 'hue-rotate', size: 'deg', value: '0', min: 0, max: 360 },
  { name: 'brightness', size: '%', value: '100', min: 0, max: 200 },
  { name: 'contrast', size: '%', value: '100', min: 0, max: 200 },
  { name: 'grayscale', size: '%', value: '100', min: 0, max: 200 },
  { name: 'opacity', size: '%', value: '100', min: 0, max: 200 },
];

const urlRegex = /^(ftp|http|https):\/\/[^ "]+$/;

export { albums, total, basicAlbums, FILTERS_DATA, urlRegex };
