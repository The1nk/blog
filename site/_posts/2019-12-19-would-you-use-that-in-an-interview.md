---
date: 2019-12-19 12:00:00
tags:
  - puzzle
  - sql
  - time
  - productivity
author: Adam
title: Would You Use That in an Interview?
location: Home
image: https://source.unsplash.com/BXOXnQ26B7o/800x600
featured: true
---

## Prologue

At the office our team received an interesting challenge via email, text from it below:

>Ok SQL folks here is a test (participation is optional) murder mystery SQL style!! The first response with the right answer(s) wins. Least amount of select statements possible.  Winner gets lunch on me , bonus if another person is slower but has less queries for the final answer(s) I am buying two lunches. **Obviously don’t do the walkthrough and don’t reply all.**  
>I want either screen prints or your solutions.  
>Good Luck!!  
>This is the test :  [https://mystery.knightlab.com/](https://mystery.knightlab.com/)  

If you're not familiar with that site, it's a front-end to a sqlite database where you can query the tables and discover the story of who committed the fictional crime, from a pool of suspects.

Originally, I wasn't going to attempt this puzzle at all. About an hour after I arrived at the office, I discovered some colleagues were still struggling with it (who arrived before I did) and others who had yet to start. Once I realized I was still in the running for this sacred, one-of-a-kind, free lunch -- I made up my mind: **I'm going to destroy the competition.**

## Let's Get Started!

Thankfully, the site gives you a handy diagram of the schema to help you get started:
<div style="border-style:solid;border-width:1px;">![database schema](~@assets/2019-12-19-schema.png "database schema")</div>

With this in-hand, I figured the only *sane* place to start would be querying the Interviews:
<div style="border-style:solid;border-width:1px;">![interviews](~@assets/2019-12-19-interviews.png "interviews")</div>

Errr.. that doesn't make a whole lot of sense. I was expecting something a bit more .. relational? Not a novel hidden in database tables.. A simple sanity-check to see if this was even feasible:
<div style="border-style:solid;border-width:1px;">![count](~@assets/2019-12-19-interviews-count.png "count of interviews")</div>

Well, no.. No it isn't.

## Forget that! Let's cheat!

Since the instructions didn't *explicitly* say that we have to follow the story through .. I've got a better idea!

First, a quick understanding of how the solution is checked: `insert` a name into the `solution` table (which presumably has a trigger on it) and then `select` out the value again, to see if it's correct:
<div style="border-style:solid;border-width:1px;">![checkSolution](~@assets/2019-12-19-check-solution.png "checkSolution")</div>

*Can we brute-force all of the possible values?*
<div style="border-style:solid;border-width:1px;">![name count](~@assets/2019-12-19-name-count.png "name count")</div>

10,011 options and so little time! I prefer to do as little as possible by hand, so .. off to automate the boring stuff.

Using the magic of the **clipboard** I get the full list of names into Excel, use a "*header SQL*" of `drop table tblOne; create table tblOne (name text, result text);` (to drop the table from previous attempts, and create a new table to store the results as we go), a "*footer sql*" of `select * from tblOne order by result asc` (to retrieve the total results) and a per-row SQL of `insert into solution VALUES (1, '$1'); insert into tblOne select  '$1', value from solution;` (to build the list of answers). The resulting workbook looks something like this (don't mind the ~10k hidden rows):
<div style="border-style:solid;border-width:1px;">![excel formulae](~@assets/2019-12-19-excel-formulae.png "excel formulae")</div>

Once this was done, all that was left to do was to copy the entirety of the B column (`B1:B1013` in the screenshot above) and paste it into that neat little **Check Your Solution** box. Boy, it looked *hideous*:
<div style="border-style:solid;border-width:1px;">![final solution query](~@assets/2019-12-19-final-solution-query.png "final solution query")</div>

But .. it worked:
<div style="border-style:solid;border-width:1px;">![final solution](~@assets/2019-12-19-final-solution.png "final solution")</div>

<SimpleNewsletter/>

## Epilogue

Needless to say, there were some *choice words* about my approach when the challenge organizer reviewed the incoming emails. But, I was also the first to submit an answer, *and* the one who finished with the fewest SELECT statements - only 2!

The interesting part about all of this (and the tidbit that led to the title of this post), is that while we were all laughing about how egregious this approach was, the question came up - **Would you use that in an interview?** Many of those in the conversation didn't seem like they would. But I would.

In my opinion, this shows that people (especially developers) can often overthink things and do things in a way that makes them *feel* good, and not in a way that's cost effective or easily reproducible. Using this brute force approach, I saved *hours* of focus and effort and instead spent around 10-15 minutes hacking together some nasty SQL and Excel formulae. Doing this the "right" way would have cost more time and money, and although would have left me feeling more accomplished, would have left me with fewer resources at my disposal to perform the rest of the tasks for the day. Although the final 10k-line SQL took over 2 minutes to execute (and for the browser to render that table), I traded hours of human-focus for minutes of machine-execution. In my mind, this is a win-win -- *humans are **very** expensive and CPU time is cheap*.