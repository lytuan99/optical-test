const SCREEN_TOTAL = 16;

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

const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

const DEFAULT_LENGTH = 5;

const PAGE_INPUT = "page-input";
const TEXT_0 = "text-0";
const TEXT_1 = "text-1";
const TEXT_2 = "text-2";

const randomText = (length = DEFAULT_LENGTH) => {
  const charactersLength = characters.length;
  let result = "";
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

const renderText = (page) => {
  if (page < 1 || page > SCREEN_TOTAL) return;
  const actualPage = page - 1;
  const currScreen = screens[actualPage];

  const text0 = document.getElementById(TEXT_0);
  const text1 = document.getElementById(TEXT_1);
  const text2 = document.getElementById(TEXT_2);

  const contentListID = document.getElementById("abc");

  let contentList = "";
    currScreen.forEach((item) => {
      contentList += `
        <div class="line">
          <span>1.0</span>
          <p id="text-0" class="text">s o h n v</p>
          <span>6/60</span>
        </div>
      `;
      // pass fontSize and text to screen
    });

    console.log(contentListID)

  contentListID.innerHTML = contentList;
};

renderText(1);

const handleClickPrevBtn = () => {
  console.log("hi prev btn");
};

const handleClickNextBtn = () => {
  console.log("hi next btn");
};

document
  .getElementById("prev-btn")
  .addEventListener("click", handleClickPrevBtn);

document
  .getElementById("next-btn")
  .addEventListener("click", handleClickNextBtn);
