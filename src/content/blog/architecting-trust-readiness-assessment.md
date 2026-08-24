---
title: "Architecting Trust, Module 07: Your AI Readiness Self-Assessment"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "The interactive finale. Score one real AI system: weigh its exposure against your containment, get a readiness band, and leave with a short, prioritized list of what to fix first."
featuredImage: "/images/blog/architecting-trust-readiness-assessment.webp"
featuredImageAlt: "Banner, Your AI Readiness Self-Assessment: a consolidated resilience scorecard showing a readiness score, action and isolation metrics, an accountable owner, history, and a priority next action."
featuredImageCaption: "Score one AI system: weigh its exposure against your containment, and get a prioritized next step."
order: 9
---
<style>
#guide-disclaimer{background:#fdf6f6;border:1px solid rgba(123,24,24,0.20);border-left:4px solid #7B1818;border-radius:8px;padding:14px 20px;margin:0 0 24px;}
#guide-disclaimer p{font-size:0.86rem;line-height:1.55;color:#5c5851;margin:0;}
#guide-disclaimer strong{color:#28251d;font-weight:600;}
</style>
<aside id="guide-disclaimer">
<p><strong>Before you begin.</strong> I'm David Aragó, and I'm sharing this guide as is, with no guarantees of any kind. Some modules include hands-on labs that ask you to type into live, public chatbots. Never enter real customer data, passwords, or any confidential or personal information while running them. Neither I nor AraGrow LLC accept responsibility for any data loss, or any leakage of personal or confidential information, that results from following this guide or running the labs. By continuing, you accept that you use this guide at your own risk and take full responsibility for anything you enter.</p>
</aside>

<style>
#at-m07{
--accent:#7B1818;
--accent-dark:#5a1212;
--ochre:#9A6B22;
--slate:#4A5A60;
--brick:#8C3A2B;
--good:#2f7d54;
--teal2:#3E8B8F;
--bg:#fbfaf8;
--surface:#f6f2ef;
--surface-2:#efe9e3;
--ai-text:#28251d;
--ai-muted:#5c5851;
--ai-border:rgba(123,24,24,0.16);
--gold:#E8B931;
--serif:'Space Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
--sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
--mono:ui-monospace,'Fira Code',Menlo,monospace;
background:var(--bg);
color:var(--ai-text);
font-family:var(--sans);
font-size:17px;
line-height:1.65;
border:1px solid var(--ai-border);
border-top:6px solid var(--accent);
border-radius:14px;
overflow:hidden;
margin:40px 0;
width:min(1060px,calc(100vw - 48px));
max-width:none;
-webkit-font-smoothing:antialiased;
}
#at-m07 *{box-sizing:border-box;}
#at-m07 .wrap{max-width:880px;margin:0 auto;padding:0 40px;}
#at-m07 a{color:var(--accent-dark);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}
#at-m07 strong{font-weight:600;}
#at-m07 em{font-style:italic;}
#at-m07 p{margin:0 0 18px;}
#at-m07 p:last-child{margin-bottom:0;}
#at-m07 h1,#at-m07 h2{margin:0;}
/* masthead */
#at-m07 .masthead{border-bottom:1px solid var(--ai-border);padding:26px 0 24px;}
#at-m07 .masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
#at-m07 .brand{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-weight:700;letter-spacing:.01em;color:var(--accent);}
#at-m07 .brand-mark{width:26px;height:26px;flex:0 0 auto;}
#at-m07 .brand-name{font-size:18px;}
#at-m07 .brand-name span{color:var(--ochre);}
#at-m07 .masthead-meta{font-size:13px;color:var(--ai-muted);text-align:right;line-height:1.6;}
#at-m07 .masthead-meta a.back-link{color:var(--accent);text-decoration:none;font-weight:600;}
#at-m07 .masthead-meta a.back-link:hover{text-decoration:underline;}
/* cover */
#at-m07 .cover{padding:54px 0 40px;border-bottom:1px solid var(--ai-border);}
#at-m07 .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 18px;}
#at-m07 h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6.4vw,52px);line-height:1.06;letter-spacing:-.015em;margin:0 0 16px;}
#at-m07 .subtitle{font-family:var(--serif);font-weight:500;font-size:clamp(18px,3vw,22px);line-height:1.34;color:var(--ai-text);margin:0 0 26px;max-width:42ch;}
#at-m07 .objective{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:22px 24px;}
#at-m07 .objective .kicker{margin-bottom:12px;}
#at-m07 .objective ul{margin:0;padding:0;list-style:none;}
#at-m07 .objective li{position:relative;padding:0 0 0 24px;margin:0 0 9px;font-size:15.5px;}
#at-m07 .objective li:last-child{margin-bottom:0;}
#at-m07 .objective li::before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:var(--accent);}
/* sections */
#at-m07 section{padding:48px 0;border-bottom:1px solid var(--ai-border);}
#at-m07 .kicker{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 14px;}
#at-m07 h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,4.2vw,32px);line-height:1.14;letter-spacing:-.01em;margin:0 0 18px;}
/* precise */
#at-m07 .precise{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:18px 22px;margin:24px 0;}
#at-m07 .precise .tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--slate);margin-bottom:9px;}
#at-m07 .precise p{font-size:15.5px;line-height:1.6;margin:0;}
/* four questions */
#at-m07 .fourq{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:8px;}
#at-m07 .fourq .q{border:1px solid var(--ai-border);border-radius:8px;padding:14px 16px;background:#fff;}
#at-m07 .fourq .q b{display:block;font-size:14.5px;color:var(--accent-dark);margin-bottom:3px;}
#at-m07 .fourq .q span{font-size:13.5px;color:var(--ai-muted);}
/* assessment */
#at-m07 .qgroup{margin:0 0 8px;}
#at-m07 .qgroup-title{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-dark);margin:26px 0 12px;padding-top:8px;}
#at-m07 .qcard{border:1px solid var(--ai-border);border-radius:8px;padding:15px 18px;margin:0 0 11px;background:#fff;transition:border-color .15s ease,background .15s ease,box-shadow .15s ease;}
#at-m07 .qcard.missing{border-color:var(--brick);background:#fdf3f1;box-shadow:0 0 0 1px var(--brick);}
#at-m07 .qcard.missing legend{color:var(--brick);}
#at-m07 .qcard legend{font-weight:600;font-size:15.5px;padding:0;margin-bottom:11px;line-height:1.4;}
#at-m07 .qcard .qnum{color:var(--accent);font-family:var(--mono);font-size:12.5px;margin-right:7px;}
#at-m07 .opts-row{display:flex;flex-wrap:wrap;gap:8px;}
#at-m07 .opts-row label{display:inline-flex;align-items:center;gap:7px;border:1px solid var(--ai-border);border-radius:22px;padding:6px 14px;font-size:14.5px;cursor:pointer;color:var(--ai-text);transition:background .12s ease;}
#at-m07 .opts-row label:hover{background:var(--surface);}
#at-m07 .opts-row input{accent-color:var(--accent);margin:0;}
#at-m07 .calc-btn{appearance:none;border:none;background:var(--accent);color:#fff;font-family:var(--sans);font-weight:600;font-size:16px;padding:14px 28px;border-radius:8px;cursor:pointer;margin-top:14px;}
#at-m07 .calc-btn:hover{background:var(--accent-dark);}
#at-m07 .warn-msg{color:var(--brick);font-size:14.5px;margin-top:12px;display:none;}
/* result */
#at-m07 .result{display:none;margin-top:28px;border:1px solid var(--ai-border);border-radius:10px;overflow:hidden;}
#at-m07 .result .band{padding:22px 26px;color:#fff;}
#at-m07 .result .band h3{margin:0 0 5px;color:#fff;font-family:var(--serif);font-size:clamp(22px,3.5vw,27px);font-weight:700;}
#at-m07 .result .band p{margin:0;font-size:15px;color:rgba(255,255,255,.92);}
#at-m07 .band.green{background:var(--good);}
#at-m07 .band.teal{background:var(--teal2);}
#at-m07 .band.amber{background:var(--ochre);}
#at-m07 .band.red{background:var(--brick);}
#at-m07 .result .body{padding:24px 26px;}
#at-m07 .exposure-line{font-size:15.5px;margin:0 0 18px;color:var(--ai-text);}
#at-m07 .bar-wrap{margin:0 0 20px;}
#at-m07 .bar-label{display:flex;justify-content:space-between;font-size:13px;color:var(--ai-muted);margin-bottom:6px;}
#at-m07 .bar{height:10px;background:var(--surface-2);border-radius:6px;overflow:hidden;}
#at-m07 .bar > span{display:block;height:100%;width:0;background:var(--accent);border-radius:6px;transition:width .6s ease;}
#at-m07 .recs-title{font-size:13px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 8px;}
#at-m07 .recs{list-style:none;margin:0;padding:0;}
#at-m07 .recs li{position:relative;padding:9px 0 9px 28px;font-size:15px;border-top:1px solid var(--ai-border);}
#at-m07 .recs li:first-child{border-top:none;}
#at-m07 .recs li::before{content:"\2192";position:absolute;left:2px;color:var(--accent);font-weight:700;}
#at-m07 .result .offer{margin-top:20px;padding:16px 18px;background:var(--surface);border-left:3px solid var(--accent);border-radius:8px;font-size:15.5px;}
#at-m07 .result .offer b{color:var(--accent-dark);}
#at-m07 .assess-disclaimer{margin-top:22px;background:#fdf6f6;border:1px solid rgba(123,24,24,0.20);border-left:3px solid var(--accent);border-radius:8px;padding:15px 18px;}
#at-m07 .assess-disclaimer p{font-size:13.5px;line-height:1.55;color:var(--ai-muted);margin:0;}
#at-m07 .assess-disclaimer strong{color:var(--accent-dark);font-weight:700;}
/* AraGrow services */
#at-m07 .offer-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:6px;}
#at-m07 .offer-card{border:1px solid var(--ai-border);border-radius:8px;padding:16px 18px;background:#fff;}
#at-m07 .offer-card h4{margin:0 0 4px;font-size:15px;color:var(--accent-dark);font-weight:600;}
#at-m07 .offer-card p{margin:0;font-size:14px;color:var(--ai-muted);}
#at-m07 .cta{border-left:3px solid var(--accent);padding:6px 0 6px 22px;margin:24px 0 0;}
#at-m07 .cta p{font-size:16px;color:var(--ai-text);}
#at-m07 .cta b{color:var(--accent-dark);}
/* guide index */
#at-m07 .index{list-style:none;margin:8px 0 0;padding:0;}
#at-m07 .index li{border-top:1px solid var(--ai-border);}
#at-m07 .index li:last-child{border-bottom:1px solid var(--ai-border);}
#at-m07 .index a{display:flex;gap:16px;padding:13px 0;text-decoration:none;color:var(--ai-text);align-items:baseline;}
#at-m07 .index a:hover .ix-t{color:var(--accent-dark);text-decoration:underline;}
#at-m07 .index .ix-n{font-family:var(--mono);font-size:12.5px;color:var(--accent);flex:0 0 34px;}
#at-m07 .index .ix-t{font-weight:600;font-size:16px;}
#at-m07 .index .ix-soon{display:flex;gap:16px;padding:13px 0;align-items:baseline;color:var(--ai-muted);}
#at-m07 .index .ix-soon .ix-n{color:var(--ai-muted);}
#at-m07 .index .ix-soon .ix-t{font-weight:600;font-size:16px;}
#at-m07 .index .ix-pill{font-size:10.5px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ochre);background:rgba(154,107,34,.14);border-radius:999px;padding:2px 8px;margin-left:6px;}
/* tie-back */
#at-m07 .tieback{border-left:3px solid var(--accent);padding:6px 0 6px 22px;margin:6px 0;}
#at-m07 .tieback .kicker{margin-bottom:8px;}
#at-m07 .tieback p{font-size:16px;color:var(--ai-text);margin:0;}
/* footer */
#at-m07 .at-foot{padding:44px 0 52px;}
#at-m07 .recap{background:var(--accent-dark);color:#f7f1f0;border-radius:8px;padding:30px 32px;margin:0 0 28px;}
#at-m07 .recap .kicker{color:var(--gold);margin-bottom:14px;}
#at-m07 .recap p{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2.8vw,22px);line-height:1.4;margin:0;color:#fbf6f2;}
#at-m07 .recap em{color:var(--gold);font-style:italic;}
#at-m07 .nav{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px;align-items:center;}
#at-m07 .nav a{display:inline-flex;align-items:center;gap:9px;font-weight:600;color:var(--accent-dark);font-size:15.5px;text-decoration:none;}
#at-m07 .nav a.prev{color:var(--ai-muted);}
#at-m07 .nav svg{transition:transform .2s ease;}
#at-m07 .nav a.prev:hover svg{transform:translateX(-3px);}
#at-m07 .nav a.next:hover svg{transform:translateX(3px);}
#at-m07 .foot-meta{font-size:13.5px;color:var(--ai-muted);border-top:1px solid var(--ai-border);padding-top:22px;}
#at-m07 .foot-meta .brand{margin-bottom:8px;font-size:15px;}
#at-m07 .foot-meta .brand span{color:var(--ochre);}
@media (max-width:560px){
#at-m07{font-size:16px;}
#at-m07 .wrap{padding:0 20px;}
#at-m07 .cover{padding:40px 0 32px;}
#at-m07 .fourq{grid-template-columns:1fr;}
#at-m07 .offer-grid{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){#at-m07 *{transition:none!important;}}
</style>

<div id="at-m07">
<header class="masthead">
<div class="wrap">
<div class="brand">
<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span class="brand-name">Ara<span>Grow</span></span>
</div>
<div class="masthead-meta">
<a class="back-link" href="/blog/architecting-trust-course">&larr; Guide overview</a><br>
Executive Guide · Part 7 of 7<br>
Readiness Self-Assessment
</div>
</div>
</header>
<div class="cover">
<div class="wrap">
<p class="eyebrow">Module 07 · The Finale</p>
<h1>Your AI Readiness Self-Assessment</h1>
<p class="subtitle">Everything you've learned, turned into a score for one real AI system, and a clear next step.</p>
<div class="objective">
<p class="kicker">How to use this</p>
<ul>
<li>Pick <em>one</em> AI system you use, are piloting, or are being pitched. Answer for that specific system.</li>
<li>It takes about ten minutes. There are no trick questions and no pass/fail; it's a map, not an exam.</li>
<li>You'll get a readiness band, a containment score, and a short, prioritized list of what to fix first.</li>
</ul>
</div>
</div>
</div>
<section>
<div class="wrap">
<p class="kicker">Before you start</p>
<h2>What this measures</h2>
<p>This assessment scores two things and weighs one against the other. First, <strong>exposure</strong>: how much is genuinely at risk, based on the lethal trifecta from Module 02. Second, <strong>containment</strong>: how many of the defense layers from Module 06 you actually have in place. High exposure with low containment is the danger zone; the same controls that are overkill for a toy are essential for a system wired into your business.</p>
<p>It's built directly on the four questions you've carried since the introduction:</p>
<div class="fourq">
<div class="q"><b>1 · What can it see?</b><span>Private data in reach.</span></div>
<div class="q"><b>2 · Whose instructions reach it?</b><span>Untrusted content it reads.</span></div>
<div class="q"><b>3 · What can it do?</b><span>Actions it can take.</span></div>
<div class="q"><b>4 · Where must a human approve?</b><span>The irreversible gate.</span></div>
</div>
<div class="precise">
<span class="tag">How to read your two scores</span>
<p>Two things to keep in mind as you score. Exposure and containment aren't fully independent; some moves lower both at once. Narrowing which data the AI can reach, for instance, shrinks what's at risk <em>and</em> counts as a containment layer, so don't be surprised when one good decision improves both columns. And these four questions are the <em>backbone</em> of the assessment, not the whole of it: the layers you'll score below also fold in measurement, logging, and governance, and a regulated or sector-specific use will carry its own requirements on top. The four axes are the structure everything else hangs from.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">The assessment</p>
<h2>Score one AI system</h2>
<form id="assessForm" class="assess">
<div class="qgroup">
<p class="qgroup-title">Part 1 · Exposure: the lethal trifecta</p>
<fieldset class="qcard">
<legend><span class="qnum">E1</span>Can this AI access private or sensitive data: emails, customer records, files, contracts, a database?</legend>
<div class="opts-row">
<label><input type="radio" name="e1" value="1"> Yes</label>
<label><input type="radio" name="e1" value="0"> No</label>
<label><input type="radio" name="e1" value="1"> Not sure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">E2</span>Does it read content from outside your control: customer messages, web pages, uploaded documents, inbound email?</legend>
<div class="opts-row">
<label><input type="radio" name="e2" value="1"> Yes</label>
<label><input type="radio" name="e2" value="0"> No</label>
<label><input type="radio" name="e2" value="1"> Not sure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">E3</span>Can it take actions that send or change things: send messages, post, pay, refund, or update or delete records?</legend>
<div class="opts-row">
<label><input type="radio" name="e3" value="1"> Yes</label>
<label><input type="radio" name="e3" value="0"> No</label>
<label><input type="radio" name="e3" value="1"> Not sure</label>
</div>
</fieldset>
</div>
<div class="qgroup">
<p class="qgroup-title">Part 2 · Containment: your defense layers</p>
<fieldset class="qcard">
<legend><span class="qnum">C1</span>Least data: it can reach only the data its job actually needs, not everything.</legend>
<div class="opts-row">
<label><input type="radio" name="c1" value="2"> In place</label>
<label><input type="radio" name="c1" value="1"> Partial</label>
<label><input type="radio" name="c1" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C2</span>Least privilege: its actions are scoped, read-only where possible, no powers it doesn't use.</legend>
<div class="opts-row">
<label><input type="radio" name="c2" value="2"> In place</label>
<label><input type="radio" name="c2" value="1"> Partial</label>
<label><input type="radio" name="c2" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C3</span>Isolated input: untrusted outside content is kept from directly driving privileged actions (the vendor can explain how).</legend>
<div class="opts-row">
<label><input type="radio" name="c3" value="2"> In place</label>
<label><input type="radio" name="c3" value="1"> Partial</label>
<label><input type="radio" name="c3" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C4</span>Human-in-the-loop: a person confirms the high-stakes, irreversible actions before they happen.</legend>
<div class="opts-row">
<label><input type="radio" name="c4" value="2"> In place</label>
<label><input type="radio" name="c4" value="1"> Partial</label>
<label><input type="radio" name="c4" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C5</span>Guardrails: input/output filters exist, and are understood as one layer, not the whole defense.</legend>
<div class="opts-row">
<label><input type="radio" name="c5" value="2"> In place</label>
<label><input type="radio" name="c5" value="1"> Partial</label>
<label><input type="radio" name="c5" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C6</span>Monitoring: you can review later what the AI saw and did; there's a log.</legend>
<div class="opts-row">
<label><input type="radio" name="c6" value="2"> In place</label>
<label><input type="radio" name="c6" value="1"> Partial</label>
<label><input type="radio" name="c6" value="0"> Missing / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">C7</span>Measurement: quality and groundedness are tracked over time, not just judged at launch.</legend>
<div class="opts-row">
<label><input type="radio" name="c7" value="2"> In place</label>
<label><input type="radio" name="c7" value="1"> Partial</label>
<label><input type="radio" name="c7" value="0"> Missing / unsure</label>
</div>
</fieldset>
</div>
<div class="qgroup">
<p class="qgroup-title">Part 3 · Governance: who owns it</p>
<fieldset class="qcard">
<legend><span class="qnum">G1</span>Is there a named owner for AI risk: one person with authority to pause a launch?</legend>
<div class="opts-row">
<label><input type="radio" name="g1" value="1"> Yes</label>
<label><input type="radio" name="g1" value="0"> No / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">G2</span>Is there a written policy for what data and actions AI may touch, plus a basic incident plan?</legend>
<div class="opts-row">
<label><input type="radio" name="g2" value="1"> Yes</label>
<label><input type="radio" name="g2" value="0"> No / unsure</label>
</div>
</fieldset>
<fieldset class="qcard">
<legend><span class="qnum">G3</span>If a vendor is involved: do your contracts cover the right to see evaluations and address liability?</legend>
<div class="opts-row">
<label><input type="radio" name="g3" value="1"> Yes</label>
<label><input type="radio" name="g3" value="0"> No / unsure</label>
<label><input type="radio" name="g3" value="na"> No vendor</label>
</div>
</fieldset>
</div>
<button type="button" class="calc-btn" id="calcBtn">See my readiness</button>
<p class="warn-msg" id="warnMsg">Please answer the highlighted questions to get an accurate read.</p>
</form>
<div class="result" id="result" aria-live="polite">
<div class="band" id="resultBand">
<h3 id="bandTitle"></h3>
<p id="bandBlurb"></p>
</div>
<div class="body">
<p class="exposure-line" id="exposureLine"></p>
<div class="bar-wrap">
<div class="bar-label"><span>Containment</span><span id="contPctLabel"></span></div>
<div class="bar"><span id="contBar"></span></div>
</div>
<p class="recs-title">Lowest-scoring areas</p>
<ul class="recs" id="recsList"></ul>
<div class="offer" id="offerLine"></div>
<div class="assess-disclaimer">
<p><strong>This is a score, not advice.</strong> This self-assessment is an educational estimate, not a recommendation, an audit, or any guarantee of safety. A number can't see your full context or tell you whether a given risk is acceptable for your business. Understanding your real exposure, and deciding what to do about it, takes a qualified security and, where relevant, legal professional. Use this only as a starting point for that conversation.</p>
</div>
</div>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">You've finished the guide</p>
<h2>The whole thing, in one breath</h2>
<p>An AI can't tell instructions from data, so everything it reads is a potential command. The dangerous attacks aren't typed by your users; they're read by your AI, and you can't reliably filter them out. So you contain: limit what it sees and does, keep a human in front of anything irreversible, measure quality continuously, stack independent layers, and name an owner for the day something goes wrong. There's no perfect fix, its makers say so, and you don't need one. You need a system whose failures are small and recoverable.</p>
<p style="margin-top:8px;">Revisit any part:</p>
<ul class="index">
<li><a href="/blog/architecting-trust-introduction-four-questions"><span class="ix-n">00</span><span class="ix-t">Introduction &amp; the four questions</span></a></li>
<li><a href="/blog/architecting-trust-how-ai-thinks"><span class="ix-n">01</span><span class="ix-t">How AI Actually "Thinks"</span></a></li>
<li><a href="/blog/architecting-trust-prompt-injection"><span class="ix-n">02</span><span class="ix-t">Prompt Injection: The #1 AI Risk</span></a></li>
<li><a href="/blog/architecting-trust-stealth-frontier"><span class="ix-n">03</span><span class="ix-t">The Stealth Frontier</span></a></li>
<li><a href="/blog/architecting-trust-when-ai-can-act"><span class="ix-n">04</span><span class="ix-t">When AI Can Act</span></a></li>
<li><a href="/blog/architecting-trust-measuring-trust"><span class="ix-n">05</span><span class="ix-t">Measuring Trust</span></a></li>
<li><a href="/blog/architecting-trust-executive-playbook"><span class="ix-n">06</span><span class="ix-t">The Executive Playbook</span></a></li>
</ul>
<ul class="index" style="margin-top:0;">
<li><a href="/blog/architecting-trust-appendix"><span class="ix-n">A</span><span class="ix-t">Appendix: Sources &amp; Glossary</span></a></li>
</ul>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Where this can lead</p>
<h2>If you'd like a second set of eyes</h2>
<p>You can act on everything in this guide on your own; that was the point. But if your self-assessment turned up gaps you'd rather not navigate alone, that's the kind of work AraGrow does: senior technology leadership without the full-time executive cost, focused on practical outcomes rather than hype. And hold any partner, including us, to the standard this guide taught: a clear scope, the risk assumptions written down, and evaluations you can actually see. The goal isn't to trust that the containment is there; it's to be shown it.</p>
<div class="offer-grid">
<div class="offer-card"><h4>Fractional CTO</h4><p>Ongoing senior guidance to align AI and technology decisions with how the business actually needs to grow.</p></div>
<div class="offer-card"><h4>AI risk audit</h4><p>A focused review of a real or planned deployment against the layers in this guide, and a plan to close the gaps.</p></div>
<div class="offer-card"><h4>Roadmap session</h4><p>A working session to scope an AI use case sensibly and in phases, without overbuilding too early.</p></div>
<div class="offer-card"><h4>Practical AI integration</h4><p>Implementation that reduces manual work and improves customer experience, with the containment built in from the start.</p></div>
</div>
<div class="cta">
<p><b>A reasonable next step</b> is a short <a href="/#contact">discovery call</a>, no preparation needed beyond the system you just scored. AraGrow works bilingually in English and Spanish.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<div class="tieback">
<p class="kicker">One honest closing note</p>
<p>The specific attacks and tools in this guide will keep changing; that's the nature of the field. The principles won't: instructions and data are blurred, reach plus capability equals risk, filters are layers not walls, and accountability is human. As new modalities arrive, voice, video, code agents, they tend to add wrinkles, not new principles; they still map back to the same questions of who can influence the system, what it can reach, and who answers for it. This guide is educational, not legal or security advice for your particular system. Applying its principles will already put you ahead of common practice for everyday tools, but when a deployment touches personal data, money, safety, or a regulated sector, a qualified legal and security review stops being optional. You now have the judgment to know which situation you're in, and that was the whole goal. Treat it as a starting point to keep building on as the field moves, not a finish line.</p>
</div>
</div>
</section>
<div class="at-foot">
<div class="wrap">
<div class="recap">
<p class="kicker">The one line to remember</p>
<p>You don't need AI to be perfectly safe. You need it to fail <em>small</em>, and to know, before you launch, exactly how it's contained and who owns it.</p>
</div>
<div class="nav">
<a class="prev" href="/blog/architecting-trust-executive-playbook">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#5c5851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Previous: Module 06
</a>
<a class="next" href="/blog/architecting-trust-introduction-four-questions">Back to the start
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#5a1212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>
</div>
<div class="foot-meta">
<div class="brand"><span class="brand-name">Ara<span>Grow</span></span></div>
Architecting Trust: An Executive's Guide to AI Risk &amp; Readiness · Module 07 of 7 · Guide complete<br>
Prepared by AraGrow LLC · David Aragó, Fractional CTO · Minneapolis · Bilingual EN / ES
</div>
</div>
</div>
</div>

<script>
(function(){
  var form = document.getElementById('assessForm');
  var btn = document.getElementById('calcBtn');
  var warn = document.getElementById('warnMsg');
  var result = document.getElementById('result');
  if(!form || !btn){ return; }

  form.addEventListener('change', function(e){
    var card = e.target && e.target.closest ? e.target.closest('.qcard') : null;
    if(card){ card.classList.remove('missing'); }
  });

  var contKeys = ['c1','c2','c3','c4','c5','c6','c7'];
  var labels = {
    c1:'Least data (what it can see)',
    c2:'Least privilege (what it can do)',
    c3:'Isolating untrusted input',
    c4:'Human-in-the-loop on irreversible actions',
    c5:'Guardrails / filters',
    c6:'Monitoring and logging',
    c7:'Continuous measurement'
  };
  var priority = ['c1','c2','c4','c3','c6','c7','c5'];

  function val(name){
    var el = form.querySelector('input[name="'+name+'"]:checked');
    return el ? el.value : null;
  }

  function dropOne(band){
    if(band==='green') return 'teal';
    if(band==='teal') return 'amber';
    return band;
  }

  btn.addEventListener('click', function(){
    var required = ['e1','e2','e3','c1','c2','c3','c4','c5','c6','c7','g1','g2','g3'];
    var cards = form.querySelectorAll('.qcard');
    for(var c=0;c<cards.length;c++){ cards[c].classList.remove('missing'); }
    var missing = [];
    required.forEach(function(name){
      if(val(name)===null){
        missing.push(name);
        var inp = form.querySelector('input[name="'+name+'"]');
        var card = inp && inp.closest ? inp.closest('.qcard') : null;
        if(card){ card.classList.add('missing'); }
      }
    });
    if(missing.length){
      warn.style.display='block';
      var firstInp = form.querySelector('input[name="'+missing[0]+'"]');
      var firstCard = firstInp && firstInp.closest ? firstInp.closest('.qcard') : null;
      if(firstCard){ firstCard.scrollIntoView({behavior:'smooth', block:'center'}); }
      return;
    }
    warn.style.display='none';

    var exposure = (+val('e1')) + (+val('e2')) + (+val('e3'));
    var cont = 0;
    contKeys.forEach(function(k){ cont += (+val(k)); });
    var contMax = 14;
    var pct = cont / contMax;

    var g1 = val('g1'), g2 = val('g2'), g3 = val('g3');

    var t;
    if(exposure>=3) t=[0.85,0.65,0.40];
    else if(exposure===2) t=[0.70,0.50,0.30];
    else t=[0.55,0.40,0.25];

    var band;
    if(pct>=t[0]) band='green';
    else if(pct>=t[1]) band='teal';
    else if(pct>=t[2]) band='amber';
    else band='red';

    if(exposure>=3 && pct<0.30) band='red';
    if(g1==='0' && (band==='green'||band==='teal')) band='amber';
    if(g2==='0') band=dropOne(band);

    var bandData = {
      green:{cls:'green', title:'Strong readiness', blurb:'Your containment layers are broadly in line with this system’s exposure.'},
      teal:{cls:'teal', title:'Solid readiness', blurb:'Containment is largely in place, with some gaps relative to this system’s exposure.'},
      amber:{cls:'amber', title:'Limited readiness', blurb:'There are meaningful gaps between this system’s exposure and the containment in place.'},
      red:{cls:'red', title:'Low readiness', blurb:'This system’s exposure is high relative to the containment layers in place.'}
    };
    var b = bandData[band];

    document.getElementById('resultBand').className = 'band '+b.cls;
    document.getElementById('bandTitle').textContent = b.title;
    document.getElementById('bandBlurb').textContent = b.blurb;

    var expText;
    if(exposure>=3) expText = 'This system has all three legs of the lethal trifecta: it can see private data, read untrusted content, and act outward. That combination is what researchers call breach-capable.';
    else if(exposure===2) expText = 'This system has two of the three trifecta legs.';
    else if(exposure===1) expText = 'This system has one of the three trifecta legs, so its inherent exposure is lower.';
    else expText = 'As answered, this system has none of the trifecta legs, so its inherent exposure is low.';
    document.getElementById('exposureLine').textContent = expText;

    var pctRounded = Math.round(pct*100);
    document.getElementById('contPctLabel').textContent = pctRounded + '%';
    var bar = document.getElementById('contBar');
    var barColors = {green:'#2f7d54', teal:'#3E8B8F', amber:'#9A6B22', red:'#8C3A2B'};
    bar.style.background = barColors[band];
    bar.style.width = '0%';
    setTimeout(function(){ bar.style.width = pctRounded + '%'; }, 60);

    var recs = [];
    priority.forEach(function(k){
      var v = val(k);
      if(v==='0') recs.push(labels[k] + ': missing or unsure.');
      else if(v==='1') recs.push(labels[k] + ': partial.');
    });
    if(g1==='0') recs.push('Named owner for AI risk: not in place.');
    if(g2==='0') recs.push('Data and action policy, and incident plan: not in place.');
    if(g3==='0') recs.push('Vendor accountability in contracts: not in place.');
    if(recs.length===0) recs.push('No layers scored as a gap. Re-run this whenever the system changes.');
    recs = recs.slice(0,8);

    var ul = document.getElementById('recsList');
    ul.innerHTML='';
    recs.forEach(function(r){ var li=document.createElement('li'); li.textContent=r; ul.appendChild(li); });

    var offers = {
      green:'<b>Recommended next step:</b> a high score is a reason to verify, not to skip review. Have a qualified security professional confirm it before you rely on this system.',
      teal:'<b>Recommended next step:</b> review the gaps above with a qualified security professional before you rely on this system.',
      amber:'<b>Recommended next step:</b> work through the gaps above with a qualified security professional before relying on this system.',
      red:'<b>Recommended next step:</b> have a qualified security professional review this before it connects to sensitive systems or goes live.'
    };
    document.getElementById('offerLine').innerHTML = offers[band];

    result.style.display='block';
    result.scrollIntoView({behavior:'smooth', block:'start'});
  });
})();
</script>
