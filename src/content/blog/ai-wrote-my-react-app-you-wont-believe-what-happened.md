---
title: "AI Wrote My React App: You Won't Believe What Happened!"
date: "2025-05-27"
modified: "2025-05-23"
slug: "ai-wrote-my-react-app-you-wont-believe-what-happened"
author: "David Arago"
categories: ["Learning","Technology","Web Development"]
excerpt: "Imagine building a fully functional React application without writing a single line of code yourself. Sounds like science fiction? I tried it, and here's what happened."
featuredImage: "/images/blog/Screenshot-2025-05-23-at-13.09.34.png"
---
<p>Imagine building a fully functional React application without writing a single line of code yourself. Sounds like science fiction? I tried it, and here's what happened.</p>

<p>AI code generation is like having a super-smart assistant that can write code for you. You tell it what you want, and it creates the code automatically. It's changing the way we build software—like having a coding partner that never gets tired. While it's not perfect, it can save you a lot of time and effort.</p>

<p>In this post, I'll walk you through my journey of building a React application using AI. I'll share my personal experiences, both good and bad, and offer practical tips to help you succeed in your own AI-assisted development projects.</p>

<h2 class="wp-block-heading">Introducing the Application</h2>

<p>I decided to build a modern React application that connects to a headless WordPress. It's a great way to create a fast and user-friendly website using WordPress as a content source.</p>

<p>The app pulls data from WordPress and displays it in an easy-to-use interface. Users can browse articles, view images, and navigate the content seamlessly.</p>

<p>I wanted to explore how AI could help bridge the gap between the powerful content management of WordPress and the modern, interactive experience of React. Plus, it's a common setup for many websites today.</p>

<h3 class="wp-block-heading">Introducing Myself</h3>

<p>I'm a seasoned business analyst, developer, and technical consultant with over thirty years of experience. Throughout my career, I've worked with many development methods, programming languages, databases, and all kinds of projects.</p>

<p>While I'm comfortable with HTML, JavaScript, and CSS, I had never built anything with React or TypeScript before this project. This made using AI to help me even more interesting, since I was learning something new while relying on my past experience.</p>

<h3 class="wp-block-heading">How I Used AI</h3>

<figure class="wp-block-image alignleft size-medium has-custom-border"><img src="/images/blog/WhatsApp-Image-2025-05-14-at-07.14.10-1-300x225.jpeg" alt="Sketch of the Dashboard" class="wp-image-1610" style="border-width:1px;border-radius:2px"/><figcaption class="wp-element-caption">Sketch of the Dashboard</figcaption></figure>

<p>To start, I want to mention that while I used a specific AI tool for this project, the process I followed can work with any large language model (LLM) that supports code generation and image understanding.</p>

<figure class="wp-block-image alignright size-medium"><img src="/images/blog/WhatsApp-Image-2025-05-17-at-08.14.12-300x169.jpeg" alt="Sketch of the a Screen" class="wp-image-1608"/><figcaption class="wp-element-caption">Sketch of the a Screen</figcaption></figure>

<p>My first step was to sketch the login screen and dashboard on paper. The login screen was simple, with the usual fields for username and password. For the dashboard, I designed clickable tiles for navigation, so users could easily move between different sections without using traditional menus.</p>

<p>After sketching, I uploaded the images to the AI tool and included a description of what I wanted. For example, I asked it to "create a futuristic, modern, responsive, and accessible design." I also specified that the navigation should use tiles instead of menus, to keep things simple and user-friendly.</p>

<p>This approach helped me clearly communicate my ideas to the AI and get a design that matched my vision.</p>

<p>After giving the LLM my design sketches and explaining that I wanted to use React and TypeScript with a modular approach, the results were impressive. The AI generated four key files:</p>

<ul class="wp-block-list"><li>Login.tsx – The React component for the login screen with all the necessary input fields and validation logic</li>

<li>Dashboard.tsx – The React component for the main dashboard with the tile-based navigation I had sketched</li>

<li>login.css – The styling for the login screen, matching the modern and futuristic look I requested</li>

<li>dashboard.css – The styling for the dashboard, including the responsive tile layout</li>

<li>etc....</li>
</ul>

<p>The AI also provided all the core configuration files needed to set up and run a React application, like package.json with the right dependencies, tsconfig.json for TypeScript settings, and basic setup instructions.</p>

<p>This gave me a complete starting point – not just snippets of code, but a fully structured application ready to be installed and run.</p>

<h3 class="wp-block-heading">The Results</h3>

<p>The code the AI gave me was close, but it didn't work perfectly right away. Even though I was tempted to jump in and fix the code myself, I wanted to stay true to the experiment.</p>

<p>So, I kept asking the LLM for help, explaining what wasn't working each time. It took several tries, but eventually, the AI fixed the problems. In the end, the code did exactly what I wanted—and I didn't have to write a single line of code myself.</p>

<p>Next, I wanted to add more features to the application. I prompted the LLM with the new requirements, and while it generated code, getting it to work correctly took several tries.</p>

<p>The main issue was that the new code often broke the existing code. Things that used to work perfectly suddenly stopped functioning. I spent a couple of hours working with the LLM, describing the problems and asking for fixes, until I finally got everything working together smoothly.</p>

<p>It was a bit of a back-and-forth process, but eventually, the AI helped me achieve the desired functionality without writing code myself.</p>

<h3 class="wp-block-heading">Challenges</h3>

<p>The first challenge I ran into when using an LLM to create and maintain code is that you don't always know exactly what changes the AI is making. If the code doesn't work, you'll eventually need to understand and debug it yourself.</p>

<p>Sometimes, the LLM can get stuck in a loop, making the code worse with each iteration. This means you need to be ready to step in and guide the AI back on track.</p>

<p>The second challenge is that you'll still need to learn some programming skills. Even though the AI writes the code, you need to understand the basics to guide it effectively and debug any issues.</p>

<p>This learning process can take a significant amount of time and effort. So, while AI can help you get started quickly, it's not a complete replacement for learning to code.</p>

<h3 class="wp-block-heading">Lessons Learned</h3>

<p>If I were to do this again, I would definitely use a tool called Git, along with GitHub Desktop.</p>

<ul class="wp-block-list"><li><strong class="">Git:</strong> Think of Git as a "save point" system for your code. It tracks every change you make, so you can go back to earlier versions if something goes wrong.</li>

<li><strong class="">GitHub Desktop:</strong> This is a user-friendly application that makes using Git much easier, especially for beginners. It provides a visual way to manage your code and save your changes.</li>
</ul>

<p>With these tools, you can easily "commit" (save) your changes regularly. This gives you a clear picture of what the LLM is changing in your code. The more often you save, the easier it is to "rollback" (undo) changes. </p>

<p>That way, if the application stops working, you can quickly reset it to the last working version and try again. By using this method, you'll save time and avoid a lot of headaches if your application breaks. It's like having a safety net for your code!</p>

<h3 class="wp-block-heading">Conclusion</h3>

<p>There's no doubt that AI can help you build an application, even if you don't have a lot of technical skills. But would I recommend relying completely on AI to build and maintain your app? Most definitely not.</p>

<p>If you want to use AI for development, you'll still need to learn some programming and technical skills along the way. If you're lucky and everything works perfectly the first time (the "happy path"), that's great! But I can almost guarantee you'll run into the "unhappy path," where something breaks or doesn't work as expected. When that happens, having some technical knowledge will make all the difference.</p>

<p>My recommendation is to use AI as a helpful tool to refine your ideas, create a plan, and maybe even build a proof of concept (POC). AI can speed up the early stages and help you see what's possible.</p>

<p>But if you want to develop a custom app that works well and is secure, your best option is to work with a professional developer. This way, you can make sure everything runs smoothly and your app doesn't have hidden problems or security risks.</p>

<p>One last thing to keep in mind: AI isn't aware of its own limitations. Without meaning to, it could introduce known security vulnerabilities into your code.</p>

<p>So, use AI, but be careful and always double-check its work. It's like using a power tool – there's a big difference between using a skill saw to build a simple bread box versus building an entire garage. Know your limits and be aware of the risks.</p>

<h3 class="wp-block-heading">Glossary</h3>

<ul class="wp-block-list"><li><strong>AI Code Generation:</strong> A way to use artificial intelligence to write computer code for you. You describe what you want, and the AI creates the code automatically.</li>

<li><strong>Component (in React):</strong> A small, reusable piece of a website or app, like a building block. Each component does one job, such as showing a button or a form.</li>

<li><strong>CSS (Cascading Style Sheets):</strong> A language used to make websites look nice. It controls colors, fonts, spacing, and layout.</li>

<li><strong>Dashboard:</strong> A main screen in an app that shows important information and navigation options, often using tiles or cards.</li>

<li><strong>Debug:</strong> The process of finding and fixing problems or errors in code.</li>

<li><strong>Dependency:</strong> A piece of code or a library that your project needs to work. For example, React is a dependency for many web apps.</li>

<li><strong>Git:</strong> A tool that helps you save different versions of your code, so you can go back if something breaks. It’s like a “save point” system for your project.</li>

<li><strong>GitHub Desktop:</strong> A program that makes Git easier to use by giving you a simple, visual way to save and manage your code changes.</li>

<li><strong>Headless WordPress:</strong> Using WordPress just to store and manage content, without using its built-in website design. Another app (like React) displays the content instead.</li>

<li><strong>JavaScript:</strong> A programming language that makes websites interactive, like responding to clicks or showing animations.</li>

<li><strong>LLM (Large Language Model):</strong> A type of AI that understands and generates human language, like ChatGPT or other advanced chatbots.</li>

<li><strong>Modular (Code):</strong> Code that is split into small, separate parts (modules) that can be reused and managed easily.</li>

<li><strong>Navigation (UI):</strong> The way users move around an app or website, like menus, buttons, or clickable tiles.</li>

<li><strong>POC (Proof of Concept):</strong> A simple version of an idea or project, built to show that it can work.</li>

<li><strong>React:</strong> A popular tool for building websites and apps using small, reusable components.</li>

<li><strong>Responsive Design:</strong> A way of designing websites so they look good and work well on all devices, from phones to computers.</li>

<li><strong>Rollback:</strong> Going back to a previous version of your code if something goes wrong.</li>

<li><strong>Technical Skills:</strong> Knowledge and ability to use technology, like writing code, using tools, or understanding how software works.</li>

<li><strong>Tile-based Navigation:</strong> A way to move around an app using large, clickable boxes (tiles) instead of menus.</li>

<li><strong>TypeScript:</strong> A version of JavaScript with extra features that help catch mistakes before running the code.</li>
</ul>

<p></p>
