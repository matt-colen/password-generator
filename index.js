// Dark/Light Mode Switch

let lightMode = false;

// Function to toggle the modes
const toggleMode = () => {
  // This string will be used to find all DOM elements that include the string in their className
  const targetString = lightMode ? "--light" : "--dark";
  // This string will be used to replace the targetString in the classNames of all matching elements
  const replacementString = !lightMode ? "--light" : "--dark";
  // Selects all elements with classNames containing the target string
  const targetElements = document.querySelectorAll(
    `[class*="${targetString}"]`
  );

  // Loops through the selected elements
  targetElements.forEach((element) => {
    // Gets the current class name for the element
    const currentClassName = element.className;
    // Creates a new class name by replacing the matching portion
    const newClassName = currentClassName.replace(
      new RegExp(targetString, "g"),
      replacementString
    );

    // Updates the element's className attribute
    element.className = newClassName;
  });
  updateMode();
};

// Function that sets the current mode
const updateMode = () => {
  lightMode ? (lightMode = false) : (lightMode = true);
};

// Adds event listener for mode toggle button
document.querySelector("#modeToggleSwitch").addEventListener("click", () => {
  toggleMode();
});

// Random Password Generator

const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

const alphaUppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

const alphaLowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];

const symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  ",",
  "|",
  ":",
  ";",
  "<",
  ">",
  ".",
  "?",
  "/",
];

const generatePasswords = () => {};
