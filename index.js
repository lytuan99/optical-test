const K = 0.1;

const opticians = [
  {
    left: "1.0",
    right: "6/60",
    // fontSize: "140px",
  },
  {
    left: "0.9",
    right: "6/48",
    // fontSize: "112px",
  },
  {
    left: "0.8",
    right: "6/38",
    // fontSize: "88.5px",
  },
  {
    left: "0.7",
    right: "6/30",
    // fontSize: "70px",
  },
  {
    left: "0.6",
    right: "6/24",
    // fontSize: "56px",
  },
  {
    left: "0.5",
    right: "6/19",
    // fontSize: "44px",
  },
  {
    left: "0.4",
    right: "6/15",
  },
  {
    left: "0.3",
    right: "6/12",
  },
  {
    left: "0.2",
    right: "6/9.5",
  },
  {
    left: "0.1",
    right: "6/7.5",
  },
  {
    left: "0.0",
    right: "6/6",
  },
  {
    left: "-0.1",
    right: "6/5",
  },
];

let characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

let screens = [];

const DEFAULT_TEXT_LENGTH = 5;
const DEFAULT_MAX_FONT_SIZE = 140;
const PAGE_INPUT = "page-input";
const FONT_SIZE_MAX_INPUT = "font-size-max-input";
const CHARACTERS_INPUT = "characters-input";

const FONT_SIZE_STANDARD_KEY = "FONT_SIZE_STANDARD_KEY";
const CHARACTERS_KEY = "CHARACTERS_KEY";

let currentPage = 1;

const getScreens = (maxSize) => {
  let tempScreens = [];

  let tempScreen = [];
  opticians.forEach((op, index) => {
    if (index !== 0 && index % 3 === 0) {
      tempScreens.push(tempScreen);
      tempScreen = [op];
      return;
    }
    tempScreen.push(op);
  });
  tempScreens.push(tempScreen);

  // set pages
  tempScreens = [...tempScreens, ...opticians.map((op) => [op])];

  const result = [];

  tempScreens.forEach((screen) => {
    const s = screen.map((s) => {
      const [numerator, denominator] = s.right.split("/");
      const fontSize =
        ((maxSize * Number(denominator)) / Number(numerator)) * K;
      return {
        ...s,
        fontSize: `${fontSize}px`,
      };
    });
    result.push(s);
  });

  return result;
};

const insertSpaceToText = (text) => {
  if (!text) return;

  let result = "";
  text.split("").forEach((c) => {
    result = result + " " + c;
  });

  return result;
};

const randomText = (length = DEFAULT_TEXT_LENGTH) => {
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return insertSpaceToText(result);
};

const renderText = (page) => {
  if (page < 1 || page > screens.length) return;
  const actualPage = page - 1;
  const currScreen = screens[actualPage];

  const contentListID = document.getElementById("content-wrapper");

  let contentList = "";
  currScreen.forEach((item) => {
    const text = randomText();
    contentList += `
        <div class="line">
          <span>${item.left}</span>
          <p class="text" style="font-size: ${item.fontSize}">${text}</p>
          <span>${item.right}</span>
        </div>
      `;
  });

  contentListID.innerHTML = contentList;
};

const inputDom = document.getElementById(PAGE_INPUT);

function main() {
  let standardFontSize = localStorage.getItem(FONT_SIZE_STANDARD_KEY);
  if (!standardFontSize) standardFontSize = DEFAULT_MAX_FONT_SIZE;
  standardFontSize = Number(standardFontSize);
  document.getElementById(FONT_SIZE_MAX_INPUT).value = standardFontSize;

  let localCharacters = localStorage.getItem(CHARACTERS_KEY);
  if (localCharacters) characters = localCharacters;
  document.getElementById(CHARACTERS_INPUT).value = characters;

  screens = getScreens(standardFontSize);
  renderText(currentPage);
}

/**
 * ******* M A I N **********
 */

main();

/**
 * ******* M A I N **********
 */

const handleClickPrevBtn = () => {
  if (currentPage - 1 < 1) currentPage = screens.length;
  else currentPage--;

  inputDom.value = currentPage;
  renderText(currentPage);
};

const handleClickNextBtn = () => {
  if (currentPage + 1 > screens.length) currentPage = 1;
  else currentPage++;

  inputDom.value = currentPage;
  renderText(currentPage);
};

const handleClickRefreshBtn = () => {
  renderText(currentPage);
};

const handleSaveNewStandardFontSize = () => {
  const fontSize = document.getElementById(FONT_SIZE_MAX_INPUT).value;
  localStorage.setItem(FONT_SIZE_STANDARD_KEY, fontSize);

  screens = getScreens(Number(fontSize));
  renderText(currentPage);
};

const handleSaveNewCharacters = () => {
  const newCharacters = document.getElementById(CHARACTERS_INPUT).value;
  localStorage.setItem(CHARACTERS_KEY, newCharacters);
  characters = newCharacters;

  renderText(currentPage);
}

document
  .getElementById("prev-btn")
  .addEventListener("click", handleClickPrevBtn);

document
  .getElementById("next-btn")
  .addEventListener("click", handleClickNextBtn);

document
  .getElementById("refresh-btn")
  .addEventListener("click", handleClickRefreshBtn);

document
  .getElementById("save-standard-btn")
  .addEventListener("click", handleSaveNewStandardFontSize);

document
  .getElementById("save-characters-btn")
  .addEventListener("click", handleSaveNewCharacters);
