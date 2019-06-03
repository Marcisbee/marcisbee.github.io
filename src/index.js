
document.querySelectorAll('.marcisbee-bg-layer .d').forEach(animateDiv);

function makeNewPosition($container) {
  $container = ($container || window);
  var h = 25;
  var w = 25;

  var nh = Math.floor(Math.random() * h);
  var nw = Math.floor(Math.random() * w);

  return [nh, nw];
}

function setStyle(el, type, value) {
  el.style[type] = value;
  el.style['-o-' + type] = value;
  el.style['-moz-' + type] = value;
  el.style['-webkit-' + type] = value;
}

window.addEventListener('scroll', function () {
  var scrollTop = document.body.scrollTop;
  if (1400 >= scrollTop) {
    var pos = (scrollTop / 8);
    document.querySelectorAll('.marcisbee-bg-layer.layer-1').forEach((el) => {
      setStyle(el, 'transform', 'translate3d(0px, ' + pos + 'px, 0px)');
    });
    pos = (scrollTop / 8) * 1.5;
    document.querySelectorAll('.marcisbee-bg-layer.layer-2').forEach((el) => {
      setStyle(el, 'transform', 'translate3d(0px, ' + pos + 'px, 0px)');
    });
    pos = (scrollTop / 8) * 2;
    document.querySelectorAll('.marcisbee-bg-layer.layer-3').forEach((el) => {
      setStyle(el, 'transform', 'translate3d(0px, ' + pos + 'px, 0px)');
    });
    pos = (scrollTop / 8) * 2.5;
    document.querySelectorAll('.marcisbee-bg-layer.layer-4').forEach((el) => {
      setStyle(el, 'transform', 'translate3d(0px, ' + pos + 'px, 0px)');
    });
    pos = (scrollTop / 8) * 3;
    document.querySelectorAll('.marcisbee-bg-layer.layer-5').forEach((el) => {
      setStyle(el, 'transform', 'translate3d(0px, ' + pos + 'px, 0px)');
    });
  }
}, { passive: true });

function animateDiv($target) {
  var newq = makeNewPosition($target.parent);
  var v = getTransform($target);
  var speed = calcSpeed([v[1], v[0]], newq) / 1000;

  if ($target.classList.contains('virgin')) {
    speed = 0;
    setTimeout(function () {
      $target.classList.remove('virgin');
      animateDiv($target);
    }, 1000);
  }

  setStyle($target, 'transition', "all " + speed + "s");
  setStyle($target, 'transform', "translate3d(" + newq[1] + "px, " + newq[0] + "px, 0px)");
};

function end() {
  animateDiv(this);
}

document.querySelectorAll('.d').forEach((el) => {
  el.addEventListener('transitionend', end);
  el.addEventListener('webkitTransitionEnd', end);
  el.addEventListener('oTransitionEnd', end);
  el.addEventListener('MSTransitionEnd', end);
});

function getTransform(el) {
  var results = el.style.transform.match(/matrix(?:(3d)\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))(?:, (\d+)), \d+\)|\(\d+(?:, \d+)*(?:, (\d+))(?:, (\d+))\))/)

  if (!results) return [0, 0, 0];
  if (results[1] == '3d') return results.slice(2, 5);

  results.push(0);
  return results.slice(5, 8);
}

function calcSpeed(prev, next) {
  var x = Math.abs(prev[1] - next[1]);
  var y = Math.abs(prev[0] - next[0]);

  var greatest = x > y ? x : y;

  var speedModifier = 0.001;

  var speed = Math.ceil(greatest / speedModifier);

  return speed;
}