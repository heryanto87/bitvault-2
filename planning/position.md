# 📄 Position Model Specification

**Purpose:**  
This document defines the structure of the **Position** model in the Trading Journal Web App.  
A position tracks a user’s open holdings in a specific trading Symbol (e.g., BTC/USDT), including size, average entry, and realized PnL.

---

## ✅ Core Fields

| Field             | Type     | Description                                                         |
|------------------|----------|---------------------------------------------------------------------|
| `id`             | `string` | Unique identifier (UUID or ObjectId)                                |
| `userId`         | `string` | Reference to the user who owns the position                         |
| `symbolId`       | `string` | Reference to the trading symbol from the **Symbol** model             |
| `totalQuantity`  | `number` | Current quantity held in the position                               |
| `averageBuyPrice`| `number` | Weighted average price of all buys                                  |
| `realizedPnL`    | `number` | Total realized profit/loss from any partial or full sells           |
| `closedAt`       | `string` (ISO timestamp) | Timestamp when the position was fully closed (optional) |
| `createdAt`      | `string` (ISO timestamp) | Timestamp when the position was opened                  |
| `updatedAt`      | `string` (ISO timestamp) | Timestamp when the position was last updated            |

---

## 📌 Behavioral Notes

- A position record **only exists for open positions**.
- When `totalQuantity` becomes **zero**, the system should:
  - Set `closedAt` to the current timestamp.
  - Keep the record for historical tracking (do not delete).
- `realizedPnL` updates as partial or full quantities are sold.
- Multiple trades contribute to the `averageBuyPrice`.

---

## 🔄 Relationships

- `userId` → references a **User**
- `symbolId` → references a **Pair** model (trading pair metadata)

---

## 🧠 Example (Open Position JSON)

```json
{
  "id": "position_001",
  "userId": "507f1f77bcf86cd799439011",
  "symbolId": "pair_001",
  "totalQuantity": 1.25,
  "averageBuyPrice": 28100.50,
  "realizedPnL": 350.75,
  "closedAt": null,
  "createdAt": "2025-07-15T14:32:00Z",
  "updatedAt": "2025-08-02T18:20:00Z"
}
