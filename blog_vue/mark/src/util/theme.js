const themes_phone = [
  {
    name: "light",
    scheme: {
      "--background-color-r": 229,
      "--background-color-g": 238,
      "--background-color-b": 244,
      "--text-color-r": 51,
      "--text-color-g": 59,
      "--text-color-b": 64
    }
  },
  {
    name: "dark",
    scheme: {
      "--background-color-r": 51,
      "--background-color-g": 59,
      "--background-color-b": 64,
      "--text-color-r": 229,
      "--text-color-g": 238,
      "--text-color-b": 244
    }
  }
];
const themes_pc = [
  {
    name: "light",
    scheme: {
      "--background-color-r": 59,
      "--background-color-g": 64,
      "--background-color-b": 67,
      "--primary-color-r": 49,
      "--primary-color-g": 54,
      "--primary-color-b": 57
    }
  },
  {
    name: "dark",
    scheme: {
      "--background-color-r": 255,
      "--background-color-g": 255,
      "--background-color-b": 255,
      "--primary-color-r": 230,
      "--primary-color-g": 234,
      "--primary-color-b": 237
    }
  }
];
function changeTheme(platform) {
  return function (i) {
    i = i % platform.length;
    const theme = platform[i];
    Object.keys(theme.scheme).forEach(name => {
      const value = theme.scheme[name];
      document.documentElement.style.setProperty(name, value);
    });
  }
}
export function changeThemePc(i = 0) {
  changeTheme(themes_pc)(i)
};

export function changeThemePhone(i = 0) {
  changeTheme(themes_phone)(i)
};
