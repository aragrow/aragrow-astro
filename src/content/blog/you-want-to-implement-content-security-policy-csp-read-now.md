---
title: "You Want to Implement Content Security Policy (CSP). Read Now."
date: "2024-03-08"
modified: "2025-01-24"
slug: "you-want-to-implement-content-security-policy-csp-read-now"
author: "David Arago"
categories: ["Blog"]
excerpt: "Like any conscientious developer, I am implementing Content Security Policies to protect me site from Cross-Site Scripting (XSS) and data injection attacks. So i decided to run Google Lighthouse to…"
featuredImage: "/images/blog/jad-limcaco-DenHSkScL0Y-unsplash.webp"
---
<p>Like any conscientious developer, I am implementing Content Security Policies to protect me site from Cross-Site Scripting (XSS) and data injection attacks. So i decided to run Google Lighthouse to give it a thorough analysis. This time, I really paid attention to the report rather than just glancing at my Web Core Vitals score.</p>

<figure class="wp-block-image size-large"><img src="/images/blog/Lighthouse-CSP-Warning-1024x535.webp" alt="Lighthouse CSP Warning" class="wp-image-514"/><figcaption class="wp-element-caption">Lighthouse CSP Warning</figcaption></figure>

<p>While reviewing the Best Practices section, specifically under Trust and Safety, I noticed that I hadn't implemented the Content Security Policy. Armed with my 25 years of experience in development, I turned to ChatGPT and searched for "wordpress hook to add script-src and object-src metas to the header". Voila! The following code popped up.</p>

<pre class="wp-block-code"><code>// Add custom meta tags to the header
    function add_custom_meta_tags() {
        ?&gt;

        &lt;meta http-equiv="Content-Security-Policy" content="default-src 'self'; script-src 'self'; style-src 'self'; object-src 'self'"&gt;
    
        &lt;?php
    }
    add_action('wp_head', 'add_custom_meta_tags');</code></pre>

<p>In this CSP configuration:</p>

<ul><li class="has-small-font-size"><code>default-src 'self'</code>: Sets the default source for all resource types to the same origin.</li>

<li class="has-small-font-size"><code>script-src 'self'</code>: Allows scripts to be loaded from the same origin (<code>'self'</code>) .</li>

<li class="has-small-font-size"><code>style-src 'self'</code>: Allows stylesheets to be loaded from the same origin (<code>'self'</code>).</li>

<li class="has-small-font-size"><code>object-src 'self'</code>: Allows embedded objects to be loaded only from the same origin (<code>'self'</code>).</li>
</ul>

<p>So, I followed the advice and added the suggested code to my "functions.php" file in my child theme, using the Astra Theme. After saving the file, I cleared the entire cache using the LiteSpeed Cache Plugin. Excitedly, I reloaded my website, hoping to see the annoying message gone. And indeed, the message was nowhere to be found! But to my dismay, I noticed that most of my images were also missing. Oh no! </p>

<p>So before I started debugging the issue, I reverted my website back to before the changes.  Next I took the following steps to address the issue:</p>

<ol><li><strong>Review Your Content Security Policy</strong>: Check the CSP directives you added to your <code>functions.php</code> file. Ensure that the <code>img-src</code> directive allows images to be loaded from your domain. If it's not specified, consider adding <code>'self'</code> to allow images to be loaded from your own domain.</li>

<li><strong>Check for CSP Violations</strong>: Use the developer tools in your web browser to check for any CSP violations. This will help you identify if the CSP is indeed blocking the loading of images and which directives are causing the issue.</li>

<li><strong>Adjust CSP Directives</strong>: If you find that the CSP is blocking images, adjust the directives accordingly to allow images to be loaded from your domain while still maintaining security.</li>

<li><strong>Test and Iterate</strong>: After making changes to your CSP directives, be sure to test your website thoroughly to ensure that images are loading correctly and that the CSP isn't causing any other issues.</li>

<li><strong>Consider Using a Content Security Policy Reporting Endpoint</strong>: Implementing a CSP reporting endpoint can help you monitor and troubleshoot any CSP violations that occur on your website. This allows you to receive reports when the CSP is violated, helping you identify and address any issues more effectively.</li>
</ol>

<p>After spending about 30 or 40 minutes combing through my code and searching for any potential issues, I couldn't find anything suspicious. Then it hit me: the Gutenberg blocks I was using had images with relative paths, and those were the ones missing. After doing a bit more digging, I discovered that my changes were indeed blocking images with relative paths.</p>

<p>To resolve the issue, I simply added 'unsafe-inline' to the directive, and voila! All of my images started to show up perfectly fine.  So the new code looked like:</p>

<pre class="wp-block-code"><code>// Add custom meta tags to the header
    function add_custom_meta_tags() {
        ?>

        &lt;meta http-equiv="Content-Security-Policy" content="default-src 'self' 'unsafe-inline'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; object-src 'self' 'unsafe-inline'">
    
        &lt;?php
    }
    add_action('wp_head', 'add_custom_meta_tags');</code></pre>

<p>However, every action comes with a reaction. I realized that including 'unsafe-inline' in your CSP allows inline styles and scripts, which can potentially introduce security risks if misused. It's worth considering other methods like nonce or hash to mitigate these risks if possible.</p>

<p></p>
