---
title: "You Have Backups. Can You Prove It?"
date: "2026-11-02"
slug: "your-backup-is-like-your-cars-emergency-brake"
author: "David Arago"
categories: ["Blog"]
excerpt: "The last time I tested my car's emergency brake, I was seventeen and showing off. Most businesses can't remember the last time they restored from a backup."
featuredImage: "/images/blog/your-backup-is-like-your-cars-emergency-brake.webp"
featuredImageAlt: "A hand pulling up a car's emergency brake, next to a laptop showing a cloud backup icon with a green check mark and a large question mark between them."
---
At seventeen, I was sure my car’s emergency brake worked. My friends and I yanked it at speed to spin the car whenever girls were around.

That wasn’t smart, and it wasn’t a proper safety test either. But it was the last time I checked.

I haven’t pulled that brake in earnest since. I put the transmission in Park and move on with my life. I know it’s there. I assume it works. At my age I’m not trying to impress anyone by spinning a car; most women my age would be more impressed if I could get out of it without making a noise.

But I still want that brake to work the one time I reach for it.

That’s exactly how most businesses treat their backups.

## “It’s There” Isn’t the Same as “It Works”

Backups sit in the same comfortable corner of the mind: set up once, assumed to work.

“Do we have backups?”

“Yes.”

“Great.”

And then we move on.

We know they’re there. Maybe we see a notification saying the backup completed successfully. That feels reassuring, so we stop thinking about it.

But there’s another question worth asking:

“When did we last restore something from one?”

The schedule doesn’t answer that, and neither does a green check mark. The answer is the last time someone pulled the data back out and confirmed it was usable.

That’s the difference between assuming we have a way out and knowing we’ve tested one.

## The Emergency Is a Bad Time to Find Out

Imagine reaching for the emergency brake and discovering that your confidence in it came entirely from the fact that nobody had ever told you it didn’t work.

Now imagine needing to recover your business’s files and realizing your confidence in the backups rests on the same foundation.

In either case, “I thought it worked” is not what you want to be saying at that moment.

You don’t need to spend every day worrying about everything that might go wrong. But the things you depend on in an emergency deserve some attention before the emergency arrives.

## What “Some Attention” Looks Like

- **Back up at least weekly.** More often for data you can’t afford to lose a week of, like orders, invoices and customer records. ([CIS Controls, Safeguard 11.2](https://cas8.docs.cisecurity.org/en/latest/source/Controls11/))
- **Test a restore at least quarterly.** Not everything, a sample. Pick a few files or one system, restore them somewhere other than the original location, open them and confirm they’re usable. ([CIS Controls, Safeguard 11.5](https://cas8.docs.cisecurity.org/en/latest/source/Controls11/))

Test again whenever something changes, like a new system or a different backup tool.

For the backups themselves, the common rule of thumb is 3-2-1: three copies of your data, on two kinds of storage, with one kept somewhere else. The quarterly restore is what tells you those copies are worth having.

## A Plan I’d Sign Off On

Take an online store. Here’s what I’d put in place:

- **Orders, customers, payments:** back up every hour, around the clock. Stores sell at 2 a.m. Whatever gap you leave between backups is the orders you lose, so an hour of lost orders means refunds and apologies, and a day means you’re calling customers to ask what they bought.
- **Catalog, images, site code and configuration:** incrementals daily, a full backup weekly.
- **How long to keep it:** dailies for 30 days, weeklies for three months, monthlies for a year. Problems are often found late, and a corrupted catalog nobody noticed for a month needs a copy from before it broke. Order and payment records for as long as your accountant says.
- **Where it lives:** 3-2-1, with one copy outside your hosting provider’s account. If the host locks the account or loses the server, a backup that lives in the same account goes with it.
- **How you know it works:** restore a sample every quarter. Once a year, rebuild the store on a staging server from backup, place a test order, and time the whole thing.
- **Who owns it:** one named person, with written steps someone else could follow while they’re on vacation.

None of that is expensive. Most of it is a decision and a calendar entry.

## What That Buys You

**The server dies at 2 a.m.** The disk is gone and the host can’t recover it. Your last hourly backup ran at 1:00, so you stand up a new server and lose, at most, the orders from that one hour. Those few are sitting in your payment processor, and someone enters them by hand before lunch.

**A supplier import blanks 400 product descriptions, and nobody notices for five weeks.** Sales in that category slid, but slowly enough that nobody connected it to the import. Every daily backup you hold already contains the damage. The monthly copy from before the import doesn’t, so you pull the catalog from that one and reapply the real price changes since.

**Ransomware encrypts the server, and the backup drive attached to it.** The copy held outside your hosting account, the one the office network can’t reach or change, is untouched. You rebuild from it. The cost is a day of downtime and an awkward email to customers, not a ransom and not a rebuild from scratch.

In all three, the recovery works because someone had already proved it would.

Four restore tests a year is a small ask. It’s more than I’ve given my emergency brake.

And yes, I’m including myself in that reminder. Apparently, I have an emergency brake to get checked.

Having backups is good. Having restored from one, and knowing what you got back was usable, is better.
