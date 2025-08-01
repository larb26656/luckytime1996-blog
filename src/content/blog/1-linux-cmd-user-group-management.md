---
title: "รวมคำสั่งจัดการ User และ Group ใน Linux"
description: "ในบทความนี้ เราจะแนะนำคำสั่งพื้นฐานที่ใช้จัดการ User และ Group"
date: 2024-11-20T05:00:00Z
image: "../../assets/blogs/01/thumbnail.webp"
type: "Bite"
tags: ["linux", "command", "OS"]
draft: false
---

การจัดการผู้ใช้ (User) และกลุ่ม (Group) ใน Linux เป็นสิ่งสำคัญที่ช่วยให้ระบบมีความปลอดภัยและมีการจัดการสิทธิ์อย่างเป็นระเบียบ ในบทความนี้เราจะมาแนะนำคำสั่งพื้นฐานที่ใช้ในการจัดการ User และ Group พร้อมตัวอย่างแบบเข้าใจง่าย

> ⚠️ **คำเตือน:** โปรดใช้คำสั่งเหล่านี้อย่างระมัดระวัง โดยเฉพาะคำสั่งที่เกี่ยวข้องกับการลบข้อมูล ซึ่งอาจส่งผลกระทบต่อระบบหรือผู้ใช้ในระบบได้

---

## การจัดการ User

เพิ่ม User พร้อมสร้าง Home Directory

```bash
useradd -m <username>
```

แสดงรายชื่อ User ทั้งหมดในระบบ

```bash
whoami
```

แสดงรายชื่อ User ทั้งหมดในระบบ

```bash
cut -d: -f1 /etc/passwd
```

ตั้งค่า password ให้ user

```bash
passwd <username>
```

ลบ user

```bash
deluser --remove-home <username>
```

## การจัดการ Group

สร้าง Group

```bash
groupadd <groupname>
```

เพิ่ม User เข้าสู่ Group

```bash
usermod -g <groupname> <username>
```

แสดง Group ของตนเอง

```bash
groups
```

แสดงรายชื่อ Group ทั้งหมด

```bash
getent group
```

ลบ Group

```bash
groupdel <groupname>
```
