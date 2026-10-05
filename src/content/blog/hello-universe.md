---
title: hello universe
description: 'Reflections on agentic development: balancing autonomy with human judgement, setting clear expectations, and verifying the quality of AI-generated code.'
pubDate: 2026-10-05
updated: ''
tags:
  - ai
  - agentic-development
  - software-engineering
cover: ''
draft: false
---

It’s been a polarising time for software developers, particularly when it comes to quality. “If you want something done right, do it yourself” is a cliché for a reason. There’s a certain confidence that comes from having written something yourself: you know where the shortcuts are, you remember the weird decisions you made along the way, and you know which parts of the implementation you’d happily defend in a code review. There’s familiarity in authorship, and that familiarity makes it easier to trust the result.

So why am I bringing this up? Because for a lot of developers, our relationship with authorship has changed very quickly. We’re spending more time thinking at a higher level about products, systems and implementation strategies, and we’re making decisions that previously might only have surfaced after hours of writing code. Increasingly, we describe the destination and allow an agent to figure out how to get there.

At some point, many of us let go of the wheel.

Sometimes that feels great. The agent understands the task, explores the repository, finds the appropriate abstractions, makes the changes, runs the tests and comes back with a neat summary explaining what it did. You barely touched the keyboard. Other times, it confidently drives directly into a wall.

The interesting question to me isn’t really whether agentic development is good or bad. That discussion already feels outdated. The more useful question is how much control we should actually give it. I suspect the answer exists somewhere between completely hands-off agentic development and the increasingly old-fashioned idea that good software requires manually typing every line yourself.

My own rule has become fairly simple: **if you don’t feel comfortable with what you’re producing using agents, don’t ship it.** That doesn’t mean avoiding agents. It means learning how to make them operate within **your** standards. The scale of LLM availability today makes experimentation ridiculously accessible, which means we can try different models, workflows, levels of autonomy and approaches to planning without having to restructure our entire development process.

Over time, I’ve found myself coming back to two ideas more than anything else: the option to take control is always available, and conditioning matters.

## 1. taking the wheel

There are moments in agentic coding where it genuinely feels like you could doze off. You explain the task, the agent investigates, it proposes something sensible, you press enter, it implements, you press enter again, it runs the tests, and eventually you start wondering what exactly you’re contributing besides approval. With sufficiently capable models, that experience can become surprisingly convincing. It starts feeling less like pair programming and more like supervising somebody who already knows what they’re doing.

But handing over execution and handing over judgement are two very different things. The ability to intervene is still one of the most important tools available to us. Sometimes I want an agent to own an implementation from start to finish. Sometimes I want it to investigate a bug but not change anything. Sometimes I want it to write the boring plumbing while I handle the difficult abstraction. Other times I only want a plan, because I already know I’d rather write the implementation myself.

And sometimes I want to stop it halfway through because I can already see that it has misunderstood the architecture.

Agentic development doesn’t have to mean maximum autonomy. That seems obvious when written down, but it’s easy to forget once you start optimising workflows around agents. There’s a temptation to measure progress by how little you personally had to do: “I implemented this whole feature without touching the code.” That’s impressive in the same way a self-driving car completing a journey is impressive, but it isn’t necessarily the metric that matters.

The important question is whether the result is good. If manually intervening for ten minutes makes the result significantly better, then intervening isn’t a failure of the agentic workflow. It **is** the workflow. The developer is still allowed to grab the wheel.

There’s also an economic angle to this. The experience of almost completely hands-off development tends to be easiest to achieve with the strongest models, but access to state-of-the-art models isn’t always economically sensible for every task. As models become more capable, they also create a temptation to throw maximum intelligence at everything. In practice, though, good workflows should probably be able to distribute work: stronger models where judgement and planning matter, cheaper models where the task is well-defined, and human intervention whenever that becomes the most efficient option.

## 2. following your guidance

The other thing I’ve learnt is that agents behave much better when the environment around the task is designed for them to succeed. A capable coding agent can already execute a surprisingly large percentage of the ordinary work developers are asked to do: add a field, change an API, fix a bug, write tests, refactor something, trace an issue through a repository or update documentation.

The difficult part is often no longer whether the model is capable of producing the code. The difficult part is giving it enough information to know what _good_ looks like.

“Implement this feature” leaves an enormous amount unspecified. What architectural patterns should it follow? What existing code should it use as a reference? What should it deliberately avoid changing? Which edge cases matter? What does backwards compatibility mean in this particular codebase? Which tests would actually prove that the task is complete?

That context is effectively the environment in which the agent works, and like developers, agents perform much better when expectations are explicit. This is where I think the job starts becoming interesting, because the skill begins to shift from simply asking, “Can I implement this?” toward asking, “Can I define this well enough that another capable actor can implement it correctly?”

That “actor” happens to be an LLM today, but the underlying skill is familiar. Tech leads, senior engineers and architects have been doing versions of this forever. Agentic development just pushes more developers into that position much earlier.

## verification is part of the implementation

One change has had a particularly large impact on how much I trust agent-generated work: **the agent does not get to declare itself finished simply because it changed the code. It has to prove that the task was completed.**

That sounds trivial, but it changes the behaviour of the workflow significantly. If an agent says, “Implemented the new authentication flow,” that statement means almost nothing by itself. Did the project compile? Did the relevant tests pass? Does the UI actually behave correctly? Were existing flows preserved? Did it test the failure state? Did it accidentally break another package?

The closing comment becomes much more useful when the definition of “done” requires evidence. Instead of asking only for implementation, I try to define verification as part of the task: run the type checker, run the affected tests, exercise the endpoint, compare the output, inspect the rendered page and confirm that the old behaviour still works. The important part is that the agent shouldn’t simply tell me that it finished; it should be able to explain what it did to establish that the work is actually correct.

That changes the final response from a status update into something closer to a handover. Instead of “I changed X, Y and Z,” I want something more like: “I changed X, Y and Z. These are the checks I performed, these passed, and this part could not be verified for the following reason.”

That last part matters a lot. I would much rather have an agent tell me that something could not be verified than confidently claim success because the code looks plausible.

## be careful what you ask for

There’s another side to verification, though: agents can be relentless. Give one a sufficiently concrete objective and it will often keep trying different approaches until it satisfies it. That persistence is incredibly useful, but it can also become dangerous when the objective itself is badly designed.

If the goal is simply “make the test pass,” then changing the test might technically satisfy the objective. If the goal is “remove this TypeScript error,” then `any` is sitting right there. If the goal is “get the build working,” then disabling the thing breaking the build might start to look like a perfectly reasonable solution.

This isn’t really an AI-specific problem. Humans optimise against badly designed metrics too. The difference is that agents compress the feedback loop enough that the consequences become much more obvious. They can be extraordinarily effective at doing exactly what you asked for, including when what you asked for wasn’t actually what you wanted.

That means the quality of the work depends partly on the quality of the constraints. Verification itself needs thought, because a quality gate is only useful when it actually represents quality.

## from writing code to designing work

This is probably the biggest change I’ve noticed in myself. I spend less time thinking, “What code should I write?” and more time thinking, “What information would someone need to solve this correctly?”

That means understanding the problem before implementation starts, identifying constraints, finding examples in the existing system, thinking about what could go wrong, designing validation, and deciding which decisions should belong to the agent and which ones I want to make myself. In a strange way, using agents effectively has made the parts of software development that have nothing to do with typing code feel more important.

Architecture matters more. Clear specifications matter more. Tests matter more. Repository structure, documentation and good abstractions all matter more, because they form part of the environment the agent has to reason about. If your codebase is difficult for a developer to understand, it will probably also be difficult for an agent to understand. If your requirements are ambiguous to a person, they’ll probably be ambiguous to a model too.

Agents don’t eliminate engineering discipline. If anything, they amplify whatever discipline already exists.

## the weird middle

I don’t think we’ve arrived at the final form of software development. Right now we’re in a strange middle period where writing everything manually increasingly feels unnecessarily slow for many tasks, while giving an agent unlimited autonomy still feels irresponsible for many others.

So the developer ends up sitting somewhere between programmer, reviewer, architect, product thinker and agent supervisor. Sometimes you write the implementation. Sometimes you describe it. Sometimes you review it. Sometimes you reject it entirely and take over. The boundary moves depending on the problem, the model, the codebase and how much confidence you have in the result.

Maybe that’s the point. The goal doesn’t need to be removing ourselves from the process. It should be moving ourselves to the parts of the process where our judgement matters most.

For now, I’m happy to let the agent drive, but I want my hands close enough to the wheel.
