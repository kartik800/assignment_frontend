document.addEventListener("DOMContentLoaded", () => {
  initializeBalls();
});

function initializeBalls() {
  const redSection = document.getElementById("balls-red");
  const blueSection = document.getElementById("balls-blue");
  const greenSection = document.getElementById("balls-green");

  for (let i = 0; i < 5; i++) {
    redSection.appendChild(createBall("red"));
    blueSection.appendChild(createBall("blue"));
    greenSection.appendChild(createBall("green"));
  }
}

function createBall(color) {
  const ball = document.createElement("div");
  ball.classList.add("ball", color);
  return ball;
}

let st = new Set();
function removeBalls() {
  let n = parseInt(document.getElementById("ball-count").value);
  if (isNaN(n) || n < 1 || n > 15) {
    alert("Please enter a valid number between 1 and 15");
    return;
  }

  if (15 - st.size < n) {
    alert("Not enough balls available");
    return;
  }

  let balls = document.getElementsByClassName("ball");
  while (n > 0) {
    let index = Math.floor(Math.random() * 15);
    if (st.has(index)) continue;
    else {
      if (balls[index].classList.contains("red"))
        balls[index].classList.toggle("adding");
      else if (balls[index].classList.contains("blue"))
        balls[index].classList.toggle("adding");
      else balls[index].classList.toggle("adding");
      --n;
      st.add(index);
    }
  }
  document.getElementById("ball-count").value = " ";
}
