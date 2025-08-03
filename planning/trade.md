# 📄 Trade Model Specification

**Purpose:**  
This document defines the structure of the **Trade** model in the Trading Journal Web App.  
A trade represents a single execution event (buy or sell) for a user in a particular symbol, contributing to their open or closed position.

---

## ✅ Core Fields

| Field         | Type                | Description                                                     |
|---------------|---------------------|-----------------------------------------------------------------|
| `id`          | `string`            | Unique identifier for the trade (UUID or ObjectId)              |
| `userId`      | `string`            | Reference to the user who made the trade                        |
| `positionId`  | `string`            | Reference to the associated position for this trade             |
| `symbolId`    | `string`            | Reference to the **Symbol** (e.g., BTC/USDT) being traded       |
| `type`        | `"buy"` \| `"sell"` | Specifies if this is a buy or sell trade                        |
| `quantity`    | `number`            | Amount of the asset bought or sold                              |
| `price`       | `number`            | Price per unit of the asset at the time of trade                |
| `fee`         | `number`            | Trading fee (denominated in quote currency)                     |
| `createdAt`   | `string` (ISO timestamp) | When the trade was executed                                 |
| `updatedAt`   | `string` (ISO timestamp) | When the trade record was last updated                      |

---

## 🔄 Relationships

- `userId` → references a **User**
- `positionId` → references a **Position**
- `symbolId` → references a **Symbol**

---

## 📌 Behavioral Notes

- `buy` trades increase the `totalQuantity` and adjust `averageBuyPrice` in the associated Position.
- `sell` trades reduce the `totalQuantity` and calculate `realizedPnL` accordingly.
- The `fee` is stored in quote currency (e.g., USDT if trading BTC/USDT).
- Trade timestamps align with system conventions (`createdAt`, `updatedAt`).

---

## 🧠 Example (Trade JSON)

```json
{
  "id": "trade_001",
  "userId": "507f1f77bcf86cd799439011",
  "positionId": "position_001",
  "symbolId": "symbol_001",
  "type": "buy",
  "quantity": 0.5,
  "price": 29000.00,
  "fee": 7.25,
  "createdAt": "2025-08-02T16:45:00Z",
  "updatedAt": "2025-08-02T16:45:00Z"
}
