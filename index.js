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

let useSymbols = document.querySelector("#symbolsToggleSwitch").checked;
let useNumbers = document.querySelector("#numbersToggleSwitch").checked;

const updatePasswordOptions = () => {
  useSymbols = document.querySelector("#symbolsToggleSwitch").checked;
  useNumbers = document.querySelector("#numbersToggleSwitch").checked;
};

document.querySelector("#symbolsToggleSwitch").addEventListener("click", () => {
  updatePasswordOptions();
});

document.querySelector("#numbersToggleSwitch").addEventListener("click", () => {
  updatePasswordOptions();
});

// Sets password character options depending on toggle switch selections
const setPasswordCharacters = () => {
  let passwordCharacters = [];
  alphaLowercase.forEach((letter) => passwordCharacters.push(letter));
  alphaUppercase.forEach((letter) => passwordCharacters.push(letter));
  if (useSymbols && useNumbers) {
    symbols.forEach((symbol) => passwordCharacters.push(symbol));
    numbers.forEach((number) => passwordCharacters.push(number));
  } else if (useSymbols && !useNumbers) {
    symbols.forEach((symbol) => passwordCharacters.push(symbol));
  } else if (!useSymbols && useNumbers) {
    numbers.forEach((number) => passwordCharacters.push(number));
  }
  generatePasswords(passwordCharacters);
};

// Generates 2 random passwords
const generatePasswords = (arr) => {
  const passwordLength = document.querySelector("#passwordLength").value;
  const password1 = [];
  const password2 = [];
  const passwords = [password1, password2];
  passwords.forEach((password) => {
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      password.push(arr[randomIndex]);
    }
  });
  renderPasswords(passwords);
};

// Renders passwords
const renderPasswords = (arr) => {
  const copyIcon = `<svg width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5 9.5H11.5C10.3954 9.5 9.5 10.3954 9.5 11.5V20.5C9.5 21.6046 10.3954 22.5 11.5 22.5H20.5C21.6046 22.5 22.5 21.6046 22.5 20.5V11.5C22.5 10.3954 21.6046 9.5 20.5 9.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.5 15.5H4.5C3.96957 15.5 3.46086 15.2893 3.08579 14.9142C2.71071 14.5391 2.5 14.0304 2.5 13.5V4.5C2.5 3.96957 2.71071 3.46086 3.08579 3.08579C3.46086 2.71071 3.96957 2.5 4.5 2.5H13.5C14.0304 2.5 14.5391 2.71071 14.9142 3.08579C15.2893 3.46086 15.5 3.96957 15.5 4.5V5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`;
  document.querySelector("#password1").textContent = arr[0].join("");
  document.querySelector("#password2").textContent = arr[1].join("");
  document.querySelector("#password1").innerHTML += copyIcon;
  document.querySelector("#password2").innerHTML += copyIcon;
};

document.querySelector("#generate-btn").addEventListener("click", () => {
  setPasswordCharacters();
});

// Adds ability to generate passwords when the user presses the "Enter" key
document.querySelector("#passwordLength").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    setPasswordCharacters();
  }
});

// Adds ability to copy-on-click
const copyOnClick = () => {
  const copyBtns = document.querySelectorAll(".password-btn");
  copyBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const textToCopy = btn.textContent;
      navigator.clipboard.writeText(textToCopy);
    });
  });
};

document.addEventListener("click", copyOnClick);
