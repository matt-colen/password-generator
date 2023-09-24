// IMPORTS
import * as characters from "./characters.js";

// DARK/LIGHT MODE TOGGLE
let lightMode = false;

// Function to toggle light/dark mode
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

// Function that updates the mode's state
const updateMode = () => {
  lightMode ? (lightMode = false) : (lightMode = true);
};

// Adds an event listener for mode toggle button
document.querySelector("#mode-toggle").addEventListener("click", () => {
  toggleMode();
});

// HANDLING THE PASSWORD OPTIONS
let passwordsGenerated = false;

// Global variables tracking the password options
let useSymbols = true;
let useNumbers = true;

// Function that updates the state of the password options
const updatePasswordOptions = (e) => {
  e.target.id === "symbols-toggle"
    ? (useSymbols = !useSymbols)
    : (useNumbers = !useNumbers);
};

// Event listeners for the symbol/number toggle buttons
document.querySelectorAll(".toggle--options").forEach((elem) => {
  elem.addEventListener("click", (e) => {
    updatePasswordOptions(e);
  });
});

// Function that sets the password character options depending on the toggle switch selections
const setPasswordCharacters = () => {
  // Initial setup of password character options
  const passwordCharacters = [];
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
    characters.symbols.forEach((symbol) => passwordCharacters.push(symbol));
  } else if (!useSymbols && useNumbers) {
    characters.numbers.forEach((number) => passwordCharacters.push(number));
  }
  generatePasswords(passwordCharacters);
};

// GENERATING THE PASSWORDS
let password1;
let password2;

// Function that generates 2 random passwords
const generatePasswords = (arr) => {
  const passwordLength = document.querySelector("#password-length").value; // Sets desired password length
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
  const password1El = document.querySelector("#password-1");
  const password2El = document.querySelector("#password-2");
  // Updating global variable to current pw values
  password1 = arr[0].join("");
  password2 = arr[1].join("");
  // Updating the text content for the current pw values
  password1El.textContent = password1;
  password2El.textContent = password2;
  // Adds the copy icon to the new passwords
  password1El.innerHTML += copyIcon;
  password2El.innerHTML += copyIcon;
  // Updates state of password generation
  passwordsGenerated = true;
};

// Adds event listener for the generate pw btn
document.querySelector("#generate-btn").addEventListener("click", () => {
  setPasswordCharacters();
});
// Adds event listener for the "Enter" key on the num input field
document.querySelector("#password-length").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    setPasswordCharacters();
  }
});

// COPY ON CLICK FEATURE

// Copies clicked password to the clipboard
const copyOnClick = (btn) => {
  if (passwordsGenerated) {
    const textToCopy = btn.textContent;
    navigator.clipboard.writeText(textToCopy);
    showCopied(btn);
  }
};

// Adds styling to clicked password button
const showCopied = (clickedBtn) => {
  clickedBtn.classList.add("password-btn--copied");
  clickedBtn.id === "password-1"
    ? (password1 = clickedBtn.textContent)
    : (password2 = clickedBtn.textContent);
  clickedBtn.textContent = "Copied";
  clickedBtn.disabled = true;
  restoreOtherPassword(clickedBtn);
};

const restoreOtherPassword = (clickedBtn) => {
  const copyIcon = characters.copyIcon;
  if (clickedBtn.id === "password-1") {
    const password2El = document.querySelector("#password-2");
    password2El.textContent = password2;
    password2El.innerHTML += copyIcon;
  } else {
    const password1El = document.querySelector("#password-1");
    password1El.textContent = password1;
    password1El.innerHTML += copyIcon;
  }
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
