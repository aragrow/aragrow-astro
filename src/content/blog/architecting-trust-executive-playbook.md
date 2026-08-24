---
title: "Architecting Trust, Module 06: The Executive Playbook"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "The whole guide assembled into one posture: no single wall, layered defenses that each assume the last one fails, a separation of trust to contain the worst case, and a named owner for the day it goes wrong."
featuredImage: "/images/blog/architecting-trust-executive-playbook.webp"
featuredImageAlt: "Banner, The Executive Playbook: A Posture of Accountability, showing a defense scorecard, input filtering, action limits, isolated data, human authorization, and a named accountable owner."
featuredImageCaption: "No single wall, layered defenses that each assume the last fails, plus a named accountable owner."
order: 8
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
#at-m06{
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
#at-m06 *{box-sizing:border-box;}
#at-m06 .wrap{max-width:880px;margin:0 auto;padding:0 40px;}
#at-m06 a{color:var(--accent-dark);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}
#at-m06 strong{font-weight:600;}
#at-m06 em{font-style:italic;}
#at-m06 p{margin:0 0 18px;}
#at-m06 p:last-child{margin-bottom:0;}
#at-m06 h1,#at-m06 h2,#at-m06 h3{margin:0;}
/* masthead */
#at-m06 .masthead{border-bottom:1px solid var(--ai-border);padding:26px 0 24px;}
#at-m06 .masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
#at-m06 .brand{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-weight:700;letter-spacing:.01em;color:var(--accent);}
#at-m06 .brand-mark{width:26px;height:26px;flex:0 0 auto;}
#at-m06 .brand-name{font-size:18px;}
#at-m06 .brand-name span{color:var(--ochre);}
#at-m06 .masthead-meta{font-size:13px;color:var(--ai-muted);text-align:right;line-height:1.6;}
#at-m06 .masthead-meta a.back-link{color:var(--accent);text-decoration:none;font-weight:600;}
#at-m06 .masthead-meta a.back-link:hover{text-decoration:underline;}
/* cover */
#at-m06 .cover{padding:54px 0 40px;border-bottom:1px solid var(--ai-border);}
#at-m06 .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 18px;}
#at-m06 h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6.4vw,52px);line-height:1.06;letter-spacing:-.015em;margin:0 0 16px;}
#at-m06 .subtitle{font-family:var(--serif);font-weight:500;font-size:clamp(18px,3vw,22px);line-height:1.34;color:var(--ai-text);margin:0 0 26px;max-width:42ch;}
#at-m06 .objective{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:22px 24px;}
#at-m06 .objective .kicker{margin-bottom:12px;}
#at-m06 .objective ul{margin:0;padding:0;list-style:none;}
#at-m06 .objective li{position:relative;padding:0 0 0 24px;margin:0 0 9px;font-size:15.5px;}
#at-m06 .objective li:last-child{margin-bottom:0;}
#at-m06 .objective li::before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:var(--accent);}
/* sections */
#at-m06 section{padding:48px 0;border-bottom:1px solid var(--ai-border);}
#at-m06 .kicker{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 14px;}
#at-m06 h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,4.2vw,32px);line-height:1.14;letter-spacing:-.01em;margin:0 0 18px;}
#at-m06 h3{font-family:var(--sans);font-weight:600;font-size:17px;margin:28px 0 8px;}
/* analogy */
#at-m06 .analogy{border-left:3px solid var(--accent);padding:2px 0 2px 20px;margin:22px 0;color:var(--ai-text);}
#at-m06 .analogy p{margin:0;}
#at-m06 .analogy b{font-weight:600;}
/* pull standard */
#at-m06 .standard{background:var(--surface-2);border:1px solid var(--ai-border);border-radius:8px;padding:26px 28px;margin:22px 0;}
#at-m06 .standard p{font-family:var(--serif);font-weight:500;font-size:clamp(19px,2.7vw,22px);line-height:1.4;margin:0 0 8px;color:var(--ai-text);}
#at-m06 .standard cite{font-style:normal;font-size:14px;color:var(--ai-muted);}
/* defense-in-depth stack */
#at-m06 .figure{margin:28px 0 8px;}
#at-m06 .depth{border:1px solid var(--ai-border);border-radius:8px;overflow:hidden;}
#at-m06 .depth .threat,#at-m06 .depth .asset{padding:13px 18px;font-weight:600;font-size:15px;text-align:center;}
#at-m06 .depth .threat{background:#efe7da;color:#7A5418;}
#at-m06 .depth .asset{background:var(--accent-dark);color:#f7f1f0;}
#at-m06 .depth .layer{display:flex;justify-content:space-between;gap:16px;align-items:baseline;padding:13px 18px;border-top:1px solid var(--ai-border);background:rgba(123,24,24,0.05);}
#at-m06 .depth .layer .l-t{font-weight:600;font-size:14.5px;color:var(--accent-dark);flex:0 0 auto;}
#at-m06 .depth .layer .l-n{font-size:13px;color:var(--ai-muted);text-align:right;}
#at-m06 .depth .layer .q{font-family:var(--mono);font-size:11px;color:var(--accent);margin-left:8px;}
#at-m06 .figcap{font-size:14px;color:var(--ai-muted);margin:14px auto 0;text-align:center;max-width:56ch;}
/* precise */
#at-m06 .precise{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:18px 22px;margin:24px 0;}
#at-m06 .precise .tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--slate);margin-bottom:9px;}
#at-m06 .precise p{font-size:15.5px;line-height:1.6;margin:0;}
#at-m06 .precise p + p{margin-top:10px;}
/* P&L */
#at-m06 .pl{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:24px 26px;margin:8px 0;}
#at-m06 .pl .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);margin-bottom:12px;}
#at-m06 .pl p{font-size:16px;}
#at-m06 .pl p:last-child{margin-bottom:0;}
/* case */
#at-m06 .case{border:1px solid var(--ai-border);border-top:3px solid var(--accent);border-radius:8px;padding:26px 28px;margin:8px 0;background:#fffdfb;}
#at-m06 .case .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:6px;}
#at-m06 .case h3{margin-top:8px;font-family:var(--serif);font-size:21px;font-weight:700;}
#at-m06 .case .meta{font-size:13.5px;color:var(--ai-muted);margin:0 0 16px;}
#at-m06 .case p{font-size:16px;}
#at-m06 .case .takeaway{margin-top:16px;padding-top:16px;border-top:1px solid var(--ai-border);font-size:15.5px;}
#at-m06 .case .takeaway b{color:var(--accent-dark);}
#at-m06 .case .source{font-size:13px;color:var(--ai-muted);margin-top:14px;}
/* lab */
#at-m06 .lab{border:1px solid var(--ai-border);border-left:3px solid var(--ochre);border-radius:8px;padding:24px 26px;margin:18px 0;background:#fdfbf6;}
#at-m06 .lab .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ochre);margin-bottom:6px;}
#at-m06 .lab h3{margin:6px 0 4px;font-size:18px;}
#at-m06 .lab .time{font-size:13px;color:var(--ai-muted);margin:0 0 14px;}
#at-m06 .lab .checklist{list-style:none;margin:6px 0 12px;padding:0;}
#at-m06 .lab .checklist li{position:relative;padding:9px 0 9px 28px;font-size:15.5px;border-top:1px solid var(--ai-border);margin:0;}
#at-m06 .lab .checklist li:first-child{border-top:none;}
#at-m06 .lab .checklist li::before{content:"\2610";position:absolute;left:2px;top:8px;color:var(--ochre);font-weight:700;font-size:16px;}
#at-m06 .lab .checklist b{font-weight:600;}
#at-m06 .lab .watch{font-size:15px;color:var(--ai-text);background:var(--surface);border-radius:6px;padding:13px 16px;margin-top:12px;}
#at-m06 .lab .watch b{color:var(--ochre);}
/* check */
#at-m06 .check .quiz{counter-reset:qz;list-style:none;margin:0 0 26px;padding:0;}
#at-m06 .check .quiz>li{counter-increment:qz;border:1px solid var(--ai-border);border-radius:8px;background:#fff;padding:18px 20px;margin:0 0 14px;}
#at-m06 .check .quiz>li:last-child{margin-bottom:0;}
#at-m06 .check .q{font-weight:600;font-size:16px;margin:0 0 14px;display:flex;gap:11px;align-items:flex-start;}
#at-m06 .check .q::before{content:counter(qz);font-family:var(--serif);font-weight:700;color:var(--accent);flex:0 0 auto;}
#at-m06 .check .opts{margin:0;padding:0;list-style:none;}
#at-m06 .check .opts li{font-size:15.5px;line-height:1.5;padding:8px 0 8px 32px;position:relative;color:var(--ai-text);margin:0;border-top:1px solid var(--ai-border);}
#at-m06 .check .opts li:first-child{border-top:none;}
#at-m06 .check .opts li::before{content:attr(data-k);position:absolute;left:2px;top:8px;font-weight:700;color:var(--accent);}
#at-m06 .check .answerkey{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--accent);border-radius:8px;padding:20px 22px;}
#at-m06 .check .answerkey .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:12px;}
#at-m06 .check .answerkey p{font-size:15px;line-height:1.55;margin:0 0 12px;color:var(--ai-muted);}
#at-m06 .check .answerkey p:last-child{margin-bottom:0;}
#at-m06 .check .answerkey b{color:var(--accent-dark);font-weight:700;}
/* glossary */
#at-m06 .glossary{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:24px 26px;}
#at-m06 .glossary dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:10px 18px;}
#at-m06 .glossary dt{font-weight:600;font-size:15px;color:var(--accent-dark);}
#at-m06 .glossary dd{margin:0;font-size:15px;color:var(--ai-text);}
/* tie-back */
#at-m06 .tieback{border-left:3px solid var(--accent);padding:6px 0 6px 22px;margin:6px 0;}
#at-m06 .tieback .kicker{margin-bottom:8px;}
#at-m06 .tieback p{font-size:16px;color:var(--ai-text);margin:0;}
#at-m06 .tieback b{color:var(--accent-dark);}
/* footer */
#at-m06 .at-foot{padding:44px 0 52px;}
#at-m06 .recap{background:var(--accent-dark);color:#f7f1f0;border-radius:8px;padding:30px 32px;margin:0 0 28px;}
#at-m06 .recap .kicker{color:var(--gold);margin-bottom:14px;}
#at-m06 .recap p{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2.8vw,22px);line-height:1.4;margin:0;color:#fbf6f2;}
#at-m06 .recap em{color:var(--gold);font-style:italic;}
#at-m06 .nav{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px;align-items:center;}
#at-m06 .nav a{display:inline-flex;align-items:center;gap:9px;font-weight:600;color:var(--accent-dark);font-size:15.5px;text-decoration:none;}
#at-m06 .nav a.prev{color:var(--ai-muted);}
#at-m06 .nav .soon{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ai-muted);font-size:15.5px;}
#at-m06 .nav .soon .pill{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ochre);background:rgba(154,107,34,.14);border-radius:999px;padding:3px 9px;}
#at-m06 .nav svg{transition:transform .2s ease;}
#at-m06 .nav a.prev:hover svg{transform:translateX(-3px);}
#at-m06 .nav a.next:hover svg{transform:translateX(3px);}
#at-m06 .foot-meta{font-size:13.5px;color:var(--ai-muted);border-top:1px solid var(--ai-border);padding-top:22px;}
#at-m06 .foot-meta .brand{margin-bottom:8px;font-size:15px;}
#at-m06 .foot-meta .brand span{color:var(--ochre);}
@media (max-width:560px){
#at-m06{font-size:16px;}
#at-m06 .wrap{padding:0 20px;}
#at-m06 .cover{padding:40px 0 32px;}
#at-m06 .glossary dl{grid-template-columns:1fr;gap:4px 0;}
#at-m06 .glossary dd{margin-bottom:12px;}
#at-m06 .depth .layer{flex-direction:column;align-items:flex-start;gap:4px;}
#at-m06 .depth .layer .l-n{text-align:left;}
}
@media (prefers-reduced-motion:reduce){#at-m06 *{transition:none!important;}}
</style>

<div id="at-m06">
<header class="masthead">
<div class="wrap">
<div class="brand">
<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span class="brand-name">Ara<span>Grow</span></span>
</div>
<div class="masthead-meta">
<a class="back-link" href="/blog/architecting-trust-course">&larr; Guide overview</a><br>
Executive Guide · Part 6 of 7<br>
The Executive Playbook
</div>
</div>
</header>
<div class="cover">
<div class="wrap">
<p class="eyebrow">Module 06</p>
<h1>The Executive Playbook</h1>
<p class="subtitle">Everything so far, assembled into one practical posture: no single wall, layered defenses, and an owner who's accountable when it matters.</p>
<div class="objective">
<p class="kicker">By the end of this module you'll be able to</p>
<ul>
<li>Explain why "defense in depth," not one perfect fix, is the only honest way to secure AI.</li>
<li>Name the layers you should expect in any serious AI deployment, and where each one fits.</li>
<li>Put a name to who owns AI risk, and what happens the day something goes wrong.</li>
</ul>
</div>
</div>
</div>
<section>
<div class="wrap">
<p class="kicker">Explainer · the mindset that ties it together</p>
<h2>No single wall, only layers</h2>
<p>By now the pattern is unmistakable. The AI can't tell instructions from data (Module 01). The attacks are made of words and top every risk list (Module 02). You can't filter them out reliably (Module 03). And the moment AI can act, the stakes turn financial and legal (Module 04). There is no one fix that makes all of this go away. Anyone who sells you that fix is selling the risk.</p>
<p>So serious teams stop looking for a wall and start building <strong>layers</strong>, the security discipline called <em>defense in depth.</em> Each layer assumes the one before it will eventually fail, and exists to contain the damage when it does. A filter might catch the lazy attacks; if one slips through, least-privilege limits what it can reach; if it reaches something, a human gate stops the irreversible action; if something still happens, monitoring catches it and governance owns the response. No layer is perfect. The <em>stack</em> is what keeps you safe.</p>
<p>This isn't pessimism; it's the standard every other part of your business already meets. Why insist on it here? Because of a hard truth about security math:</p>
<div class="standard">
<p>"In application security, 99% is a failing grade."</p>
<cite>Simon Willison, who coined the term "prompt injection"</cite>
</div>
<p>A spam filter that misses 1% is a minor annoyance. A security control that fails 1% of the time is a disaster, because an attacker simply tries a hundred times. That's why you can never rest the whole defense on a single probabilistic check: a filter, a clever prompt rule, "the model is well-behaved." Each is a useful layer and a terrible foundation. You design so that being wrong 1% of the time is <em>survivable</em>, not catastrophic.</p>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Explainer · the playbook itself</p>
<h2>The layers to expect, and demand</h2>
<p>Here is the whole guide as a single picture. Read it from the threat at the top down to what you're protecting at the bottom. Each band is a layer you should expect in any serious deployment, and each maps to one of the questions you've been carrying since the introduction.</p>
<figure class="figure">
<div class="depth">
<div class="threat">⚠ &nbsp;The threat: a hostile instruction, typed or hidden in content</div>
<div class="layer"><span class="l-t">Governance &amp; ownership</span><span class="l-n">A named owner, a policy for what AI may touch, an incident plan</span></div>
<div class="layer"><span class="l-t">Monitoring &amp; logging</span><span class="l-n">Records of what the AI saw and did, so you can detect and investigate</span></div>
<div class="layer"><span class="l-t">Filters &amp; guardrails</span><span class="l-n">A speed bump for lazy attacks, never the wall</span></div>
<div class="layer"><span class="l-t">Isolate untrusted input <span class="q">Q2</span></span><span class="l-n">Separate outside content from privileged action (see below)</span></div>
<div class="layer"><span class="l-t">Limit what it can see <span class="q">Q1</span></span><span class="l-n">Least data: the AI reaches only what its job needs</span></div>
<div class="layer"><span class="l-t">Limit what it can do <span class="q">Q3</span></span><span class="l-n">Least privilege: read over write, no powers it doesn't need</span></div>
<div class="layer"><span class="l-t">Human-in-the-loop <span class="q">Q4</span></span><span class="l-n">A person confirms the high-stakes, irreversible actions</span></div>
<div class="layer"><span class="l-t">Continuous measurement</span><span class="l-n">Evals &amp; groundedness checks catch quality drift (Module 05)</span></div>
<div class="asset">Your data, your money, your reputation</div>
</div>
<p class="figcap">Defense in depth: every layer assumes the one above it can fail. The threat has to beat all of them; you only need most of them to hold.</p>
</figure>
<p style="margin-top:24px;">Notice what this does to the vendor conversation. Instead of asking the unanswerable "is it safe?", you can ask "show me your layers." A serious answer walks down this stack. A weak answer names one band, usually the filter, and stops. The number of layers a vendor can describe is a fast, reliable read on how seriously they've thought about your risk. Not every deployment needs every layer at full depth (a read-only internal helper isn't a payments agent) but any credible vendor should be able to speak to access control, change management, and what happens after an incident, not just content filtering.</p>
<div class="precise">
<span class="tag">Layers only count if they fail differently</span>
<p>One caution about the stack: layers help only when they fail <em>independently.</em> Two content filters running the same underlying model are barely two layers: the prompt that fools one tends to fool the other, so they fail together. The controls worth adding are the ones that fail in a different way from what you already have: a human approval, network segmentation, a separate enforcement service. When you count a vendor's layers, or your own, count the <em>diverse</em> ones, not repeats of the same idea.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Explainer · the gold-standard layer</p>
<h2>Separation of trust: never let the dangerous input drive the powerful hand</h2>
<p>One layer deserves a closer look, because it's the most direct answer to the lethal trifecta. The idea, sometimes called the <strong>dual-LLM</strong> or "separation of trust" pattern, is to split the work between two AIs that don't trust each other.</p>
<p>One AI is <strong>powerful but sheltered</strong>: it can use tools and touch private data, but it never reads raw untrusted content directly. The other is <strong>exposed but powerless</strong>: it handles the messy outside content, the emails, documents, web pages, but has no tools and no access to anything sensitive. The two communicate only through a narrow, controlled channel. A poisoned document can hijack the powerless reader all it likes; that reader has nothing worth stealing and no buttons to press.</p>
<div class="analogy">
<p><b>The analogy.</b> Think of bomb disposal. One specialist examines the suspicious package from behind shielding and relays only careful, structured observations. The operator with the tools acts on those observations but never touches the package directly. Neither person alone can be both tricked <em>and</em> dangerous. That separation is the whole point.</p>
</div>
<p>You don't need to build this yourself. You need to recognize it as the strongest structural defense available, and to ask any vendor a pointed version of it: <strong>"When your AI reads untrusted content, what stops that content from directly driving the parts that have access and can take action?"</strong> A thoughtful answer describes some form of separation. A blank stare tells you the trifecta is wide open.</p>
<div class="precise">
<span class="tag">Separation isn't a silver bullet</span>
<p>Two cautions before you treat this as a finish line. The separation only holds if the boundary between the two AIs is carefully designed: if the powerful, sheltered side acts on a summary that still carries the attacker's instructions, the injection simply rides across the channel. That's why the interface between them matters as much as the split itself: structured, validated, tightly defined messages rather than free-flowing text. And in real systems untrusted content can sneak into privileged places through side doors, logs, debug output, a monitoring dashboard someone reads. Making sure the powerful side <em>truly</em> never touches raw outside data takes deliberate threat modeling, not just two boxes on a diagram.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Your P&amp;L</p>
<h2>Someone has to own the day it goes wrong</h2>
<div class="pl">
<span class="tag">The business stake</span>
<p>Layers are technical; ownership is not. The most common failure in AI risk isn't a missing filter; it's that <em>no one is accountable for the system as a whole.</em> The model is the vendor's, the data is IT's, the use case is a business unit's, and when something breaks, everyone points sideways. The fix costs nothing but a decision: name a person who owns AI risk, give them the authority to say "not yet," and make sure there's a written plan for the day an AI sends the wrong thing or invents the wrong fact. In a larger organization that "person" can be a role or a small governance council rather than one individual; what matters is that they hold real authority over deployment decisions and a mandate to coordinate security, evaluation, and incident response.</p>
<p>This is also where the cheapest-insurance argument peaks. Governance, a clear policy on what data and actions AI may touch, a vendor contract that includes the right to see evaluations, and a simple incident playbook, is a few meetings. The alternative is improvising those answers in public, after the incident, with a customer or a regulator watching. Match the weight to the risk: a small, low-stakes deployment can run on a one-page policy and a checklist, while a regulated or high-impact use earns formal review, audits, and board-level visibility. Build the boring layer now.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Evidence file</p>
<h2>The people building these systems say there's no silver bullet</h2>
<div class="case">
<span class="tag">Public statements · 2025</span>
<h3>When the vendors themselves concede the point</h3>
<p class="meta">OpenAI · the UK's National Cyber Security Centre</p>
<p>You don't have to take a consultant's word that prompt injection can't be fully solved. In late 2025, as AI assistants gained the ability to browse and act on the open web, OpenAI stated plainly that prompt injection is unlikely to ever be completely eliminated, comparing it to scams and social engineering, which we manage but never "solve." Around the same time, the UK's national cyber agency warned that these attacks against generative AI may never be fully mitigated. Permanent, though, is not the same as unmanageable: better architectures, tooling, and monitoring can drive the risk down a great deal. The message is realism about a residual that never quite reaches zero, not fatalism.</p>
<p>This is the strongest possible support for everything in this module. When the companies with the most to gain from claiming "we fixed it" instead tell you the problem is permanent, the conclusion is clear: stop waiting for the fix, and build for containment. Reducing and managing the risk, with layers, separation, human gates, and governance, isn't the cautious option. It's the only honest one.</p>
<div class="takeaway">
<b>Why this closes the case.</b> The goal of AI security was never a perfect system; it doesn't exist, and its makers say so. The goal is a system whose failures are small, contained, and recoverable. That's a posture you can build today, and it's exactly what the playbook above describes.
</div>
<p class="source">Sources: OpenAI public statements on prompt injection and the ChatGPT "agent mode" browser, December 2025 (reported by Fortune and others); UK National Cyber Security Centre guidance on prompt injection, 2025. The "99% is a failing grade" standard: Simon Willison.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Labs · run these yourself</p>
<h2>Build your stack, name your owner</h2>
<p>These three labs turn the playbook into something you can actually hand to a team. Do them on a real or planned AI deployment.</p>
<div class="lab">
<span class="tag">Lab 1 · worksheet</span>
<h3>Build your defense stack</h3>
<p class="time">~8 minutes · a real or planned AI tool</p>
<p style="font-size:15.5px;margin-bottom:8px;">Walk down the layers from the diagram. For each, write "have it," "partial," or "missing":</p>
<ul class="checklist">
<li><b>Limit what it can see</b>: does it reach only the data its job needs?</li>
<li><b>Limit what it can do</b>: read-only where possible; no unused powers?</li>
<li><b>Isolate untrusted input</b>: is outside content kept away from privileged action?</li>
<li><b>Human-in-the-loop</b>: is a person required for the irreversible actions?</li>
<li><b>Filters / guardrails</b>: present, but treated as a speed bump, not the wall?</li>
<li><b>Monitoring &amp; logging</b>: can you see later what it saw and did?</li>
<li><b>Continuous measurement</b>: are quality and groundedness tracked over time?</li>
<li><b>Governance</b>: named owner, data/action policy, incident plan?</li>
</ul>
<div class="watch"><b>How to read it:</b> every "missing" is a single point of failure. You don't need all eight to be perfect; you need enough that no one failure reaches the bottom of the diagram. Two or three "missing" in the lower layers (data, privilege, human gate) is where the real exposure usually hides.</div>
</div>
<div class="lab">
<span class="tag">Lab 2 · two-minute exercise</span>
<h3>Find your single point of failure</h3>
<p class="time">~3 minutes · no tools needed</p>
<p style="font-size:15.5px;">List everything your AI plan is relying on <em>alone</em> to keep it safe: a vendor's filter, a system prompt that says "never do X," the belief that "our model is well-behaved." For each one, apply the 99% standard: <strong>assume it fails once in a hundred times. What's the next layer that catches it?</strong> If your honest answer for any item is "nothing," you've just found the most important thing to fix before launch, and it's almost always cheaper to add the layer than to survive the failure.</p>
</div>
<div class="lab">
<span class="tag">Lab 3 · governance worksheet</span>
<h3>Name the owner</h3>
<p class="time">~5 minutes · keep this one</p>
<p style="font-size:15.5px;margin-bottom:8px;">Answer these five out loud with your team. Blank answers are the deliverable; they're your to-do list:</p>
<ul class="checklist">
<li><b>Who owns AI risk here, by name, with authority to pause a launch?</b></li>
<li><b>What is our written policy on what data and actions AI may touch?</b></li>
<li><b>What happens in the first hour after an AI does something wrong?</b></li>
<li><b>What do our vendor contracts say about evaluations and liability?</b></li>
<li><b>Which decisions or outputs always get a human's eyes before they go out?</b></li>
</ul>
<div class="watch"><b>How to read it:</b> if you can't answer the first question with a person's name, start there. Everything else in this guide is technique; this is the layer that makes the techniques actually happen.</div>
</div>
</div>
</section>
<section>
<div class="wrap">
<div class="tieback">
<p class="kicker">Your four questions, completed</p>
<p>The framework you've carried since the introduction is now a working system. <b>What it can see, whose instructions reach it, what it can do, where a human approves</b>, each maps to a layer in the stack, wrapped in measurement and governance. Those four axes are the backbone, not the whole of the job (evaluation quality, logging, and compliance still sit across the top of them) but they're the stable structure every other concern hangs from. You can walk into any AI conversation and run it. Module 07 makes it concrete one last time: a short self-assessment that scores a real deployment and points you to your safe next step.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Plain-language glossary</p>
<h2>The terms from this module</h2>
<div class="glossary">
<dl>
<dt>Defense in depth</dt>
<dd>Multiple independent layers of protection, so a failure in one is caught by the next. The core security posture for AI.</dd>
<dt>Single point of failure</dt>
<dd>Anything you're relying on alone. If it fails, nothing else catches it, the thing to hunt down and back up.</dd>
<dt>Separation of trust (dual-LLM)</dt>
<dd>Splitting work so the AI exposed to untrusted content has no power, and the AI with power never reads untrusted content directly.</dd>
<dt>Trust boundary</dt>
<dd>The line between content you control and content you don't. Crossing it is where injection happens.</dd>
<dt>Governance</dt>
<dd>The human layer: a named owner, a policy for what AI may touch, vendor accountability, and an incident plan.</dd>
<dt>Incident response</dt>
<dd>Your pre-written plan for the first hour after an AI does something wrong. Cheaper to write than to improvise.</dd>
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
<p class="q">What does "defense in depth" mean for an AI system?</p>
<ul class="opts">
<li data-k="A">Using the single most advanced AI model available.</li>
<li data-k="B">Stacking multiple independent layers, each assuming the one before it can fail, so no single failure reaches your data.</li>
<li data-k="C">Hiding the AI deep inside your network.</li>
</ul>
</li>
<li>
<p class="q">Why is a 99%-effective security control considered a failing grade?</p>
<ul class="opts">
<li data-k="A">Because 99% is a low score in school.</li>
<li data-k="B">Because an attacker simply retries; a 1% gap is reliably exploitable, so no single probabilistic check can be the whole defense.</li>
<li data-k="C">Because customers expect 100% uptime.</li>
</ul>
</li>
<li>
<p class="q">The "separation of trust" (dual-LLM) pattern works by...</p>
<ul class="opts">
<li data-k="A">running two copies of the same AI for speed.</li>
<li data-k="B">keeping the AI that reads untrusted content powerless, and the AI with tools and data access away from raw untrusted content, so nothing is both trickable and dangerous.</li>
<li data-k="C">asking the user to approve every message twice.</li>
</ul>
</li>
</ol>
<div class="answerkey">
<span class="tag">Answer key</span>
<p><b>1. Answer: B.</b> There's no perfect wall. You combine least data, least privilege, human gates, monitoring, measurement, and governance so the damage is contained when any one layer fails.</p>
<p><b>2. Answer: B.</b> Attackers aren't limited to one try. That's why you never rest the defense on a single filter or prompt rule, and instead design so a 1% failure is survivable, not catastrophic.</p>
<p><b>3. Answer: B.</b> A poisoned input can hijack the powerless reader, but that reader can't reach data or take actions. It's the most direct structural answer to the lethal trifecta.</p>
</div>
</div>
</div>
</section>
<div class="at-foot">
<div class="wrap">
<div class="recap">
<p class="kicker">The one line to remember</p>
<p>There's no single fix; its makers say so. Stack independent layers, keep dangerous input away from real power, and <em>name the person who owns the day it goes wrong.</em></p>
</div>
<div class="nav">
<a class="prev" href="/blog/architecting-trust-measuring-trust">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#5c5851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Previous: Module 05
</a>
<a class="next" href="/blog/architecting-trust-readiness-assessment">Next: Module 07, Readiness Self-Assessment
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#5a1212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>
</div>
<div class="foot-meta">
<div class="brand"><span class="brand-name">Ara<span>Grow</span></span></div>
Architecting Trust: An Executive's Guide to AI Risk &amp; Readiness · Module 06 of 7<br>
Prepared by AraGrow LLC · David Aragó, Fractional CTO · Minneapolis · Bilingual EN / ES
</div>
</div>
</div>
</div>
