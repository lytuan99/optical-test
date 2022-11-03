const {screens} = require("data.js");
const { SCREEN_TOTAL } = require("./data");
const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const DEFAULT_LENGTH = 5;

const PAGE_INPUT = "page-input";
const TEXT_0 = 'text-0';
const TEXT_1 = 'text-1';
const TEXT_2 = 'text-2';

const randomText = (length = DEFAULT_LENGTH) => {
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const renderText = (page) => {
  if (page <= 1 || page > SCREEN_TOTAL) return;
  const actualPage = page - 1;
  const currScreen = screens[actualPage];

  const text0 = document.getElementById(TEXT_0);
  const text1 = document.getElementById(TEXT_1);
  const text2 = document.getElementById(TEXT_2);

  if (currScreen.length === 3)
  currScreen.forEach(item => {
    // pass fontSize and text to screen
  })
};
