---
title: "Interactive RSTC Presentation"
date: "2025-05-07"
modified: "2025-05-23"
slug: "interactive-rstc-presentation"
author: "David Arago"
categories: ["Respect-Safety-Trust-Client"]
excerpt: "Chief Cook and Bottle Washer"
featuredImage: null
---
<style>
    body {
      margin: 0;
      background: #f8f9fa;
      color: #22223b;
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
    }
    .deck-container {
      max-width: 850px;
      width: 100%;
      margin: 40px 0 20px 0;
      background: #fff;
      border-radius: 24px;
      box-shadow: 0 4px 24px rgba(0,0,0,0.08);
      overflow: hidden;
      display: flex;
      flex-direction: column;
      align-items: stretch;
    }
    .slide {
      display: none;
      min-height: 420px;
      animation: fadeIn 0.6s;
    }
    .slide.active {
      display: flex;
    }
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(40px);}
      to { opacity: 1; transform: none;}
    }
    .slide-inner {
      display: flex;
      flex-direction: row;
      align-items: stretch;
      width: 100%;
      height: 100%;
    }
    .slide-image {
      flex: 0 0 200px;
      background: #e5e5e5;
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 220px;
      min-width: 160px;
      border-right: 1px solid #f0f0f0;
    }
    .slide-image img {
      max-width: 90%;
      max-height: 180px;
      border-radius: 16px;
      object-fit: contain;
    }
    .image-placeholder {
      width: 120px;
      height: 120px;
      background: #d0d6db;
      border-radius: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #8a8a8a;
      font-size: 1.2rem;
      font-weight: 700;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.05);
    }
    .slide-content {
      flex: 1 1 0;
      padding: 48px 32px 32px 32px;
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      justify-content: center;
    }
    .slide-content h1, .slide-content h2 {
      margin-top: 0;
      margin-bottom: 12px;
      color: #4f8cff;
      letter-spacing: 1px;
      font-weight: 700;
    }
    .slide-content h1 {
      font-size: 2.4rem;
    }
    .slide-content h2 {
      font-size: 1.7rem;
    }
    .slide-content p {
      font-size: 1.12rem;
      margin-bottom: 16px;
      line-height: 1.7;
      color: #333;
    }
    .slide-content ul {
      margin: 0 0 16px 16px;
      padding: 0;
      font-size: 1.08rem;
    }
    .slide-content ul li {
      margin-bottom: 8px;
    }
    .slide-content .block {
      background: #ffd166;
      color: #222;
      padding: 8px 18px;
      border-radius: 16px;
      font-weight: 700;
      display: inline-block;
      margin-bottom: 12px;
      font-size: 1.05rem;
      letter-spacing: 0.5px;
    }
    .slide-content .example {
      background: #e0f2fe;
      color: #222;
      padding: 8px 16px;
      border-radius: 12px;
      margin: 10px 0 16px 0;
      font-size: 1rem;
      font-style: italic;
    }
    .controls {
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 20px;
      padding: 18px 0 24px 0;
      background: #fff;
      border-top: 1px solid #eee;
    }
    .btn {
      background: #4f8cff;
      color: #fff;
      border: none;
      outline: none;
      border-radius: 50px;
      padding: 10px 28px;
      font-size: 1.1rem;
      font-weight: 700;
      cursor: pointer;
      transition: background 0.2s;
      box-shadow: 0 2px 8px rgba(79,140,255,0.08);
    }
    .btn:disabled {
      background: #b0cfff;
      cursor: not-allowed;
    }
    .progress {
      font-size: 1rem;
      color: #888;
      letter-spacing: 1px;
      font-weight: 500;
    }
    @media (max-width: 900px) {
      .deck-container {
        max-width: 98vw;
      }
    }
    @media (max-width: 700px) {
      .slide-inner {
        flex-direction: column;
      }
      .slide-image {
        border-right: none;
        border-bottom: 1px solid #f0f0f0;
        justify-content: center;
        min-height: 120px;
        min-width: 100px;
        padding: 20px 0 0 0;
      }
      .slide-content {
        padding: 28px 8vw 20px 8vw;
        min-height: 220px;
      }
    }
  </style>

<div class="deck-container">

<!-- Slide 1 -->
    <div class="slide active">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/01/WhatsApp-Image-2025-01-11-at-08.04.06-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h1>RSTC Method Slide Deck</h1>
          <p><span class="block">Chief Cook and Bottle Washer</span></p>
          <p>Building Strong Client Partnerships: <b>Respect, Safety, Trust, and Client Partnership</b></p>
          <div class="example">Let’s build our client tower together!</div>
        </div>
      </div>
    </div>

<!-- Slide 2 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/rstc-e1746565746312-1-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Introduction: Building Our Special Client Pyramid!</h2>
          <ul>
            <li>Imagine we’re building a big, strong pyramid together.</li>
            <li>This pyramid uses the <b>RSTC Method</b>-four building blocks stacked on top of each other.</li>
            <li>Respect -> Safety -> Truth - Client.</li>
            <li>It’s like the Golden Rule: treat clients how you want to be treated.</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 3 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/rstc-1-e1746564855693-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Block 1: <span class="block">Respect</span> (The Foundation)</h2>
          <ul>
            <li>Respect means caring about the client’s time, knowledge, and opinions.</li>
            <li>Be on time and prepared. Listen carefully. Ask smart questions.</li>
            <li>Be honest: if you don’t know something, say so and promise to find out.</li>
            <li>Keep promises, even small ones. Use clear, simple language.</li>
            <li>Always be polite and professional.</li>
          </ul>
          <div class="example">Personal: I’m good at listening and waiting to respond, which helps me understand clients’ needs.</div>
        </div>
      </div>
    </div>

<!-- Slide 4 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/rstc-1-e1746565164920-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Block 2: <span class="block">Safety</span> (The Other Foundation)</h2>
          <ul>
            <li>Clients need to feel safe and in control-they can say “no” at any time.</li>
            <li>Make it clear they’re in charge-no pressure.</li>
            <li>Offer choices and let them decide at their own pace.</li>
            <li>Be transparent about costs, timelines, and next steps.</li>
            <li>Care more about solving their problem than making a sale.</li>
            <li>Keep their information private.</li>
          </ul>
          <div class="example">Personal: I naturally wait for the client to lead, which makes them feel safe and respected.</div>
        </div>
      </div>
    </div>

<!-- Slide 5 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/rstc-1-e1746565391283-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Block 3: <span class="block">Trust</span> (Building Higher)</h2>
          <ul>
            <li>Trust grows when respect and safety are in place.</li>
            <li>Always do what you say you’ll do. Finish work on time.</li>
            <li>Show your expertise through your work, not just words.</li>
            <li>Admit when you don’t know something. Communicate openly.</li>
            <li>Handle mistakes professionally and honestly. Be consistent.</li>
            <li>Put the client’s needs first, even if it means less work for you.</li>
          </ul>
          <div class="example">Personal: My gut feeling helps me know when a project is a good fit, so I only take on work I believe in.</div>
        </div>
      </div>
    </div>

<!-- Slide 6 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/rstc-1-e1746565522240-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>The Top: <span class="block">Real Client Partnership</span></h2>
          <ul>
            <li>With respect, safety, and trust, you reach the top: a true partnership.</li>
            <li>Now you’re working together as a team, not just doing a job.</li>
            <li>You can tackle tough problems, brainstorm new ideas, and celebrate successes together.</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 7 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/ready-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Listening for “Ready!” Signals</h2>
          <ul>
            <li>Once trust grows, listen for signs the client is ready to move forward.</li>
            <li>Signs: questions about getting started, costs, or bringing in decision-makers.</li>
            <li>Gently check if they’re ready: “How would you like to move forward?”</li>
            <li>If yes, show them the next steps clearly and keep things safe and comfortable.</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 8 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/matthieu-rochette-uuCjDtqucvk-unsplash-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Handling “Not Ready” or “No”</h2>
          <ul>
            <li>Sometimes the answer is “no” or “not yet”-that’s okay!</li>
            <li>Respect their choice-never push or argue.</li>
            <li>If they’re willing, ask why, so you can learn.</li>
            <li>Stay polite and thank them for their time.</li>
            <li>If it’s “not yet,” ask when might be a better time to check in.</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 9 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/Screenshot-2025-05-06-at-16.36.18-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Keeping in Touch: Nurturing the Relationship</h2>
          <ul>
            <li>If there’s no clear yes or no, keep in touch in a helpful, friendly way (not pushy).</li>
            <li>Send a thank-you email after your talk.</li>
            <li>Share helpful articles or tips every few weeks.</li>
            <li>After three months, check in gently-no pressure.</li>
            <li>Always trust your gut about when to reach out.</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 10 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/emile-perron-_jXn-gNzuGo-unsplash-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Using the Right Words</h2>
          <ul>
            <li>Use words that show you care, listen, and let them choose.</li>
            <li>Avoid words that rush, pressure, or make them feel uncomfortable.</li>
            <li>Examples: “Based on what you said, here’s an idea…”, “No pressure-take your time deciding.”</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 11 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/cytonn-photography-n95VMLxqM2I-unsplash-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Conclusion: The RSTC Tower in Action</h2>
          <ul>
            <li>Building strong client partnerships is like building a tower: Respect + Safety + Trust = Partnership.</li>
            <li>When you use the RSTC Method, everyone wins-you, your clients, and their business.</li>
            <li>Let’s build more towers together-one block at a time!</li>
          </ul>
        </div>
      </div>
    </div>

<!-- Slide 12 -->
    <div class="slide">
      <div class="slide-inner">
        <div class="slide-image">
          <div class="image-placeholder"><img class="responsive-img" src="/wp-content/uploads/2025/05/towfiqu-barbhuiya-oZuBNC-6E2s-unsplash-150x150.webp" height="100%" /></div>
        </div>
        <div class="slide-content">
          <h2>Q&amp;A</h2>
          <p>Any questions? Let’s discuss real-life examples or challenges!</p>
          <div class="example">Thank you for your attention!</div>
        </div>
      </div>
    </div>

<!-- Controls -->
    <div class="controls">
      <button class="btn" id="prevBtn" disabled>&larr; Prev</button>
      <span class="progress" id="progress">1 / 12</span>
      <button class="btn" id="nextBtn">Next &rarr;</button>
    </div>
  </div>

<script>
    const slides = document.querySelectorAll('.slide');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progress = document.getElementById('progress');
    let current = 0;

    function showSlide(idx) {
      slides.forEach((slide, i) => {
        slide.classList.toggle('active', i === idx);
      });
      progress.textContent = `${idx + 1} / ${slides.length}`;
      prevBtn.disabled = idx === 0;
      nextBtn.disabled = idx === slides.length - 1;
    }

    prevBtn.addEventListener('click', () => {
      if (current > 0) {
        current--;
        showSlide(current);
      }
    });
    nextBtn.addEventListener('click', () => {
      if (current < slides.length - 1) {
        current++;
        showSlide(current);
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowRight') nextBtn.click();
      if (e.key === 'ArrowLeft') prevBtn.click();
    });
  </script>

<h3 class="wp-block-heading">If this post is resonating with you, keep reading — the posts below could help you take the next step.</h3>
