const screen1 = [
  {
    left: "1.0",
    right: "6/60",
    fontSize: "140px",
  },
  {
    left: "0.9",
    right: "6/48",
    fontSize: "112px",
  },
  {
    left: "0.8",
    right: "6/38",
    fontSize: "88.5px",
  },
];

const screen2 = [
  {
    left: "0.7",
    right: "6/30",
    fontSize: "70px",
  },
  {
    left: "0.8",
    right: "6/24",
    fontSize: "56px",
  },
  {
    left: "0.5",
    right: "6/19",
    fontSize: "44px",
  },
];

const screens = [screen1, screen2];
const SCREEN_TOTAL = screens.length;

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const DEFAULT_LENGTH = 5;

const PAGE_INPUT = "page-input";
let currentPage = 1;

const insertSpaceToText = (text) => {
  if (!text) return;

  let result = "";
  text.split("").forEach((c) => {
    result = result + " " + c;
  });

  return result;
};

const randomText = (length = DEFAULT_LENGTH) => {
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return insertSpaceToText(result);
};

const renderText = (page) => {
  if (page < 1 || page > SCREEN_TOTAL) return;
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

renderText(currentPage);

const inputDom = document.getElementById(PAGE_INPUT);

const handleClickPrevBtn = () => {
  if (currentPage - 1 < 1) currentPage = SCREEN_TOTAL;
  else currentPage--;

  inputDom.value = currentPage;
  renderText(currentPage);
};

const handleClickNextBtn = () => {
  if (currentPage + 1 > SCREEN_TOTAL) currentPage = 1;
  else currentPage++;

  inputDom.value = currentPage;
  renderText(currentPage);
};

const handleClickRefreshBtn = () => {
  renderText(currentPage);
};

document
  .getElementById("prev-btn")
  .addEventListener("click", handleClickPrevBtn);

document
  .getElementById("next-btn")
  .addEventListener("click", handleClickNextBtn);

document
  .getElementById("refresh-btn")
  .addEventListener("click", handleClickRefreshBtn);
