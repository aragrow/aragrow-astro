---
title: "Architecting Trust, Module 04: When AI Can Act"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "A chatbot that only talks can embarrass you. One that can act can spend, send, or delete on your behalf. How to scope what an AI is allowed to do, gate the actions you can't undo, and own the result."
order: 6
featuredImage: "/images/blog/architecting-trust-when-ai-can-act.webp"
featuredImageAlt: "Banner, When AI Can Act, contrasting a chatbot that only talks with one that acts, gated by an authorization layer with action limits, isolated context, and secure execution to keep agency controlled."
featuredImageCaption: "A chatbot that acts needs an authorization gateway, action limits, and a gate on the irreversible."
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
#at-m04{
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
#at-m04 *{box-sizing:border-box;}
#at-m04 .wrap{max-width:880px;margin:0 auto;padding:0 40px;}
#at-m04 a{color:var(--accent-dark);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}
#at-m04 strong{font-weight:600;}
#at-m04 em{font-style:italic;}
#at-m04 p{margin:0 0 18px;}
#at-m04 p:last-child{margin-bottom:0;}
#at-m04 h1,#at-m04 h2,#at-m04 h3{margin:0;}
/* masthead */
#at-m04 .masthead{border-bottom:1px solid var(--ai-border);padding:26px 0 24px;}
#at-m04 .masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
#at-m04 .brand{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-weight:700;letter-spacing:.01em;color:var(--accent);}
#at-m04 .brand-mark{width:26px;height:26px;flex:0 0 auto;}
#at-m04 .brand-name{font-size:18px;}
#at-m04 .brand-name span{color:var(--ochre);}
#at-m04 .masthead-meta{font-size:13px;color:var(--ai-muted);text-align:right;line-height:1.6;}
#at-m04 .masthead-meta a.back-link{color:var(--accent);text-decoration:none;font-weight:600;}
#at-m04 .masthead-meta a.back-link:hover{text-decoration:underline;}
/* cover */
#at-m04 .cover{padding:54px 0 40px;border-bottom:1px solid var(--ai-border);}
#at-m04 .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 18px;}
#at-m04 h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6.4vw,52px);line-height:1.06;letter-spacing:-.015em;margin:0 0 16px;}
#at-m04 .subtitle{font-family:var(--serif);font-weight:500;font-size:clamp(18px,3vw,22px);line-height:1.34;color:var(--ai-text);margin:0 0 26px;max-width:42ch;}
#at-m04 .objective{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:22px 24px;}
#at-m04 .objective .kicker{margin-bottom:12px;}
#at-m04 .objective ul{margin:0;padding:0;list-style:none;}
#at-m04 .objective li{position:relative;padding:0 0 0 24px;margin:0 0 9px;font-size:15.5px;}
#at-m04 .objective li:last-child{margin-bottom:0;}
#at-m04 .objective li::before{content:"";position:absolute;left:2px;top:10px;width:6px;height:6px;border-radius:50%;background:var(--accent);}
/* sections */
#at-m04 section{padding:48px 0;border-bottom:1px solid var(--ai-border);}
#at-m04 .kicker{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 14px;}
#at-m04 h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,4.2vw,32px);line-height:1.14;letter-spacing:-.01em;margin:0 0 18px;}
#at-m04 h3{font-family:var(--sans);font-weight:600;font-size:17px;margin:28px 0 8px;}
/* lists */
#at-m04 ul.clean{list-style:none;margin:0 0 18px;padding:0;}
#at-m04 ul.clean li{position:relative;padding:0 0 0 26px;margin:0 0 12px;}
#at-m04 ul.clean li::before{content:"";position:absolute;left:2px;top:11px;width:7px;height:7px;border-radius:50%;background:var(--accent);}
#at-m04 ul.clean li:last-child{margin-bottom:0;}
/* analogy */
#at-m04 .analogy{border-left:3px solid var(--accent);padding:2px 0 2px 20px;margin:22px 0;color:var(--ai-text);}
#at-m04 .analogy p{margin:0;}
#at-m04 .analogy b{font-weight:600;}
/* decision matrix */
#at-m04 .figure{margin:28px 0 8px;}
#at-m04 .matrix{display:grid;grid-template-columns:1fr 1fr;gap:12px;margin:6px 0 0;}
#at-m04 .cell{border:1px solid var(--ai-border);border-radius:8px;padding:15px 16px 17px;background:#fff;}
#at-m04 .cell .cell-h{display:block;font-weight:600;font-size:14.5px;margin-bottom:6px;}
#at-m04 .cell .cell-r{display:block;font-size:13.5px;color:var(--ai-muted);line-height:1.46;}
#at-m04 .cell.gate{border-top:3px solid var(--ochre);background:#fdfbf6;}
#at-m04 .cell.gate .cell-h{color:#7A5418;}
#at-m04 .cell.mid{border-top:3px solid var(--slate);}
#at-m04 .cell.mid .cell-h{color:var(--slate);}
#at-m04 .cell.auto{border-top:3px solid var(--accent);}
#at-m04 .cell.auto .cell-h{color:var(--accent-dark);}
#at-m04 .matrix-axis{display:flex;justify-content:space-between;font-size:12px;color:var(--ai-muted);margin-top:10px;letter-spacing:.02em;}
#at-m04 .matrix-ynote{font-size:12px;color:var(--ai-muted);margin:0 0 4px;letter-spacing:.02em;}
#at-m04 .figcap{font-size:14px;color:var(--ai-muted);margin-top:14px;text-align:center;max-width:54ch;margin-left:auto;margin-right:auto;}
/* precise */
#at-m04 .precise{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:18px 22px;margin:24px 0;}
#at-m04 .precise .tag{display:inline-block;font-size:11px;font-weight:700;letter-spacing:.09em;text-transform:uppercase;color:var(--slate);margin-bottom:9px;}
#at-m04 .precise p{font-size:15.5px;line-height:1.6;margin:0;}
#at-m04 .precise p + p{margin-top:10px;}
/* P&L */
#at-m04 .pl{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--slate);border-radius:8px;padding:24px 26px;margin:8px 0;}
#at-m04 .pl .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--slate);margin-bottom:12px;}
#at-m04 .pl p{font-size:16px;}
#at-m04 .pl p:last-child{margin-bottom:0;}
/* sidebar */
#at-m04 .side{border:1px solid var(--ai-border);border-radius:8px;padding:22px 24px;margin:8px 0;background:#fff;}
#at-m04 .side .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:8px;}
#at-m04 .side h3{margin:4px 0 10px;font-size:18px;}
#at-m04 .side p{font-size:15.5px;}
#at-m04 .side .src{font-size:13px;color:var(--ai-muted);margin-top:12px;}
/* case */
#at-m04 .case{border:1px solid var(--ai-border);border-top:3px solid var(--accent);border-radius:8px;padding:26px 28px;margin:8px 0;background:#fffdfb;}
#at-m04 .case .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:6px;}
#at-m04 .case h3{margin-top:8px;font-family:var(--serif);font-size:21px;font-weight:700;}
#at-m04 .case .meta{font-size:13.5px;color:var(--ai-muted);margin:0 0 16px;}
#at-m04 .case p{font-size:16px;}
#at-m04 .case .takeaway{margin-top:16px;padding-top:16px;border-top:1px solid var(--ai-border);font-size:15.5px;}
#at-m04 .case .takeaway b{color:var(--accent-dark);}
#at-m04 .case .source{font-size:13px;color:var(--ai-muted);margin-top:14px;}
#at-m04 .case .source a{color:var(--ai-muted);}
/* lab */
#at-m04 .lab{border:1px solid var(--ai-border);border-left:3px solid var(--ochre);border-radius:8px;padding:24px 26px;margin:18px 0;background:#fdfbf6;}
#at-m04 .lab .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--ochre);margin-bottom:6px;}
#at-m04 .lab h3{margin:6px 0 4px;font-size:18px;}
#at-m04 .lab .time{font-size:13px;color:var(--ai-muted);margin:0 0 14px;}
#at-m04 .lab ol{margin:0 0 12px;padding-left:20px;}
#at-m04 .lab ol li{margin:0 0 9px;font-size:15.5px;}
#at-m04 .lab .perms{list-style:none;margin:6px 0 12px;padding:0;font-family:var(--mono);font-size:13.5px;}
#at-m04 .lab .perms li{padding:5px 0 5px 22px;position:relative;color:var(--ai-text);margin:0;}
#at-m04 .lab .perms li::before{content:"\25B8";position:absolute;left:2px;color:var(--ochre);}
#at-m04 .lab .watch{font-size:15px;color:var(--ai-text);background:var(--surface);border-radius:6px;padding:13px 16px;margin-top:12px;}
#at-m04 .lab .watch b{color:var(--ochre);}
/* check */
#at-m04 .check .quiz{counter-reset:qz;list-style:none;margin:0 0 26px;padding:0;}
#at-m04 .check .quiz>li{counter-increment:qz;border:1px solid var(--ai-border);border-radius:8px;background:#fff;padding:18px 20px;margin:0 0 14px;}
#at-m04 .check .quiz>li:last-child{margin-bottom:0;}
#at-m04 .check .q{font-weight:600;font-size:16px;margin:0 0 14px;display:flex;gap:11px;align-items:flex-start;}
#at-m04 .check .q::before{content:counter(qz);font-family:var(--serif);font-weight:700;color:var(--accent);flex:0 0 auto;}
#at-m04 .check .opts{margin:0;padding:0;list-style:none;}
#at-m04 .check .opts li{font-size:15.5px;line-height:1.5;padding:8px 0 8px 32px;position:relative;color:var(--ai-text);margin:0;border-top:1px solid var(--ai-border);}
#at-m04 .check .opts li:first-child{border-top:none;}
#at-m04 .check .opts li::before{content:attr(data-k);position:absolute;left:2px;top:8px;font-weight:700;color:var(--accent);}
#at-m04 .check .answerkey{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--accent);border-radius:8px;padding:20px 22px;}
#at-m04 .check .answerkey .tag{display:inline-block;font-size:11.5px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;color:var(--accent-dark);margin-bottom:12px;}
#at-m04 .check .answerkey p{font-size:15px;line-height:1.55;margin:0 0 12px;color:var(--ai-muted);}
#at-m04 .check .answerkey p:last-child{margin-bottom:0;}
#at-m04 .check .answerkey b{color:var(--accent-dark);font-weight:700;}
/* glossary */
#at-m04 .glossary{background:var(--surface);border:1px solid var(--ai-border);border-radius:8px;padding:24px 26px;}
#at-m04 .glossary dl{margin:0;display:grid;grid-template-columns:auto 1fr;gap:10px 18px;}
#at-m04 .glossary dt{font-weight:600;font-size:15px;color:var(--accent-dark);}
#at-m04 .glossary dd{margin:0;font-size:15px;color:var(--ai-text);}
/* tie-back */
#at-m04 .tieback{border-left:3px solid var(--accent);padding:6px 0 6px 22px;margin:6px 0;}
#at-m04 .tieback .kicker{margin-bottom:8px;}
#at-m04 .tieback p{font-size:16px;color:var(--ai-text);margin:0;}
#at-m04 .tieback b{color:var(--accent-dark);}
/* footer */
#at-m04 .at-foot{padding:44px 0 52px;}
#at-m04 .recap{background:var(--accent-dark);color:#f7f1f0;border-radius:8px;padding:30px 32px;margin:0 0 28px;}
#at-m04 .recap .kicker{color:var(--gold);margin-bottom:14px;}
#at-m04 .recap p{font-family:var(--serif);font-weight:500;font-size:clamp(18px,2.8vw,22px);line-height:1.4;margin:0;color:#fbf6f2;}
#at-m04 .recap em{color:var(--gold);font-style:italic;}
#at-m04 .nav{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px;align-items:center;}
#at-m04 .nav a{display:inline-flex;align-items:center;gap:9px;font-weight:600;color:var(--accent-dark);font-size:15.5px;text-decoration:none;}
#at-m04 .nav a.prev{color:var(--ai-muted);}
#at-m04 .nav .soon{display:inline-flex;align-items:center;gap:8px;font-weight:600;color:var(--ai-muted);font-size:15.5px;}
#at-m04 .nav .soon .pill{font-size:11px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:var(--ochre);background:rgba(154,107,34,.14);border-radius:999px;padding:3px 9px;}
#at-m04 .nav svg{transition:transform .2s ease;}
#at-m04 .nav a.prev:hover svg{transform:translateX(-3px);}
#at-m04 .nav a.next:hover svg{transform:translateX(3px);}
#at-m04 .foot-meta{font-size:13.5px;color:var(--ai-muted);border-top:1px solid var(--ai-border);padding-top:22px;}
#at-m04 .foot-meta .brand{margin-bottom:8px;font-size:15px;}
#at-m04 .foot-meta .brand span{color:var(--ochre);}
@media (max-width:560px){
#at-m04{font-size:16px;}
#at-m04 .wrap{padding:0 20px;}
#at-m04 .cover{padding:40px 0 32px;}
#at-m04 .glossary dl{grid-template-columns:1fr;gap:4px 0;}
#at-m04 .glossary dd{margin-bottom:12px;}
#at-m04 .matrix{grid-template-columns:1fr;}
}
@media (prefers-reduced-motion:reduce){#at-m04 *{transition:none!important;}}
</style>

<div id="at-m04">
<header class="masthead">
<div class="wrap">
<div class="brand">
<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span class="brand-name">Ara<span>Grow</span></span>
</div>
<div class="masthead-meta">
<a class="back-link" href="/blog/architecting-trust-course">&larr; Guide overview</a><br>
Executive Guide · Part 4 of 7<br>
When AI Can Act
</div>
</div>
</header>
<div class="cover">
<div class="wrap">
<p class="eyebrow">Module 04</p>
<h1>When AI Can Act</h1>
<p class="subtitle">A chatbot that only talks can embarrass you. A chatbot that can <em>do</em> things can spend, send, or delete on your behalf. This module is about controlling the difference.</p>
<div class="objective">
<p class="kicker">By the end of this module you'll be able to</p>
<ul>
<li>Spot "excessive agency" (an AI given more power than its job needs) and scope it down.</li>
<li>Decide exactly which actions an AI may take alone and which require a human to confirm.</li>
<li>Recognize that your AI's words and actions are legally <em>yours</em>, and budget accordingly.</li>
</ul>
</div>
</div>
</div>
<section>
<div class="wrap">
<p class="kicker">Explainer · talk becomes action</p>
<h2>From answering to acting</h2>
<p>So far, this guide has covered AI that <em>talks</em>: it reads, reasons, and replies. The newest systems also <em>act</em>. Wired up to "tools," an assistant can send an email, update a customer record, place an order, run a database query, move a file, or schedule a meeting. When an AI can take actions like these on your systems, the industry calls it an <strong>agent</strong>.</p>
<p>This is where the stakes change completely. The worst case for a talking bot is a bad <em>answer</em>: awkward, and sometimes legally costly, since words alone can still create an obligation (the Air Canada case at the end of this module is exactly that). But it's still words. The worst case for an acting agent is a bad <em>action</em>: an email already sent, a record already deleted, a payment already made. And here's the part that ties back to everything before: the same prompt injection that could make a bot <em>say</em> something (Modules 02 and 03) can now make an agent <em>do</em> something. The attacker's hidden instruction stops being a prank and becomes a command with a button attached.</p>
<div class="analogy">
<p><b>The analogy.</b> Until now the AI was a clerk who could only talk to you across a counter. Giving it tools is handing that clerk the keys to the till, the mailroom, and the filing cabinets. Helpful, if you trust everyone who can slip the clerk a note. We've already established you can't.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Explainer · the most common mistake</p>
<h2>Excessive agency: giving the AI keys it doesn't need</h2>
<p>The single most common operational error is handing an AI more power than its task requires. The security field calls this <strong>excessive agency</strong>. An assistant that reads your inbox to draft replies needs permission to <em>read and draft</em>, not to <em>delete</em> accounts, move money, or change permissions. Yet over-broad access gets granted constantly, because it's easier to give the AI everything than to scope it carefully.</p>
<p>The fix is an old, boring, reliable security principle: <strong>least privilege.</strong> Give the AI the narrowest set of permissions that lets it do its actual job, and nothing more. This matters because of a simple equation:</p>
<ul class="clean">
<li><strong>Blast radius = what it can reach × what it can do.</strong> A successful attack can only use the powers the AI already has. Shrink either side and you shrink the damage, before anything goes wrong.</li>
<li><strong>Read is safer than write. Write is safer than delete.</strong> Every step up that ladder widens the worst case. Most useful AI work lives at the "read and suggest" level, where a mistake is cheap to undo.</li>
</ul>
<div class="precise">
<span class="tag">Least privilege in the real world</span>
<p>Three practical notes. First, scoping does double duty: it caps honest mistakes as well as attacks, and a well-built agent adds policy checks, rate limits, and approval steps that reduce how often any single instruction becomes a live action. The structure that makes injection possible doesn't disappear; you're lowering the odds and the blast radius, not closing the hole. Second, the usual failure isn't malice: it's teams over-granting access early to avoid friction, meaning to tighten it later, then shipping the prototype to production with the broad permissions still attached. Codify least privilege up front; the retrofit is the step that never happens. Third, least privilege is harder than it sounds, because many tools don't offer fine-grained permissions or per-agent scoping at all. When the tool can't enforce the limit, push it down to the infrastructure: separate service accounts, segmented environments, and a gateway in front of each tool.</p>
</div>
<p>The second control is knowing where a human must stay in the loop. Not every action needs a person, that would defeat the point of automation. The trick is to gate the actions you <em>can't take back.</em></p>
<figure class="figure">
<p class="matrix-ynote">↑ Higher stakes (money, data, reputation)</p>
<div class="matrix" role="img" aria-label="A two-by-two matrix. Vertical axis is stakes, horizontal axis is reversibility. High-stakes and irreversible actions require a human to confirm; low-stakes reversible actions can be automated freely.">
<div class="cell mid">
<span class="cell-h">High stakes · Reversible</span>
<span class="cell-r">Automate with review and an easy undo. E.g. drafting a customer reply, proposing a schedule change.</span>
</div>
<div class="cell gate">
<span class="cell-h">High stakes · Irreversible</span>
<span class="cell-r">Require a human to confirm. E.g. payments, refunds, mass deletes, sending external messages, publishing.</span>
</div>
<div class="cell auto">
<span class="cell-h">Low stakes · Reversible</span>
<span class="cell-r">Automate freely. E.g. summarizing, searching, tagging, internal drafts.</span>
</div>
<div class="cell mid">
<span class="cell-h">Low stakes · Irreversible</span>
<span class="cell-r">Automate, but log it and notify a person. E.g. posting an internal status update.</span>
</div>
</div>
<div class="matrix-axis"><span>← Reversible (easy to undo)</span><span>Irreversible (can't take it back) →</span></div>
<p class="figcap">A simple test for any action your AI can take: how much is at stake, and can you undo it? The top-right corner is where a human belongs.</p>
</figure>
<p>One caveat on that grid: "high stakes" and "irreversible" aren't universal. An email to your entire customer list is catastrophic for one company and routine for another. Define the thresholds for <em>your</em> business (a simple low / medium / high tiering is enough) so you don't end up gating everything (and smothering the automation) or gating nothing.</p>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Explainer · the new supply chain</p>
<h2>Every tool you connect is a new door</h2>
<p>There's now a popular standard, the <strong>Model Context Protocol</strong>, or MCP, for plugging AI agents into your tools, files, and services quickly. It's genuinely useful. It's also a quiet way to assemble the lethal trifecta without realizing it, because each new connection can add private data the AI can reach, a new stream of untrusted content it reads, and a new channel it can act through, all at once.</p>
<div class="side">
<span class="tag">A concrete example</span>
<h3>A poisoned to-do item</h3>
<p>Security researchers showed that an attacker could file an ordinary-looking issue on a <em>public</em> code repository, with hidden instructions inside. When a developer later pointed their AI coding agent (which also had access to their <em>private</em> repositories) at that public project, the agent read the planted instructions and was steered into copying private code out through a routine pull request. Private data, untrusted content, and a way out: the trifecta, delivered through a tool connection nobody thought of as risky.</p>
<p class="src">Reported by Invariant Labs, 2025, on the widely used GitHub MCP integration.</p>
</div>
<p>The executive takeaway isn't "avoid MCP." It's that <strong>connecting a tool is a security decision, not just a convenience.</strong> Each integration should get the least-privilege treatment of its own: what can it read, what can it do, and does adding it complete a trifecta you were previously safe from? Don't assume the protocol enforces your access rules for you; many of these connections currently leave that judgment to you.</p>
<div class="precise">
<span class="tag">Reading the MCP risk fairly</span>
<p>A few refinements. MCP itself is just a protocol; the risk lives in how it's deployed. With authentication, least-privilege scoping, and monitoring, a connection can be perfectly safe; the trouble is that by default these standards often leave access control and isolation to whoever installs them, which is where most failures happen. The GitHub case above was architectural, not a coding bug: the agent trusted untrusted content while holding broad access to private code. The fixes researchers recommend are the obvious-in-hindsight ones: scope each agent to a single repository, isolate sessions, and require authenticated servers. And not every connector earns the same scrutiny: read-only access to non-sensitive data with no outbound path can be added lightly, while anything touching billing, customer records, or source control deserves the review you'd give a new vendor or microservice.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Your P&amp;L</p>
<h2>Your AI's actions are your actions</h2>
<div class="pl">
<span class="tag">The business stake</span>
<p>There's a tempting belief that if an AI makes the mistake, the AI (or its vendor) owns the consequence. Courts have already rejected that. When your assistant tells a customer something, or takes an action in your name, the obligation is <strong>yours</strong>. "The bot did it" is not a defense, and the case file below proves it.</p>
<p>That makes the permission boundary the cheapest insurance you'll ever buy. Deciding <em>before launch</em> what an AI may touch and which actions need a human costs a planning conversation. Discovering those limits <em>after</em> an agent sends the wrong email to your whole client list, or honors a price it invented, costs real money and trust. Scope the keys, gate the irreversible actions, and write it down, as part of the project, not the post-mortem. Then revisit those limits as the system matures: usage patterns and new threats will move the lines, so treat the boundaries as something you tune, not set once and forget.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Case file</p>
<h2>A chatbot's promise became the airline's bill</h2>
<div class="case">
<span class="tag">Documented ruling · February 2024</span>
<h3>Moffatt v. Air Canada</h3>
<p class="meta">British Columbia Civil Resolution Tribunal · 2024 BCCRT 149</p>
<p>After a death in the family, a customer asked Air Canada's website chatbot about bereavement fares. The bot told him he could book now and apply for the discounted rate retroactively, within 90 days. That was wrong: the airline's real policy doesn't allow retroactive bereavement refunds. He booked on that advice, then was refused the discount. He took it to a tribunal.</p>
<p>Air Canada's defense was striking: it argued the chatbot was, in effect, a <em>separate entity</em> responsible for its own statements. The tribunal called that argument remarkable and rejected it flatly: the chatbot is part of Air Canada's website, and the company is responsible for everything on it, whether the words come from a static page or an AI. Air Canada was ordered to pay the difference plus fees.</p>
<div class="takeaway">
<b>Why it belongs in Module 04.</b> Notice this bot only <em>talked</em>: it didn't even take an action, and it still created a binding obligation the company had to honor. That's the floor. Now picture the same bot empowered to issue refunds, change bookings, or send confirmations on its own. The liability you saw here is the same; the blast radius is far larger. Whatever your AI can say or do, you own the result, so decide deliberately how much it's allowed to do. It's one tribunal in one jurisdiction, and the law will keep developing, but the direction is consistent: when an AI speaks through your official channels, you answer for it.
</div>
<p class="source">Source: British Columbia Civil Resolution Tribunal, Moffatt v. Air Canada, 2024 BCCRT 149 (February 2024).</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Labs · run these yourself</p>
<h2>Scope the keys, gate the actions</h2>
<p>These labs are about judgment, not chatbots: they're the muscle you'll actually use when someone proposes wiring an AI into your systems.</p>
<div class="lab">
<span class="tag">Lab 1 · worksheet</span>
<h3>Scope the key</h3>
<p class="time">~5 minutes · pen and paper</p>
<p style="font-size:15.5px;margin-bottom:6px;">A vendor proposes a "smart support inbox." To work, they say it needs these permissions on your help-desk system:</p>
<ul class="perms">
<li>Read_Tickets</li>
<li>Draft_Replies</li>
<li>Send_Replies</li>
<li>Delete_Tickets</li>
<li>Export_All_Customers</li>
<li>Refund_Payments</li>
</ul>
<ol>
<li>Cross out every permission the job "read tickets and help draft answers" does <em>not</em> require.</li>
<li>Of the ones left, circle any that take an action you couldn't undo.</li>
</ol>
<div class="watch"><b>What you should find:</b> the core job needs only <em>Read_Tickets</em> and <em>Draft_Replies.</em> <em>Send_Replies</em> is arguable: useful, but it talks to customers, so consider a human review. <em>Delete_Tickets, Export_All_Customers,</em> and <em>Refund_Payments</em> are excessive agency: each one hands an attacker (via injection) a way to destroy, exfiltrate, or spend. If the vendor insists all six are required, that's your signal to slow down.</div>
</div>
<div class="lab">
<span class="tag">Lab 2 · worksheet</span>
<h3>Map the blast radius</h3>
<p class="time">~6 minutes · a real or planned AI tool</p>
<ol>
<li>List every action a specific AI tool you're considering can take (send, post, pay, delete, update, schedule...).</li>
<li>Tag each one: is it <em>reversible</em> or not? Is it <em>low</em> or <em>high</em> stakes?</li>
<li>Drop each into the four-box matrix from this module.</li>
</ol>
<div class="watch"><b>How to read it:</b> anything landing in the top-right box, high stakes <em>and</em> irreversible, needs a human confirm before it happens, full stop. If the tool can't be configured to require that, you've found a deal-breaker to raise before you sign, not after.</div>
</div>
<div class="lab">
<span class="tag">Lab 3 · two-minute thought exercise</span>
<h3>Who's holding the bill?</h3>
<p class="time">~2 minutes · no tools needed</p>
<p style="font-size:15.5px;">Pick one AI you use or are considering. Finish this sentence honestly: <em>"If it tells a customer something wrong, or takes an action we didn't intend, the person who answers for it is ______."</em> The Air Canada ruling has already filled in that blank for you: it's your organization. With that settled, ask the only follow-up that matters: <strong>which of this AI's possible outputs or actions could create a promise, a charge, or a loss we'd be on the hook for?</strong> Those are exactly the ones to put a human in front of.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<div class="tieback">
<p class="kicker">Back to your four questions</p>
<p>This module is your framework's last two questions in action: <b>what can it actually do</b>, and <b>where must a human approve first.</b> Put together with Modules 01 to 03, you can now look at any AI system and assess all four at once: what it sees, whose instructions reach it, what it can do, and where you've placed a human gate. Those four axes are the <em>backbone</em> of a risk picture; the rest (logging, incident response, vendor contracts, compliance) hangs off them. Module 05 adds the first of those: once it's running, how do you <em>prove</em> it's actually working, and hold a vendor to it?</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Plain-language glossary</p>
<h2>The terms from this module</h2>
<div class="glossary">
<dl>
<dt>Agent</dt>
<dd>An AI that can take actions on your systems, not just answer, but send, update, book, pay, or delete.</dd>
<dt>Tool / tool use</dt>
<dd>A capability the AI is wired to (email, database, calendar, payments). Each tool is a new power and a new risk.</dd>
<dt>Excessive agency</dt>
<dd>Granting an AI more permissions than its job needs. The most common avoidable mistake.</dd>
<dt>Least privilege</dt>
<dd>Giving the AI only the narrowest powers required, the boring principle that keeps the blast radius small.</dd>
<dt>Human-in-the-loop</dt>
<dd>Requiring a person to confirm an action before it happens. Reserved for the high-stakes, irreversible ones.</dd>
<dt>Blast radius</dt>
<dd>How much damage a successful attack can do, set by what the AI can reach and what it can do.</dd>
<dt>MCP (Model Context Protocol)</dt>
<dd>A popular standard for connecting AI agents to tools and data. Convenient, but each connection is a security decision.</dd>
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
<p class="q">What is "excessive agency"?</p>
<ul class="opts">
<li data-k="A">When an AI writes responses that are too long.</li>
<li data-k="B">When an AI is granted more permissions than its task needs, like delete or payment access when read-only would do.</li>
<li data-k="C">When too many employees use the same AI tool.</li>
</ul>
</li>
<li>
<p class="q">What did the Air Canada ruling establish for businesses using AI?</p>
<ul class="opts">
<li data-k="A">Chatbots are legally separate entities responsible for their own mistakes.</li>
<li data-k="B">A company is responsible for what its AI tells customers; "the bot did it" is not a defense.</li>
<li data-k="C">AI chatbots are banned in customer service.</li>
</ul>
</li>
<li>
<p class="q">A "human-in-the-loop" checkpoint is most important for which actions?</p>
<ul class="opts">
<li data-k="A">Every single thing the AI does, no matter how trivial.</li>
<li data-k="B">High-stakes, irreversible actions: payments, deletions, sending external messages, publishing.</li>
<li data-k="C">Only actions that take more than a minute to run.</li>
</ul>
</li>
</ol>
<div class="answerkey">
<span class="tag">Answer key</span>
<p><b>1. Answer: B.</b> The fix is least privilege: give the AI the narrowest powers its job requires. A successful attack can only use the powers the AI already has, so a smaller permission set means a smaller blast radius.</p>
<p><b>2. Answer: B.</b> The tribunal rejected the "separate entity" argument and held the airline liable for its chatbot's incorrect information. Your AI's words and actions are your organization's responsibility.</p>
<p><b>3. Answer: B.</b> Gating everything defeats the point of automation. Gate the things you can't take back. Low-stakes, reversible work can run on its own.</p>
</div>
</div>
</div>
</section>
<div class="at-foot">
<div class="wrap">
<div class="recap">
<p class="kicker">The one line to remember</p>
<p>An AI's actions are <em>your</em> actions. Give it the least it needs, and put a human in front of anything you can't take back.</p>
</div>
<div class="nav">
<a class="prev" href="/blog/architecting-trust-stealth-frontier">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#5c5851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Previous: Module 03
</a>
<a class="next" href="/blog/architecting-trust-measuring-trust">Next: Module 05, Measuring Trust
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#5a1212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>
</div>
<div class="foot-meta">
<div class="brand"><span class="brand-name">Ara<span>Grow</span></span></div>
Architecting Trust: An Executive's Guide to AI Risk &amp; Readiness · Module 04 of 7<br>
Prepared by AraGrow LLC · David Aragó, Fractional CTO · Minneapolis · Bilingual EN / ES
</div>
</div>
</div>
</div>
