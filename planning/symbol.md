# 📄 Symbol Model Specification

**Purpose:**  
This document defines the structure of the **Symbol** model in the Trading Vault Web App.  
A symbol represents a tradable asset symbol such as a cryptocurrency (e.g., BTC, ETH, XBT).

---

## ✅ Core Fields

| Field       | Type     | Description                                        |
|-------------|----------|----------------------------------------------------|
| `id`        | `string` | Unique identifier (UUID or ObjectId)               |
| `name`      | `string` | Full name of the asset pair (e.g., "Bitcoin") |
| `symbol`    | `string` | Short symbol representing the pair (e.g., "BTC") |
| `picture`   | `string` | External URL to an image/icon representing the pair |

---

## 🧠 Example (Symbol JSON)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Bitcoin",
  "symbol": "BTC",
  "picture": "https://cdn.assets.exchange/icons/btc-usdt.svg"
}
