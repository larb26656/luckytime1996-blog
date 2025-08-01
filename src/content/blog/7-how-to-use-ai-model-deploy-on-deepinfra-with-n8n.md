---
title: การใช้ Model AI บน DeepInfra กับ n8n
description: "หากคุณใช้งาน n8n และต้องการเชื่อมต่อกับ Model AI ที่ Deploy บน DeepInfra แต่พบว่าไม่มีตัวเลือก DeepInfra โดยตรงใน AI Agent Node วันนี้ผมมีวิธีแก้ปัญหานี้มาฝากครับ"
date: 2025-04-19T12:20:00Z
type: "Bite"
image: "../../assets/blogs/07/thumbnail.jpg"
tags: ["deepinfra", "openai", "n8n", "model", "ai", "agent"]
draft: false
---

หากคุณใช้งาน n8n และต้องการเชื่อมต่อกับ Model AI ที่ Deploy บน DeepInfra แต่พบว่าไม่มีตัวเลือก DeepInfra โดยตรงใน AI Agent Node วันนี้ผมมีวิธีแก้ปัญหานี้มาฝากครับ

## DeepInfra

DeepInfra เป็นแพลตฟอร์มที่ให้บริการ Deploy และ Host AI models โดยรองรับหลากหลาย Model เช่น Llama, Mistral, Qwen และอื่นๆ โดยที่สำคัญคือ DeepInfra มี API ที่เข้ากันได้กับ OpenAI (OpenAI-compatible API) ซึ่งหมายความว่าสามารถเชื่อม DeepInfra กับบริการที่รองรับ OpenAI ทั้งหมดได้

## วิธีใช้ Model บน DeepInfra กับ n8n

1. สร้าง Workflow ใน n8n

- เพิ่ม Node "AI Agent" เข้าไปใน Workflow ของคุณ

![AI Agent node in n8n workflow](../../assets/blogs/07/image.png)

2. เลือก Language Model เป็น "OpenAI Chat Model"

![Select OpenAI Chat Model](../../assets/blogs/07/image%201.png)

3. เพิ่ม Credential ใหม่ด้วยการกดปุ่ม `+ Create new credential`

![Create new credential button](../../assets/blogs/07/image%202.png)

4. ตั้งค่า Credential

- นำ API Key จากบัญชี DeepInfra ของคุณมาใส่ในช่อง API Key
- ในช่อง Base URL ให้เปลี่ยนจาก `https://api.openai.com/v1` (ค่าเริ่มต้น) เป็น `https://api.deepinfra.com/v1/openai`

![Configure DeepInfra API credentials](../../assets/blogs/07/image%203.png)

5. เลือก Model ที่ต้องการใช้

![Select model in n8n](../../assets/blogs/07/image%204.png)

เพียงเท่านี้เราก็สามารถใช้ Model AI ที่ Deploy บน DeepInfra ได้แล้ว แล้วพบกันใหม่ในบทความหน้า สวัสดีครับ! 🚀
