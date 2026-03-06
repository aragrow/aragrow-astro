---
title: "How To Manually Purge A Large Number Of Posts In WordPress"
date: "2023-10-15"
modified: "2024-02-08"
slug: "how-to-manually-purge-a-large-number-of-posts-in-wordpress"
author: "David Arago"
categories: ["Blog"]
excerpt: "WARNING: By choosing to execute the commands mentioned herein, you acknowledge that you do so at your own risk. The author disclaims any liability for any direct or indirect damages, losses, or iss…"
featuredImage: "/images/blog/time-consumed-by-top-web-transactions.png"
---
<p class="has-vivid-red-color has-ast-global-color-4-background-color has-text-color has-background has-link-color"><strong>WARNING: </strong> By choosing to execute the commands mentioned herein, you acknowledge that you do so at your own risk. The author disclaims any liability for any direct or indirect damages, losses, or issues that may result from the use or misuse of the provided commands in your system.</p>

<p>In order to manually purge a large number of posts from the WordPress database you have to make sure that you not only delete the posts but all of the entries and files related to those posts. Before we get into the SQL statements to delete the posts, let’s take a look at what the wp_delete_posts() basically does.</p>

<h2 class="wp-block-heading">What WordPress does</h2>

<p>Ok, so I am not sure exactly what the order is of how WordPress deletes a post. This is just what would make sense to me.</p>

<ul><li>Delete the entries in the wp_postmeta table that are associated with the post children(attachments, revisions, etc.) The records associated with a post are identified by post id, which is stored in the field post_id.</li>

<li>Delete the post children in the table wp_posts. Child posts associated with a post are identified by parent post id, which is stored in the field post_parent.</li>

<li>Delete the entries in the wp_postmeta table that are associated with the post. The records associated with a post are identified by the post id, which is stored in the field post_id.</li>

<li>Delete the entries in the wp_term_relationship for the post. The relationships associated with a post are identified by the post id, which is stored in the field object_id.</li>

<li>Delete the post from the table wp_posts.</li>
</ul>

<h2 class="wp-block-heading">The SQL statements</h2>

<p>Again, I am not sure of the exact order that WordPress uses to delete the posts, but here is what I did: (<a href="https://dev.mysql.com/doc/refman/8.0/en/sql-statements.html" target="_blank" rel="noreferrer noopener">MySQL Statement</a>s)</p>

<h4 class="wp-block-heading">Create a temporary table with the ids of the post to delete.</h4>

<p>This is not necessary, but I found it very helpful to have a temporary table with the ids vs. a sub-query. I found that having a table is faster than running the subquery multiple times. The where clause would depend on your needs. In the example posts older than 01/01/2021 are selected for purging.</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>CREATE TABLE IF NOT EXISTS wp_posts_to_purge (id INT NOT NULL PRIMARY KEY) ENGINE=INNODB; INSERT INTO wp_posts_to_purge (id) SELECT id FROM wp_posts WHERE post_date &lt; ‘2021-01-01’ and post_type = ‘post’;</strong></p>

<p><strong>WARNING: Before you delete any post please first take a Backup, any delete operation done is irreversible. Please use it with caution!</strong></p>

<h4 class="wp-block-heading">Delete the entries in the wp_postmeta table that are associated with the post children</h4>

<p class="has-ast-global-color-4-background-color has-background"><strong>DELETE FROM wp_postmeta where post_id in (select id from wp_posts where post_parent in (select post_id from wp_posts_to_purge));</strong></p>

<p>These SQL Statement will delete the custom fields for attachments, revisions, and other custom post types associated with the posts.</p>

<h4 class="wp-block-heading">Delete the post children</h4>

<p>These SQL will delete the attachments, revisions, and other custom post types associated with the posts.</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>DELETE FROM wp_posts where post_parent in (select post_id from wp_posts_to_purge);</strong></p>

<h4 class="wp-block-heading">Delete the entries in the wp_postmeta table that are associated with the post</h4>

<p>These SQL will delete the custom fields associated with the posts.</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>DELETE FROM wp_postmeta where post_id in (select post_id from wp_posts_to_purge);</strong></p>

<h4 class="wp-block-heading">Delete the entries in the wp_term_relationship for the post</h4>

<p>These SQL will delete the categories and tags associated with the posts.</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>DELETE FROM wp_term_relationship where object_id in (select post_id from wp_posts_to_purge);</strong></p>

<h4 class="wp-block-heading">Delete the post</h4>

<p>This SQL will actually delete the actual posts.</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>DELETE FROM wp_posts where id in (select post_id from wp_posts_to_purge);</strong></p>

<h4 class="wp-block-heading">Clean up temp table</h4>

<p>This SQL will delete the custom table</p>

<p class="has-ast-global-color-4-background-color has-background"><strong>DROP TABLE wp_posts_to_purge;</strong></p>

<h2 class="wp-block-heading">How to run the SQL Statements</h2>

<figure class="wp-block-image size-large"><img src="/images/blog/time-consumed-by-top-web-transactions-1024x428.png" alt="" class="wp-image-320"/><figcaption class="wp-element-caption">Time Consumed By Top Web Transaction before and after. Graphic generated by New Relic</figcaption></figure>

<p>Well, this is going to depend on your familiarity with MYSQL and WordPress. Also, whether you have access to your database or not.</p>

<p>If you have access to the database, you can just execute the SQL sequentially and you will be set, this was my preferred option because I had more visibility of what the queries were deleting.</p>

<p>If you do not have access to the database, you could create a plugin and execute the custom SQL statements using $wpdb-&gt;query. Remember always to prepare your custom queries. This is way more work than it is needed unless you create so many posts daily that you are going to schedule this job to run frequently.</p>

<p>By default, MYSQL runs with the AUTOCOMMIT mode enabled, which pretty much means that each SQL statement is executed and committed independently. On the other hand, if you run your SQL Statements between&nbsp;<a href="https://dev.mysql.com/doc/refman/8.0/en/sql-transactional-statements.html" target="_blank" rel="noreferrer noopener">BEGIN TRANSACTION and COMMIT</a>, your changes will be rolled back if there is an error message.</p>

<p>Finally, whether you use one methodology or another, it is a good idea to&nbsp;<a href="https://dev.mysql.com/doc/refman/8.0/en/optimize-table.html" target="_blank" rel="noreferrer noopener">optimize</a>&nbsp;your tables. This is similar to the old Defrag in Windows and Mac. This will remove the unused space on the table.</p>

<p>If you liked this post, you may consider reading:&nbsp;<a href="/blog/my-wordpress-back-end-is-slow-now-what/">My WordPress Back-end is Slow. Now what?</a></p>

<figure class="wp-block-image size-large"><img src="/images/blog/top-database-query-1024x285.png" alt="" class="wp-image-321"/><figcaption class="wp-element-caption">Top Database Queries Time before and after. Graphic generated by New Relic.</figcaption></figure>
