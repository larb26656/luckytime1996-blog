---
title: "รวมคำสั่งจัดการไฟล์พื้นฐาน Linux"
description: "การจัดการไฟล์ใน Linux เป็นสิ่งสำคัญที่ช่วยให้เราสามารถจัดระเบียบไฟล์และโฟลเดอร์ได้อย่างมีประสิทธิภาพ"
date: 2024-11-21T09:00:00Z
image: "../../assets/blogs/02/thumbnail.webp"
type: "Bite"
tags: ["linux", "file", "command", "OS"]
draft: false
---

การจัดการไฟล์ใน Linux เป็นสิ่งสำคัญที่ช่วยให้เราสามารถจัดระเบียบไฟล์และโฟลเดอร์ได้อย่างมีประสิทธิภาพ คำสั่งพื้นฐานที่เราจะพูดถึงในบทความนี้ได้แก่ คัดลอก, ย้าย, ลบ, และ สร้างไฟล์

> ⚠️ **คำเตือน:** โปรดใช้คำสั่งเหล่านี้อย่างระมัดระวัง โดยเฉพาะคำสั่งที่เกี่ยวข้องกับการลบข้อมูล ซึ่งอาจส่งผลกระทบต่อระบบหรือผู้ใช้ในระบบได้

---

## การคัดลอกไฟล์

### cp

เป็นคำสั่งที่ใช้สำหรับคัดลอกไฟล์ไปยัง Directory ปลายทาง

- คัดลอกไฟล์เดียว

```bash
cp <source_file> <destination>
```

#### ตัวอย่าง:

```bash
cp file.txt /home/user/documents/
```

- คัดลอกทั้งโฟลเดอร์ และไฟล์ทั้งหมดในโฟลเดอร์

ใช้ Parameter `-r` (recursive) เพื่อคัดลอกโฟลเดอร์ทั้งหมด

```bash
cp -r <source_directory> <destination_directory>
```

#### ตัวอย่าง:

```bash
cp -r /source_directory /destination_directory
```

### scp

เป็นคำสั่งที่ใช้สำหรับคัดลอกไฟล์ หรือโฟลเดอร์ระหว่างเครื่องผ่าน SSH โดยข้อมูลจะถูกเข้ารหัสเพื่อความปลอดภัย

- คัดลอกไฟล์ไปยังเครื่องอื่น

```bash
scp <source_file> <user>@<host>:<destination_path>
```

#### ตัวอย่าง:

```bash
scp file.txt user@192.168.1.100:/home/user/
```

- คัดลอกโฟลเดอร์ไปยังเครื่องอื่น

```bash
scp -r /source_directory <user>@<host>:/destination_directory
```

#### ตัวอย่าง:

```bash
scp -r /source_directory user@192.168.1.100:/home/user/
```

- คัดลอกไฟล์จากเครื่องอื่นมายังเครื่องเรา

```bash
scp <user>@<host>:<remote_file> <local_destination>
```

#### ตัวอย่าง:

```bash
scp user@192.168.1.100:/home/user/file.txt /home/local_user/
```

## การย้ายไฟล์ หรือเปลี่ยนชื่อไฟล์

### mv

เป็นคำสั่งที่ใช้สำหรับการย้าย หรือเปลี่ยนชื่อไฟล์

- ย้ายไฟล์ หรือโฟลเดอร์

```bash
mv <source> <destination>
```

#### ตัวอย่าง:

```bash
mv file.txt /home/user/documents/
```

- เปลี่ยนชื่อไฟล์ หรือโฟลเดอร์

```
mv <old_name> <new_name>
```

#### ตัวอย่าง:

```bash
mv old_name.txt new_name.txt
```

## การลบไฟล์ และโฟลเดอร์

### rm

เป็นคำสั่งที่ใช้สำหรับรลบไฟล์ และโฟลเดอร์

- ลบไฟล์เดียว

```bash
rm <file_name>
```

#### ตัวอย่าง:

```bash
rm file.txt
```

- ลบทั้งโฟลเดอร์ และไฟล์ทั้งหมดในโฟลเดอร์

เพิ่ม Parameter `-r` (recursive)

```bash
rm -r <directory_name>
```

#### ตัวอย่าง:

```bash
rm -r /home/user/documents/
```

- ลบไฟล์โดยไม่ต้องยืนยัน

เพิ่ม Parameter `-f` (force)

```bash
rm -rf <directory_name>
```

#### ตัวอย่าง:

```bash
rm -rf /home/user/documents/
```

> ⚠️ คำเตือน: คำสั่ง `rm` ไม่สามารถกู้คืนไฟล์ได้หากลบแล้ว
> ควรตรวจสอบให้เรียบร้อยก่อนรันคำสั่ง

## การสร้างไฟล์

การสร้างไฟล์ใน linux นั้นทำได้หลายวิธีโดยในบทความนี้จะยกตัวอย่างคำสั่งเบื้องต้นดังนี้

### touch

เป็นคำสั่งที่ใช้สำหรับสร้างไฟล์ที่ไม่มีเนื้อหา

```bash
touch <file_name>
```

#### ตัวอย่าง:

```bash
touch new_file.txt
```

### echo

เป็นการประยุกต์ใช้คำสั่ง `echo` ในการสร้างไฟล์พร้อมเนื้อหา

```bash
echo <content> > <file_name>
```

#### ตัวอย่าง:

```bash
echo "Hello, World!" > file.txt
```

### nano

เป็นคำสั่งที่ใช้สำหรับการสร้างไฟล์ด้วยโปรแกรม `nano` ซึ่งจะต้องติดตั้ง `nano` ลงในเครื่องก่อนใช้งานคำสั่งนี้

```bash
nano <file_name>
```

#### ตัวอย่าง:

```bash
nano file.txt
```
