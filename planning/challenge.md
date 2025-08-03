# 📄 Challenge Model Specification

**Purpose:**  
This document defines the structure of the **Challenge** model in the Trading Vault Web App.  
A challenge is a time-boxed evaluation phase where a trader demonstrates their performance under a selected risk profile.

---

## ✅ Core Fields

| Field           | Type     | Description                                                   |
|-----------------|----------|---------------------------------------------------------------|
| `id`            | `string` | Unique identifier (UUID or ObjectId)                          |
| `userId`        | `string` | Reference to the user (trader) who owns this challenge        |
| `riskProfileId` | `string` | Reference to the selected risk profile                        |
| `balance`       | `number` | Starting balance for the challenge (default: `10000`)         |
| `startDate`     | `string` (ISO timestamp) | Timestamp when the challenge was created      |
| `endDate`       | `string` (ISO timestamp) | Timestamp when the challenge is set to expire |

---

## ⚙️ Challenge Creation Logic

- When a user creates a challenge, they must select a **Risk Profile**.
- The following fields are **auto-generated** upon creation:
  - `startDate` → current timestamp (`new Date()`).
  - `endDate` → `startDate + challengeTimeBox` (from the selected risk profile, in days).
  - `balance` → default set to `10000`.

---

## 🔄 Relationships

- `userId` → references a **User** (with role: `trader`)
- `riskProfileId` → references a **Risk Profile** that defines the rules of the challenge

---

## 🧠 Example (Challenge JSON)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "userId": "507f1f77bcf86cd799439012",
  "riskProfileId": "507f1f77bcf86cd799439013",
  "balance": 10000,
  "startDate": "2025-08-01T10:00:00Z",
  "endDate": "2025-08-31T10:00:00Z"
}
