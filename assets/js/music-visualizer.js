(function () {
  const btn     = document.getElementById('musicBtn');
  const vizEl   = document.getElementById('musicViz');
  const cvLeft  = document.getElementById('vizLeft');
  const cvRight = document.getElementById('vizRight');
  if (!btn || !vizEl) return;

  function accentRgb() {
    const v = getComputedStyle(document.documentElement)
      .getPropertyValue('--accent').trim();
    if (!v) return [225, 6, 0];
    const m = v.match(/\d+/g);
    return m && m.length >= 3 ? m.map(Number) : [225, 6, 0];
  }

  // ── Resize ───────────────────────────────────────────────────
  const FLAME_W = 72;
  const STEPS   = 55;

  function resizeCanvases() {
    const H = window.innerHeight;
    cvLeft.width  = FLAME_W; cvLeft.height  = H;
    cvRight.width = FLAME_W; cvRight.height = H;
  }
  resizeCanvases();
  window.addEventListener('resize', resizeCanvases);

  // ── Audio ────────────────────────────────────────────────────
  let actx, analyser, source, audioEl;
  let playing = false;
  let rafId   = null;

  function buildAudio() {
    actx = new (window.AudioContext || window.webkitAudioContext)();

    analyser = actx.createAnalyser();
    analyser.fftSize               = 128;
    analyser.smoothingTimeConstant = 0.55;
    analyser.connect(actx.destination);

    audioEl             = new Audio('assets/snd/Hellwalker.mp3');
    audioEl.loop        = true;
    audioEl.crossOrigin = 'anonymous';
    audioEl.volume      = slider ? slider.value / 100 : 0.8;

    source = actx.createMediaElementSource(audioEl);
    source.connect(analyser);
  }

  // ── Visualizer — organic flame ───────────────────────────────
  function buildFlamePoints(data, t) {
    const bins = data.length;
    const pts  = [];
    const H    = cvLeft.height;
    for (let i = 0; i <= STEPS; i++) {
      const y      = (i / STEPS) * H;
      const bin    = Math.floor((i / STEPS) * bins * 0.65);
      const v      = data[bin] / 255;
      const wobble =
        Math.sin(t * 1.7  + i * 0.28) * 0.13 +
        Math.sin(t * 3.3  + i * 0.65) * 0.07 +
        Math.sin(t * 6.1  + i * 1.2 ) * 0.03;
      const w = Math.max(0, (v * 0.8 + Math.abs(wobble) * v * 0.6 + wobble * 0.04) * FLAME_W);
      pts.push({ y, w });
    }
    return pts;
  }

  function drawFlameShape(c, pts, mirror, W, scaleW, alpha, glowBlur) {
    c.beginPath();
    const edge = mirror ? W : 0;
    const sign = mirror ? -1 : 1;

    c.moveTo(edge, pts[0].y);
    for (let i = 0; i < pts.length - 1; i++) {
      const cy = (pts[i].y + pts[i + 1].y) / 2;
      const cx = edge + sign * (pts[i].w + pts[i + 1].w) / 2 * scaleW;
      c.quadraticCurveTo(
        edge + sign * pts[i].w * scaleW, pts[i].y,
        cx, cy
      );
    }
    c.lineTo(edge, pts[pts.length - 1].y);
    c.closePath();

    const [r, g, b] = accentRgb();
    const grad = mirror
      ? c.createLinearGradient(W, 0, 0, 0)
      : c.createLinearGradient(0, 0, W, 0);
    grad.addColorStop(0,    `rgba(${r},${g},${b},${alpha})`);
    grad.addColorStop(0.55, `rgba(${r},${g},${b},${alpha * 0.35})`);
    grad.addColorStop(1,    `rgba(${r},${g},${b},0)`);
    c.fillStyle = grad;

    if (glowBlur > 0) {
      c.shadowBlur  = glowBlur;
      c.shadowColor = `rgba(${r},${g},${b},0.8)`;
    }
    c.fill();
    c.shadowBlur = 0;
  }

  function drawFlame(canvas, data, mirror, t) {
    const c = canvas.getContext('2d');
    const W = canvas.width;
    const H = canvas.height;
    c.clearRect(0, 0, W, H);

    const pts = buildFlamePoints(data, t);
    drawFlameShape(c, pts, mirror, W, 1.9, 0.07, 14);
    drawFlameShape(c, pts, mirror, W, 1.3, 0.20, 5);
    drawFlameShape(c, pts, mirror, W, 0.7, 0.65, 0);
  }

  function vizLoop() {
    if (!analyser) return;
    const data = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(data);
    const t = performance.now() / 1000;
    drawFlame(cvLeft,  data, false, t);
    drawFlame(cvRight, data, true,  t);
    rafId = requestAnimationFrame(vizLoop);
  }

  // ── Controls ─────────────────────────────────────────────────
  function start() {
    if (!actx) buildAudio();
    else actx.resume();
    audioEl.play();
    playing = true;
    vizEl.classList.add('is-active');
    btn.classList.add('is-playing');
    btn.querySelector('.music-icon').textContent = '■';
    vizLoop();
  }

  function stop() {
    playing = false;
    cancelAnimationFrame(rafId);
    audioEl.pause();
    actx.suspend();
    vizEl.classList.remove('is-active');
    btn.classList.remove('is-playing');
    btn.querySelector('.music-icon').textContent = '▶';
    [cvLeft, cvRight].forEach(cv => {
      cv.getContext('2d').clearRect(0, 0, cv.width, cv.height);
    });
  }

  btn.addEventListener('click', () => playing ? stop() : start());

  // ── Volume slider ─────────────────────────────────────────────
  const slider = document.getElementById('volumeSlider');
  const volVal = document.getElementById('volVal');
  if (slider) {
    slider.addEventListener('input', () => {
      const v = slider.value / 100;
      if (audioEl) audioEl.volume = v;
      if (volVal) volVal.textContent = slider.value;
    });
  }
})();
