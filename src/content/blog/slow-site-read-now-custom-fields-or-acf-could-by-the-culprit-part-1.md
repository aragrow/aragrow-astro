---
title: "Slow Site? Read Now, Custom Fields Or ACF Could By The Culprit - Part 1"
date: "2024-01-23"
modified: "2025-01-24"
slug: "slow-site-read-now-custom-fields-or-acf-could-by-the-culprit-part-1"
author: "David Arago"
categories: ["Blog"]
excerpt: "In this article I am going to discuss the advantages and drawbacks of using Advanced Custom Fields (ACF) and custom fields in WordPress, particularly when dealing with performance issues related to…"
featuredImage: "/images/blog/istockphoto-179088284-612x612-1.jpg"
---
<p>In this article I am going to discuss the advantages and drawbacks of using Advanced Custom Fields (ACF) and custom fields in WordPress, particularly when dealing with performance issues related to querying large amounts of data. I will suggest a potential solution involving custom tables to optimize query performance, especially for complex filtering scenarios. This article is aimed at site owners who are dealing with performance bottlenecks in WordPress sites that extensively use advanced custom fields.</p>

<figure class="wp-block-image size-full"><img src="/images/blog/istockphoto-179088284-612x612-1.jpg" alt="" class="wp-image-337"/><figcaption class="wp-element-caption">A Texas tortoise on a pea gravel road in south Texas.</figcaption></figure>

<p>The power of the ACF plugin cannot be overhyped, it is a must-have plugin for developing very versatile custom plugins.&nbsp; Just the ACF repeated field functionality makes the cost of a premium license totally worth the price.</p>

<p>ACF empowers novice WordPress developers by giving them a lot of power very quickly without a steep learning curve that would have understood how to integrate Custom Fields into the administrator screens.&nbsp; That was my case when we migrated from a ColdFusion CMS to WordPress.&nbsp; Using the functionality of the repeating field, we were able to create very complicated administration screens with just a couple of minutes of setup.&nbsp; Without fact-checking my numbers, I could estimate that it saved us several months of learning, and then developing the admin screens.</p>

<p>I 100% use ACF when possible, so if ACF is so good and I used it all the time, why the dramatic post headline of this article? &nbsp;And what is the point of this article?&nbsp; &nbsp;</p>

<p>Well as part of the versatility of ACF developers can attach custom fields to posts and pages.&nbsp; Which in a normal small blog site it won’t be an issue and users will not notice any performance degradation of the CMS.&nbsp; The problem becomes apparent when the site has several 10 of thousands of posts.</p>

<p>With that said, this issue is not unique to ACF, it is an inherited problem with the way that WordPress attaches custom fields to posts and pages.&nbsp; ACF uses the WordPress core custom fields model, so it inherent its performance issues.</p>

<p>Also, I must clarify that the only performance degradation of the CMS related to ACF/Custom Fields (ACF/CF) that we experienced was related on using the ACF/CF as part of the where clause in queries.&nbsp; Selecting the ACF/CF as part of the SELECT clause did not degrade performance.</p>

<p>If you do not care to get in the weed of how WordPress organizes the custom fields and how it saves and retrieves them, you can skip the next several paragraphs.&nbsp;</p>

<p>WordPress uses the wp_postmeta table to store a bunch of attributes and options related to the environment.&nbsp; Because the table is very versatile and flexible is one of the most use tables by WordPress.&nbsp; This table is structured by post_id, meta_key, and meta_value. And it is indexed by post_id, meta_key.&nbsp; Depending on the number of custom fields that you have, the ratio between the wp_post table to wp_postmeta it could be 10-fold.&nbsp; In our case, we had 150K rows in the wp_posts, and over 1.5 million rows in the wp_postmeta.</p>

<p>WordPress has optimized this process to retrieve all the information related to a post or posts, and it does it well and efficiently.&nbsp; A good example of using custom SQL could be:</p>

<p>The following query will retrieve the 10 most recent posts in the database with the expiration date of the post.&nbsp; Because we are joining to the wp_postmeta by using the post ID, the query uses the indexes correctly and retrieves the data very efficiently.</p>

<pre class="wp-block-code"><code>SELECT ID, post_date, post_date, post_title, meta_value as post_expire_date

FROM wp_posts p

JOIN wp_postmeta m

ON&nbsp; p.ID = m.post_id

AND m.meta_key = 'post_expire_date'

WHERE p.post_status = 'publish'

ORDER BY p.post_date desc, p.ID

LIMIT 0, 10</code></pre>

<p>This SQL query retrieves data from the WordPress database, specifically the IDs, post dates, post titles, and custom field values (renamed as “post_expire_date”) for posts. The data is retrieved from two tables: ‘wp_posts’ (aliased as ‘p’) and ‘wp_postmeta’ (aliased as ‘m’). The join operation is performed based on the matching post IDs (‘ID’ column in ‘wp_posts’ and ‘post_id’ column in ‘wp_postmeta’), with an additional condition that the meta key in ‘wp_postmeta’ should be ‘post_expire_date’. The query filters for posts with a ‘publish’ status, orders the results by post date in descending order, along with the post ID, and finally limits the output to the first 10 results.</p>

<p>If we want to retrieve the 10 most recent posts in the database that has not expired as of ‘2023-08-10 14:00:00’, we need to add the meta_value as part of the where clause.</p>

<pre class="wp-block-code"><code>SELECT ID, post_date, post_date, post_title

FROM wp_posts p

WHERE p.post_status = 'publish'

AND p.ID in (select post_id

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; FROM wp_postmeta

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; WHERE&nbsp; meta_key = 'post_expire_date'

&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; AND meta_value &gt; '2023-08-15 14:00:00')

ORDER BY p.post_date desc, p.ID

LIMIT 0, 10</code></pre>

<p>This SQL query retrieves data from the WordPress database, specifically the IDs, post dates, and post titles for posts. The data is retrieved from the ‘wp_posts’ table (aliased as ‘p’). The query filters for posts with a ‘publish’ status and further refines the results by selecting only those posts whose IDs are found in the subquery. The subquery selects ‘post_id’ values from the ‘wp_postmeta’ table where the ‘meta_key’ is ‘post_expire_date’ and the ‘meta_value’ is greater than ‘2023-08-15 14:00:00’. The results are ordered by post date in descending order, along with the post ID, and finally, the output is limited to the first 10 results.</p>

<p>Because the wp_postmeta is not indexed by meta_value, the database needs to do a FULL read of the wp_postmeta, which means reading all the records in the table and then removing which ever does not match the criteria.</p>

<p>Let me provide further clarification regarding the analogy used in the preceding paragraph. Envision a scenario where the phone book is organized based on phone numbers rather than names. Locating the person associated with a specific number becomes a swift and efficient process. However, consider a situation where you need the phone numbers of ten specific clients in Minnesota, and you only have their names. Since the phone book is sorted by phone number, and you lack knowledge of the numbers, you must commence searching from the first page and continue reading until the last page to find those numbers. This task, as you can imagine, becomes tedious and time-consuming. In essence, this mirrors the challenge outlined in my example. A seemingly straightforward query was consuming a substantial amount of time, and we found ourselves running this query multiple times per minute. This occurred each time a post was updated or a new post was created.</p>

<figure class="wp-block-image size-full"><img src="/images/blog/istockphoto-1251678849-612x612-1.jpg" alt="" class="wp-image-335"/><figcaption class="wp-element-caption">Fast moving asphalt road and green forest landscape.</figcaption></figure>

<p>In the upcoming article, I will provide a detailed, step-by-step explanation of the solution we implemented to enhance the performance of our processes. It's important to note that this represents one solution, and it's entirely possible that you may have devised a better and more elegant approach than mine.</p>

<h2 class="wp-block-heading">Other Posts</h2>

<h2 class="wp-block-heading has-small-font-size"><a href="/blog/slow-site-read-now-custom-fields-or-acf-could-by-the-culprit-part-2/">Slow Site? Read Now, Custom Fields Or ACF Could By The Culprit - Part 2</a></h2>
