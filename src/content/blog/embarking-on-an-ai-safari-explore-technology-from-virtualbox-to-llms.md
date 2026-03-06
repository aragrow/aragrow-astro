---
title: "Embarking on an AI Safari: Explore Technology from VirtualBox to LLMs"
date: "2025-02-08"
modified: "2025-02-08"
slug: "embarking-on-an-ai-safari-explore-technology-from-virtualbox-to-llms"
author: "David Arago"
categories: ["Blog","Learning","LLM Journey"]
excerpt: "Imagine venturing into a wild and untamed tech safari, where each technology is like a fascinating (and sometimes dangerous) creature. Together, we’ll explore five key technologies—VirtualBox, Linu…"
featuredImage: "/images/blog/Gemini_Generated_Image_k12c1fk12c1fk12c.webp"
---
<p>Imagine venturing into a wild and untamed tech safari, where each technology is like a fascinating (and sometimes dangerous) creature. Together, we’ll explore five key technologies—VirtualBox, Linux (Ubuntu), Python, MongoDB, and Large Language Models (LLMs). Don’t worry—I’ll be your "highly qualified" guide through this thrilling landscape.</p>

<p>This summary recaps my exploration of AI, specifically large language models (LLMs). Feel free to skip ahead if you've already read the article. As an AI novice, I'm documenting my learning journey, including the challenges and successes. Initially, the jargon surrounding local LLM hosting felt overwhelming. Data privacy is a key concern for me, and I believe locally hosted LLMs offer the best approach for safeguarding sensitive information. While acknowledging concerns about AI's potential impact on employment, I also see the possibility for new opportunities.</p>

<p>So here we go.......</p>

<h3 class="wp-block-heading">VirtualBox — The Enigmatic Chameleon</h3>

<p>Just like a chameleon blends into its <strong>environment</strong>, VirtualBox adapts and creates a whole new world inside your computer. It allows you to safely experiment with new systems without disturbing your main setup.</p>

<p>What is VirtualBox? VirtualBox is a powerful, cross-platform virtualization software that allows you to run multiple operating systems (like Windows, Linux, or macOS) simultaneously on a single computer.</p>

<figure class="wp-block-image alignleft size-full" style="margin-right:var(--wp--preset--spacing--80);margin-left:var(--wp--preset--spacing--80)"><img src="/images/blog/virtualbox-e1739052553901.webp" alt="Old large computer running virtualbox and flames coming from the back of the computer. it should be a webp format." class="wp-image-805"/><figcaption class="wp-element-caption">Old large computer running VirtualBox and flames coming from the back of the computer.  it should be a webp format.</figcaption></figure>

<p>My experience with VirtualBox has been a bit of a mixed bag. It's undeniably powerful, but it's not a perfect solution. Running a virtual machine in VirtualBox can significantly impact your computer's performance, sometimes making it feel sluggish or even unresponsive. However, its strengths lie in its ability to provide a safe sandbox for testing and experimentation.</p>

<p>As mentioned earlier, I found VirtualBox invaluable for trying out new software or installations I was unsure about. It's like building a sandcastle—if it doesn't turn out how you like, you just wipe the slate clean and start over. This is crucial because installing software directly on your main operating system can be messy. Software often scatters files and registry entries throughout your system, making complete uninstallation difficult or even impossible. With VirtualBox, you avoid this risk. If something goes wrong or you decide you don't like the software, you simply delete the virtual machine, leaving your main system untouched. It's a clean and efficient way to explore new software without the fear of damaging your primary setup.</p>

<p>It's important to remember that VirtualBox is more of a "little brother" in the virtualization world, with other, more robust (and often more resource-intensive) tools available like VMware, Hyper-V, and XenServer.</p>

<p><strong>"VirtualBox, where you can safely destroy an operating system without destroying your actual operating system.</strong>"</p>

<h3 class="wp-block-heading">Linux (Ubuntu) — The Wise Elephant</h3>

<p>Linux, particularly Ubuntu, is like the wise elephant of the tech world: powerful, reliable, and essential for navigating your tech safari. It remembers everything and leads you on a stable path.</p>

<p>What is Ubuntu? Ubuntu is a versatile operating system suitable for both beginners and experienced users, and is often used for personal computing, server deployments, and cloud computing.</p>

<figure class="wp-block-image alignright size-full" style="margin-right:var(--wp--preset--spacing--80);margin-left:var(--wp--preset--spacing--80)"><img src="/images/blog/ubuntu-e1739052569848.webp" alt="A humorous cartoon depicting a person with a bewildered expression attempting to install Ubuntu Linux on an antiquated personal computer." class="wp-image-799"/><figcaption class="wp-element-caption">Ubuntu installation on an old PC: A test of patience and perseverance."</figcaption></figure>

<p>I have some experience with Ubuntu for years, though professionally I've had more exposure to CentOS. My impression is that Ubuntu boasts a larger community and more readily available support resources, making it a popular choice among developers (though this is based on my perception, not hard data). While Ubuntu is generally considered user-friendly and straightforward for basic tasks, my previous developer experience focused on interacting with servers rather than managing their installation and upkeep.</p>

<p>Consequently, I've found troubleshooting Ubuntu issues quite frustrating. The initial setup is often smooth, but navigating problems has been challenging—a reflection of my own knowledge gaps, not necessarily a flaw in Ubuntu itself. Through trial, error, and generous assistance from AI, I've successfully installed multiple Ubuntu instances. Like anything, it takes time and persistence. The key is to keep learning.</p>

<p></p>

<p></p>

<p></p>

<p><strong>"Linux is free, but only if your time is worthless."</strong></p>

<p></p>

<h3 class="wp-block-heading">Python — The Clever Fox</h3>

<p>Python is the clever fox that scampers through the coding jungle. It’s quick, nimble, and adaptable to almost any task.</p>

<p>What is Python?  Python is a versatile, high-level programming language known for its readability and extensive libraries.</p>

<figure class="wp-block-image alignleft size-full" style="margin-right:var(--wp--preset--spacing--80);margin-left:var(--wp--preset--spacing--80)"><img src="/images/blog/cartoon_python_coding_512x512-e1739052535947.webp" alt="" class="wp-image-815"/></figure>

<p>One of the things I really appreciate about Python is how incredibly versatile and easy it is to work with modules. Whether you need to crunch numbers with NumPy, wrangle data with Pandas, build a web app with Flask, or explore machine learning with TensorFlow, there's likely a module for it. And the best part is, installing these modules is usually a breeze.</p>

<p>I'm a huge fan of Python. Its clear syntax, ease of understanding, and powerful capabilities make it my favorite programming language. Over my 25-year programming career, I've worked with numerous languages, from Basic and RPG to SQL, PHP, and JavaScript, but Python stands out. Despite knowing about Python for years, I didn't have a chance to use it professionally until a hands-on AWS re:Invent workshop in Las Vegas. Within minutes, I grasped the fundamentals and was writing basic functions. In my opinion, if you're going to learn one programming language, Python is an excellent choice.  </p>

<p></p>

<p><strong>"</strong></p>

<p></p>

<p><strong>Python, because life is too short to write in other programming language."</strong></p>

<h3 class="wp-block-heading">MongoDB — The Data-Hoarding Squirrel</h3>

<p>MongoDB is like a squirrel that gathers and organizes massive amounts of information. It’s efficient, fast, and flexible.</p>

<p>What is MongoDB? MongoDB is a document database that stores data in flexible, JSON-like documents, unlike traditional tables.</p>

<figure class="wp-block-image alignright size-full" style="margin-right:var(--wp--preset--spacing--80);margin-left:var(--wp--preset--spacing--80)"><img src="/images/blog/mongodb_1-e1739052585801.webp" alt="Here is a drawing of boxes piled in a basement with the following labels: Immigration Papers, Grandma's stuff, Uncle Joe's moonshine recipes, Navy stuff, WWII clippings from GrandPa, and some others" class="wp-image-795"/><figcaption class="wp-element-caption">My baseman. No words.</figcaption></figure>

<p>Out all the technologies in this post, MongoDB and LLM are the least proficients in my toolbox, I have found MongoDB to be a very easy logical way to store data. Imagine your data is your life memories of important papers, old photos, clippings of the "We Won" newspapers, hand written notes from Dad to Mom, your Grandma crunchy bread recipe, uncle's Juan strawberry brandy secret recipe, your cutting of the 1980 Olympic Hockey team from the Wheaties box, etc...</p>

<p>In a traditional database, like a filing cabinet, forces you to organize everything into rigid folders with strict labels. MongoDB, on the other hand, is more like a modern, flexible storage system. Instead of forcing everything into pre-defined folders, you can store your papers in labeled boxes, and each box can hold different kinds of documents.</p>

<p>You can easily add new boxes (data) and change the labels (structure) as needed without having to reorganize the entire cabinet. This makes MongoDB much more adaptable and easier to use when your data is constantly changing or you're not quite sure how you want to organize it from the start. It's like having a filing system that adapts to you, rather than the other way around.</p>

<p></p>

<p></p>

<p></p>

<p></p>

<p><strong>"MongoDB: Because sometimes, you just want to store your data in a pile and hope  for the best."</strong></p>

<h3 class="wp-block-heading">LLMs — The Majestic Lion</h3>

<p>LLMs (Large Language Models) are the majestic lions of the AI savanna. They command attention, process vast amounts of information, and generate incredible text responses.</p>

<p>What is an LLM? An LLM, or Large Language Model, is like a really smart computer program that has read a ton of books, articles, and websites. </p>

<p>Basically, LLMs are making computers better at understanding and using language, which is making a lot of things easier and more efficient.  LLMs are used for all sorts of things, like:</p>

<figure class="wp-block-image alignleft size-full" style="margin-right:var(--wp--preset--spacing--80);margin-left:var(--wp--preset--spacing--80)"><img src="/images/blog/llm-e1739052500991.png" alt="Cartoon of lion eating papers" class="wp-image-807"/><figcaption class="wp-element-caption">Cartoon of lion eating papers</figcaption></figure>

<ul class="wp-block-list"><li>Chatbots: The friendly helpers you chat with on websites.</li>

<li>Writing emails or stories: They can even help you write different kinds of creative content.</li>

<li>Translating languages: They can quickly translate between different languages.</li>

<li>Summarizing long articles: If you don't have time to read a whole article, an LLM can summarize it for you.</li>
</ul>

<p></p>

<p></p>

<p></p>

<p></p>

<p></p>

<p></p>

<p>"<strong>An LLM is like your know-it-all friend — confident, convincing, and occasionally hilariously wrong.</strong>"</p>

<h3 class="wp-block-heading">And Now the Spanish Joke</h3>

<p>Like is tradition in my posts, well this is the second post that I do it, but it is a tradition.  I am going to reward you with another Spanish Joke.  This joke is not mine, it is from a great spanish comedian that goes by the name of Comandante Lara.  Ok before the joke, you must know that during the Pademic, in Spain people were not allow to be in the street a lot.  Only essentials trips were allowed.</p>

<p>"Mi friend Joe, was one of those people who just ignored the lockdown rules and didn’t care about anything. One night, he was out and about". "Joe, with a few too many drinks, was wandering down the street at four in the morning when the police spotted him.</p>

<p>The pair of officers approached him and asked, 'Where are you going, sir?'"</p>

<p>Joe replied, 'Look, I’m going to a conference about alcohol abuse and its lethal effects on the body, the bad example it sets for children, and the terrible consequences for the family." </p>

<p>The police, puzzled, respond, "Come on now, who's going to give you a conference at four in the morning?" </p>

<p>To which Joe replies, "Who else? My wife when I get home."</p>

<p>Thanks.</p>
