const themes = [
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

export default function (i = 0) {
  i = i % themes.length;
  const theme = themes[i];
  Object.keys(theme.scheme).forEach(name => {
    const value = theme.scheme[name];
    document.documentElement.style.setProperty(name, value);
  });
};
