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

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

const totalBalls = { red: 5, blue: 5, green: 5 };

// this function remove the balls from all the three sections
//by choosing random number of balls
function removeBalls() {
  const x = parseInt(document.getElementById("ball-count").value);

  if (totalBalls.red == 0 && totalBalls.blue == 0 && totalBalls.green == 0) {
    alert("You don't have balls to remove");
    return;
  }

  if (isNaN(x) || x < 1 || x > 15) {
    alert("Please enter a valid number between 1 and 15");
    return;
  }

  if (totalBalls.red + totalBalls.blue + totalBalls.green < x) {
    alert(`you don't have ${x} amount of balls to remove`);
    return;
  }

  let remaining = x;
  const sections = ["red", "blue", "green"];
  const removedBalls = { red: 0, blue: 0, green: 0 };

  while (remaining > 0) {
    const section = sections[getRandomInt(3)];
    console.log("section is", section);
    const sectionBalls = document.getElementById(`balls-${section}`).children;
    console.log("section ball is: ", sectionBalls);

    if (removedBalls[section] > 5) {
      removedBalls[section]--;
      remaining++;
      totalBalls[section]++;
      continue;
    }

    if (totalBalls[section] == 0) {
      continue;
    }

    if (sectionBalls.length > 0) {
      removedBalls[section]++;
      remaining--;
      totalBalls[section]--;
    }
  }
  console.log(removedBalls);
  console.log(totalBalls);
  updateSectionsAndBucket(removedBalls);
}

// update the sections and bucket
// this function update the balls in the bucket section it takes "removed balls"
// as an argument and update that balls in the bucket section
function updateSectionsAndBucket(removedBalls) {
  const bucket = document.getElementById("bucket-balls");

  Object.keys(removedBalls).forEach((color) => {
    const sectionBalls = document.getElementById(`balls-${color}`).children;
    for (let i = 0; i < removedBalls[color]; i++) {
      const ball = sectionBalls[i];
      ball.classList.add("removing");
      setTimeout(() => {
        ball.classList.remove("removing");
        ball.classList.add("adding");
        bucket.appendChild(ball);
        ball.classList.remove("adding");
      }, 500);
    }
  });

  document.getElementById("ball-count").value = " ";
}
