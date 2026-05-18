---
title: "Stop Writing Bad Prompts: A Local MCP Server That Scores and Rewrites Them For You"
date: "2026-05-08"
modified: "2026-05-11"
slug: "stop-writing-bad-prompts"
author: "David Arago"
categories: ["Blog","Life's Journey","To Astro"]
excerpt: "So stopping writing bad prompts is not a nice thing to do, it is a must to get some sort of consistent result. If you write code with an AI assistant, you've felt this: the same task, asked two dif…"
featuredImage: "/images/blog/marker_version.webp"
---
<p>So stopping writing bad prompts is not a nice thing to do, it is a must to get some sort of consistent result.  If you write code with an AI assistant, you've felt this: the same task, asked two different ways, produces two wildly different outputs. One prompt gets you a parameterized SQL query with input validation. The next gets you a string-concatenated injection vulnerability with a smile. The model didn't change. <strong>The prompt did.</strong></p>

<p>This article walks through what the why I wrote the MCP, what the MCP server does, and how to use each of its seven tools, including the new step-by-step prompt wizard.</p>

<h2 class="wp-block-heading"><strong>Why I Built This MCP</strong></h2>

<p>I developed this Model Context Protocol (MCP) server to address two primary objectives:</p>

<ol class="wp-block-list"><li><strong>Prompt Engineering Research</strong>&nbsp;- To better understand how different prompts and context structures influence LLM outputs. By building my own MCP, I can experiment systematically and observe how variations in input affect model behavior.</li>

<li><strong>Stability and Version Control</strong>&nbsp;- Given the non-deterministic nature of LLMs and the rapidly evolving AI ecosystem, I needed control over my implementation. This MCP gives me the ability to manage code changes deliberately, maintain consistent behavior across sessions, and reduce dependency on external updates that could introduce unexpected variability.</li>
</ol>

<p>In an environment with so many moving variables, having this level of control provides the stability necessary for both learning and reliable production use.</p>

<p>That gap between a vague prompt and a strong one is where the <strong>RICCE framework</strong> lives — and where this MCP server lives, too. It scores your prompt against a five-letter discipline (Role, Instruction, Context, Constraints, Examples), tells you exactly what's missing, and — if you don't want to write the prompt yourself — walks you through a wizard that builds one from a few plain-English answers.</p>

<h2 class="wp-block-heading">What is RICCE?</h2>

<figure class="wp-block-image aligncenter size-large"><img src="https://cp.aragrow.me/wp-content/uploads/2026/05/RICCE_framework-1024x683.webp" alt="Colorful marker-style infographic titled “The RICCE Framework” showing five prompt-building components: Role, Instructions, Context, Constraints, and Examples, each with definitions and sample prompts for improving AI-generated results." class="wp-image-2187"/><figcaption class="wp-element-caption">A hand-drawn infographic explaining the RICCE framework for writing better AI prompts using Role, Instructions, Context, Constraints, and Examples.</figcaption></figure>

<p>RICCE is a discipline borrowed from secure-prompt-engineering literature (<a href="https://learn.snyk.io/lesson/prompt-engineering/?ecosystem=aiml" type="link" id="https://learn.snyk.io/lesson/prompt-engineering/?ecosystem=aiml" target="_blank" rel="noreferrer noopener">Snyk</a> has a great free lesson on it). It says: a strong prompt has five components, and the absence of any one of them invites the model to fill the gap with its own assumptions — usually with the cheapest, most generic, most insecure pattern in its training data.</p>

<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Letter</th><th>Component</th><th>What it does</th></tr></thead><tbody><tr><td><strong>R</strong></td><td>Role</td><td>Names a specific persona ("Senior Backend Engineer specializing in payments"). Primes the model to draw from high-quality patterns associated with that persona.</td></tr><tr><td><strong>I</strong></td><td>Instruction</td><td>A concrete imperative with a named deliverable ("Write a Python function that validates webhook payloads and returns JSON with keys <code>ok</code> and <code>error</code>").</td></tr><tr><td><strong>C</strong></td><td>Context</td><td>Why and where: who calls this, where it runs, what threat model applies.</td></tr><tr><td><strong>C</strong></td><td>Constraints</td><td>Hard "do not" rules. Models follow explicit prohibitions far more reliably than implicit expectations.</td></tr><tr><td><strong>E</strong></td><td>Examples</td><td>At least one micro-example of the desired output. Few-shot prompting is the single most effective lever for enforcing standards.</td></tr></tbody></table></figure>

<p>A prompt missing any of these will still <em>work</em> — but its output is a coin flip on quality and security. RICCE makes you ruthlessly explicit about what you want.</p>

<h2 class="wp-block-heading">What this MCP server does</h2>

<figure class="wp-block-image aligncenter size-large"><img src="https://cp.aragrow.me/wp-content/uploads/2026/05/mcp-1024x683.webp" alt="Marker-style infographic titled “What is MCP?” showing an AI client communicating with a local MCP server that connects to databases, APIs, files, and local tools, alongside benefits including security, flexibility, reliability, and open standards." class="wp-image-2188"/><figcaption class="wp-element-caption">A hand-drawn infographic explaining how MCP (Model Context Protocol) connects AI assistants to local tools, APIs, databases, and files through a secure MCP server.</figcaption></figure>

<p>The server is a local-only <a href="https://www.anthropic.com/news/model-context-protocol" type="link" id="https://www.anthropic.com/news/model-context-protocol" target="_blank" rel="noreferrer noopener">Model Context Protocol </a>service that exposes seven tools to your AI assistant (Claude Code, Cursor, etc.). Each tool runs <strong>on your machine</strong>; nothing about your prompts leaves the local sandbox except the optional LLM-as-judge call you opt into.</p>

<figure class="wp-block-table"><table class="has-fixed-layout"><thead><tr><th>Tool</th><th>What it does</th></tr></thead><tbody><tr><td><code>score_prompt</code></td><td>Score a prompt 0–100 against the RICCE rubric. Returns per-component scores, feedback, and security flags ("undelimited user input", "no chain of thought near security topics", "lost in the middle").</td></tr><tr><td><code>improve_prompt</code></td><td>Send a weak prompt to the LLM and get back a RICCE-compliant rewrite plus a one-line rationale.</td></tr><tr><td><code>ricce_wizard_step</code></td><td><strong>(New.)</strong> A step-by-step wizard. You answer plain-English questions about your goal; the wizard generates each follow-up question adaptively and assembles the final RICCE prompt for you.</td></tr><tr><td><code>score_prompt_file</code></td><td>Score the contents of a saved prompt file on disk, with path-traversal protections.</td></tr><tr><td><code>explain_ricce</code></td><td>Returns the canonical RICCE definition with worked secure-vs-insecure examples.</td></tr><tr><td><code>explain_techniques</code></td><td>Returns a reference of prompt-engineering techniques (Zero-Shot, Few-Shot, Chain-of-Thought, RAG, Self-Consistency, Meta Prompting) and how each maps to RICCE.</td></tr><tr><td><code>health</code></td><td>Diagnostic snapshot: which provider is configured, which API key is set, the active judge model, allowlist, and so on. Never returns secrets.</td></tr></tbody></table></figure>

<p>The scoring is <strong>hybrid</strong>: a deterministic Python rubric does structural checks (free, instant, fully offline), then optionally calls Claude (or Gemini, or OpenAI) as a "judge" for refined quality grading. The judge's per-component score is clamped to within ±2 of the deterministic baseline, so a compromised judge cannot fabricate a perfect score.</p>

<h2 class="wp-block-heading">The new wizard: build a prompt without writing one</h2>

<blockquote class="wp-block-quote"><p><strong>Want to see this on a real project first?</strong> Here's a full walkthrough of the MCP turning a one-paragraph idea into a hardened, four-tool secure spec → <a href="https://aragrow.me/blog/ricce-in-action/">RICCE in Action: A Real Walk-Through</a></p>
</blockquote>

<p>The wizard is the easiest entry point if you're not yet comfortable with prompt engineering. You start with a single plain-English statement of intent, and the tool walks you through five adaptive questions — one per RICCE component — calibrated to what you've already said.</p>

<p>Here's a real walk-through. Suppose you ask the wizard for help redesigning a website:</p>

<blockquote class="wp-block-quote"><p><strong>Wizard:</strong> What do you want the AI to help you accomplish? Describe your goal in 1–3 plain-English sentences.</p>

<p><strong>You:</strong> I want to crawl my company's website and redesign it using Astro to score 100 on Google Core Web Vitals, with a fresh, modern look.</p>
</blockquote>

<p>From that one sentence the wizard generates the next question, calibrated to your stated goal:</p>

<blockquote class="wp-block-quote"><p><strong>Wizard (Role step):</strong> What role should the AI play to best help you redesign your website for performance and a modern feel?</p>

<p>Examples: "A senior front-end developer specializing in Astro and performance optimization" / "A web design consultant with expertise in Core Web Vitals" / "A full-stack engineer leading a website migration."</p>
</blockquote>

<p>You answer, and the wizard moves on to Instruction, then Context, then Constraints, then Examples — each question shaped by your previous answers. After the fifth answer, it assembles a complete RICCE-compliant prompt and returns it.</p>

<h3 class="wp-block-heading">The self-checking trick</h3>

<p>Here's the part that makes the wizard reliable and prevents writing bad prompts: <strong>after it assembles a draft, it scores its own output against the deterministic rubric.</strong> If any RICCE component is missing or any security flag fires (e.g., "no chain of thought near a security topic"), it runs <em>one</em> revision pass with the diagnostics fed back to the LLM and keeps whichever version scores higher. The user never sees the dirty draft. They get the cleaner one.</p>

<p>The rationale field even shows the journey:</p>

<pre class="wp-block-code"><code>(rubric self-check: 58→86/100; revised once.)
</code></pre>

<p>So the wizard's output is provably aligned with the same rubric the <code>score_prompt</code> tool grades on.</p>

<h3 class="wp-block-heading">Register with Claude Code</h3>

<p><strong> Stdio (per-session subprocess):</strong></p>

<pre class="wp-block-code"><code>claude mcp add ricce -s user -- /full/path/to/RICCE-prompt-best-practices-mcp/run.sh
</code></pre>

<p>Verify it's connected:</p>

<pre class="wp-block-code"><code>claude mcp list
</code></pre>

<p>Once registered, every Claude Code session in any project has access to the seven RICCE tools. They surface as <code>mcp__ricce__score_prompt</code>, <code>mcp__ricce__ricce_wizard_step</code>, and so on.</p>

<h2 class="wp-block-heading">Using each tool</h2>

<h3 class="wp-block-heading">1. Score an existing prompt</h3>

<p>Inside Claude Code, just ask:</p>

<blockquote class="wp-block-quote"><p>"Score this prompt for me: <em>Write a function to upload an image to /uploads.</em>"</p>
</blockquote>

<p>Claude will call <code>mcp__ricce__score_prompt</code> and you'll get something like:</p>

<pre class="wp-block-code"><code>Role:        0/10  (no persona declared)
Instruction: 4/10  (vague verb, no output format)
Context:     0/10  (no environment markers)
Constraints: 0/10  (no prohibitions)
Examples:    0/10  (no few-shot examples)
Overall:     8/100
Security flags: undelimited_user_input, no_chain_of_thought
</code></pre>

<p>That's a one-second diagnosis of why this prompt is going to produce something dangerous.</p>

<h3 class="wp-block-heading">2. Auto-rewrite a weak prompt</h3>

<blockquote class="wp-block-quote"><p>"Improve this prompt: <em>Write a function to upload an image to /uploads.</em>"</p>
</blockquote>

<p>The <code>improve_prompt</code> tool sends the prompt to the configured LLM with a strict rewrite contract and gets back a full RICCE-compliant version: an explicit "You are a Senior Application Security Engineer..." role, a named deliverable, a threat model, half a dozen "do not" constraints around content-type allowlists and path traversal, and a code-skeleton example.</p>

<h3 class="wp-block-heading">3. Build a prompt from scratch with the wizard, preventing Bad Prompts</h3>

<blockquote class="wp-block-quote"><p>"Help me build a RICCE prompt with the wizard."</p>
</blockquote>

<p>Claude will start the wizard. Answer the first plain-English question, and the wizard takes over from there. After five more questions, you have a finished prompt.</p>

<h3 class="wp-block-heading">4. Score a saved prompt file</h3>

<blockquote class="wp-block-quote"><p>"Score the prompt in <code>~/work/prompts/contract-review.md</code>."</p>
</blockquote>

<p>The <code>score_prompt_file</code> tool resolves the path safely (no symlink escape, no traversal, size-capped at 256 KiB by default), reads the file, and runs the same scorer.</p>

<h3 class="wp-block-heading">5. Look up the framework or techniques</h3>

<p><code>explain_ricce</code> dumps the canonical definition of all five components with insecure-vs-secure worked examples. <code>explain_techniques</code> covers complementary techniques (Zero-Shot, Few-Shot, Chain-of-Thought, Meta Prompting, RAG, Self-Consistency) and notes when to reach for each. Both are zero-cost, offline tools.</p>

<h3 class="wp-block-heading">6. Diagnostics</h3>

<p><code>health</code> returns a snapshot of the effective configuration: which LLM provider is active, which API keys are set (boolean only, never values), the judge model, the file allowlist, and whether project-specific extra rules are loaded. Useful when something isn't working and you want to know why.</p>

<h2 class="wp-block-heading">Security posture</h2>

<p>This is a tool that handles your prompts, your code, and your API keys. It's designed accordingly:</p>

<ul class="wp-block-list"><li><strong>Local-only.</strong> Stdio transport is the default — no network port, no listening socket. The HTTP daemon binds to <code>127.0.0.1</code>; remote access requires explicit configuration.</li>

<li><strong>Secrets via environment variables.</strong> The <code>.env</code> file is gitignored; <code>.env.example</code> ships as a template.</li>

<li><strong>Prompt-injection sandbox.</strong> When the candidate prompt is sent to the judge, it is wrapped in <code>&lt;candidate_prompt&gt;</code> tags with system-prompt instructions that explicitly mark the contents as untrusted data. The judge cannot be talked into ignoring the rubric.</li>

<li><strong>Structured tool-use output.</strong> The judge returns scores via the LLM's tool-use API, not free-form JSON, so a compromised judge cannot break the response shape.</li>

<li><strong>Path validation</strong> for file scoring: symlink resolution, default-deny outside <code>$HOME</code>, configurable allowlist, hard size cap.</li>

<li><strong>No filesystem writes</strong> anywhere in the codebase. The MCP cannot create, modify, or delete files on your machine.</li>

<li><strong>API timeout</strong> on every call. No hung sockets.</li>
</ul>

<h2 class="wp-block-heading">What's it cost?</h2>

<ul class="wp-block-list"><li><strong>Deterministic rubric (<code>mode="fast"</code>):</strong> free. Pure Python, runs offline. Use this while iterating.</li>

<li><strong>Full scoring (<code>mode="full"</code>):</strong> roughly $0.003–$0.02 per call depending on prompt length and the configured judge model. Prompt caching is enabled, so repeated calls within five minutes pay only for the differential input.</li>

<li><strong>Improve and wizard:</strong> ~one to two LLM calls per run. Self-revision in the wizard adds at most one extra call, and only when the deterministic rubric flags an issue with the draft.</li>
</ul>

<h2 class="wp-block-heading">Where to go from here</h2>

<p>If you're new to prompt engineering, start with <code>explain_ricce</code>, then run the wizard against a real task you've been struggling to phrase well. The output is your starting point — you can iterate on it, score it again, and watch the number climb as you tighten the language.</p>

<p>If you're already comfortable with RICCE, register the MCP into Claude Code once and let it run quietly in the background of every project. Score before you generate. The 30-second loop of "score → see what's missing → fix → re-score" pays for itself the first time it catches a missing constraint that would have shipped insecure code.</p>

<p>If you are interested in seeing the MCP in action, feel free to contact me to schedule a live demo. After the demo, you are welcome to receive the code and use, modify, or adapt it as you see fit.</p>

<p>Please note that this MCP is provided “as is,” without any warranties, guarantees, or assurances of any kind, express or implied. By accepting or using the code, you acknowledge and agree that you assume full responsibility and liability for its use, behavior, outputs, and any consequences that may result from deploying or interacting with it.</p>

<p>You are solely responsible for reviewing, testing, securing, and validating the MCP before using it in any environment, especially production systems or workflows involving sensitive data. Use of this software is entirely at your own risk.</p>

<p></p>
