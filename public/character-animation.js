let $element;

const imagePath = "/img/character";
const totalFrames = 3;
const totalLoops = 2;
const animationDuration = 1300;
const timePerFrame = animationDuration / totalFrames;

let timeWhenLastUpdate;
let timeFromLastUpdate;
let frameNumber = 1;
let completedLoops = 0;
let animationRequest;

function step(startTime) {
  if (!timeWhenLastUpdate) timeWhenLastUpdate = startTime;

  timeFromLastUpdate = startTime - timeWhenLastUpdate;

  if (timeFromLastUpdate > timePerFrame) {
    if (frameNumber > totalFrames) {
      completedLoops = completedLoops + 1;
      $element.attr("src", imagePath + "/frame1.png");

      if (completedLoops >= totalLoops) {
        animationRequest = undefined;
        return;
      }

      frameNumber = 2;
    } else {
      $element.attr(
        "src",
        imagePath + `/frame${frameNumber}.png`,
      );

      frameNumber = frameNumber + 1;
    }

    timeWhenLastUpdate = startTime;
  }

  animationRequest = requestAnimationFrame(step);
}

function playCharacterAnimation() {
  if (animationRequest) {
    cancelAnimationFrame(animationRequest);
  }

  $element.attr("src", imagePath + "/frame1.png");

  frameNumber = 2;
  completedLoops = 0;
  timeWhenLastUpdate = undefined;
  timeFromLastUpdate = undefined;

  animationRequest = requestAnimationFrame(step);
}

document.addEventListener("DOMContentLoaded", () => {
  $element = $(".ai-character");

  for (var i = 1; i < totalFrames + 1; i++) {
    $("body").append(
      `<div id="preload-image-${i}" style="background-image: url('${imagePath}/frame${i}.png');"></div>`,
    );
  }
});