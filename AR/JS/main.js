// Letters
const letters = "اأبتثجحخدذرزسشصضطظعغفقكلمنهةءؤئإآوىي";
// Get Array From Letters
let lettersArray = Array.from(letters);
lettersArray.sort();
// Select Letters Container
let lettersContainer = document.querySelector(".letters");

// Generate Letters
lettersArray.forEach((letter) => {
  // Create Span
  let span = document.createElement("span");
  // Create Letter Text Node
  let theLetter = document.createTextNode(letter);
  // Append the Letter To Span
  span.appendChild(theLetter);
  // Add Class On Span
  span.className = "letter-box";
  // Append Span To The Letters Container
  lettersContainer.appendChild(span);
});

// Object Of Words + Categories
const words = {
  دول: [
    "مصر",
    "السعودية",
    "الامارات",
    "المغرب",
    "الجزائر",
    "تونس",
    "ليبيا",
    "السودان",
    "فرنسا",
    "المانيا",
    "ايطاليا",
    "اسبانيا",
    "اليابان",
    "الصين",
    "الهند",
    "البرازيل",
    "كندا",
    "امريكا",
    "تركيا",
    "اليونان",
    "النرويج",
    "السويد",
    "الدنمارك",
  ],

  شخصيات: [
    "محمد صلاح",
    "نجيب محفوظ",
    "احمد زويل",
    "مجدي يعقوب",
    "عادل امام",
    "ام كلثوم",
    "طه حسين",
    "مصطفى محمود",
    "حسن البنا",
    "طلعت حرب",
    "سعد زغلول",
    "فاروق الازهر",
    "فاروق الباز",
  ],

  اشياء: [
    "كتاب",
    "قلم",
    "مكتب",
    "كرسي",
    "باب",
    "نافذة",
    "هاتف",
    "حاسب",
    "ساعة",
    "شنطة",
    "ملف",
    "ورق",
    "كوب",
    "طبق",
    "ملعقة",
    "سكين",
    "مفتاح",
    "قفل",
    "مصباح",
    "سلك",
    "بطارية",
    "شاشة",
    "كاميرا",
    "ماوس",
    "لوحة",
    "مروحة",
  ],

  طبيعة: [
    "شمس",
    "قمر",
    "بحر",
    "نهر",
    "جبل",
    "سماء",
    "ارض",
    "مطر",
    "ريح",
    "سحاب",
    "شجر",
    "ورد",
    "نخل",
    "رمل",
    "صخر",
    "وادي",
    "جزيرة",
    "محيط",
    "شلال",
    "بحيرة",
  ],

  مشاعر: [
    "حب",
    "فرح",
    "حزن",
    "امل",
    "خوف",
    "قلق",
    "راحة",
    "غضب",
    "دهشة",
    "فخر",
    "ندم",
    "ملل",
    "شغف",
    "طمأنينة",
    "توتر",
    "غيرة",
    "حماس",
    "ياس",
  ],

  افعال: [
    "كتب",
    "قرأ",
    "ذهب",
    "عاد",
    "اكل",
    "شرب",
    "لعب",
    "جري",
    "فكر",
    "حلم",
    "عمل",
    "صنع",
    "فتح",
    "اغلق",
    "وقف",
    "جلس",
    "نظر",
    "سمع",
    "تكلم",
    "ضحك",
  ],
};

// Get Random Property
let allKeys = Object.keys(words);
let randomPropNumber = Math.floor(Math.random() * allKeys.length);
let randomPropName = allKeys[randomPropNumber];
let randomPropValue = words[randomPropName];
let randomValueNumber = Math.floor(Math.random() * randomPropValue.length);
let randomValueValue = randomPropValue[randomValueNumber];

// Set Category
document.querySelector(".game-info .category span").innerHTML = randomPropName;

// Select Letters Guess Element
let lettersGuessContainer = document.querySelector(".letters-guess");
// Convert Chosen Word To Array
let lettersAndSapce = Array.from(randomValueValue);

// Create Spans Depened On Word
lettersAndSapce.forEach((letter) => {
  // Create Empty Span
  let emptySpan = document.createElement("span");
  // If Letter Is Space
  if (letter === " ") emptySpan.className = "with-space";
  // Append Spans To The Letters Guess Container
  lettersGuessContainer.appendChild(emptySpan);
});

// Select Guess Spans
let guessSpans = document.querySelectorAll(".letters-guess span");
// Set Wrong Attempts
let wrongAttempts = 0;
// Select The Draw Element
let theDraw = document.querySelector(".hangman-draw");

// Handle Clicking On Letters
document.addEventListener("click", (e) => {
  // Set The Chose Status
  let theStatus = false;
  if (e.target.className === "letter-box") {
    e.target.classList.add("clicked");
    // Get Clicked Letter
    let theClickedLetter = e.target.innerHTML.toLowerCase();
    // The Chosen Word
    let theChosenWord = Array.from(randomValueValue.toLowerCase());
    theChosenWord.forEach((wordLetter, wordIndex) => {
      // If The Clicked Letter Equal To One Of The Chosen Word Letter
      if (theClickedLetter === wordLetter) {
        // Set Status To Correct
        theStatus = true;
        // Loop On All Guess Spans
        guessSpans.forEach((span, spanIndex) => {
          if (wordIndex === spanIndex) {
            span.innerHTML = theClickedLetter;
          }
        });
      }
    });
    // Select Full Span
    let fullSpan = Array.from(document.querySelectorAll(".letters-guess span"));
    let emptySpans = fullSpan.filter(
      (span) =>
        span.textContent.trim() === "" &&
        !span.classList.contains("with-space"),
    );
    if (emptySpans.length === 0) {
      youWin();
      lettersContainer.classList.add("finished");
    }
    // If Letter Is Wrong
    if (theStatus !== true) {
      // Increase The Wrong Attemts
      wrongAttempts++;
      // Add Class Wrong On The Draw Element
      theDraw.classList.add(`wrong-${wrongAttempts}`);
      if (wrongAttempts === 8) {
        endGame();
        lettersContainer.classList.add("finished");
      }
    }
  }
});

// End Game Function
function endGame() {
  // Create Popup Div
  let div = document.createElement("div");
  // Create Text
  let divText = document.createTextNode(
    `Game Over, The Word Is ${randomValueValue}`,
  );
  // Create Other Word Button
  let otherWord = document.createElement("button");
  // Add Class To Button
  otherWord.className = "other";
  // Reload Function
  otherWord.addEventListener("click", () => window.location.reload());
  // Create Text To Other Word Button
  let otherWordText = document.createTextNode("Other Word");
  // Append Text To Other Word Button
  otherWord.appendChild(otherWordText);
  // Append Button to Div
  div.appendChild(otherWord);
  // Append Text To Div
  div.prepend(divText);
  // Add Class On Div
  div.className = "popup-lose";
  // Append Div To The Body
  document.body.appendChild(div);
}

// You Win Function
function youWin() {
  // Create Div
  let div = document.createElement("div");
  // Add Class To Div
  div.className = "popup-win";
  // Create Div Text
  let divText = document.createTextNode(
    `Congratz The Word Is ${randomValueValue}`,
  );
  // Create Other Word Button
  let otherWord = document.createElement("button");
  // Add Class To Button
  otherWord.className = "other";
  // Reload Function
  otherWord.addEventListener("click", () => window.location.reload());
  // Create Text To Other Word Button
  let otherWordText = document.createTextNode("Other Word");
  // Append Text To Other Word Button
  otherWord.appendChild(otherWordText);
  // Append Button to Div
  div.appendChild(otherWord); // Append Text To Div
  div.prepend(divText);
  // Append Div To Body
  document.body.appendChild(div);
}
