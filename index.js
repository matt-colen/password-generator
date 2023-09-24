// Toggles light/dark mode
const toggleMode = () => {
  const body = document.body;
  body.classList.toggle("dark-mode");
  body.classList.toggle("light-mode");
};

// Adds an event listener for mode toggle button
document.querySelector("#mode-toggle").addEventListener("click", () => {
  toggleMode();
});

// RANDOM PASSWORD GENERATOR

// Constants for elements and character sets
const toggleButtons = document.querySelectorAll(".toggle--options");
const passwordButtons = document.querySelectorAll(".password-btn");
const passwordLengthInput = document.querySelector("#password-length");
const generateButton = document.querySelector("#generate-btn");
const passwordContainers = [
  document.querySelector("#password-1"),
  document.querySelector("#password-2"),
];
const characters = {
  alphaLowercase: "abcdefghijklmnopqrstuvwxyz",
  alphaUppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  symbols: "!@#$%^&*()_+-=[]{}|;:'\"<>,.?/",
  numbers: "0123456789",
  copyIcon: `<svg class="click-disabled" width="25" height="25" viewBox="0 0 25 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M20.5 9.5H11.5C10.3954 9.5 9.5 10.3954 9.5 11.5V20.5C9.5 21.6046 10.3954 22.5 11.5 22.5H20.5C21.6046 22.5 22.5 21.6046 22.5 20.5V11.5C22.5 10.3954 21.6046 9.5 20.5 9.5Z" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M5.5 15.5H4.5C3.96957 15.5 3.46086 15.2893 3.08579 14.9142C2.71071 14.5391 2.5 14.0304 2.5 13.5V4.5C2.5 3.96957 2.71071 3.46086 3.08579 3.08579C3.46086 2.71071 3.96957 2.5 4.5 2.5H13.5C14.0304 2.5 14.5391 2.71071 14.9142 3.08579C15.2893 3.46086 15.5 3.96957 15.5 4.5V5.5" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
};

// Generates a random password
const generateRandomPassword = (length, allowedCharacters) => {
  let password = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * allowedCharacters.length);
    password += allowedCharacters[randomIndex];
  }

  return password;
};

// Sets the password characters based on user-selected options
const setPasswordCharacters = () => {
  const passwordLength = +passwordLengthInput.value;
  let useSymbols = document.querySelector("#symbols-toggle").checked;
  let useNumbers = document.querySelector("#numbers-toggle").checked;
  const allowedCharacters = [
    characters.alphaLowercase,
    characters.alphaUppercase,
  ];

  if (useSymbols) allowedCharacters.push(characters.symbols);
  if (useNumbers) allowedCharacters.push(characters.numbers);
  const passwords = passwordContainers.map(() =>
    generateRandomPassword(passwordLength, allowedCharacters.join(""))
  );
  renderPasswords(passwords);
};

// Renders passwords
const renderPasswords = (passwords) => {
  passwords.forEach((password, index) => {
    const container = passwordContainers[index];
    container.textContent = password;
    container.innerHTML += `<span class="copy-icon click-disabled">${characters.copyIcon}</span>`;
  });
  resetBtnStyling();
};

// Event listeners
generateButton.addEventListener("click", setPasswordCharacters);

passwordLengthInput.addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    setPasswordCharacters();
  }
});

// Event delegation for password buttons
document.body.addEventListener("click", (e) => {
  if (e.target.classList.contains("password-btn")) {
    copyOnClick(e.target);
  }
});

// Copies clicked password to the clipboard
const copyOnClick = (btn) => {
  if (btn.textContent) {
    const textToCopy = btn.textContent;
    navigator.clipboard.writeText(textToCopy);
    showCopied(btn);
  }
};

// Adds styling to clicked password button
const showCopied = (clickedBtn) => {
  clickedBtn.classList.add("password-btn--copied");
  clickedBtn.innerHTML += `<span class="copied">Copied</span>`;
  clickedBtn.disabled = true;
};

// Sets password buttons to default styling
const resetBtnStyling = () => {
  passwordButtons.forEach((btn) => {
    btn.classList.remove("password-btn--copied");
    btn.disabled = false;
  });
};
