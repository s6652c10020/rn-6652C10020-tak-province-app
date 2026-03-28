# [rn-6652C10020-tak-province-app]

แอปพลิเคชันแนะนำสถานที่ท่องเที่ยวและข้อมูลสำคัญในจังหวัดตาก พัฒนาด้วย React Native (Expo) และเชื่อมต่อข้อมูลกับ Supabase

## 📱 ภาพหน้าจอการใช้งาน (Screenshots)

| หน้าแรก (Home) | รายละเอียด (Detail) | แผนที่ (Map) |
| :---: | :---: | :---: |
| <img width="200" alt="Home" src="https://github.com/user-attachments/assets/dccfd6fe-bdf0-4b96-ad11-92e4bd268a69" /> | <img width="200" alt="Detail" src="https://github.com/user-attachments/assets/3f5eb219-b0db-4a93-b0a1-72efe5fad8ee" /> | <img width="200" alt="Map" src="https://github.com/user-attachments/assets/e5ffdeac-9db0-456d-bbdd-2c470035160e" /> |

---

## 🗄️ โครงสร้างฐานข้อมูล (Database Schema)

ภาพรวมของตารางทั้งหมดในระบบ (Table Schema) จาก Supabase Schema Visualizer:

<p align="center">
  <img width="400" alt="Schema Visualizer" src="https://github.com/user-attachments/assets/4281aa18-5d3a-43ac-8d9a-0197af004620" />
</p>

### รายละเอียดตาราง (Tables)
- *tak_places*: เก็บข้อมูลสถานที่ท่องเที่ยว ชื่อ, รายละเอียด, เขต/อำเภอ, พิกัด (Lat/Long), และรูปภาพ
