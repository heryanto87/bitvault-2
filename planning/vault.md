# 📄 Vault Model Specification

**Purpose:**  
This document defines the structure of the **Vault** model in the Trading Vault Web App.  
A vault is a trader-managed investment vehicle where investors can deposit capital and share profits based on a predefined ratio and payout cycle.

---

## ✅ Core Fields

| Field              | Type     | Description                                                              |
|-------------------|----------|--------------------------------------------------------------------------|
| `id`              | `string` | Unique identifier (UUID or ObjectId)                                     |
| `userId`          | `string` | Reference to the trader who owns and operates this vault                 |
| `name`            | `string` | Custom name for the vault                                                |
| `picture`         | `string` | Base64-encoded image representing the vault                              |
| `balance`         | `number` | Total capital currently held in the vault                                |
| `profitShareRatio`| `number` | Trader’s profit share percentage (**1–99%**); investor receives the rest |
| `payoutCycle`     | `number` | Payout cycle in **months** (**1–12**)                                    |

---

## 🧮 Constraints & Business Logic

- `profitShareRatio` must be an integer between **1** and **99**.
  - If the value is `60`, the trader earns **60%** of the profits, and the investors share the remaining **40%**.
- `payoutCycle` defines how often profit distributions occur — in full-month intervals.
- Only users with role `trader` can create and manage vaults.

---

## 🔄 Relationships

- `userId` → references a **User** (must have role: `trader`)
- Vaults may be linked with:
  - Deposits made by investors
  - Trades executed by the trader
  - Performance and payout history

---

## 🧠 Example (Vault JSON)

```json
{
  "id": "vault_001",
  "userId": "507f1f77bcf86cd799439011",
  "name": "Alpha Growth Vault",
  "picture": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "balance": 25340.75,
  "profitShareRatio": 60,
  "payoutCycle": 3
}
