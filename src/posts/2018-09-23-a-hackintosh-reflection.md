---
title: A Hackintosh Reflection
modified: 2018-09-23
description: My Hackintosh has reached the end of its life.
---

My Hackintosh, after just reaching its fifth birthday, has reached the end of its life.

<figure>
    <blockquote class="twitter-tweet" data-dnt="true"><p lang="en" dir="ltr">Every time I change something with my
    Clover settings, I get really anxious that it won&#39;t boot up again.</p>&mdash; Brian Mitchell (@_BrianMitchell_)
    <a href="https://twitter.com/_BrianMitchell_/status/540778586957807617?ref_src=twsrc%5Etfw">December 5, 2014</a>
    </blockquote> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <figcaption>It finally happened... :cry:</figcaption>
</figure>

## History

I built this Hackintosh (my first PC build) in beginning of my sophomore year in college. At the time, I had a
one-year-old 15" MacBook Pro but was looking for a desktop/server to host the Minecraft server I was running at the
time. I waited for the Mountain Lion update (10.8.5) that added support for Intel's 4th generation Haswell CPUs to be
released, and promptly bought the remaining components.

After a couple of days, I had it up and running using [tonymacx86](https://www.tonymacx86.com) guides with the
Chimera/Chameleon bootloader for BIOS[^bios] booting. The following Spring I triple booted it with Windows 8.1 and
Ubuntu. In the Fall of 2014 I upgraded to the Clover[^clover] bootloader in order to boot from EFI[^efi]. A year later I
purchased a used Apple Broadcom BCM94360CD wireless card from a user on reddit and was able to use Handoff, Continuity,
and unlock the Hackintosh with my Apple Watch (this came later). In July 2017, I switched the case and
motherboard with my server in order to have a smaller case on my desk. From there on out, the hardware remained
unchanged.

Over the years, I definitely had problems along with the reliability of the build. When using the BIOS-based
Chimera bootloader, I had problems with it crashing after waking from sleep, and general instability. After upgrading
to Clover, stability improved, but would still crash every so often.

Starting with macOS Sierra in the fall of 2017, it started to crash more often, nearly always related to graphics
issues. For some reason, JetBrains IDEs would very frequently cause it to crash. It once crashed when hovering over a
link with an emoji in Safari. Twice, it crashed while recording a podcast for [The Nexus](https://thenexus.tv), which
resulted in total loss of the recording.

On a more positive note, High Sierra became more reliable. I feel like the Hackintosh was a quite good "Mac", and it
supported all major features of a new Mac throughout its life. I was even able to install some new major updates to macOS on the day of their release.

Seeing as the vast majority of the crashes later in its life were due to graphics issues (always read your logs in
Console.app), I would have likely had a much more reliable machine if I had upgraded to a newer GPU. During much of
High Sierra, I often put the Hackintosh to sleep, and would continue to use it for another day or two without crashes.
In 2018, it only crashed a handful of times. Sometimes a month or two would go by!

## The Demise

Sometime last week, I installed the Clover r4674 update like I always do when a newer version is available. When I
booted it up next on Saturday, it would not boot into Clover. When selecting the UEFI entry for the macOS SSD, the
motherboard manufacturer logos would just stay on the screen forever. Booting into Windows via the Windows Boot Manager
was fine, so was mounting the macOS SSD on my MacBook Pro. I tried restoring to Clover r4658, the earlier version that
I had been using, to no avail.

Now that I've been working full time for two years, and I don't have a computer newer than five years old, I've been
planning on purchasing an iMac to replace the Hackintosh when they're next updated (rumored to this fall!). I just
couldn't justify a full wipe and reinstall of the Hackintosh if I am going to be setting up a new Mac in a month or two.
With a new computer on the line, and much more limited time than when I was in college, I decided to call it and
retire the Hackintosh.

## Reflection

Clover changed the game in terms of amount of work needed. Manual patches were able to be moved to boot-time patches
on whichever KEXT[^kext] was in need of modifying. Instead of loading KEXTs from the `/System/Library/Extentions`
directory, KEXTs needed for booting were moved to being stored and injected from the EFI partition. This allows for
one configuration allowing to boot multiple volumes. I was able to boot the macOS Recovery partition!

I've learned so many things about how lower levels of macOS and modern computers work. Building a Hackintosh was a
fantastic way to get a high performance Mac for a lot less money. Now that I'm out of school, I appreciate stability
and my time more than saving money and having a desire to keep tinkering and tweaking a custom-built computer. For
stability, I started using my MacBook Pro for podcasting. For the last few years, the Hackintosh took a minute or more
to boot up (probably a BIOS config issue, or some cache is lost and the OS runs extra checks on boot), so I would
sometimes do quick things on my MacBook Pro or just use my iPad. I think those are some indicators that I'm really
looking for a new, fast, and stable Mac.

RIP old friend. I'll boot you up twice a year to install Windows updates and play Age of Empires III.

<figure style="max-width: 650px;">
    <a class="twitter-moment" data-dnt="true" href="https://twitter.com/i/moments/1043749921088663552?ref_src=twsrc%5Etfw">
    A Hackintosh Reflection</a> <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    <figcaption>Twitter Moment compiling a good majority of my tweets relating to the Hackintosh</figcaption>
</figure>

[^bios]: BIOS: Basic Input/Output System, a legacy way to boot a computer.
[^efi]: EFI: Extensible Firmware Interface, a modern interface between the operating system and platform firmware.
[^clover]: [Clover](https://clover-wiki.zetam.org/) bootloader
[^kext]: KEXT: Kernel EXTension. Apple's version of a driver.
