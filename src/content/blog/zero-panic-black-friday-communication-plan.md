---
title: "Zero Panic Black Friday: Communication Plan"
date: "2026-11-05"
slug: "zero-panic-black-friday-communication-plan"
author: "David Arago"
sticky: true
categories: ["Blog", "Zero Panic Black Friday"]
excerpt: "Build a Black Friday and Cyber Monday communication plan: an owner, backup, and vendor for every area, with every number tested before the weekend."
featuredImage: "/images/blog/zero-panic-black-friday-communication-plan.webp"
featuredImageAlt: "Banner reading Zero Panic Black Friday: Communication Plan, with a red and white megaphone and a Black Friday price tag on a black background."
---
Most online stores have a contact list somewhere. A spreadsheet, a note on someone's phone, a few numbers saved in a group chat. What most stores don't have is a list they have actually tested.

A communication plan answers one question before you need it: when something breaks, who do we call, and will they pick up? This post covers what goes in that plan, a layout that works for any size team, and the step most stores skip, which is calling every number before the weekend.

This one is about reaching your own people. Talking to customers during an outage, with pre-written messages and a status page, is the next post in this series.

## Why it matters on Black Friday and Cyber Monday

When checkout breaks on a normal Tuesday, a slow response costs you a few orders. From Black Friday through Cyber Monday, every minute spent hunting for a phone number is a minute of your biggest sales week going elsewhere.

And the biggest platform outage of last season didn't land on Black Friday at all. On Cyber Monday, December 1, 2025, a fault in Shopify's login flow locked merchants out of their admin and in-store point of sale for several hours. Storefronts and checkout stayed online, so orders kept arriving while merchants could not fulfill them, launch a discount, or send a campaign email. [Shopify stock closed down almost 6% that day](https://www.cnbc.com/2025/12/01/shopify-outage-cyber-monday-shopping.html).

The problems are rarely dramatic. They look like this:

- The developer who knows the server is traveling for Thanksgiving, and nobody has their personal number.
- The hosting support line saved in the spreadsheet is two years old.
- Three people open tickets with the payment provider at once, and nobody knows who is in charge.
- The person who can approve an emergency change is unreachable, so the fix waits.

Each of these is a communication problem, not a technical one. And each one is cheap to prevent if you find it before the week starts.

## What goes in the plan

A communication plan is a contact roster organized by area of responsibility. For each area, you name one person who owns it, one backup, and the outside vendor you would call. Every name gets a phone number that has been confirmed to work.

It is the layout used in incident response plans, and it works because during an incident people don't search by name. They search by problem: "payments are down, who do I call?"

### The areas to cover

Most stores need these areas. One person may cover several of them, as long as each has a backup.

- **Decision maker:** approves emergency changes and spending
- **Communications owner:** writes and sends customer updates
- **Website and store platform:** the storefront, checkout, and extensions
- **Hosting and servers:** where the site runs
- **Domain, DNS, and SSL:** what keeps the site reachable and trusted
- **Payments:** gateway and processor
- **Shipping and fulfillment:** warehouse, carriers, and label printing
- **Customer service:** email, chat, and phone support
- **Marketing and email:** campaigns, email platform, and ads
- **Security:** suspicious activity, fraud, and account lockouts

### The roster layout

Keep it to one page you can print. One row per area:

| Area | Owner | Owner phone | Time zone | Backup | Backup phone | Time zone | Vendor and support number | Account number stored in | Call test |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Decision maker |  |  |  |  |  |  |  |  |  |
| Communications owner |  |  |  |  |  |  |  |  |  |
| Website and store platform |  |  |  |  |  |  |  |  |  |
| Hosting and servers |  |  |  |  |  |  |  |  |  |
| Domain, DNS, and SSL |  |  |  |  |  |  |  |  |  |
| Payments |  |  |  |  |  |  |  |  |  |
| Shipping and fulfillment |  |  |  |  |  |  |  |  |  |
| Customer service |  |  |  |  |  |  |  |  |  |
| Marketing and email |  |  |  |  |  |  |  |  |  |
| Security |  |  |  |  |  |  |  |  |  |

**Want this as an editable Google Doc?** [Email me](mailto:davidarago@aragrow.me?subject=Black%20Friday%20roster%20template) and I will send you a copy you can fill in, share with your team, and print. No form, no list.

A few rules make the roster work:

- **Personal phone numbers, not just work email.** The whole stretch from Thanksgiving to Cyber Monday is a holiday weekend.
- **Time zones for anyone remote.** Otherwise someone gets a call at 3 a.m., or you sit waiting on a person who is asleep.
- **Write down where account numbers live, not the numbers themselves.** Point to your password manager instead.
- **Print it, then collect it.** If your email or shared drive is down, a paper copy still works. It is also a page of your team's personal mobile numbers, so number the copies, hand them out, and collect them on the Tuesday after Cyber Monday.

## Two weeks out: authorize your vendors

Most vendors will not discuss an account with a name they don't have on file. Adding an authorized contact can take days, and priority support longer, so this belongs on Monday, November 16, not in the same week as everything else.

- **Add the owner and the backup as authorized contacts** on every vendor account: hosting, payment gateway, platform, carriers.
- **Ask what fast support looks like** for your plan. Find out whether there is a priority line, an emergency number, or a named account contact, and what they will ask you for.
- **Tell your team who owns each vendor relationship.** The roster already names them. Share it, so three people don't open three tickets for the same problem.

Nobody at the vendor should be surprised by Bob calling when Bob has never talked to them before. A known name on the account gets a faster response than a stranger with an urgent voice.

## Four days out: make the calls

A roster is only a plan once you've tested it. On Monday, November 23, call every number on the list. Not an email, not a group message. A real call.

Four days out is close enough that the numbers reflect who will actually be working the holiday weekend, and far enough that you still have time to fix what you find. One test covers the whole run, from Thanksgiving through Cyber Monday on November 30.

Set aside an hour and work through the roster in order:

1. **Call each owner.** Confirm they answer, that they know which area they own, and that they'll be reachable Thanksgiving through Cyber Monday.
2. **Call each backup.** Same questions, plus one more: confirm they have the logins and access to actually fix things, not just answer the phone.
3. **Call each vendor support line.** Confirm the number still works, how long the hold is, and that your authorized contacts from two weeks ago are on file.
4. **Test after-hours numbers after hours.** If a vendor's emergency line only works at night or on weekends, call it then.
5. **Record the result in the last column:** the date, who you reached, and anything that needs fixing.

Keep each call short. You aren't running a meeting, you're checking that the line works and the person knows their role. Fix what you find the same day: it is cheap to repair on November 23 and expensive to discover on November 27.

## Why one phone number is never enough

People are reliable. Phones are not. Every one of these has happened on teams I've worked with, including my own phone:

- **Do Not Disturb was on.** During an emergency, my own phone was set to Do Not Disturb, and the call never rang.
- **The battery died.** A coworker's phone died the evening before, and he didn't notice until morning.
- **The phone was left at the office.** A coworker went home for the night and left the phone on his desk.
- **The phone was left in the car.** Another coworker's phone spent the night in the car on his night off.

None of these people were careless. They were living normal lives on a normal evening. The plan has to expect that.

Over a holiday weekend, add these: the number changed and nobody updated the roster, the person is on a plane or at a relative's house with no signal, the call was silenced because the phone treats unknown numbers as spam, the person left the company, or the vendor's line now goes to a chat-only queue.

### Make sure the call actually rings

Three settings and one habit cover most of it. Do all four during the November 23 call test:

- **Save the whole roster as contacts** on every phone, so no caller shows up as an unknown number.
- **Add those contacts to the Do Not Disturb exceptions.** On iPhone that's Allowed Notifications in your Focus settings; on Android it's Priority contacts under Do Not Disturb.
- **Turn on repeated calls.** iPhone calls it **Repeated Calls** in Focus settings, Android calls it **Repeat callers** under Do Not Disturb. Either one lets a second call from the same number within a few minutes ring through a silenced phone.
- **Charge every night** of the holiday week, and keep a battery pack nearby.

### Agree when to move to the backup

The roster only works if everyone knows when to stop waiting. Write this at the top of the page:

1. Call the owner. If there's no answer, call again right away.
2. Send a text that says it's urgent and which area is affected.
3. If there's no response within 10 minutes, call the backup.
4. If neither answers within 20 minutes, call the decision maker.

That way, a dead battery or a forgotten phone costs you 10 minutes, not the whole evening.

## Pick one default channel

When something breaks, the first minutes get wasted deciding where to talk. One person replies to an email thread, two more are in a text chain, and the developer is answering in a chat nobody else checks. Every retelling loses something.

Decide the channel now. The phone call is the alert. The conversation happens in one agreed place.

### What worked for us on election night

Election night at a broadcaster is the closest thing in my experience to Black Friday: a fixed date, traffic you can't postpone, and live results feeding several station sites at once. Our team kept one online meeting open the whole night, with the link shared in advance, so nobody had to dig through an inbox while something was broken.

The flow was simple. An issue occurs, whoever sees it calls the right people from the roster, and everyone joins the standing meeting. No second-hand information, and nobody working from a summary of a summary.

Do the same for the holiday weekend:

- Create one meeting link that stays open from Thanksgiving through Cyber Monday. Most tools let you reuse a personal room or a recurring link.
- Print the link on the roster, next to the escalation rule, and pin it in your team chat.
- During the call test, have every person join once from their phone, so the first time is not during an outage.

## Tell-tale signs your plan has holes

Some holes you can spot by reading the roster. Others only show up when you dial. Fix each one the day you find it.

| Sign | What it really means | Fix |
| --- | --- | --- |
| The same name appears in four or more rows | One person is a single point of failure for half the store | Spread the areas out, or give each one a different backup |
| A row has no backup, or owner and backup are both away | That area has nobody that weekend | Pick a backup who is actually working the holiday |
| Nobody can say who approves an emergency change | Fixes will wait for permission | Name the decision maker and a backup |
| A vendor row has a website instead of a phone number | You'll be filling out a contact form during an outage | Find the support number and a named account contact |
| The call goes to a full voicemail box | Urgent messages won't get through | Ask them to clear it, and rely on calls and texts |
| The person is surprised to be on the list | They don't know what's expected of them | Explain their area, and when they'd be called |
| The backup says "I don't have access to that" | The backup can answer the phone but can't fix anything | Give the backup logins now, through your password manager |
| The number rings out, then you learn they've left | The roster is out of date | Reassign the area and call the new owner the same day |
| The hold time is over 30 minutes | Standard support won't be fast enough that weekend | Use the priority option you set up on November 16 |

The most dangerous hole is the backup who can't actually do anything. A backup with a working phone but no access is a messenger, not a backup. Check access during the call test, not on Black Friday morning.

## Your communication plan checklist

- [ ] Every area has an owner and a backup
- [ ] Every person has a personal phone number on the roster
- [ ] Time zones are listed for everyone remote
- [ ] Vendors have your owner and backup on file as authorized contacts
- [ ] Every vendor has a working support number, and you know the fast path
- [ ] Backups have been confirmed to have real access, not just a phone
- [ ] The escalation rule is agreed and written at the top of the roster
- [ ] The standing meeting link is on the roster and everyone has joined once
- [ ] Every number was called on November 23, and the result was recorded
- [ ] Every gap found during the calls was fixed and retested
- [ ] The final roster is printed, numbered, shared, and collected afterward

## The plan is the calls

You can't control whether something breaks on Black Friday or Cyber Monday. You can control how fast the right person hears about it. A tested roster turns a stressful hour into a five-minute phone call.

If you'd like help building your communication plan, or a second set of eyes on your Black Friday and Cyber Monday readiness, [get in touch with AraGrow](/contact). We work with store owners and their teams in English and Spanish.
