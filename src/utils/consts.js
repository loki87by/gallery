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
export { albums, total, basicAlbums };
