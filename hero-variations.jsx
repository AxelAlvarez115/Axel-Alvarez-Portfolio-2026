/* Hero variations — three alternate terminal-style heroes */
const { useState, useEffect, useRef } = React;

/* ---------- shared mouse-tracking hook ---------- */
function useMouseGradient(ref) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let tx = 50, ty = 40, cx = 50, cy = 40, raf = 0;
    function tick() {
      cx += (tx - cx) * 0.08;
      cy += (ty - cy) * 0.08;
      el.style.setProperty('--mx', cx + '%');
      el.style.setProperty('--my', cy + '%');
      if (Math.abs(tx - cx) > 0.1 || Math.abs(ty - cy) > 0.1) {
        raf = requestAnimationFrame(tick);
      } else { raf = 0; }
    }
    function move(e) {
      const r = el.getBoundingClientRect();
      tx = ((e.clientX - r.left) / r.width) * 100;
      ty = ((e.clientY - r.top) / r.height) * 100;
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function leave() { tx = 50; ty = 40; if (!raf) raf = requestAnimationFrame(tick); }
    el.addEventListener('mousemove', move);
    el.addEventListener('mouseleave', leave);
    let t = 0;
    const iv = setInterval(() => {
      if (raf) return;
      t += 0.6;
      tx = 50 + Math.sin(t * 0.05) * 18;
      ty = 40 + Math.cos(t * 0.04) * 12;
      if (!raf) raf = requestAnimationFrame(tick);
    }, 80);
    return () => { el.removeEventListener('mousemove', move); el.removeEventListener('mouseleave', leave); clearInterval(iv); };
  }, []);
}

/* ---------- shared bits ---------- */
function HeroBg() {
  return (
    <>
      <div className="hv-bg" />
      <div className="hv-grid" />
      <div className="hv-vignette" />
    </>
  );
}
function StatusBar({ extra }) {
  const [t, setT] = useState('--:--:--');
  useEffect(() => {
    const tick = () => {
      const d = new Date();
      const p = n => String(n).padStart(2,'0');
      setT(`${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`);
    };
    tick(); const i = setInterval(tick, 1000); return () => clearInterval(i);
  }, []);
  return (
    <div className="hv-status">
      <div><span className="dot"/><span className="ok">SYSTEM ONLINE</span></div>
      <div>{extra || 'PORT 443 // TLS'}</div>
      <div>{t}</div>
    </div>
  );
}

/* ============================================================== */
/* VARIATION A — Full-bleed name + terminal status                */
/* ============================================================== */
function HeroA() {
  const ref = useRef(null);
  useMouseGradient(ref);
  return (
    <div className="hv hv-a" ref={ref}>
      <HeroBg />
      <div className="hv-content">
        <StatusBar />
        <div className="hv-stack">
          <div className="hv-eyebrow"><span className="dash"/>portfolio // full-stack engineer</div>
          <h1 className="hv-name">axel<span className="acc">_</span>alvarez<span className="caret">_</span></h1>
          <div className="hv-role">
            <span className="prompt">$</span> whoami &rArr; <span className="typed">full-stack developer building fast, weird software.</span>
            <span className="caret-box"/>
          </div>
          <div className="hv-ctas">
            <a className="btn primary">view_projects<span className="arr">→</span></a>
            <a className="btn">./contact<span className="arr">→</span></a>
          </div>
        </div>
        <div className="hv-foot">
          <span>↳ scroll to enter</span>
          <span>based in mtl // open for work</span>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== */
/* VARIATION B — Terminal window centered                          */
/* ============================================================== */
function HeroB() {
  const ref = useRef(null);
  useMouseGradient(ref);
  return (
    <div className="hv hv-b" ref={ref}>
      <HeroBg />
      <div className="hv-b-content">
        <div className="terminal">
          <div className="terminal-bar">
            <div className="dots">
              <span/><span/><span className="live"/>
            </div>
            <div className="title">— bash — axel@dev ~/portfolio —</div>
            <div className="hint">⌘+T</div>
          </div>
          <div className="terminal-body">
            <div className="line"><span className="p">axel@dev</span><span className="c">:</span><span className="path">~</span><span className="d">$</span> ./identify --me</div>
            <div className="line out">
              <span className="key">name</span>     <span className="eq">=</span> <span className="val">"Axel Alvarez"</span>
            </div>
            <div className="line out">
              <span className="key">role</span>     <span className="eq">=</span> <span className="val">"Full-stack Developer"</span>
            </div>
            <div className="line out">
              <span className="key">stack</span>    <span className="eq">=</span> <span className="val">[TS, Rust, Go, Postgres]</span>
            </div>
            <div className="line out">
              <span className="key">location</span> <span className="eq">=</span> <span className="val">"Montréal, QC"</span>
            </div>
            <div className="line out">
              <span className="key">status</span>   <span className="eq">=</span> <span className="val acc">●</span> <span className="val">open for work</span>
            </div>
            <div className="line"><span className="p">axel@dev</span><span className="c">:</span><span className="path">~</span><span className="d">$</span> cat manifesto.md</div>
            <div className="line out quote">
              I build web apps, devtools, and the<br/>
              occasional weird side project. Low-latency<br/>
              UIs and clean APIs are my love language.
            </div>
            <div className="line"><span className="p">axel@dev</span><span className="c">:</span><span className="path">~</span><span className="d">$</span> <span className="cmd-cursor">_</span></div>
          </div>
        </div>

        <h1 className="hv-name-b">axel<span className="acc">_</span>alvarez</h1>

        <div className="hv-ctas centered">
          <a className="btn primary">view_projects<span className="arr">→</span></a>
          <a className="btn">./contact<span className="arr">→</span></a>
        </div>
      </div>
    </div>
  );
}

/* ============================================================== */
/* VARIATION C — Massive name + matrix sidebar                     */
/* ============================================================== */
function HeroC() {
  const ref = useRef(null);
  useMouseGradient(ref);
  return (
    <div className="hv hv-c" ref={ref}>
      <HeroBg />
      <div className="hv-c-content">
        <aside className="matrix-pane">
          <div className="mp-row label">// SYS_INFO</div>
          <div className="mp-row"><span className="k">USER</span><span className="v">axel.alvarez</span></div>
          <div className="mp-row"><span className="k">ROLE</span><span className="v">fullstack.dev</span></div>
          <div className="mp-row"><span className="k">TZ</span><span className="v">utc-5</span></div>
          <div className="mp-row"><span className="k">LOC</span><span className="v">mtl.qc.ca</span></div>
          <div className="mp-row label" style={{marginTop:18}}>// STATS</div>
          <div className="mp-row"><span className="k">YEARS</span><span className="v">6+</span></div>
          <div className="mp-row"><span className="k">SHIPPED</span><span className="v">23 prj</span></div>
          <div className="mp-row"><span className="k">UPTIME</span><span className="v">99.98%</span></div>
          <div className="mp-row"><span className="k">COFFEE</span><span className="v">∞</span></div>
          <div className="mp-row label" style={{marginTop:18}}>// CHANNELS</div>
          <div className="mp-row link"><span className="bullet"/>github.com/axela</div>
          <div className="mp-row link"><span className="bullet"/>linkedin/axela</div>
          <div className="mp-row link"><span className="bullet"/>hello@axelalvarez.dev</div>
          <div className="mp-row label" style={{marginTop:18}}>// STATUS</div>
          <div className="mp-row big"><span className="pulse"/>open for work</div>
        </aside>

        <div className="hv-c-main">
          <div className="hv-c-eyebrow">// portfolio.v2026</div>
          <h1 className="hv-name-c">
            <span className="line1">axel</span>
            <span className="line2"><span className="acc">/</span>alvarez</span>
          </h1>
          <div className="hv-c-tag">
            <span className="prompt">$</span> full-stack developer · building fast, weird software.
          </div>
          <div className="hv-ctas">
            <a className="btn primary">view_projects<span className="arr">→</span></a>
            <a className="btn">./contact<span className="arr">→</span></a>
          </div>
          <div className="hv-c-bottom">
            <span><span className="dot"/>SYSTEM ONLINE</span>
            <span>v.2026.05</span>
            <span>↳ scroll to enter</span>
          </div>
        </div>
      </div>
    </div>
  );
}

window.HeroA = HeroA;
window.HeroB = HeroB;
window.HeroC = HeroC;
