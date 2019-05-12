---
layout: post
title: Server and Desktop Setup
modified: 2015-01-11
description: An overview of the hardware and software I run on my desktop and server
author: brian
seo.type: BlogPosting
image:
---

A little over a week ago I finished building my new server. It's the second computer I've built (after my desktop), and is primarily a file and media server. Ryan ([@ryanmr](https://twitter.com/ryanmr)) asked me to do a spec sheet, so this is the result.

# The Hardware

## Desktop

Built in September, 2013

#### Parts

- Gigabyte GA-Z87MX-D3H mATX Motherboard
- Intel Core i7-4770K CPU
- Corsair Vengeance LP 16GB (2 x 8GB) DDR3-1600 RAM
- Asus GTX760-DC2OC-2GD5 GPU
- Fractal Design Arc Mini Case
- Corsair TX650 Power Supply
- TP-LINK TL-WDN4800 wireless card
- Samsung 840 Pro 256GB SSD
- Crucial MX100 256GB SSD
- Western Digital Green 1TB 3.5" 7200RPM SATAII HDD
- Cooler Master Hyper 212 Plus CPU cooler
- Logitech C615 webcam
- Logitech Z623 speakers
- Two ViewSonic VX2270SMH-LED 22-Inch SuperClear IPS LED Monitors
- Apple Wired Keyboard
- Old generic Logitech USB mouse
- Some DVD drive that I pulled out of a computer I found at a stuff exchange

Price: Not all of these parts were bought (or gifted) at once or even originally for this build, but I'd say I spent about \$1225 on the core and initial part of the build (motherboard, CPU, RAM, GPU, case, PSU, CPU cooler, Samsung 840 Pro, one monitor, and wireless card).

Note: The 1TB hard drive has about 4.6 years of power on time (but no errors!), so it'll probably be dying soon, and when it does, I'm going to be switching around my other 3.5" drives as I need to upgrade the size on others.

## Server

Built in January, 2015

#### Parts

- Gigabyte GA-Z97N-WIFI Mini ITX Motherboard
- Intel Core i5-4690K CPU
- Crucial Ballistix 16GB (2 x8GB) DDR3-1600 RAM
- Corsair 250D Case
- Corsair CX430M Power Supply
- Western Digital Scoprio Blue 500 GB 2.5" 5400RPM HDD
- Two Western Digital Green 2TB 3.5" 7200RPM SATAIII HDDs
- Shared display, keyboard, and mouse with the Desktop

Price: I spent about $520 on the build (the case was purchased for $84.99 via Amazon gift card, not included in the price). The hard drives were purchased separately at a much earlier time.

Note: I built this with the idea that it would be used for virtualization, but that is not the case right now, so some of these parts are pretty overkill.

# The Software

## Desktop

The primary operating system is OS X. I ran Mountain Lion (10.8.5) for a couple days right before Mavericks came out. I then upgraded to Yosemite on release day, October 16, 2014. I Hackintoshed using the tonymacx86 tools, Unibeast and Multibeast, with the Chimera bootloader through Mavericks. Under Yosemite, the NVRAM module part of Chimera didn't support iMessage, so I switched to the much more modern and powerful bootloader Clover. On top of OS X, I have OS X Server installed to primarily use the computer as a Time Machine server for my MacBook Pro. I also used it to have more powerful file sharing options.

In April 2014, I installed Windows 8.1 and Ubuntu 14.04. Tri-booting with Chimera, and one mis-installation of grub caused a few issues, but I got it working. When I updated my 500 GB HDD to the new Crucial MX100 SSD (see the [post](https://brianm.me/posts/hdd-to-ssd) about it), I reinstalled Ubunutu, and migrated Windows. When switching to Clover, I realized that my install of Windows wasn't via UEFI, so I wiped the SSD and reinstalled. I haven't yet reinstalled Ubuntu or any other flavor of Linux.

## Server

I installed CentOS 7 in the server. As a sysadmin at the University of Minnesota, Morris computer science labs, I work with Fedora, so I figured something similar would be good. I went with CentOS because I thought it'd be fun using an enterprise OS. Plus, it's supposedly more stable than Fedora! Currently, I have samba and netatalk configured for smb and afp file sharing, as well as the Plex media server for my media needs.

I'm planning of taking advantage of the 802.11ac wireless card that came with the motherboard in the mini PCIe slot and making it be an access point. This would replace my aging 802.11n AirPort Express that maxes out at 100Mb due to its 100Mb Ethernet port. I think I'll eventually have more services running, but right now, I'm unsure of what that may be.
