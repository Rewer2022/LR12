$(document).ready(function () {
  const easyWords = [
    { word: "Always", translation: "завжди" },
    { word: "Sometimes", translation: "іноді" },
    { word: "Never", translation: "ніколи" },
    { word: "Often", translation: "часто" },
    { word: "Rarely", translation: "рідко" },
    { word: "Usually", translation: "зазвичай" },
    { word: "Quickly", translation: "швидко" },
    { word: "Slowly", translation: "повільно" },
    { word: "Happy", translation: "щасливий" },
    { word: "Sad", translation: "сумний" },
  ];

  const mediumWords = [
    { word: "Challenge", translation: "виклик" },
    { word: "Hope", translation: "надія" },
    { word: "Important", translation: "важливий" },
    { word: "Improve", translation: "покращувати" },
    { word: "Journey", translation: "подорож" },
    { word: "Discover", translation: "відкрити" },
    { word: "Practice", translation: "практика" },
    { word: "Future", translation: "майбутнє" },
    { word: "Control", translation: "контроль" },
    { word: "Freedom", translation: "свобода" },
    { word: "Success", translation: "успіх" },
    { word: "Knowledge", translation: "знання" },
    { word: "Curiosity", translation: "цікавість" },
    { word: "Decision", translation: "рішення" },
    { word: "Effort", translation: "зусилля" },
    { word: "Problem", translation: "проблема" },
    { word: "Solution", translation: "рішення" },
    { word: "Journey", translation: "подорож" },
    { word: "Purpose", translation: "мета" },
    { word: "Adventure", translation: "пригода" },
  ];

  const expertWords = [
    { word: "Accomplishment", translation: "досягнення" },
    { word: "Circumstance", translation: "обставина" },
    { word: "Consequence", translation: "наслідок" },
    { word: "Determination", translation: "рішучість" },
    { word: "Expectation", translation: "очікування" },
    { word: "Fulfillment", translation: "задоволення" },
    { word: "Acknowledgment", translation: "визнання" },
    { word: "Commitment", translation: "зобов'язання" },
    { word: "Resilience", translation: "стійкість" },
    { word: "Sustainability", translation: "сталий розвиток" },
    { word: "Achievement", translation: "досягнення" },
    { word: "Imagination", translation: "уява" },
    { word: "Interpretation", translation: "інтерпретація" },
    { word: "Representation", translation: "представлення" },
    { word: "Conceptualization", translation: "концептуалізація" },
    { word: "Implementation", translation: "впровадження" },
    { word: "Transformation", translation: "перетворення" },
    { word: "Revolutionary", translation: "революційний" },
    { word: "Philosophical", translation: "філософський" },
    { word: "Discrepancy", translation: "розбіжність" },
    { word: "Obligation", translation: "зобов'язання" },
    { word: "Persistence", translation: "наполегливість" },
    { word: "Ambiguity", translation: "двозначність" },
    { word: "Significance", translation: "значущість" },
    { word: "Application", translation: "застосування" },
    { word: "Consideration", translation: "розгляд" },
    { word: "Exploration", translation: "дослідження" },
    { word: "Quantification", translation: "кількісний аналіз" },
    { word: "Substantiation", translation: "обґрунтування" },
    { word: "Beguile", translation: "привабити" },
  ];

  let words = [];
  let shuffledWords = [];
  let currentIndex = 0;
  let correctAnswers = 0;
  let incorrectAnswers = 0;

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  function startGame() {
    const level = $("input[name='difficulty']:checked").val();
    if (level === "beginner") {
      words = [...easyWords];
    } else if (level === "intermediate") {
      words = [...mediumWords];
    } else {
      words = [...expertWords];
    }

    shuffledWords = shuffleArray(words);
    currentIndex = 0;
    correctAnswers = 0;
    incorrectAnswers = 0;

    $("#correct").text("");
    $("#incorrect").text("");
    $("#result-modal").hide();
    $("#step").text(`0/${words.length}`);
    showWord();
  }

  function showWord() {
    const currentWord = shuffledWords[currentIndex];
    $("#word").text(currentWord.word);
    $("#translation").val("");
    $("#step").text(`${currentIndex + 1}/${words.length}`);
  }

  function checkAnswer(event) {
    if (event.key === "Enter") {
      const input = $("#translation").val().trim().toLowerCase();
      const correct = shuffledWords[currentIndex].translation.toLowerCase();
      if (input === correct) {
        correctAnswers++;
        $("#correct").append("✔ ");
      } else {
        incorrectAnswers++;
        $("#incorrect").append("✘ ");
      }
      currentIndex++;
      if (currentIndex < shuffledWords.length) {
        showWord();
      } else {
        showResult();
      }
    }
  }

  function showResult() {
    const total = shuffledWords.length;
    const score = (correctAnswers / total) * 100;
    $("#result").text(`Ваш рівень знань: ${score.toFixed(2)}%`);
    $("#result-modal").fadeIn();
  }

  $("input[name='difficulty']").change(startGame);

  $("#restart").click(startGame);
  $(document).on("keydown", checkAnswer);

  startGame();
});
