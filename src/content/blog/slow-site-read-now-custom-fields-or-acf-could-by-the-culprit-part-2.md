---
title: "Slow Site? Read Now, Custom Fields Or ACF Could By The Culprit - Part 2"
date: "2024-01-29"
modified: "2025-01-24"
slug: "slow-site-read-now-custom-fields-or-acf-could-by-the-culprit-part-2"
author: "David Arago"
categories: ["Blog"]
excerpt: "This post aims to analyze the performance disparity between utilizing Custom Post Types and Custom Fields versus Custom Tables within the WordPress environment. Through a retrospective examination …"
featuredImage: "/images/blog/rocco-stoppoloni-h6qnnmbkLBU-unsplash.webp"
---
<h2 class="wp-block-heading"><strong>Abstract:</strong></h2>

<p>This post aims to analyze the performance disparity between utilizing <a href="https://learn.wordpress.org/tutorial/custom-post-types-and-capabilities/">Custom Post Types</a> and <a href="https://learn.wordpress.org/tutorial/creating-custom-fields/">Custom Fields</a> versus <a href="https://learn.wordpress.org/tutorial/custom-database-tables/">Custom Tables</a> within the WordPress environment. Through a retrospective examination of this initiative, the study explores the environment, methodologies employed, and the resulting conclusions. By drawing from past experiences, actionable insights are provided for organizations seeking to optimize their WordPress setups.</p>

<figure class="wp-block-image size-large"><img src="/images/blog/rocco-stoppoloni-h6qnnmbkLBU-unsplash-1024x893.webp" alt="Photo by ROCCO STOPPOLONI on Unsplash" class="wp-image-503"/><figcaption class="wp-element-caption">Photo by ROCCO STOPPOLONI on Unsplash</figcaption></figure>

<h2 class="wp-block-heading"><strong>Introduction:</strong></h2>

<p>This study is rooted in a practical and real-world scenario encountered during a previous engagement. The context involved a broadcasting company's need to import Associated Press Stories and Media to its sites in a scheduled and predictable manner. To facilitate this, I developed a plugin to seamlessly ingest posts and media every 5 minutes, integrating them with manually generated posts by the News Department. However, the caveat was that the distributed posts and images could not extend beyond the company's websites.</p>

<h2 class="wp-block-heading"><strong>Environment:</strong></h2>

<p>The Wordpress environment was hosted in an Enterprise level Hosting Provider, which provides scalability, image optimization, CDN, and firewall services. </p>

<p>The plugin leveraged the <a href="https://developer.ap.org/ap-media-api/">Associated Press API</a>, providing access to stories, media, and associated metadata. Approximately 400 posts and an average of 4 images per post were ingested daily, resulting in approximately 140,000 posts and 560,000 images annually. The number of records in the post and post meta tables were as follows:</p>

<ul><li>Posts: Approximately 1,000,000 (inclusive of posts, media, revisions, etc.)</li>

<li>Post Meta: Approximately 4,000,000 (inclusive of thumbnails and metadata)</li>
</ul>

<p>See the <a href="https://codex.wordpress.org/Database_Description">Codex Database Description</a> for more information about these tables.</p>

<h2 class="wp-block-heading"><strong>Methodologies Employed:</strong></h2>

<p>The initial approach involved utilizing the native WordPress method of storing posts with a post type of "posts." <a href="https://www.advancedcustomfields.com/">Advanced Custom Fields (ACF)</a> were employed to manage metadata about the posts. It's pertinent to note that the challenges encountered were not unique to ACF usage but also prevalent with Custom Fields, as ACF operates as an "application layer" over Custom Fields. The ingestion process, occurring every 5 minutes, encompassed a mix of new posts and media, as well as updates to existing ones. A key query was implemented to differentiate between new posts and updates, with the WHERE clause filtering for:</p>

<ul><li>Published posts only.</li>

<li>Posts sourced from "AP" (utilizing a custom field).</li>

<li>Comparison based on the "Source Unique ID" to determine new posts or updates.</li>

<li>If an update, further comparison based on the "Source Version ID" to ascertain the necessity of updates based on version disparities.</li>
</ul>

<p>The subsequent sections of the white paper will delve into the performance implications of these methodologies and draw conclusions based on the observed outcomes.</p>

<h2 class="wp-block-heading"><strong>Conclusions:</strong></h2>

<p>As time progressed, I observed escalating performance issues within the backend and inconsistencies regarding post appearance on the website. The situation deteriorated with each passing day/month. Seeking resolution, I reached out to our Hosting Partner, who directed me towards the <a href="https://newrelic.com/">New Relic tool</a>, included as part of our Plan.</p>

<p>Upon utilizing the New Relic tool, I identified the AP plugin query as the foremost time-consuming query consistently topping the charts. Delving deeper, I investigated the storage of posts and ACF/Custom Fields, revealing an alarming volume of records stored in the WordPress tables, posts, and post_meta. Each post comprised multiple records in the post table (inclusive of posts, images, revisions, etc.), with numerous corresponding records in the post_meta table.</p>

<p>Executing the query via <a href="https://www.mysql.com/products/workbench/">MySQL WorkBench</a>, I noted several instances of Full Scan/ Full Reads. In MySQL, a full scan, or full table scan, involves the database engine examining every row in a table to fulfill a query request. Here are some drawbacks of Full Scans:</p>

<ul><li>Resource Intensive.</li>

<li>Slow Query Execution.</li>

<li>Negative Impact on Server Load.</li>

<li>Disk I/O Bottleneck.</li>

<li>Records Locking and Blocking.</li>

<li>Inefficient Memory Usage.</li>

<li>Limited Scalability.</li>

<li>Introduce Instability in the Database.</li>
</ul>

<p>Furthermore, the post_meta table indexed by the post id and meta key exacerbated the issue, leading to multiple Full Scans. Alas, altering the default index of the post_meta table was deemed unfavorable due to potential negative impacts on adding and updating records. While indexes bolster query performance, they also present drawbacks:</p>

<ul><li>Increased Storage Requirements.</li>

<li>Overhead for Write Operations.</li>

<li>Slower Data Modification.</li>

<li>Impact on Insert Performance.</li>

<li>Increased Memory Usage.</li>

<li>Complexity for Database Maintenance.</li>

<li>Index Selection Overhead.</li>
</ul>

<figure class="wp-block-image size-large"><img src="/images/blog/rohan-makhecha-jw3GOzxiSkw-unsplash-1024x911.webp" alt="" class="wp-image-509"/></figure>

<h2 class="wp-block-heading"><strong>Solution</strong>:</h2>

<p>After grappling with the notion of integrating Custom Tables, which entail additional knowledge and maintenance, I resolved that Custom Tables were the optimal approach. Drawing from previous experience with PeopleSoft and ORACLE databases, where a tweak in indexing transformed a laborious process into a swift one, I recognized the potential of custom tables and indexes.</p>

<p>Armed with this insight, I established a straightforward custom table to manage supplementary metadata previously housed in the post_meta table. This custom table, indexed by post id, maintained a one-to-one record relationship with posts, significantly reducing the record count compared to the post_meta table.</p>

<p>By implementing a custom query as opposed to the default WP_Query for post retrieval, I successfully alleviated the IO bottleneck, expediting query execution to a fraction of its former duration.</p>

<h2 class="wp-block-heading"><strong>Final Thoughts:</strong></h2>

<p>In navigating the labyrinth of database optimization, my journey unveiled the intricate balance between performance enhancement and system stability. Through meticulous examination and iterative refinement, I uncovered the nuanced interplay of indexing strategies, query execution, and database architecture.</p>

<p>In the realm of database optimization, as in life, every obstacle presents an opportunity for growth, and every solution provides a new horizon of possibility.&nbsp;</p>

<p>In closing, it's crucial to clarify that the performance challenges encountered were not a result of utilizing Advanced Custom Fields (ACF). Rather, they represent inherent hurdles within the WordPress framework. While WordPress offers an array of tools suited to various scenarios, it's important to recognize that not every issue can be resolved with a single solution. Just as a diverse toolkit contains both hammers and screwdrivers, WordPress provides versatile options to address different needs.</p>

<p>In my experience, ACF stands out as an indispensable resource for developing custom themes and plugins. The functionality it offers, particularly with repeating fields, surpasses its modest cost. Considering the expenses associated with in-house development of comparable features, ACF proves its worth effortlessly. I wholeheartedly recommend every WordPress developer and site owner explore the possibilities offered by this invaluable tool. However, like any potent remedy, it's essential to read the instructions and apply it judiciously, keeping it out of reach of inexperienced users.</p>

<p>In the upcoming article, I will showcase a series of images illustrating the significant performance improvements achieved in a scenario similar to the one described with 100,000 posts. These enhancements are not client-specific but represent a broader understanding of optimizing WordPress performance.</p>

<p>Additionally, I will provide a link to my GitHub repository containing a free plugin. This plugin has been designed to facilitate benchmark testing.  By sharing these insights and resources, I aim to contribute to the WordPress community's understanding of performance optimization strategies and provide practical tools for developers and users alike. Stay tuned for the article's release to explore these concepts further.</p>

<p></p>
