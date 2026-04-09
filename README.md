# Leave Management API (Sistem Pengajuan Cuti)

## Specifications
* **Framework:** AdonisJS (Node.js)
* **Bahasa:** TypeScript
* **Database:** PostgreSQL
* **ORM:** Lucid ORM
* **Authentication:** AdonisJS Auth (Opaque Access Tokens) & AdonisJS Ally (OAuth)

## Fitur
1. **Controller-Service Pattern:** Business Logic (ex. pengecekan sisa kuota cuti 12 hari dan perhitungan tanggal) dipisahkan ke *Services* `LeaveService`, *Controllers* hanya bertugas menerima HTTP request dan return JSON response
2. **Smart Quota Deduction:** Sistem tidak memotong kuota cuti saat karyawan baru mengajukan cuti (status *pending*). Kuota baru dipotong *setelah* Admin meng-approve request tersebut
3. **Opaque Access Tokens:** Sistem autentikasi menggunakan Opaque Tokens agar API bersifat *stateless* aman dan mudah di-revoke
4. **Database Seeding:** Disediakan *seeder* untuk mempermudah pengujian

## Cara Setup & Running

**1. Clone Repositori & Install Dependencies**
```bash
git clone https://github.com/Meerdjah/leave-management-api.git
cd leave-management-api
npm install
```
**2. Persiapan Database**
via Terminal psql
```SQL
CREATE DATABASE leave_api;
```
via pgAdmin / GUI
* Klik "Databases"
* Create > Database
* Nama = leave_api dan klik "Save"

**3. Konfigurasi Environment (Database)**
Buat file .env (copy dari .env.example) dan sesuaikan dengan akun PostgreSQL
```
DB_CONNECTION=postgres
DB_HOST=127.0.0.1
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=password
DB_DATABASE=leave_api
```

**4. Run Migration dan Seeder**
```bash
node ace migration:fresh --seed
```

**5. Run Server**
```bash
npm run dev
```

## Akun Admin (Hak Akses Penuh / Approve / Reject)
Email: admin@example.com  
Password: adminonly

Postman Link: [Link](https://web.postman.co/workspace/My-Workspace~300404e9-c566-441e-8e9e-336c33f74c1c/collection/37127340-86e32f00-701f-49ea-a525-f138ec1bf97d?action=share&source=copy-link&creator=37127340n)
  
Offline Backup: File leave-api-collection.json di dalam folder /docs

## Struktur Endpoint
* POST /api/v1/register - Registrasi konvensional (otomatis menjadi employee)
* POST /api/v1/login - Login konvensional
* GET /api/v1/auth/:provider/redirect - OAuth Login (Google/Github)
* POST /api/v1/leave - (Employee) Mengajukan cuti dengan unggahan file (Max 2MB)
* GET /api/v1/leave/me - (Employee) Melihat riwayat cuti sendiri
* GET /api/v1/admin/leaves - (Admin) Melihat seluruh pengajuan cuti perusahaan
* PATCH /api/v1/admin/leaves/:id - (Admin) Eksekusi Approve atau Reject
