var translations = {
    "A":["Å", "À", "Á", "Â", "Ä", "Æ", "Ã", "Å", "Ā"],
    "a":["à", "á", "â", "ä", "æ", "ã", "å", "ā"],
    "B": ["ℬ", "Ɓ", "Ƀ"],
    "b": ["ƀ", "Ƃ", "Ƅ", "ƅ"],
    "C":["ℂ", "℃", "Ç", "Ć", "Č"],
    "c":["ç", "ć", "č"],
    "D": ["ⅅ", "Ď", "Đ"],
    "d": ["ⅆ", "ď", "đ", "Ƌ"],
    "E": ["ℇ", "℈", "ℨ", "È", "É", "Ê", "Ë", "Ē", "Ė", "Ę"],
    "e": ["℮", "è", "é", "ê", "ë", "ē", "ė", "ę"],
    "F": ["℉", "ℐ", "Ⅎ", "ℱ", "ⅎ"],
    "f": ["ƒ"],
    "G": ["⅁", "Ĝ", "Ğ", "Ġ", "Ģ"],
    "g": ["ℊ", "ĝ", "ğ", "ġ", "ģ"], 
    "H": ["ℋ", "ℍ", "Ĥ", "Ħ"],
    "h": ["ℌ", "ℎ", "ℏ", "ĥ", "ħ"],
    "I": ["ℑ", "Î", "Ï", "Í", "Ī", "Į", "Ì"],
    "i": ["ℹ", "î", "ï", "í", "ī", "į", "ì", "ⅈ"],
    "J": ["Ĵ", "ȷ", "Ɉ"],
    "j": ["ⅉ", "ĵ", "ǰ", "ȷ", "ϳ"],
    "K": ["K", "Ķ"],
    "k": ["ķ", "ĸ"],
    "L": ["ℒ", "℄", "⅃", "Ĺ"],
    "l": ["ℓ", "ĺ", "ł"],
    "M": ["ℳ", "Ϻ"],
    "m": ["ϻ"],
    "N": ["ℕ", "№", "ℵ", "Ñ", "Ń"],
    "n": ["ñ", "ń"],
    "O": ["Ω", "Ô", "Ö", "Ò", "Ó", "Œ", "Ø", "Ō", "Õ", "℺"],
    "o": ["ℴ", "ô", "ö", "ò", "ó", "œ", "ø", "ō", "õ"],
    "P": ["℗", "ℙ", "℘"],
    "p": ["Ƥ"],
    "Q": ["ℚ", "ɋ"],
    "q": ["ƪ", "Ɋ"],
    "R": ["ℛ", "ℜ", "ℝ", "℞", "℟"],
    "r": ["ŗ", "ř", "ŕ"],
    "S": ["Ś", "Š", "Ș"],
    "s": ["ß", "ś", "š", "ş","ș"],
    "T": ["Ţ", "Ť", "Ŧ"],
    "t": ["ţ", "ť", "ŧ"],
    "U": ["Û", "Ü", "Ù", "Ú", "Ū"],
    "u": ["û", "ü", "ù", "ú", "ū"],
    "V": ["℣", "Ʋ", "Ʌ"],
    "v": ["ν", "Ϫ"],
    "W": ["Ŵ", "Ɯ"],
    "w": ["ŵ", "ω", "ώ"],
    "X": ["Χ", "χ"],
    "x": ["×", "ж"],
    "Y": ["⅄", "Ŷ", "Ÿ", "Ɏ", "¥", "Ý"],
    "y": ["ŷ", "ɏ"],
    "Z": ["ℤ", "Ž", "Ź", "Ż"],
    "z": ["ź", "ż", "ž", "ɀ"]
};

window.addEventListener('load', addListener);


function recieveText(resultsArray) {
  alert(resultsArray);
}

function addListener() {
  let submit = document.getElementById("submit_button");
  let inp = document.getElementById("userInput");
  submit.addEventListener("click", async () => {
    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: processInput(document.getElementById("userInput")),
    }, () => chrome.runtime.lastError);
  });
}

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

function replace(char) {
  var options = translations[char];
  if (!options) {
    return char;
  }
  var i = getRandomInt(options.length);
  if (i == options.length) {
    return char;
  }
  return options[i]
}

async function processInput(input) {
  let val = input.value;
  var answer = [];
  for (var i = 0; i < val.length; i++) {
    answer.push(replace(val[i]));
  }
  answer = answer.join([""]);
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
   
  chrome.scripting.executeScript({
      target: { tabId: tab.id },
      function: showResult(document, answer),
    }, () => chrome.runtime.lastError);
}

function showResult(document, answer) {

  var paragraph = document.getElementById("result");

  paragraph.textContent = answer;

}








