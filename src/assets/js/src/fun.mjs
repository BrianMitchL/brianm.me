import confetti from 'canvas-confetti';
import '../../css/partials/fun.pcss';

let funEnabled = false;

export default function fun(e) {
  const reduceMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (reduceMotion) {
    alert(
      'Sorry, you have set to prefer reduced motion, fun mode is based on motion and color shifting.'
    );
  } else if (!funEnabled) {
    console.log(
      '%cFun Mode! 🥳',
      'display:inline-block;padding:20px;border-radius:50px;line-height:3.5;font-size:x-large;font-family:fantasy;background:linear-gradient(to right, red, orange , yellow, green, cyan, blue, violet);'
    );
    document.body.classList.add('fun');
    document.querySelectorAll('img.emoji').forEach(function (el) {
      el.setAttribute('src', '/assets/images/parrot.gif');
    });
    document
      .querySelectorAll('.emoji[role="img"], .icon')
      .forEach(function (el) {
        el.innerHTML =
          '<img height="20" width="20" style="margin-bottom:0;" src="/assets/images/parrot.gif" alt="party parrot" />';
      });
    if (typeof randomizeCssProperties === 'function') {
      setInterval(randomizeCssProperties, 1000);
    }
    funEnabled = true;
  }

  if (!reduceMotion) {
    console.log('🎉');
    const count = 150;
    const dx = window.innerWidth / 2 - e.clientX;
    const dy = e.clientY - window.innerHeight / 2;
    let theta = Math.atan2(dy, dx); // range (-PI, PI]
    theta *= 180 / Math.PI; // rads to degs, range (-180, 180]
    if (theta < 0) theta = 360 + theta; // range [0, 360)
    const defaults = {
      angle: theta,
      origin: {
        y: e.clientY / window.innerHeight,
        x: e.clientX / window.innerWidth,
      },
      useWorker: true,
    };

    function fire(particleRatio, opts) {
      confetti(
        Object.assign({}, defaults, opts, {
          particleCount: Math.floor(count * particleRatio),
        })
      );
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
    });
    fire(0.2, {
      spread: 60,
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  }
}
