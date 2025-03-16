const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const resetBtn = document.getElementById("resetBtn");

highScoresList.innerHTML = highScores.map( score => {
    return `<li class="high-score">${score.name} - ${score.score}</li>`;
    })
    .join(""); 

resetBtn.addEventListener("click", () => {
        localStorage.clear();
      });