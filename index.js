// IMPORTS
import * as characters from "./characters.js";

// DARK/LIGHT MODE TOGGLE
let lightMode = false;

const toggleMode = () => {
  const targetString = lightMode ? "--light" : "--dark"; // Determines the class substring needing replaced
  const replacementString = !lightMode ? "--light" : "--dark"; // Determines the replacement class substring
  // Selects all elements that include the target class substring
  const targetElements = document.querySelectorAll(
    `[class*="${targetString}"]`
  );
  // Loops through the selected elements
  targetElements.forEach((element) => {
    const currentClassName = element.className; // Gets the current class name for the matching elements
    // Creates a new class name by replacing the matching substring
    const newClassName = currentClassName.replace(
      new RegExp(targetString, "g"),
      replacementString
    );

    // Updates the element's className attribute
    element.className = newClassName;
  });
  updateMode();
};

// Function that sets the current state of the mode
const updateMode = () => {
  lightMode ? (lightMode = false) : (lightMode = true);
};

// Adds an event listener for mode toggle button
document.querySelector("#mode-toggle").addEventListener("click", () => {
  toggleMode();
});

// HANDLING THE PASSWORD OPTIONS

// Global variables tracking the password options
let useSymbols = document.querySelector("#symbols-toggle").checked;
let useNumbers = document.querySelector("#numbers-toggle").checked;

// Function that updates the state of the password options
const updatePasswordOptions = () => {
  useSymbols = document.querySelector("#symbols-toggle").checked;
  useNumbers = document.querySelector("#numbers-toggle").checked;
};

// Event listeners for the symbol/number toggle buttons
document.querySelector("#symbols-toggle").addEventListener("click", () => {
  updatePasswordOptions();
});
document.querySelector("#numbers-toggle").addEventListener("click", () => {
  updatePasswordOptions();
});

// Function that sets the password character options depending on the toggle switch selections
const setPasswordCharacters = () => {
  // Initial setup of password character options
  let passwordCharacters = [];
  // Pushes all the alpha characters to the array
  characters.alphaLowercase.forEach((letter) =>
    passwordCharacters.push(letter)
  );
  characters.alphaUppercase.forEach((letter) =>
    passwordCharacters.push(letter)
  );
  // Pushes the selected optional characters to the array
  if (useSymbols && useNumbers) {
    characters.symbols.forEach((symbol) => passwordCharacters.push(symbol));
    characters.numbers.forEach((number) => passwordCharacters.push(number));
  } else if (useSymbols && !useNumbers) {
    symbols.forEach((symbol) => passwordCharacters.push(symbol));
  } else if (!useSymbols && useNumbers) {
    numbers.forEach((number) => passwordCharacters.push(number));
  }
  generatePasswords(passwordCharacters);
};

// GENERATING THE PASSWORDS
let password1;
let password2;

// Function that generates 2 random passwords

const generatePasswords = (arr) => {
  const passwordLength = document.querySelector("#password-length").value;
  const password1 = [];
  const password2 = [];
  const passwords = [password1, password2];
  passwords.forEach((password) => {
    for (let i = 0; i < passwordLength; i++) {
      let randomIndex = Math.floor(Math.random() * arr.length);
      password.push(arr[randomIndex]);
    }
  });
  resetBtnStyling();
  renderPasswords(passwords);
};

// RENDERING THE PASSWORDS

// Function that renders the passwords
const renderPasswords = (arr) => {
  // Adds a new copy icon
  const copyIcon = characters.copyIcon;
  password1 = arr[0].join("");
  password2 = arr[1].join("");
  document.querySelector("#password-1").textContent = password1;
  document.querySelector("#password-2").textContent = password2;
  document.querySelector("#password-1").innerHTML += copyIcon;
  document.querySelector("#password-2").innerHTML += copyIcon;
};

// Adds event listeners for generate btn and enter key on length of password field
document.querySelector("#generate-btn").addEventListener("click", () => {
  setPasswordCharacters();
});
// Adds ability to generate passwords when the user presses the "Enter" key
document.querySelector("#password-length").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    setPasswordCharacters();
  }
});

// COPY ON CLICK FEATURE

// Copies clicked password to clipboard
const copyOnClick = (btn) => {
  const textToCopy = btn.textContent;
  navigator.clipboard.writeText(textToCopy);
  showCopied(btn);
};

// Adds styling to clicked password button
const showCopied = (clickedBtn) => {
  if (clickedBtn.id === "password-1") {
  }
  clickedBtn.classList.add("password-btn--copied");
  clickedBtn.textContent = "Copied";
  clickedBtn.disabled = true;
};

// Set's password btns to default styling
const resetBtnStyling = () => {
  document.querySelectorAll(".password-btn").forEach((btn) => {
    btn.classList.remove("password-btn--copied");
    btn.disabled = false;
  });
};

// Adds event listeners for the password buttons
document.querySelectorAll(".password-btn").forEach((btn) => {
  btn.addEventListener("click", () => {
    resetBtnStyling();
    copyOnClick(btn);
  });
});
