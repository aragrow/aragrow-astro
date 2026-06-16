---
title: "Architecting Trust, Module 05: Measuring Trust"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "A great demo is not a quality bar. How to actually prove an AI works, the three checks that catch a confident made-up answer, and five questions that reveal whether a vendor measures quality or just hopes for it."
featuredImage: "/images/blog/architecting-trust-measuring-trust.webp"
featuredImageAlt: "Banner, Measuring Trust: Proving AI Works, contrasting an impressive demo with rigorous proof: independent evaluation, accuracy and groundedness metrics, and a binding vendor service-level agreement."
featuredImageCaption: "A good demo is not proof; measure quality on your data and hold the vendor to a binding agreement."
order: 7
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
#at-m05{
--accent:#7B1818;
--accent-dark:#5a1212;
--ochre:#9A6B22;
--slate:#4A5A60;
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
#at-m05 *{box-sizing:border-box;}
#at-m05 .wrap{max-width:880px;margin:0 auto;padding:0 40px;}
#at-m05 a{color:var(--accent-dark);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}
#at-m05 strong{font-weight:600;}
#at-m05 em{font-style:italic;}
#at-m05 p{margin:0 0 18px;}
#at-m05 p:last-child{margin-bottom:0;}
#at-m05 h1,#at-m05 h2,#at-m05 h3{margin:0;}
/* masthead */
#at-m05 .masthead{border-bottom:1px solid var(--ai-border);padding:26px 0 24px;}
#at-m05 .masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
#at-m05 .brand{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-weight:700;letter-spacing:.01em;color:var(--accent);}
#at-m05 .brand-mark{width:26px;height:26px;flex:0 0 auto;}
#at-m05 .brand-name{font-size:18px;}
#at-m05 .brand-name span{color:var(--ochre);}
#at-m05 .masthead-meta{font-size:13px;color:var(--ai-muted);text-align:right;line-height:1.6;}
#at-m05 .masthead-meta a.back-link{color:var(--accent);text-decoration:none;font-weight:600;}
#at-m05 .masthead-meta a.back-link:hover{text-decoration:underline;}
/* cover */
#at-m05 .cover{padding:54px 0 40px;border-bottom:1px solid var(--ai-border);}
#at-m05 .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 18px;}
#at-m05 h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6.4vw,52px);line-height:1.06;letter-spacing:-.015em;margin:0 0 16px;}
#at-m05 .subtitle{font-family:var(--serif);font-weight:500;font-size:clamp(18px,3vw,22px);line-height:1.34;color:var(--ai-text);margin:0 0 26px;max-width:42ch;}
#at-m05 .objective{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:22px 24px;}
#at-m05 .objective .kicker{margin-bottom:12px;}
#at-m05 .objective ul{margin:0;padding:0;list-style:none;}
#at-m05 .objective li{position:relative;padding:0 0 0 24px;margin:0 0 9px;font-size:15.5px;}
#at-m05 .objective li:last-child{margin-bottom:0;}
#at-m05 .objective li::before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:var(--accent);}
/* sections */
#at-m05 section{padding:48px 0;border-bottom:1px solid var(--ai-border);}
#at-m05 .kicker{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 14px;}
#at-m05 h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,4.2vw,32px);line-height:1.14;letter-spacing:-.01em;margin:0 0 18px;}
#at-m05 h3{font-family:var(--sans);font-weight:600;font-size:17px;margin:28px 0 8px;}
/* triad numbered list */
#at-m05 ol.ways{counter-reset:way;margin:24px 0 0;padding:0;list-style:none;}
#at-m05 ol.ways li{counter-increment:way;position:relative;padding:18px 0 18px 56px;border-top:1px solid var(--ai-border);margin:0;}
#at-m05 ol.ways li:last-child{border-bottom:1px solid var(--ai-border);}
#at-m05 ol.ways li::before{content:counter(way);position:absolute;left:0;top:18px;width:34px;height:34px;border:1.5px solid var(--accent);color:var(--accent-dark);border-radius:50%;font-family:var(--serif);font-weight:700;font-size:16px;display:flex;align-items:center;justify-content:center;}
#at-m05 .ways .w-t{font-weight:600;font-size:17px;display:block;margin-bottom:3px;}
#at-m05 .ways .w-d{color:var(--ai-muted);font-size:15.5px;}
/* figure */
#at-m05 .figure{margin:30px 0 8px;}
#at-m05 .figure svg{width:100%;height:auto;display:block;}
#at-m05 .figure figcaption{font-size:14px;color:var(--ai-muted);margin-top:14px;text-align:center;max-width:56ch;margin-left:auto;margin-right:auto;}
/* compare table */
#at-m05 table.compare{width:100%;border-collapse:collapse;margin:8px 0 6px;font-size:15.5px;}
#at-m05 table.compare caption{text-align:left;font-size:12.5px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--ai-muted);margin-bottom:14px;}
#at-m05 table.compare th{font-weight:600;text-align:left;padding:12px 14px;border-bottom:2px solid var(--ai-border);vertical-align:bottom;background:none;}
#at-m05 table.compare th.old{color:var(--slate);}
#at-m05 table.compare th.new{color:var(--accent-dark);}
#at-m05 table.compare td{padding:13px 14px;border-bottom:1px solid var(--ai-border);vertical-align:top;color:var(--ai-text);}
#at-m05 table.compare td.lab{font-weight:600;color:var(--ai-muted);width:26%;}
#at-m05 table.compare tr:last-child td{border-bottom:none;}
/* precise */
#at-m05 .precise{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:18px 22px;margin:24px 0;}
#at-m05 .precise .tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--slate);margin-bottom:9px;}
#at-m05 .precise p{font-size:15.5px;line-height:1.6;margin:0;}
#at-m05 .precise p + p{margin-top:10px;}
/* P&L */
#at-m05 .pl{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:24px 26px;margin:8px 0;}
#at-m05 .pl .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);margin-bottom:12px;}
#at-m05 .pl p{font-size:16px;}
#at-m05 .pl p:last-child{margin-bottom:0;}
/* case */
#at-m05 .case{border:1px solid var(--ai-border);border-top:3px solid var(--accent);border-radius:8px;padding:26px 28px;margin:8px 0;background:#fffdfb;}
#at-m05 .case .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:6px;}
#at-m05 .case h3{margin-top:8px;font-family:var(--serif);font-size:21px;font-weight:700;}
#at-m05 .case .meta{font-size:13.5px;color:var(--ai-muted);margin:0 0 16px;}
#at-m05 .case p{font-size:16px;}
#at-m05 .case .takeaway{margin-top:16px;padding-top:16px;border-top:1px solid var(--ai-border);font-size:15.5px;}
#at-m05 .case .takeaway b{color:var(--accent-dark);}
#at-m05 .case .source{font-size:13px;color:var(--ai-muted);margin-top:14px;}
/* lab */
#at-m05 .lab{border:1px solid var(--ai-border);border-left:3px solid var(--ochre);border-radius:8px;padding:24px 26px;margin:18px 0;background:#fdfbf6;}
#at-m05 .lab .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ochre);margin-bottom:6px;}
#at-m05 .lab h3{margin:6px 0 4px;font-size:18px;}
#at-m05 .lab .time{font-size:13px;color:var(--ai-muted);margin:0 0 14px;}
#at-m05 .lab ol{margin:0 0 12px;padding-left:20px;}
#at-m05 .lab ol li{margin:0 0 9px;font-size:15.5px;}
#at-m05 .lab .watch{font-size:15px;color:var(--ai-text);background:var(--surface);border-radius:6px;padding:13px 16px;margin-top:12px;}
#at-m05 .lab .watch b{color:var(--ochre);}
#at-m05 .lab .prompt{font-family:var(--mono);font-size:13.5px;line-height:1.55;background:#2a2722;color:#ede8df;border-radius:6px;padding:14px 16px;margin:10px 0;white-space:pre-wrap;overflow-wrap:anywhere;}
#at-m05 .lab .prompt .c{color:#d9b36b;}
#at-m05 .lab .scorecard{list-style:none;margin:6px 0 12px;padding:0;}
#at-m05 .lab .scorecard li{position:relative;padding:9px 0 9px 26px;font-size:15.5px;border-top:1px solid var(--ai-border);margin:0;}
#at-m05 .lab .scorecard li:first-child{border-top:none;}
#at-m05 .lab .scorecard li::before{content:"?";position:absolute;left:2px;top:9px;color:var(--ochre);font-weight:700;font-family:var(--serif);}
#at-m05 .lab .scorecard b{font-weight:600;}
/* check */
#at-m05 .check .quiz{counter-reset:qz;list-style:none;margin:0 0 26px;padding:0;}
#at-m05 .check .quiz>li{counter-increment:qz;border:1px solid var(--ai-border);border-radius:8px;background:#fff;padding:18px 20px;margin:0 0 14px;}
#at-m05 .check .quiz>li:last-child{margin-bottom:0;}
#at-m05 .check .q{font-weight:600;font-size:16px;margin:0 0 14px;display:flex;gap:11px;align-items:flex-start;}
#at-m05 .check .q::before{content:counter(qz);font-family:var(--serif);font-weight:700;color:var(--accent);flex:0 0 auto;}
#at-m05 .check .opts{margin:0;padding:0;list-style:none;}
#at-m05 .check .opts li{font-size:15.5px;line-height:1.5;padding:8px 0 8px 32px;position:relative;color:var(--ai-text);margin:0;border-top:1px solid var(--ai-border);}
#at-m05 .check .opts li:first-child{border-top:none;}
#at-m05 .check .opts li::before{content:attr(data-k);position:absolute;left:2px;top:8px;font-weight:700;color:var(--accent);}
#at-m05 .check .answerkey{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--accent);border-radius:8px;padding:20px 22px;}
#at-m05 .check .answerkey .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:12px;}
#at-m05 .check .answerkey p{font-size:15px;line-height:1.55;margin:0 0 12px;color:var(--ai-muted);}
#at-m05 .check .answerkey p:last-child{margin-bottom:0;}
#at-m05 .check .answerkey b{color:var(--accent-dark);font-weight:700;}
/* glossary */
#at-m05 .glossary{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:24px 26px;}
#at-m05 .glossary dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:10px 18px;}
#at-m05 .glossary dt{font-weight:600;font-size:15px;color:var(--accent-dark);}
#at-m05 .glossary dd{margin:0;font-size:15px;color:var(--ai-text);}
/* tie-back */
#at-m05 .tieback{border-left:3px solid var(--accent);padding:6px 0 6px 22px;margin:6px 0;}
#at-m05 .tieback .kicker{margin-bottom:8px;}
#at-m05 .tieback p{font-size:16px;color:var(--ai-text);margin:0;}
#at-m05 .tieback b{color:var(--accent-dark);}
/* footer */
#at-m05 .at-foot{padding:44px 0 52px;}
#at-m05 .recap{background:var(--accent-dark);color:#f7f1f0;border-radius:8px;padding:30px 32px;margin:0 0 28px;}
#at-m05 .recap .kicker{color:var(--gold);margin-bottom:14px;}
#at-m05 .recap p{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2.8vw,22px);line-height:1.4;margin:0;color:#fbf6f2;}
#at-m05 .recap em{color:var(--gold);font-style:italic;}
#at-m05 .nav{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px;align-items:center;}
#at-m05 .nav a{display:inline-flex;align-items:center;gap:9px;font-weight:600;color:var(--accent-dark);font-size:15.5px;text-decoration:none;}
#at-m05 .nav a.prev{color:var(--ai-muted);}
#at-m05 .nav .soon{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ai-muted);font-size:15.5px;}
#at-m05 .nav .soon .pill{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ochre);background:rgba(154,107,34,.14);border-radius:999px;padding:3px 9px;}
#at-m05 .nav svg{transition:transform .2s ease;}
#at-m05 .nav a.prev:hover svg{transform:translateX(-3px);}
#at-m05 .foot-meta{font-size:13.5px;color:var(--ai-muted);border-top:1px solid var(--ai-border);padding-top:22px;}
#at-m05 .foot-meta .brand{margin-bottom:8px;font-size:15px;}
#at-m05 .foot-meta .brand span{color:var(--ochre);}
@media (max-width:560px){
#at-m05{font-size:16px;}
#at-m05 .wrap{padding:0 20px;}
#at-m05 .cover{padding:40px 0 32px;}
#at-m05 .glossary dl{grid-template-columns:1fr;gap:4px 0;}
#at-m05 .glossary dd{margin-bottom:12px;}
#at-m05 table.compare td.lab{width:auto;}
#at-m05 ol.ways li{padding-left:48px;}
}
@media (prefers-reduced-motion:reduce){#at-m05 *{transition:none!important;}}
</style>

<div id="at-m05">
<header class="masthead">
<div class="wrap">
<div class="brand">
<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span class="brand-name">Ara<span>Grow</span></span>
</div>
<div class="masthead-meta">
<a class="back-link" href="/blog/architecting-trust-course">&larr; Guide overview</a><br>
Executive Guide · Part 5 of 7<br>
Measuring Trust
</div>
</div>
</header>
<div class="cover">
<div class="wrap">
<p class="eyebrow">Module 05</p>
<h1>Measuring Trust</h1>
<p class="subtitle">"The demo went great" is not a quality bar. This module is about how you actually prove an AI works, and hold a vendor to it.</p>
<div class="objective">
<p class="kicker">By the end of this module you'll be able to</p>
<ul>
<li>Explain why you can't judge an AI by eye, and what to measure instead.</li>
<li>Use three plain checks to catch the most common failure, a confident, made-up answer.</li>
<li>Ask any vendor five questions that reveal whether they actually measure quality, or just hope for it.</li>
</ul>
</div>
</div>
</div>
<section>
<div class="wrap">
<p class="kicker">Explainer · why vibes don't scale</p>
<h2>You can't eyeball an AI</h2>
<p>The most dangerous moment in an AI project is the demo that goes well. A handful of impressive answers feels like proof, but you've seen, by now, that the same system can answer differently next time, and that its most convincing failures are the ones that <em>look</em> right. Spot-checking a few replies tells you almost nothing about the thousands of real interactions to come. None of this makes demos worthless; they're genuinely useful for early exploration and for getting everyone aligned on what "good" even looks like. They just can't stand in for measurement before the system meets real customers.</p>
<p>What you need is the same discipline you'd expect for any other software: <strong>tests.</strong> In the AI world these are called <strong>evaluations</strong>, or "evals," a structured way to measure whether the system is doing its job across many cases, not just the cheerful ones in the demo. The rule is simple: you wouldn't ship software with no testing, so don't ship AI on vibes.</p>
<p>The catch is that grading AI output is harder than grading ordinary software. Traditional measures just checked whether the answer's words overlapped with a "correct" reference: useful for a translation, useless for an open-ended answer that could be phrased a hundred good ways. A reply can be worded completely differently from the reference and still be perfect, or echo it word-for-word and still be wrong. So the field needed a better way to measure <em>meaning.</em></p>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Explainer · grading at scale</p>
<h2>Using AI to grade AI, and three checks that catch the big failure</h2>
<p>The breakthrough was deceptively simple: use a strong AI as the <strong>grader</strong>. You hand a capable model an answer, a clear rubric, and the question, and ask it to score the result, at a scale and speed no human team could match. This is called <strong>LLM-as-a-judge</strong>, and (as the research below shows) it agrees with human reviewers often enough to be genuinely useful.</p>
<p>That grading approach powers the most practical quality framework for the systems most businesses actually deploy: an AI that <strong>looks things up in your documents before answering</strong> (the technical name is "retrieval-augmented generation," or RAG). For those systems, three checks catch the failure executives fear most: a confident answer that's simply <em>made up.</em></p>
<figure class="figure">
<svg viewBox="0 0 700 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A pipeline: the question leads to retrieved information, which leads to the answer. Check 1, context relevance, sits between question and information. Check 2, groundedness, sits between information and answer. Check 3, answer relevance, spans from the question to the answer.">
<defs><marker id="ar" markerWidth="9" markerHeight="9" refX="7" refY="4.5" orient="auto"><path d="M0 0 L8 4.5 L0 9 Z" fill="#8a857d"/></marker></defs>
<rect x="18" y="150" width="170" height="58" rx="5" fill="#fffdfb" stroke="#7B1818" stroke-width="1.4"/>
<text x="103" y="184" text-anchor="middle" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="#5a1212">The question</text>
<rect x="265" y="150" width="170" height="58" rx="5" fill="#efe9e3" stroke="#d8d3ca" stroke-width="1.2"/>
<text x="350" y="178" text-anchor="middle" font-family="Inter,sans-serif" font-size="14.5" font-weight="600" fill="#28251d">What it found</text>
<text x="350" y="196" text-anchor="middle" font-family="Inter,sans-serif" font-size="11.5" fill="#5c5851">in your documents</text>
<rect x="512" y="150" width="170" height="58" rx="5" fill="#7B1818"/>
<text x="597" y="184" text-anchor="middle" font-family="Inter,sans-serif" font-size="15" font-weight="600" fill="#f7f1f0">The answer</text>
<line x1="190" y1="179" x2="263" y2="179" stroke="#8a857d" stroke-width="1.4" marker-end="url(#ar)"/>
<line x1="437" y1="179" x2="510" y2="179" stroke="#8a857d" stroke-width="1.4" marker-end="url(#ar)"/>
<circle cx="226" cy="92" r="13" fill="none" stroke="#7B1818" stroke-width="1.5"/>
<text x="226" y="97" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="13" font-weight="700" fill="#5a1212">1</text>
<text x="226" y="48" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#5a1212">Context relevance</text>
<text x="226" y="65" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#5c5851">right info found?</text>
<line x1="226" y1="106" x2="226" y2="172" stroke="#d8d3ca" stroke-width="1" stroke-dasharray="3 3"/>
<circle cx="474" cy="92" r="13" fill="none" stroke="#7B1818" stroke-width="1.5"/>
<text x="474" y="97" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="13" font-weight="700" fill="#5a1212">2</text>
<text x="474" y="48" text-anchor="middle" font-family="Inter,sans-serif" font-size="13" font-weight="600" fill="#5a1212">Groundedness</text>
<text x="474" y="65" text-anchor="middle" font-family="Inter,sans-serif" font-size="11" fill="#5c5851">answer backed by it?</text>
<line x1="474" y1="106" x2="474" y2="172" stroke="#d8d3ca" stroke-width="1" stroke-dasharray="3 3"/>
<path d="M103 210 Q350 290 597 210" fill="none" stroke="#9A6B22" stroke-width="1.3" stroke-dasharray="4 3"/>
<circle cx="350" cy="262" r="13" fill="#fdfbf6" stroke="#9A6B22" stroke-width="1.5"/>
<text x="350" y="267" text-anchor="middle" font-family="'Space Grotesk',sans-serif" font-size="13" font-weight="700" fill="#7A5418">3</text>
<text x="350" y="290" text-anchor="middle" font-family="Inter,sans-serif" font-size="12.5" font-weight="600" fill="#7A5418">Answer relevance: did it answer the question?</text>
</svg>
<figcaption>The "RAG triad." Each check guards one junction in how an AI builds an answer from your documents. Together they localize where things went wrong.</figcaption>
</figure>
<ol class="ways">
<li>
<span class="w-t">Context relevance: did it pull the right information?</span>
<span class="w-d">Before answering, the system searches your documents. If it grabs the wrong passages, everything downstream is built on sand.</span>
</li>
<li>
<span class="w-t">Groundedness: is the answer actually supported by what it found?</span>
<span class="w-d">The most important check. It catches <em>hallucination</em>, the AI stating something the source never said. Every claim should trace back to the retrieved text.</span>
</li>
<li>
<span class="w-t">Answer relevance: did it actually answer the question?</span>
<span class="w-d">A reply can be perfectly accurate and still miss the point. This confirms the answer addresses what was actually asked.</span>
</li>
</ol>
<table class="compare" style="margin-top:30px;">
<caption>How quality measurement changed</caption>
<thead>
<tr><th class="lab"></th><th class="old">The old way</th><th class="new">The modern way</th></tr>
</thead>
<tbody>
<tr><td class="lab">What it checks</td><td>Word overlap with a "correct" answer.</td><td>Meaning, accuracy, and groundedness.</td></tr>
<tr><td class="lab">Open-ended answers</td><td>Breaks down: many good answers look "wrong."</td><td>Handles them: judges the substance, not the phrasing.</td></tr>
<tr><td class="lab">Catches made-up facts?</td><td>No.</td><td>Yes: that's what groundedness is for.</td></tr>
</tbody>
</table>
<div class="precise">
<span class="tag">What the triad doesn't catch</span>
<p>Three refinements. First, "meaning" isn't one fixed thing: what you measure depends on the job. A document-lookup system lives or dies on <em>faithfulness to its sources</em>; a conversational agent is judged more on helpfulness and safety. Match the checks to the application rather than reaching for one universal score. Second, the triad is a strong automated <em>baseline</em>, not a complete one: a system can retrieve the right document, ground every sentence in it, and still omit a critical caveat or misread a subtle passage. Third, groundedness itself leans on the retrieval step and on cleanly separating each claim: if the right source was never pulled, or a single claim spans several documents, the check can misfire. For high-stakes answers, keep occasional human audits alongside the automated score.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Your P&amp;L</p>
<h2>Trust, but require the receipts</h2>
<div class="pl">
<span class="tag">The business stake</span>
<p>An AI system with no evaluation is an unmonitored one: you're flying blind, and you'll find out it drifted off course from an angry customer, not a dashboard. Worse, the AI may have looked fine at launch and quietly degraded when the underlying model was updated. Measurement isn't a one-time gate before go-live; it's an ongoing instrument you keep watching, because the ground moves underneath these systems. Right-size it to the stakes: not every deployment needs a full release pipeline, but even a small one benefits from a stable set of test questions you re-run after any major change.</p>
<p>So the practical move with any vendor or internal team is to <strong>require the receipts.</strong> Don't accept "it works great"; ask how they know, on <em>your</em> data, and ask to see it. The five questions in the lab below do exactly that. A serious partner will have ready answers. A vendor whose only evidence is a polished demo has just shown you the size of the risk. One fair exception: a genuinely early proof-of-concept may not have a full eval suite yet, and there the good sign isn't a finished scorecard but a vendor who offers to build and run the evaluations <em>with</em> you, instead of waving at "great performance."</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Evidence file</p>
<h2>Can you really grade AI with AI? The research says yes, mostly.</h2>
<div class="case">
<span class="tag">Peer-reviewed research · 2023</span>
<h3>Two studies that made automated evaluation credible</h3>
<p class="meta">MT-Bench (Zheng et al.) · G-Eval (Liu et al.)</p>
<p>It's fair to be skeptical of using AI to grade AI. The research is reassuring on the central question. In one widely cited study, a strong model acting as judge agreed with human reviewers <strong>more than 80% of the time</strong>, about the same rate at which two humans agree with <em>each other.</em> A second study showed that this kind of AI grading lined up with human judgment far better than the old word-overlap measures it replaced.</p>
<p>The same research is honest about the limits, and so should you be. AI judges have measurable biases: they tend to favor longer answers, and sometimes their own writing style. Some of that can be dialed down (normalizing for length, randomizing the order answers are shown in, writing the rubric carefully) but it doesn't disappear, and "more than 80%" is still not 100%. That's why mature teams treat automated evals as a powerful way to watch quality <em>at scale</em>, backed by regular human spot-checks on the cases that matter most. It's an instrument, not an oracle.</p>
<div class="takeaway">
<b>Why this matters to you.</b> Automated evaluation is credible enough to demand and cheap enough to run continuously, which removes the usual excuse of "quality is too hard to measure." When a vendor says it can't be measured, they're a decade out of date. When they say it's measured perfectly, they're overselling. The truth in between is exactly what you want a partner to understand.
</div>
<p class="source">Sources: Zheng et al., "Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena," 2023; Liu et al., "G-Eval," 2023; RAG-triad framework from the TruLens open-source project (TruEra). Open tools in this space include TruLens, Ragas, DeepEval, and Promptfoo.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Labs · run these yourself</p>
<h2>Be the grader</h2>
<p>The first lab lets you watch an AI catch a made-up fact. The other two are the habits you'll use to keep any AI, or any vendor, honest. As a reminder from the disclaimer up top: use made-up values only, never real customer data or anything confidential.</p>
<div class="lab">
<span class="tag">Lab 1 · hands-on</span>
<h3>Catch the hallucination</h3>
<p class="time">~4 minutes · any chatbot</p>
<ol>
<li>Paste this into a fresh chat. You're asking the AI to act as a groundedness checker:</li>
</ol>
<div class="prompt"><span class="c">You are a fact-checker. Below is a SOURCE and an ANSWER.
Check each claim in the ANSWER. For each, say whether the
SOURCE supports it. Flag anything not supported.</span>
SOURCE: "Northwind Trading was founded in 2011 in Ohio.
It has 40 employees and sells industrial sensors."
ANSWER: "Northwind Trading, founded in 2011 in Ohio, has
40 employees, sells industrial sensors, and was named
Ohio's Small Business of the Year in 2019."</div>
<div class="watch"><b>What to watch:</b> a capable model will confirm the first facts and flag the award claim as unsupported, the SOURCE never mentions it. That's <em>groundedness</em> in action: separating "what the documents say" from "what the AI added." This exact check, run automatically over thousands of answers, is how a serious system keeps itself honest.</div>
</div>
<div class="lab">
<span class="tag">Lab 2 · worksheet</span>
<h3>The vendor scorecard</h3>
<p class="time">~5 minutes · keep this one</p>
<p style="font-size:15.5px;margin-bottom:8px;">Five questions for any AI vendor or internal team. Score each answer as <em>specific</em> (good) or <em>reassuring but vague</em> (a flag):</p>
<ul class="scorecard">
<li><b>How do you measure answer quality on <em>our</em> data, not a generic benchmark?</b></li>
<li><b>What's your rate of made-up or unsupported answers, and how do you track it?</b></li>
<li><b>Can we see the test set, and re-run it ourselves?</b></li>
<li><b>When the underlying model updates, how do you catch a drop in quality before customers do?</b></li>
<li><b>Where do humans review, and which cases always get a human's eyes?</b></li>
</ul>
<div class="watch"><b>How to read it:</b> good answers sound like "we run a groundedness eval nightly against a 500-question set drawn from real tickets, and gate releases on it." Vague answers sound like "our model is state of the art and very accurate." The gap between those two is the gap between a partner and a risk.</div>
</div>
<div class="lab">
<span class="tag">Lab 3 · two-minute habit</span>
<h3>Run the triad by hand</h3>
<p class="time">~2 minutes · any AI answer that used a document</p>
<p style="font-size:15.5px;">Next time an AI gives you an answer based on a file, a search, or a knowledge base, run the three checks yourself before you trust it: <strong>(1)</strong> Did it pull from the right source? <strong>(2)</strong> Is every claim actually in that source, or did some appear from nowhere? <strong>(3)</strong> Did it answer what you actually asked? Do this a few times and it becomes instinct, and you'll start noticing the confident additions that aren't backed by anything. That instinct is the most valuable output of this whole module.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<div class="tieback">
<p class="kicker">Beyond your four questions</p>
<p>Modules 01 to 04 gave you a way to assess an AI's <b>risk</b>: what it sees, whose instructions reach it, what it can do, and where a human approves. This module adds the other half of the job: <b>proof that it works</b>, and works still. Risk control keeps the bad outcomes contained; measurement keeps the good outcomes real. In practice the two aren't separate tracks: an eval that flags biased or harmful answers is also a safety signal, and a control that limits what the AI can do will shape its quality. Treat them as two lenses on one system, not two silos. Module 06 brings both together into a single, practical playbook you can run, and the layered defenses that make AI safe enough to actually use.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Plain-language glossary</p>
<h2>The terms from this module</h2>
<div class="glossary">
<dl>
<dt>Evaluation ("eval")</dt>
<dd>A structured test that measures whether an AI does its job across many cases, the AI equivalent of software testing.</dd>
<dt>Hallucination</dt>
<dd>A confident answer the AI made up, stated as fact but not supported by any real source.</dd>
<dt>RAG</dt>
<dd>"Retrieval-augmented generation," an AI that looks things up in your documents before answering. The common business setup.</dd>
<dt>RAG triad</dt>
<dd>Three checks, context relevance, groundedness, and answer relevance, that find where an AI's answer went wrong.</dd>
<dt>LLM-as-a-judge</dt>
<dd>Using a strong AI to grade other AI output at scale. Agrees with humans often, but has biases.</dd>
<dt>Drift / regression</dt>
<dd>Quality silently dropping over time, often after the underlying model is updated. The reason evals must be ongoing.</dd>
</dl>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Check · lock in the one thing that matters</p>
<h2>Three quick questions</h2>
<p>Pick an answer for each, then check the key below.</p>
<div class="check">
<ol class="quiz">
<li>
<p class="q">Why are older measures (like word-overlap scores) a poor way to judge an AI's answers?</p>
<ul class="opts">
<li data-k="A">They run too slowly on modern hardware.</li>
<li data-k="B">They check whether the wording matches a reference, not whether the answer is correct or makes sense, so a good answer phrased differently looks "wrong."</li>
<li data-k="C">They only work in English.</li>
</ul>
</li>
<li>
<p class="q">In the "RAG triad," which check is designed to catch a made-up (hallucinated) fact?</p>
<ul class="opts">
<li data-k="A">Context relevance.</li>
<li data-k="B">Groundedness.</li>
<li data-k="C">Answer relevance.</li>
</ul>
</li>
<li>
<p class="q">What's the honest summary of "LLM-as-a-judge," using AI to grade AI?</p>
<ul class="opts">
<li data-k="A">It's perfect and replaces all human review.</li>
<li data-k="B">It's useless and should never be trusted.</li>
<li data-k="C">It agrees with humans often enough (about 80% or more) to be a powerful, scalable instrument, but it has biases, so it's paired with human spot-checks, not treated as an oracle.</li>
</ul>
</li>
</ol>
<div class="answerkey">
<span class="tag">Answer key</span>
<p><b>1. Answer: B.</b> Open-ended answers can be phrased many good ways. Word-overlap rewards matching the reference's words, not conveying the right meaning, and it can't catch a confident, made-up fact.</p>
<p><b>2. Answer: B.</b> Groundedness checks that every claim in the answer traces back to the source the AI retrieved. If a statement isn't supported by that source, it gets flagged, which is how you catch hallucination.</p>
<p><b>3. Answer: C.</b> The research supports using AI graders at scale and is honest about their limits. Demand measurement; don't accept claims of perfection.</p>
</div>
</div>
</div>
</section>
<div class="at-foot">
<div class="wrap">
<div class="recap">
<p class="kicker">The one line to remember</p>
<p>Don't ship AI on vibes. <em>Require measurement</em>, especially groundedness, to catch confident made-up answers, and keep measuring, because quality drifts.</p>
</div>
<div class="nav">
<a class="prev" href="/blog/architecting-trust-when-ai-can-act">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#5c5851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Previous: Module 04
</a>
<span class="soon">Next: Module 06, The Executive Playbook <span class="pill">Coming soon</span></span>
</div>
<div class="foot-meta">
<div class="brand"><span class="brand-name">Ara<span>Grow</span></span></div>
Architecting Trust: An Executive's Guide to AI Risk &amp; Readiness · Module 05 of 7<br>
Prepared by AraGrow LLC · David Aragó, Fractional CTO · Minneapolis · Bilingual EN / ES
</div>
</div>
</div>
</div>
