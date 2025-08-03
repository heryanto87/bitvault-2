# 📄 User Model Specification

**Purpose:**  
This document defines the structure of the **User** model in the Trading Vault Web App.  
It supports identity, authentication, and defines user roles in the system (`trader` or `investor`).

---

## ✅ Core Fields

| Field            | Type                          | Description                                           |
|------------------|-------------------------------|-------------------------------------------------------|
| `id`             | `string`                      | Unique identifier (UUID or MongoDB ObjectId)          |
| `name`           | `string`                      | Full name or display name of the user                 |
| `email`          | `string`                      | User’s email address (used for login)                 |
| `walletAddress`  | `string`                      | Ethereum wallet address (42-character format)         |
| `role`           | `"trader"` \| `"investor"`    | User role in the platform                             |
| `createdAt`      | `string` (ISO timestamp)      | Account creation time                                 |
| `updatedAt`      | `string` (ISO timestamp)      | Last profile update time                              |

---

## ⚙️ Optional Fields

| Field             | Type     | Description                                  |
|------------------|----------|----------------------------------------------|
| `profilePicture?`| `string` | Base64-encoded image string (optional avatar)|

---

## 🔐 Notes on Authentication & Identity

- Email address must be unique and validated.
- `walletAddress` should conform to EVM format (42 characters, starting with `0x`).
- Roles define access to system features:
  - `trader`: can create and manage vaults and execute trades.
  - `investor`: can deposit into vaults and track returns.

---

## 🧠 Example (User JSON)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Alice Johnson",
  "email": "alice@example.com",
  "walletAddress": "0x3fCec903f8Be3e2b88BdF6Ff4F97b3828F69F2cC",
  "role": "investor",
  "profilePicture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "createdAt": "2025-08-01T08:00:00Z",
  "updatedAt": "2025-08-01T08:15:23Z"
}
