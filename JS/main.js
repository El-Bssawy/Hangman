// Variables
let gameName = "Hangman Game";
let link = document.querySelector("h1 a");
let footerText = document.querySelector("footer p");

link.setAttribute("href", "/");
link.textContent = gameName;
footerText.innerHTML = `The ${gameName} Created With Love By El-Bssawy &copy; ${new Date().getFullYear()}`;
