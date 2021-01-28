const btnsContainerEl = document.querySelector("#btns");
const btns = [
  { text: "1", type: "num" },
  { text: "2", type: "num" },
  { text: "3", type: "num" },
  { text: "C", type: "clear" },
  { text: "4", type: "num" },
  { text: "5", type: "num" },
  { text: "6", type: "num" },
  { text: "/", type: "opreation" },
  { text: "7", type: "num" },
  { text: "8", type: "num" },
  { text: "9", type: "num" },
  { text: "-", type: "opreation" },
  { text: ".", type: "dot" },
  { text: "0", type: "num" },
  { text: "+", type: "opreation" },
  { text: "*", type: "opreation" },
  { text: "=", type: "equal" },
];

for (const btn of btns) {
  btnsContainerEl.insertAdjacentHTML(
    "beforeend",
    `
    <button data-type=${btn.type} class='ripple'>${btn.text}</button>
  `
  );
}

class Calc {
  constructor(screens) {
    this.upperScreenText = "";
    this.lowerScreenText = "0,00";
    this.opretionSign = "";
    this.screens = screens;
  }
  typing(value) {
    if (this.lowerScreenText === "0,00") this.lowerScreenText = "";
    this.lowerScreenText += value;
    this.updteScreens();
  }
  clear() {
    this.upperScreenText = "";
    this.lowerScreenText = "0,00";
    this.opretionSign = "";
    this.updteScreens();
  }
  actions(btnText) {
    this.upperScreenText = this.lowerScreenText + btnText;
    this.lowerScreenText = "";
    this.opretionSign = btnText;
    this.updteScreens();
  }
  compute() {
    const prevNumber    = parseFloat(this.upperScreenText);
    const currentNumber = parseFloat(this.lowerScreenText);
    switch (this.opretionSign) {
      case "+":
        this.lowerScreenText = (prevNumber + currentNumber).toString()
        break;
      case "*":
        this.lowerScreenText = (prevNumber * currentNumber).toString()
        break;
      case "-":
        this.lowerScreenText = (prevNumber - currentNumber).toString()
        break;
      case "/":
        this.lowerScreenText = (prevNumber / currentNumber).toString()
        break;
      default:
        break;
    }
    this.upperScreenText = "";
    this.opretionSign = "";
    this.updteScreens();
  }
  updteScreens() {
    this.screens[0].innerHTML = this.upperScreenText;
    this.screens[1].innerHTML = this.lowerScreenText;
  }
}

// btns
const numBtnsEls = [
  ...document.querySelectorAll("[data-type='num'],[data-type='dot']"),
];
const opreationBtnsEls = [
  ...document.querySelectorAll("[data-type='opreation']"),
];
const clearBtnEl = document.querySelector("[data-type='clear']");
const equalBtnEl = document.querySelector("[data-type='equal']");

// screens and calc object
const screens = document.querySelectorAll(".screen div");
const calc = new Calc(screens);

numBtnsEls.forEach((btn) => {
  btn.addEventListener("click", (_) => {
    // prevent two dots
    if (calc.lowerScreenText.includes(".") && btn.textContent === ".") return;
    // prevent start with dot
    if (calc.lowerScreenText === "0,00" && btn.textContent === ".") return;
    calc.typing(btn.textContent);
  });
});

opreationBtnsEls.forEach((btn) => {
  btn.addEventListener("click", (_) => {
    // prevent multi opretion
    if (calc.opretionSign) return;
    console.log(calc.lowerScreenText);
    if (calc.lowerScreenText.includes(",")) return;
    calc.actions(btn.textContent);
  });
});

clearBtnEl.addEventListener("click", (_) => {
  calc.clear();
});

equalBtnEl.addEventListener("click", (_) => {
  // stop compute case one of two screens text is empty
  if (!calc.lowerScreenText || !calc.lowerScreenText) return;
  calc.compute();
});
