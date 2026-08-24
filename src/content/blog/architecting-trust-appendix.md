---
title: "Architecting Trust, Appendix: Sources & Glossary"
date: "2026-06-15"
modified: "2026-06-15"
author: "David Arago"
categories: ["Blog", "AI Security", "Guide"]
excerpt: "Every claim in the Architecting Trust guide traced to a documented, public source you can check, plus a master glossary of every term, alphabetized."
featuredImage: "/images/blog/architecting-trust-appendix.webp"
featuredImageAlt: "Banner, Sources and Glossary: tracing claims and defining terms, showing each guide claim verified against a documented source and every term gathered into one master glossary."
featuredImageCaption: "Every guide claim traced to a documented source, and every term defined in one master glossary."
order: 10
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
#at-m08{
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
#at-m08 *{box-sizing:border-box;}
#at-m08 .wrap{max-width:880px;margin:0 auto;padding:0 40px;}
#at-m08 a{color:var(--accent-dark);text-decoration:underline;text-underline-offset:2px;text-decoration-thickness:1px;}
#at-m08 strong{font-weight:600;}
#at-m08 em{font-style:italic;}
#at-m08 p{margin:0 0 18px;}
#at-m08 p:last-child{margin-bottom:0;}
#at-m08 h1,#at-m08 h2{margin:0;}
/* masthead */
#at-m08 .masthead{border-bottom:1px solid var(--ai-border);padding:26px 0 24px;}
#at-m08 .masthead .wrap{display:flex;align-items:center;justify-content:space-between;gap:16px;flex-wrap:wrap;}
#at-m08 .brand{display:flex;align-items:center;gap:11px;font-family:var(--serif);font-weight:700;letter-spacing:.01em;color:var(--accent);}
#at-m08 .brand-mark{width:26px;height:26px;flex:0 0 auto;}
#at-m08 .brand-name{font-size:18px;}
#at-m08 .brand-name span{color:var(--ochre);}
#at-m08 .masthead-meta{font-size:13px;color:var(--ai-muted);text-align:right;line-height:1.6;}
#at-m08 .masthead-meta a.back-link{color:var(--accent);text-decoration:none;font-weight:600;}
#at-m08 .masthead-meta a.back-link:hover{text-decoration:underline;}
/* cover */
#at-m08 .cover{padding:54px 0 40px;border-bottom:1px solid var(--ai-border);}
#at-m08 .eyebrow{font-size:12.5px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:var(--accent);margin:0 0 18px;}
#at-m08 h1{font-family:var(--serif);font-weight:700;font-size:clamp(34px,6.4vw,52px);line-height:1.06;letter-spacing:-.015em;margin:0 0 16px;}
#at-m08 .subtitle{font-family:var(--serif);font-weight:500;font-size:clamp(18px,3vw,22px);line-height:1.34;color:var(--ai-text);margin:0 0 8px;max-width:44ch;}
/* sections */
#at-m08 section{padding:48px 0;border-bottom:1px solid var(--ai-border);}
#at-m08 .kicker{font-size:12.5px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:var(--ai-muted);margin:0 0 14px;}
#at-m08 h2{font-family:var(--serif);font-weight:700;font-size:clamp(24px,4.2vw,32px);line-height:1.14;letter-spacing:-.01em;margin:0 0 18px;}
/* note */
#at-m08 .note{background:var(--surface);border:1px solid var(--ai-border);border-left:3px solid var(--accent);border-radius:8px;padding:22px 24px;}
#at-m08 .note p{font-size:15.5px;}
#at-m08 .note p:last-child{margin-bottom:0;}
/* bibliography */
#at-m08 .bibgroup-title{font-size:12.5px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--accent-dark);margin:30px 0 6px;padding-top:8px;}
#at-m08 .bibgroup-title:first-of-type{margin-top:6px;}
#at-m08 ul.bib{list-style:none;margin:0;padding:0;}
#at-m08 ul.bib li{padding:15px 0;border-top:1px solid var(--ai-border);margin:0;}
#at-m08 ul.bib li:first-child{border-top:none;}
#at-m08 .bib .b-t{font-weight:600;font-size:15.5px;color:var(--ai-text);}
#at-m08 .bib .b-m{color:var(--ai-muted);font-size:14px;display:block;margin-top:3px;}
#at-m08 .bib .b-l{font-size:13px;word-break:break-all;display:block;margin-top:4px;}
#at-m08 .bib .b-tag{display:inline-block;font-family:var(--mono);font-size:10.5px;letter-spacing:.03em;color:var(--accent-dark);background:var(--surface-2);border-radius:20px;padding:3px 10px;margin-top:8px;}
/* glossary */
#at-m08 .glossary{background:var(--surface);border:1px solid var(--ai-border);border-radius:10px;padding:8px 26px 26px;}
#at-m08 .gletter{font-family:var(--serif);font-weight:700;font-size:19px;color:var(--accent);margin:0;padding:18px 0 10px;border-top:1px solid var(--ai-border);}
#at-m08 .glossary .gletter:first-child{border-top:none;padding-top:14px;}
#at-m08 .glossary dl{margin:0 0 4px;display:grid;grid-template-columns:auto 1fr;gap:10px 18px;}
#at-m08 .glossary dt{font-weight:600;font-size:15px;color:var(--accent-dark);}
#at-m08 .glossary dd{margin:0;font-size:15px;color:var(--ai-text);}
/* index */
#at-m08 .index{list-style:none;margin:8px 0 0;padding:0;}
#at-m08 .index li{border-top:1px solid var(--ai-border);margin:0;}
#at-m08 .index li:last-child{border-bottom:1px solid var(--ai-border);}
#at-m08 .index a{display:flex;gap:16px;padding:13px 0;text-decoration:none;color:var(--ai-text);align-items:baseline;}
#at-m08 .index a:hover .ix-t{color:var(--accent-dark);text-decoration:underline;}
#at-m08 .index .ix-n{font-family:var(--mono);font-size:12.5px;color:var(--accent);flex:0 0 34px;}
#at-m08 .index .ix-t{font-weight:600;font-size:16px;}
/* footer */
#at-m08 .at-foot{padding:44px 0 52px;}
#at-m08 .nav{display:flex;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:26px;align-items:center;}
#at-m08 .nav a{display:inline-flex;align-items:center;gap:9px;font-weight:600;color:var(--accent-dark);font-size:15.5px;text-decoration:none;}
#at-m08 .nav a.prev{color:var(--ai-muted);}
#at-m08 .nav svg{transition:transform .2s ease;}
#at-m08 .nav a.prev:hover svg{transform:translateX(-3px);}
#at-m08 .nav a.next:hover svg{transform:translateX(3px);}
#at-m08 .foot-meta{font-size:13.5px;color:var(--ai-muted);border-top:1px solid var(--ai-border);padding-top:22px;}
#at-m08 .foot-meta .brand{margin-bottom:8px;font-size:15px;}
#at-m08 .foot-meta .brand span{color:var(--ochre);}
@media (max-width:560px){
#at-m08{font-size:16px;}
#at-m08 .wrap{padding:0 20px;}
#at-m08 .cover{padding:40px 0 32px;}
#at-m08 .glossary dl{grid-template-columns:1fr;gap:3px 0;}
#at-m08 .glossary dd{margin-bottom:12px;}
}
@media (prefers-reduced-motion:reduce){#at-m08 *{transition:none!important;}}
</style>

<div id="at-m08">
<header class="masthead">
<div class="wrap">
<div class="brand">
<svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><polygon points="50,10 10,88 24,88" fill="#7B1818"/><polygon points="50,10 76,88 90,88" fill="#7B1818"/><rect x="48.5" y="57" width="3" height="13" rx="1.5" fill="#7B1818"/><ellipse cx="50" cy="49" rx="3.5" ry="7.5" fill="#E8B931"/><ellipse cx="44" cy="57" rx="6.5" ry="3" transform="rotate(-35 44 57)" fill="#E8B931"/><ellipse cx="56" cy="57" rx="6.5" ry="3" transform="rotate(35 56 57)" fill="#E8B931"/></svg>
<span class="brand-name">Ara<span>Grow</span></span>
</div>
<div class="masthead-meta">
<a class="back-link" href="/blog/architecting-trust-course">&larr; Guide overview</a><br>
Executive Guide · Appendix<br>
Sources &amp; Glossary
</div>
</div>
</header>
<div class="cover">
<div class="wrap">
<p class="eyebrow">Appendix · Reference</p>
<h1>Sources &amp; Glossary</h1>
<p class="subtitle">Every claim in this guide, traced to where it came from, and every term, in one place.</p>
</div>
</div>
<section>
<div class="wrap">
<p class="kicker">A note on sourcing</p>
<h2>How the evidence was chosen</h2>
<div class="note">
<p>Every risk in this guide is illustrated with a documented, public source: a security disclosure, a court ruling, a logged incident, or peer-reviewed research, each listed below with a link you can check. Where a colorful story couldn't be verified, it was left out and replaced with one that could.</p>
<p>Each entry carries a tag showing which module it supports, so any statement in the guide can be traced back to its origin. This appendix is reference material, not legal or security advice for a specific system; for a high-stakes deployment, get a qualified review.</p>
<p><strong>A caution on the sources themselves.</strong> I gathered these from the public internet, and some were surfaced with the help of AI. I've checked the links, but I'm not the author of any of them, and sources can be wrong, outdated, or missing context. Treat them the way you'd treat anything on the internet: with healthy skepticism. Question their findings, then question them again, and verify anything you plan to act on against a primary source or a qualified professional.</p>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Source bibliography</p>
<h2>References, by theme</h2>
<p class="bibgroup-title">Framing &amp; frameworks</p>
<ul class="bib">
<li>
<span class="b-t">The lethal trifecta for AI agents: private data, untrusted content, and external communication</span>
<span class="b-m">Simon Willison · simonwillison.net · June 2025</span>
<a class="b-l" href="https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/" target="_blank" rel="noopener">https://simonwillison.net/2025/Jun/16/the-lethal-trifecta/</a>
<span class="b-tag">Modules 02 · 04 · 06 · 07</span>
</li>
<li>
<span class="b-t">The Dual LLM pattern for building AI assistants that can resist prompt injection</span>
<span class="b-m">Simon Willison · simonwillison.net · 2023</span>
<a class="b-l" href="https://simonwillison.net/2023/Apr/25/dual-llm-pattern/" target="_blank" rel="noopener">https://simonwillison.net/2023/Apr/25/dual-llm-pattern/</a>
<span class="b-tag">Module 06</span>
</li>
<li>
<span class="b-t">Talks and writing on prompt injection: source of "in application security, 99% is a failing grade"</span>
<span class="b-m">Simon Willison · simonwillison.net · 2024-2025</span>
<a class="b-l" href="https://simonwillison.net/tags/prompt-injection/" target="_blank" rel="noopener">https://simonwillison.net/tags/prompt-injection/</a>
<span class="b-tag">Module 06</span>
</li>
</ul>
<p class="bibgroup-title">Real-world incidents &amp; rulings</p>
<ul class="bib">
<li>
<span class="b-t">Chevrolet dealer chatbot agrees to sell a Tahoe for $1</span>
<span class="b-m">OECD AI Incidents Monitor, incident #622 · December 2023 (originally reported by Business Insider)</span>
<a class="b-l" href="https://incidentdatabase.ai/cite/622/" target="_blank" rel="noopener">https://incidentdatabase.ai/cite/622/</a>
<span class="b-tag">Modules 01 · 02</span>
</li>
<li>
<span class="b-t">EchoLeak: The First Real-World Zero-Click Prompt Injection Exploit in a Production LLM System</span>
<span class="b-m">P. Reddy &amp; A. Gujral · arXiv:2509.10540 · 2025 (case study of CVE-2025-32711 in Microsoft 365 Copilot)</span>
<a class="b-l" href="https://arxiv.org/abs/2509.10540" target="_blank" rel="noopener">https://arxiv.org/abs/2509.10540</a>
<span class="b-tag">Modules 02 · 03</span>
</li>
<li>
<span class="b-t">EchoLeak (CVE-2025-32711): original vulnerability disclosure</span>
<span class="b-m">Aim Security (Aim Labs) · June 2025 · catalogued by MITRE/Microsoft; corroborated by The Hacker News</span>
<a class="b-l" href="https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html" target="_blank" rel="noopener">https://thehackernews.com/2025/06/zero-click-ai-vulnerability-exposes.html</a>
<span class="b-tag">Modules 02 · 03</span>
</li>
<li>
<span class="b-t">Moffatt v. Air Canada, 2024 BCCRT 149</span>
<span class="b-m">British Columbia Civil Resolution Tribunal · February 2024 · reported by CBC News</span>
<a class="b-l" href="https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416" target="_blank" rel="noopener">https://www.cbc.ca/news/canada/british-columbia/air-canada-chatbot-lawsuit-1.7116416</a>
<span class="b-tag">Module 04</span>
</li>
<li>
<span class="b-t">Prompt-injection data exfiltration via the GitHub MCP integration</span>
<span class="b-m">Invariant Labs · 2025 · summarized in "Understanding the lethal trifecta of AI agents," Oso</span>
<a class="b-l" href="https://www.osohq.com/learn/lethal-trifecta-ai-agent-security" target="_blank" rel="noopener">https://www.osohq.com/learn/lethal-trifecta-ai-agent-security</a>
<span class="b-tag">Module 04</span>
</li>
</ul>
<p class="bibgroup-title">Evaluation research &amp; tools</p>
<ul class="bib">
<li>
<span class="b-t">Judging LLM-as-a-Judge with MT-Bench and Chatbot Arena</span>
<span class="b-m">L. Zheng et al. · arXiv:2306.05685 · 2023 (strong AI judges agree with humans more than 80% of the time)</span>
<a class="b-l" href="https://arxiv.org/abs/2306.05685" target="_blank" rel="noopener">https://arxiv.org/abs/2306.05685</a>
<span class="b-tag">Module 05</span>
</li>
<li>
<span class="b-t">G-Eval: NLG Evaluation using GPT-4 with Better Human Alignment</span>
<span class="b-m">Y. Liu et al. · arXiv:2303.16634 · 2023 (correlates with humans far better than BLEU/ROUGE)</span>
<a class="b-l" href="https://arxiv.org/abs/2303.16634" target="_blank" rel="noopener">https://arxiv.org/abs/2303.16634</a>
<span class="b-tag">Module 05</span>
</li>
<li>
<span class="b-t">The RAG Triad: context relevance, groundedness, answer relevance</span>
<span class="b-m">TruLens (TruEra) open-source project · evaluation framework documentation</span>
<a class="b-l" href="https://www.trulens.org/getting_started/core_concepts/rag_triad/" target="_blank" rel="noopener">https://www.trulens.org/getting_started/core_concepts/rag_triad/</a>
<span class="b-tag">Module 05</span>
</li>
<li>
<span class="b-t">Open-source evaluation tools referenced</span>
<span class="b-m">TruLens, Ragas, DeepEval, and Promptfoo · project documentation</span>
<span class="b-l">trulens.org · docs.ragas.io · deepeval.com · promptfoo.dev</span>
<span class="b-tag">Module 05</span>
</li>
</ul>
<p class="bibgroup-title">Industry &amp; standards bodies</p>
<ul class="bib">
<li>
<span class="b-t">OpenAI on prompt injection and ChatGPT "agent mode": "unlikely to ever be fully solved"</span>
<span class="b-m">OpenAI public statements · December 2025 · reported by Fortune</span>
<a class="b-l" href="https://fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers/" target="_blank" rel="noopener">https://fortune.com/2025/12/23/openai-ai-browser-prompt-injections-cybersecurity-hackers/</a>
<span class="b-tag">Module 06</span>
</li>
<li>
<span class="b-t">OWASP Top 10 for LLM Applications: prompt injection ranked the #1 risk</span>
<span class="b-m">OWASP Foundation · 2025</span>
<a class="b-l" href="https://genai.owasp.org/llm-top-10/" target="_blank" rel="noopener">https://genai.owasp.org/llm-top-10/</a>
<span class="b-tag">Module 02</span>
</li>
<li>
<span class="b-t">Adversarial Machine Learning: A Taxonomy and Terminology (NIST AI 100-2)</span>
<span class="b-m">U.S. National Institute of Standards and Technology · characterizes indirect prompt injection as a core generative-AI weakness</span>
<a class="b-l" href="https://csrc.nist.gov/pubs/ai/100/2/e2025/final" target="_blank" rel="noopener">https://csrc.nist.gov/pubs/ai/100/2/e2025/final</a>
<span class="b-tag">Module 02</span>
</li>
<li>
<span class="b-t">Guidance on AI security and prompt injection</span>
<span class="b-m">UK National Cyber Security Centre (NCSC) · 2025 (warns these attacks may never be fully mitigated)</span>
<a class="b-l" href="https://www.ncsc.gov.uk/collection/machine-learning" target="_blank" rel="noopener">https://www.ncsc.gov.uk/collection/machine-learning</a>
<span class="b-tag">Module 06</span>
</li>
</ul>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Master glossary</p>
<h2>Every term, in plain language</h2>
<p>The terms introduced across all seven modules, gathered and alphabetized.</p>
<div class="glossary">
<div class="gletter">A</div>
<dl>
<dt>Agent</dt><dd>An AI that can take actions on your systems (send, update, book, pay, delete), not just answer.</dd>
<dt>Answer relevance</dt><dd>A RAG-triad check: did the reply actually address the question that was asked?</dd>
</dl>
<div class="gletter">B</div>
<dl>
<dt>Blast radius</dt><dd>How much damage a successful attack can do, set by what the AI can reach times what it can do.</dd>
</dl>
<div class="gletter">C</div>
<dl>
<dt>Context relevance</dt><dd>A RAG-triad check: did the system retrieve the right information before answering?</dd>
<dt>Context window</dt><dd>The "binder," the block of text (rules + conversation + documents) the model re-reads on every turn.</dd>
</dl>
<div class="gletter">D</div>
<dl>
<dt>Defense in depth</dt><dd>Multiple independent layers of protection, so a failure in one is caught by the next.</dd>
<dt>Direct injection</dt><dd>The user types the malicious instruction themselves, a jailbreak or "ignore your rules" attack.</dd>
<dt>Drift (regression)</dt><dd>Quality silently dropping over time, often after the underlying model updates. Why evals must be ongoing.</dd>
</dl>
<div class="gletter">E</div>
<dl>
<dt>Encoding</dt><dd>Converting text into another format (e.g. Base64) so a filter sees noise but the model still understands it.</dd>
<dt>Evaluation ("eval")</dt><dd>A structured test of whether an AI does its job across many cases, the AI version of software testing.</dd>
<dt>Excessive agency</dt><dd>Granting an AI more permissions than its job needs. The most common avoidable mistake.</dd>
<dt>Exfiltration</dt><dd>Getting stolen data out of a system, via email, a web link, a loaded image, or any outbound channel.</dd>
</dl>
<div class="gletter">G</div>
<dl>
<dt>Governance</dt><dd>The human layer: a named owner, a policy for what AI may touch, vendor accountability, and an incident plan.</dd>
<dt>Groundedness</dt><dd>The key RAG-triad check: is every claim in the answer supported by the retrieved source? Catches hallucination.</dd>
<dt>Guardrail / AI firewall</dt><dd>A filter that scans input or output for dangerous content. A useful layer, never a complete defense.</dd>
</dl>
<div class="gletter">H</div>
<dl>
<dt>Hallucination</dt><dd>A confident answer the AI made up, stated as fact but not backed by any real source.</dd>
<dt>Human-in-the-loop</dt><dd>Requiring a person to confirm an action before it happens. Reserved for the high-stakes, irreversible ones.</dd>
</dl>
<div class="gletter">I</div>
<dl>
<dt>Incident response</dt><dd>A pre-written plan for the first hour after an AI does something wrong. Cheaper to write than to improvise.</dd>
<dt>Indirect injection</dt><dd>A malicious instruction hidden in outside content (email, document, web page) the AI reads during a routine task.</dd>
<dt>Invisible text</dt><dd>Instructions hidden in a document via white-on-white text, tiny fonts, or special characters a person won't notice.</dd>
</dl>
<div class="gletter">J</div>
<dl>
<dt>Jailbreak</dt><dd>Talking an AI out of its safety rules, often through role-play or a fictional framing.</dd>
</dl>
<div class="gletter">L</div>
<dl>
<dt>Least privilege</dt><dd>Giving the AI only the narrowest powers its job requires, the boring principle that keeps the blast radius small.</dd>
<dt>Lethal trifecta</dt><dd>Private data, plus untrusted content, plus a way to send data out. The combination that turns injection into a breach.</dd>
<dt>Link smuggling</dt><dd>Exfiltrating data by hiding it in a web address loaded as an image, so leaving data looks like showing a picture.</dd>
<dt>LLM-as-a-judge</dt><dd>Using a strong AI to grade other AI output at scale. Agrees with humans often (about 80% or more), but carries biases.</dd>
</dl>
<div class="gletter">M</div>
<dl>
<dt>MCP (Model Context Protocol)</dt><dd>A popular standard for connecting AI agents to tools and data. Convenient, and each connection is a security decision.</dd>
<dt>Multimodal injection</dt><dd>Hiding an instruction inside an image the AI reads, a screenshot, scan, or logo carrying hidden orders.</dd>
</dl>
<div class="gletter">O</div>
<dl>
<dt>Obfuscation</dt><dd>Disguising an instruction while keeping its meaning, by rewording, describing, or riddling it.</dd>
</dl>
<div class="gletter">P</div>
<dl>
<dt>Probabilistic</dt><dd>Driven by likelihood, not fixed rules. The same input can produce different outputs, which is why "it will never..." is a shaky promise.</dd>
<dt>Prompt injection</dt><dd>Slipping instructions into the text an AI reads so it follows the attacker instead of you. The #1 risk for AI applications.</dd>
</dl>
<div class="gletter">R</div>
<dl>
<dt>RAG</dt><dd>"Retrieval-augmented generation," an AI that looks things up in your documents before answering. The common business setup.</dd>
<dt>RAG triad</dt><dd>Three checks (context relevance, groundedness, answer relevance) that locate where an AI's answer went wrong.</dd>
</dl>
<div class="gletter">S</div>
<dl>
<dt>Semantic gap</dt><dd>An AI's inability to tell instructions apart from data. The root cause of most AI security risk.</dd>
<dt>Separation of trust (dual-LLM)</dt><dd>Splitting work so the AI exposed to untrusted content has no power, and the AI with power never reads untrusted content directly.</dd>
<dt>Single point of failure</dt><dd>Anything you rely on alone; if it fails, nothing else catches it. The thing to hunt down and back up.</dd>
<dt>Stateless</dt><dd>The AI keeps no memory of its own between conversations; each one starts blank.</dd>
<dt>System prompt</dt><dd>The hidden rules a company writes to shape an AI's behavior. Powerful, but still text the model can be argued out of.</dd>
</dl>
<div class="gletter">T</div>
<dl>
<dt>Tool / tool use</dt><dd>A capability an AI is wired to (email, database, calendar, payments). Each tool is a new power and a new risk.</dd>
<dt>Trust boundary</dt><dd>The line between content you control and content you don't. Crossing it is where injection happens.</dd>
</dl>
<div class="gletter">W</div>
<dl>
<dt>Word-overlap metrics (BLEU / ROUGE)</dt><dd>Older quality scores that check whether an answer's words match a reference. Poor at judging meaning or catching made-up facts.</dd>
</dl>
<div class="gletter">Z</div>
<dl>
<dt>Zero-click</dt><dd>An attack needing no action from the victim; a normal email plus a normal request is enough (as in EchoLeak).</dd>
</dl>
</div>
</div>
</section>
<section>
<div class="wrap">
<p class="kicker">Guide contents</p>
<h2>Jump to any part</h2>
<ul class="index">
<li><a href="/blog/architecting-trust-introduction-four-questions"><span class="ix-n">00</span><span class="ix-t">Introduction &amp; the four questions</span></a></li>
<li><a href="/blog/architecting-trust-how-ai-thinks"><span class="ix-n">01</span><span class="ix-t">How AI Actually "Thinks"</span></a></li>
<li><a href="/blog/architecting-trust-prompt-injection"><span class="ix-n">02</span><span class="ix-t">Prompt Injection: The #1 AI Risk</span></a></li>
<li><a href="/blog/architecting-trust-stealth-frontier"><span class="ix-n">03</span><span class="ix-t">The Stealth Frontier</span></a></li>
<li><a href="/blog/architecting-trust-when-ai-can-act"><span class="ix-n">04</span><span class="ix-t">When AI Can Act</span></a></li>
<li><a href="/blog/architecting-trust-measuring-trust"><span class="ix-n">05</span><span class="ix-t">Measuring Trust</span></a></li>
<li><a href="/blog/architecting-trust-executive-playbook"><span class="ix-n">06</span><span class="ix-t">The Executive Playbook</span></a></li>
<li><a href="/blog/architecting-trust-readiness-assessment"><span class="ix-n">07</span><span class="ix-t">Readiness Self-Assessment</span></a></li>
</ul>
</div>
</section>
<div class="at-foot">
<div class="wrap">
<div class="nav">
<a class="prev" href="/blog/architecting-trust-readiness-assessment">
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M19 12H5M11 6l-6 6 6 6" stroke="#5c5851" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
Previous: Module 07
</a>
<a class="next" href="/blog/architecting-trust-introduction-four-questions">Back to the start
<svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" stroke="#5a1212" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>
</a>
</div>
<div class="foot-meta">
<div class="brand"><span class="brand-name">Ara<span>Grow</span></span></div>
Architecting Trust: An Executive's Guide to AI Risk &amp; Readiness · Appendix: Sources &amp; Glossary<br>
Prepared by AraGrow LLC · David Aragó, Fractional CTO · Minneapolis · Bilingual EN / ES
</div>
</div>
</div>
</div>
