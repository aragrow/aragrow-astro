---
title: "Architecting Trust: An Executive's Field Guide to AI Security"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "Eight short parts that turn AI security from a black box into decisions you can own. Learn to ask the right questions of any tool or vendor, and tell a real answer from a hand-wave. Built for the person who signs off, not the person who codes."
featuredImage: null
---
<style>
#guide-disclaimer{background:#fdf6f6;border:1px solid rgba(123,24,24,0.20);border-left:4px solid #7B1818;border-radius:8px;padding:14px 20px;margin:0 0 24px;}
#guide-disclaimer p{font-size:0.86rem;line-height:1.55;color:#5c5851;margin:0;}
#guide-disclaimer strong{color:#28251d;font-weight:600;}
</style>
<aside id="guide-disclaimer">
<p><strong>Before you begin.</strong> I'm David Aragó, and I'm sharing this guide as is, with no guarantees of any kind. Some modules include hands-on labs that ask you to type into live, public chatbots. Never enter real customer data, passwords, or any confidential or personal information while running them. Neither I nor AraGrow LLC accept responsibility for any data loss, or any leakage of personal or confidential information, that results from following this guide or running the labs. By continuing, you accept that you use this guide at your own risk and take full responsibility for anything you enter.</p>
</aside>

<p>You sign the contract, approve the budget, and answer for it when something breaks. But the AI tool is a black box, and the vendor's security answers reassure you without telling you much.</p>

<p>This guide fixes that. It gives you a simple framework for judging any AI tool or vendor, so you can tell a real answer from a hand-wave. No code required.</p>

<style>
.at-course{
--at-accent:#7B1818;
--at-accent-dark:#5a1212;
--at-gold:#E8B931;
--at-gold-deep:#9A6B22;
--at-bg:#fbfaf8;
--at-surface:#ffffff;
--at-surface-2:#f6f2ef;
--at-text:#28251d;
--at-muted:#5c5851;
--at-border:rgba(123,24,24,0.16);
--at-serif:'Space Grotesk',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
--at-sans:'Inter',-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;
--at-mono:ui-monospace,'Fira Code',Menlo,monospace;
}
.at-course *{box-sizing:border-box;}
.at-course{font-family:var(--at-sans);color:var(--at-text);background:var(--at-bg);border:1px solid var(--at-border);border-top:6px solid var(--at-accent);border-radius:14px;overflow:hidden;margin:40px 0;width:min(1060px,calc(100vw - 48px));max-width:none;-webkit-font-smoothing:antialiased;}
.at-inner{padding:34px 32px 0;}
.at-top{display:flex;align-items:center;justify-content:space-between;gap:16px;border-bottom:1px solid var(--at-border);padding-bottom:18px;flex-wrap:wrap;}
.at-brand{display:flex;align-items:center;gap:11px;font-family:var(--at-serif);font-weight:700;font-size:19px;letter-spacing:.01em;color:var(--at-accent);}
.at-brand .at-leaf{color:var(--at-gold-deep);}
.at-top-meta{font-family:var(--at-mono);font-size:11.5px;letter-spacing:.14em;text-transform:uppercase;color:var(--at-muted);}
.at-hero{display:grid;grid-template-columns:1.3fr 1fr;gap:34px;padding:34px 0 30px;border-bottom:1px solid var(--at-border);align-items:start;}
.at-eyebrow{font-size:12px;font-weight:700;letter-spacing:.2em;text-transform:uppercase;color:var(--at-accent);margin-bottom:14px;}
.at-h1{font-family:var(--at-serif);font-weight:700;font-size:clamp(40px,7vw,60px);line-height:1;letter-spacing:-.02em;margin-bottom:16px;color:var(--at-text);}
.at-subtitle{font-family:var(--at-sans);font-weight:400;font-size:17px;line-height:1.45;color:var(--at-muted);max-width:34ch;}
.at-about{background:var(--at-surface);border:1px solid var(--at-border);border-radius:8px;padding:22px 22px;}
.at-about-head{display:flex;align-items:center;gap:12px;margin-bottom:12px;}
.at-about-mark{width:42px;height:42px;flex:0 0 auto;border-radius:9px;background:var(--at-accent);display:flex;align-items:center;justify-content:center;}
.at-about-title{font-family:var(--at-serif);font-weight:700;font-size:17px;line-height:1.15;color:var(--at-text);}
.at-about p{font-size:14px;line-height:1.55;color:var(--at-muted);margin:0;}
.at-about p b{color:var(--at-text);font-weight:600;}
.at-facts{display:grid;grid-template-columns:repeat(4,1fr);gap:14px 0;padding:26px 0;border-bottom:1px solid var(--at-border);}
.at-fact{padding:0 20px;border-left:1px solid var(--at-border);}
.at-fact:first-child{padding-left:0;border-left:0;}
.at-fact b{display:block;font-family:var(--at-serif);font-weight:700;font-size:30px;line-height:1;color:var(--at-text);margin-bottom:6px;}
.at-fact b em{color:var(--at-accent);font-style:normal;}
.at-fact span{font-size:11px;letter-spacing:.06em;text-transform:uppercase;color:var(--at-muted);}
.at-banner{background:var(--at-accent);color:#fff;border-radius:8px;text-align:center;padding:15px 20px;margin:30px 0 24px;}
.at-banner .at-b-k{font-family:var(--at-mono);font-size:11px;letter-spacing:.22em;text-transform:uppercase;opacity:.8;display:block;margin-bottom:4px;}
.at-banner .at-b-t{font-family:var(--at-serif);font-weight:600;font-size:21px;line-height:1.12;}
.at-grid{display:grid;grid-template-columns:1fr 1fr;gap:14px;}
.at-course a.at-mod{display:grid;grid-template-columns:28px 40px 1fr;gap:12px;align-items:start;background:var(--at-surface);border:1px solid var(--at-border);border-radius:8px;padding:15px 16px;text-decoration:none;color:inherit;transition:border-color .18s ease,box-shadow .18s ease,transform .18s ease;}
.at-course a.at-mod:hover{border-color:var(--at-accent);box-shadow:0 6px 20px rgba(123,24,24,.10);transform:translateY(-2px);}
.at-mod .at-num{font-family:var(--at-mono);font-weight:600;font-size:13px;color:var(--at-accent);padding-top:3px;}
.at-mod .at-ic{width:40px;height:40px;border-radius:9px;background:rgba(123,24,24,.08);display:flex;align-items:center;justify-content:center;}
.at-mod .at-ic svg{width:21px;height:21px;}
.at-mod .at-m-t{font-weight:600;font-size:15px;line-height:1.22;margin-bottom:3px;color:var(--at-text);display:flex;align-items:center;gap:6px;}
.at-mod .at-m-t .at-arrow{color:var(--at-accent);opacity:0;transform:translateX(-3px);transition:opacity .18s ease,transform .18s ease;}
.at-course a.at-mod:hover .at-m-t .at-arrow{opacity:1;transform:translateX(0);}
.at-mod .at-m-d{font-size:12.5px;line-height:1.45;color:var(--at-muted);}
.at-mod.at-assess{border-color:rgba(154,107,34,.4);background:rgba(232,185,49,.07);}
.at-mod.at-assess .at-ic{background:rgba(154,107,34,.14);}
.at-mod.at-assess .at-num,.at-mod.at-assess .at-m-t .at-arrow{color:var(--at-gold-deep);}
.at-course a.at-mod.at-assess:hover{border-color:var(--at-gold-deep);box-shadow:0 6px 20px rgba(154,107,34,.12);}
.at-course .at-mod.at-soon{display:grid;grid-template-columns:28px 40px 1fr;gap:12px;align-items:start;background:var(--at-surface);border:1px solid var(--at-border);border-radius:8px;padding:15px 16px;}
.at-mod.at-soon .at-num{color:var(--at-muted);}
.at-mod.at-soon.at-assess .at-num{color:var(--at-gold-deep);}
.at-pill{display:inline-block;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:var(--at-gold-deep);background:rgba(154,107,34,.14);border-radius:999px;padding:2px 8px;white-space:nowrap;vertical-align:middle;}
.at-course a.at-mod .at-m-t{color:var(--at-accent);}
.at-pill-go{display:inline-flex;align-items:center;gap:4px;font-size:10px;font-weight:700;letter-spacing:.05em;text-transform:uppercase;color:#fff;background:var(--at-accent);border-radius:999px;padding:2px 9px;white-space:nowrap;vertical-align:middle;transition:background .18s ease,transform .18s ease;}
.at-course a.at-mod:hover .at-pill-go{background:var(--at-accent-dark);transform:translateX(2px);}
.at-course a.at-mod.at-assess .at-m-t{color:var(--at-gold-deep);}
.at-course a.at-mod.at-assess .at-pill-go{background:var(--at-gold-deep);}
.at-cols{display:grid;grid-template-columns:1fr 1fr;gap:22px;margin-top:24px;}
.at-card{background:var(--at-surface);border:1px solid var(--at-border);border-radius:8px;padding:24px 24px;}
.at-card-k{font-family:var(--at-mono);font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:var(--at-accent);margin-bottom:5px;}
.at-card-h{font-family:var(--at-serif);font-weight:700;font-size:22px;line-height:1.08;margin-bottom:4px;color:var(--at-text);}
.at-card-sub{font-size:12.5px;color:var(--at-muted);margin-bottom:16px;}
.at-course ol.at-qlist{counter-reset:atq;list-style:none;margin:0;padding:0;}
.at-course ol.at-qlist li{counter-increment:atq;position:relative;padding:13px 0 13px 46px;border-top:1px solid var(--at-border);margin:0;}
.at-course ol.at-qlist li:last-child{padding-bottom:2px;}
.at-course ol.at-qlist li::before{content:counter(atq,decimal-leading-zero);position:absolute;left:0;top:12px;font-family:var(--at-serif);font-size:20px;font-weight:700;color:var(--at-accent);line-height:1;}
.at-qlist .at-q{display:block;font-weight:600;font-size:15px;line-height:1.25;margin-bottom:2px;color:var(--at-text);}
.at-qlist .at-q-s{font-size:12px;line-height:1.4;color:var(--at-muted);}
.at-card-note{margin-top:16px;padding-top:15px;border-top:1px solid var(--at-border);font-family:var(--at-serif);font-style:italic;font-size:14px;line-height:1.4;color:var(--at-accent-dark);}
.at-course ul.at-ideas{list-style:none;margin:0;padding:0;}
.at-course ul.at-ideas li{padding:11px 0;border-top:1px solid var(--at-border);font-size:13px;line-height:1.42;color:var(--at-muted);margin:0;}
.at-course ul.at-ideas li:first-child{border-top:0;padding-top:0;}
.at-ideas li b{display:block;font-family:var(--at-sans);font-weight:600;font-size:14px;color:var(--at-accent-dark);margin-bottom:1px;}
.at-ideas li.at-tri b{color:var(--at-gold-deep);}
.at-foot{margin-top:30px;background:var(--at-accent-dark);color:#fff;padding:22px 32px;display:flex;align-items:center;justify-content:space-between;gap:20px;flex-wrap:wrap;}
.at-course a.at-foot-link{font-family:var(--at-serif);font-weight:700;font-size:16px;color:#fff;text-decoration:none;display:inline-flex;align-items:center;gap:6px;}
.at-course a.at-foot-link .at-leaf{color:var(--at-gold);}
.at-course a.at-foot-link:hover{text-decoration:underline;}
.at-foot .at-f-meta{text-align:right;font-size:12.5px;line-height:1.5;color:rgba(255,255,255,.82);}
.at-foot .at-f-meta b{color:#fff;font-weight:600;}
@media (max-width:640px){
.at-inner{padding:26px 20px 0;}
.at-hero{grid-template-columns:1fr;gap:24px;}
.at-facts{grid-template-columns:1fr 1fr;}
.at-fact{padding:0 14px;}
.at-fact:nth-child(3){border-left:0;padding-left:0;}
.at-grid,.at-cols{grid-template-columns:1fr;}
.at-foot{padding:22px 20px;}
.at-foot .at-f-meta{text-align:left;}
}
</style>

<div class="at-course">
<div class="at-inner">
<div class="at-top">
<div class="at-brand">
<svg width="26" height="26" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span>Ara<span class="at-leaf">Grow</span></span>
</div>
<div class="at-top-meta">Executive Guide · AI Risk &amp; Readiness</div>
</div>
<div class="at-hero">
<div>
<p class="at-eyebrow">A Leader's Field Guide</p>
<div class="at-h1">Architecting Trust</div>
<p class="at-subtitle">A clear-eyed guide for leaders deciding whether and how to adopt AI. Plain language, not jargon.</p>
</div>
<div class="at-about">
<div class="at-about-head">
<div class="at-about-mark">
<svg width="24" height="24" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#fff"/><polygon points="50,10 76,88 90,88" fill="#fff"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#fff"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
</div>
<div class="at-about-title">What this guide is</div>
</div>
<p>Eight short parts that turn AI security into a set of decisions you can <b>own</b>. Built for the person who <b>signs off</b>, not the person who codes.</p>
</div>
</div>
<div class="at-facts">
<div class="at-fact"><b>8</b><span>Short parts</span></div>
<div class="at-fact"><b>~1<em> hr</em></b><span>To read</span></div>
<div class="at-fact"><b>10<em>+</em></b><span>Hands-on labs</span></div>
<div class="at-fact"><b>1</b><span>Live assessment</span></div>
</div>
<div class="at-banner">
<span class="at-b-k">Inside the guide</span>
<span class="at-b-t">Eight modules, one framework you'll keep</span>
</div>
<div class="at-grid">
<a class="at-mod" href="/blog/architecting-trust-introduction-four-questions">
<div class="at-num">00</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 12 15.5 8.5M12 12 8.5 15.5"/><circle cx="12" cy="12" r="1.4" fill="#7B1818" stroke="none"/></svg></div>
<div><div class="at-m-t">Introduction &amp; the Four Questions <span class="at-pill-go">Read →</span></div><div class="at-m-d">The one framework the whole guide rests on. You'll carry it into every module.</div></div>
</a>
<a class="at-mod" href="/blog/architecting-trust-how-ai-thinks">
<div class="at-num">01</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 8a8 4 0 0 0 16 0"/><path d="M4 8a8 4 0 0 1 16 0v8a8 4 0 0 1-16 0V8"/><path d="M4 12a8 4 0 0 0 16 0"/></svg></div>
<div><div class="at-m-t">How AI Actually "Thinks" <span class="at-pill-go">Read →</span></div><div class="at-m-d">Why AI forgets between chats, has no "admin mode," and why that changes security entirely.</div></div>
</a>
<div class="at-mod at-soon">
<div class="at-num">02</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3v5c0 5-3.5 8-8 10-4.5-2-8-5-8-10V6z"/><path d="M12 8v4M12 15.5v.01"/></svg></div>
<div><div class="at-m-t">Prompt Injection: the #1 Risk <span class="at-pill">Coming soon</span></div><div class="at-m-d">The attack atop every list, plus the "lethal trifecta" that turns it into a real breach.</div></div>
</div>
<div class="at-mod at-soon">
<div class="at-num">03</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12s3.5-6 9-6 9 6 9 6-3.5 6-9 6c-1.6 0-3-.4-4.3-1"/><circle cx="12" cy="12" r="2.4"/><path d="M4 4l16 16"/></svg></div>
<div><div class="at-m-t">The Stealth Frontier <span class="at-pill">Coming soon</span></div><div class="at-m-d">Why keyword filters give false comfort: attacks hide in encoding, metaphor, and invisible text.</div></div>
</div>
<div class="at-mod at-soon">
<div class="at-num">04</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3L5 13h6l-1 8 8-10h-6z"/></svg></div>
<div><div class="at-m-t">When AI Can Act <span class="at-pill">Coming soon</span></div><div class="at-m-d">Excessive agency, least privilege, and exactly where a human must stay in the loop.</div></div>
</div>
<div class="at-mod at-soon">
<div class="at-num">05</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19a8 8 0 1 1 16 0"/><path d="M12 19l4-5"/><path d="M4 19h16"/></svg></div>
<div><div class="at-m-t">Measuring Trust <span class="at-pill">Coming soon</span></div><div class="at-m-d">Move past "it felt right" to proving AI works, with the questions that hold vendors accountable.</div></div>
</div>
<div class="at-mod at-soon">
<div class="at-num">06</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#7B1818" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3l8 3.5L12 10 4 6.5z"/><path d="M4 11.5l8 3.5 8-3.5"/><path d="M4 16.5l8 3.5 8-3.5"/></svg></div>
<div><div class="at-m-t">The Executive Playbook <span class="at-pill">Coming soon</span></div><div class="at-m-d">Defense in depth, the dual-LLM pattern, and naming who owns the day it goes wrong.</div></div>
</div>
<div class="at-mod at-assess at-soon">
<div class="at-num">07</div>
<div class="at-ic"><svg viewBox="0 0 24 24" fill="none" stroke="#9A6B22" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="5" y="3" width="14" height="18" rx="2"/><path d="M9 8h6M9 12h6M9 16h3"/></svg></div>
<div><div class="at-m-t">AI Readiness Self-Assessment <span class="at-pill">Coming soon</span></div><div class="at-m-d">Score one real deployment and get a tailored, prioritized next step. Interactive.</div></div>
</div>
</div>
<div class="at-cols">
<div class="at-card">
<p class="at-card-k">The spine of the guide</p>
<div class="at-card-h">The Four Questions</div>
<p class="at-card-sub">Ask these of any AI system, yours or a vendor's.</p>
<ol class="at-qlist">
<li><span class="at-q">What private data can it see?</span><span class="at-q-s">Inbox, customer records, contracts, files, databases. What's in reach?</span></li>
<li><span class="at-q">Whose instructions can reach it?</span><span class="at-q-s">Only your staff, or also emails, web pages, and uploaded documents?</span></li>
<li><span class="at-q">What can it actually do?</span><span class="at-q-s">Just answer, or send, book, pay, and delete?</span></li>
<li><span class="at-q">Where must a human approve first?</span><span class="at-q-s">Which irreversible actions need a person to click "confirm"?</span></li>
</ol>
<p class="at-card-note">Every module returns to these four. By the end, you'll answer them in your sleep.</p>
</div>
<div class="at-card">
<p class="at-card-k">What you'll leave with</p>
<div class="at-card-h">Six Ideas That Stick</div>
<p class="at-card-sub">The concepts that change how you decide.</p>
<ul class="at-ideas">
<li class="at-tri"><b>The Lethal Trifecta</b>Private data + untrusted content + the power to act = real breach risk.</li>
<li><b>The 95% Rule</b>You can't fully "solve" prompt injection, so architect for it, not around it.</li>
<li><b>Least Privilege</b>Give the AI read access when it never needed write access.</li>
<li><b>Human-in-the-Loop</b>A person confirms anything irreversible, every time.</li>
<li><b>The Dual-LLM Pattern</b>Quarantine untrusted input away from the tools that can act.</li>
<li><b>Measure, Don't Vibe</b>Prove the system works with real evaluation, not a good feeling.</li>
</ul>
</div>
</div>
</div>
<div class="at-foot">
<a class="at-foot-link" href="/blog/architecting-trust-introduction-four-questions">Ara<span class="at-leaf">Grow</span> · Start the guide →</a>
<div class="at-f-meta"><b>AraGrow LLC</b> · David Aragó, Fractional CTO<br>Minneapolis · Practical AI &amp; technology leadership · Bilingual EN / ES</div>
</div>
</div>
