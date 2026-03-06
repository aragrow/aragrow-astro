---
title: "How To Manually Purge A Large Number Of Posts In WordPress"
date: "2023-09-14"
modified: "2024-02-08"
slug: "how-to-manually-purge-a-large-number-of-posts-in-wordpress-2"
author: "David Arago"
categories: ["Blog"]
excerpt: "WARNING: WHAT WE DID IS SUPER DANGEROUS AND UNLESS YOU KNOW HOW TO RESTORE YOUR DATABASE, I WILL NOT ADVISE YOU TO DELETE RECORDS FROM THE DATABASE MANUALLY."
featuredImage: "/images/blog/kim-gorga-2Zl80uqruUU-unsplash.webp"
---
<p class="has-vivid-red-color has-text-color has-link-color has-small-font-size">WARNING: WHAT WE DID IS SUPER DANGEROUS AND UNLESS YOU KNOW HOW TO RESTORE YOUR DATABASE, I WILL NOT ADVISE YOU TO DELETE RECORDS FROM THE DATABASE MANUALLY.</p>

<p>In order to manually purge a large number of posts from the WordPress database you have to make sure that you not only delete the posts but all of the entries and files related to those posts. Before we get into the SQL statements to delete the posts, let’s take a look at what the wp_delete_posts() basically does.</p>

<p>The images featured in this post share a common theme. Following the execution of all SQL statements outlined in this article, the system experienced a notable reduction in taxing demands. As a result, unrelated queries began to run more efficiently, contributing to overall system performance enhancement.</p>

<figure class="wp-block-image size-full"><img src="/images/blog/top-5-database-operations.webp" alt="Top 5 Database Operations" class="wp-image-534"/><figcaption class="wp-element-caption">Top 5 Database Operations. New Relic Graphic.</figcaption></figure>

<h2 class="wp-block-heading">What WordPress does</h2>

<p>Ok, so I am not sure exactly what the order is of how WordPress deletes a post. This is just what would make sense to me.</p>

<ul><li>Delete the entries in the wp_postmeta table that are associated with the post children(attachments, revisions, etc.) The records associated with a post are identified by post id, which is stored in the field post_id.</li>

<li>Delete the post children in the table wp_posts. Child posts associated with a post are identified by parent post id, which is stored in the field post_parent.</li>

<li>Delete the entries in the wp_postmeta table that are associated with the post. The records associated with a post are identified by the post id, which is stored in the field post_id.</li>

<li>Delete the entries in the wp_term_relationship for the post. The relationships associated with a post are identified by the post id, which is stored in the field object_id.</li>

<li>Delete the post from the table wp_posts.</li>
</ul>

<figure class="wp-block-image size-full"><img src="/images/blog/time-consumed-by-top-web-transactions.webp" alt="Time Consumed by Top Web Transactions" class="wp-image-535"/><figcaption class="wp-element-caption">Time Consumed by Top Web Transactions. New Relic graphic.</figcaption></figure>

<h2 class="wp-block-heading">The SQL statements</h2>

<p>Again, I am not sure of the exact order that WordPress uses to delete the posts, but here is what I did: (<a href="https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html" target="_blank" rel="noreferrer noopener">MySQL Statement</a>s)</p>

<h4 class="wp-block-heading">Create a temporary table with the ids of the post to delete.</h4>

<p>This is not necessary, but I found it very helpful to have a temporary table with the ids vs. a sub-query. I found that having a table is faster than running the subquery multiple times. The where clause would depend on your needs. In the example posts older than 01/01/2021 are selected for purging.</p>

<pre class="wp-block-code"><code>CREATE TABLE IF NOT EXISTS wp_posts_to_purge (id INT NOT NULL PRIMARY KEY) ENGINE=INNODB; 
INSERT INTO wp_posts_to_purge (id) SELECT id FROM wp_posts WHERE post_date &lt; ‘2021-01-01’ and post_type = ‘post’;</code></pre>

<p class="has-luminous-vivid-orange-color has-text-color has-link-color has-small-font-size"><strong>WARNING: Before you delete any post please first take a Backup, any delete operation done is irreversible. Please use it with caution!</strong></p>

<h4 class="wp-block-heading">Delete the entries in the wp_postmeta table that are associated with the post children</h4>

<p>This SQL Statement will delete the custom fields for attachments, revisions, and other custom post types associated with the posts.</p>

<pre class="wp-block-code"><code>DELETE FROM wp_postmeta where post_id in (select id from wp_posts where post_parent in (select post_id from wp_posts_to_purge));</code></pre>

<h4 class="wp-block-heading">Delete the post children</h4>

<p>This SQL will delete the attachments, revisions, and other custom post types associated with the posts.</p>

<pre class="wp-block-code"><code>DELETE FROM wp_posts where post_parent in (select post_id from wp_posts_to_purge);</code></pre>

<h4 class="wp-block-heading">Delete the entries in the wp_postmeta table that are associated with the post</h4>

<p>This SQL will delete the custom fields associated with the posts.</p>

<pre class="wp-block-code"><code>DELETE FROM wp_postmeta where post_id in (select post_id from wp_posts_to_purge);</code></pre>

<h4 class="wp-block-heading">Delete the entries in the wp_term_relationship for the post</h4>

<p>This SQL will delete the categories and tags associated with the posts.</p>

<pre class="wp-block-code"><code>DELETE FROM wp_term_relationship where object_id in (select post_id from wp_posts_to_purge);</code></pre>

<h4 class="wp-block-heading">Delete the post</h4>

<p>This SQL will actually delete the actual posts.</p>

<pre class="wp-block-code"><code>DELETE FROM wp_posts where id in (select post_id from wp_posts_to_purge);</code></pre>

<h4 class="wp-block-heading">Clean up temp table</h4>

<p>This SQL will delete the custom table</p>

<pre class="wp-block-code"><code>DROP TABLE wp_posts_to_purge;</code></pre>

<figure class="wp-block-image size-full"><img src="/images/blog/top-databases-query-time.webp" alt="Top Databases Query Time" class="wp-image-536"/><figcaption class="wp-element-caption">Top Databases Query Time. New Relic graphic</figcaption></figure>

<h2 class="wp-block-heading">How to run the SQL Statements</h2>

<p>Well, this is going to depend on your familiarity with MYSQL and WordPress. Also, whether you have access to your database or not.</p>

<p>If you have access to the database, you can just execute the SQL sequentially and you will be set, this was my preferred option because I had more visibility of what the queries were deleting.</p>

<p>If you do not have access to the database, you could create a plugin and execute the custom SQL statements using $wpdb-&gt;query. Remember always to sanitize, with prepare,  your custom queries. This is way more work than it is needed unless you create so many posts daily that you are going to schedule this job to run frequently.</p>

<p>By default, MYSQL runs with the AUTOCOMMIT mode enabled, which pretty much means that each SQL statement is executed and committed independently. On the other hand, if you run your SQL Statements between&nbsp;<a href="https://dev.mysql.com/doc/refman/8.0/en/sql-transactional-statements.html" target="_blank" rel="noreferrer noopener">BEGIN TRANSACTION and COMMIT</a>, your changes will be rolled back if there is an error message.</p>

<p>Finally, whether you use one methodology or another, it is a good idea to&nbsp;<a href="https://dev.mysql.com/doc/refman/8.0/en/optimize-table.html" target="_blank" rel="noreferrer noopener">optimize</a>&nbsp;your tables. This is similar to the old Defrag in Windows and Mac. This will remove the unused space on the table.</p>

<p>If you liked this post, you may consider reading:&nbsp;<a href="https://dafdevelopment.com/wordpress/my-wordpress-back-end-is-slow-now-what/">My WordPress Back-</a><a href="https://aragrow.me/blog/how-to-manually-purge-a-large-number-of-posts-in-wordpress/">end</a><a href="https://dafdevelopment.com/wordpress/my-wordpress-back-end-is-slow-now-what/"> is Slow. Now what?</a></p>

<h2 class="wp-block-heading">Latest Posts</h2>

<div class="wp-block-query"></div>
