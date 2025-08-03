# 📄 Risk Profile Model Specification

**Purpose:**  
This document defines the structure of the **Risk Profile** model in the Trading Vault Web App.  
A risk profile describes a predefined trading risk configuration, which traders can select when creating or managing vaults or challenges.

---

## ✅ Core Fields

| Field                  | Type       | Description                                                           |
|------------------------|------------|-----------------------------------------------------------------------|
| `id`                   | `string`   | Unique identifier (UUID or ObjectId)                                  |
| `name`                 | `string`   | Title or label of the risk profile (e.g., "Conservative", "Aggressive") |
| `description`          | `string`   | Detailed explanation of the risk approach                             |
| `image`                | `string`   | Base64-encoded or URL string of the visual representation             |
| `maxDrawdown`          | `number`   | Maximum drawdown allowed (in % or absolute value depending on config) |
| `challengeProfitTarget`| `number`   | Profit target to reach in the challenge phase (usually in %)          |
| `challengeTimeBox`     | `number`   | Time box (in days) to complete the challenge                          |

---

## 🔐 Notes on Risk Management

- The `maxDrawdown` and `challengeProfitTarget` are key in determining pass/fail criteria for trader assessments.
- The `challengeTimeBox` sets an upper limit on how long the challenge can be open.
- This model allows standardized risk offerings across the platform.

---

## 🧠 Example (Risk Profile JSON)

```json
{
  "id": "507f1f77bcf86cd799439011",
  "name": "Moderate Risk",
  "description": "Balanced risk profile targeting steady returns with reasonable drawdown limits.",
  "image": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAA...",
  "maxDrawdown": 10,
  "challengeProfitTarget": 20,
  "challengeTimeBox": 30
}
