# 💰 UPI Leak Detector — Module 01: Spend Report

> **Bank data se apna asli kharcha nikalne wala engine.**
> 100% pure JavaScript. Zero dependencies. Zero frameworks.

[![Tests](https://img.shields.io/badge/tests-passing-brightgreen)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)
[![Dependencies](https://img.shields.io/badge/dependencies-0-blue)]()

---

## 🎯 Problem Kya Solve Karta Hai

Bank/UPI data **kabhi saaf nahi aata**:

- Amount kabhi number, kabhi **string** (`"240"`)
- Kabhi **garbage row** (`"GARBAGE"`, `null`)
- Kabhi amount hi **kharaab** (`"abc"`)

Ye engine pehle data **saaf** karta hai, phir hisaab lagata hai.

---

## 🚀 Quick Start

```bash
# Zero dependencies — kuch install karne ki zaroorat nahi
node upileakdetechtor.js
```

### Usage

```js
const report = buildSpendReport([
  ["05 Oct", "Zomato", "240"], // string bhi chalega
  ["05 Oct", "Netflix", 499],
  ["06 Oct", "Chai Shop", 30],
  "GARBAGE ROW", // ye skip ho jayega
  ["07 Oct", "X", "abc"], // ye bhi skip
]);

console.log(report.data);
```

### Output

```js
{
  total:      240,      // saare valid amounts ka jod
  count:      2,        // valid transactions
  biggest:    240,      // sabse bada kharcha
  smallTotal: 30,       // Rs 100 se kam wale ka total (chai-pani leak)
  smallCount: 1,        // Rs 100 se kam wale kitne
  average:    135       // total / count (2 decimal)
}
```

---

## 🔧 Functions

| Function                   | Kaam                                               | Return                 |
| -------------------------- | -------------------------------------------------- | ---------------------- |
| `cleanArray(rows)`         | Data saaf karta hai (string→number, garbage hatao) | `Array`                |
| `sumAll(array)`            | Number array ka jod                                | `{ status, ok, data }` |
| `getTotalSpend(rows)`      | Saare amounts ka jod                               | `{ status, ok, data }` |
| `getCount(rows)`           | Kitne transactions                                 | `{ status, ok, data }` |
| `getBiggestSpend(rows)`    | Sabse bada kharcha                                 | `{ status, ok, data }` |
| `getSmallSpendTotal(rows)` | Chai-pani total (< Rs 100)                         | `{ status, ok, data }` |
| `getSmallSpendCount(rows)` | Chai-pani kitne                                    | `{ status, ok, data }` |
| `buildSpendReport(rows)`   | **Sab mila kar ek report**                         | `{ status, ok, data }` |

---

## 🛡️ 4 Suraksha Rules (Har Function Mein)

```
1. Array hai?        →  Array.isArray()
2. String→number     →  Number(cur[2])
3. Asli number hai?  →  Number.isFinite()
4. Divide by zero?   →  count === 0 → average = 0
```

---

## 🧪 Tests

```js
buildSpendReport(upi); // → { total:3473, count:6, biggest:2499, smallTotal:55, smallCount:2, average:578.83 }
buildSpendReport([]); // → sab 0 (koi crash nahi)
buildSpendReport("hello"); // → { status:400, ok:false, error:... }
buildSpendReport(garbage); // → garbage skip, koi crash nahi
```

---

## 🧠 Concepts Used

- **`Array.prototype.reduce()`** — har function ka dil
- **Guard clauses** — har check sabse pehle
- **`Number()` + `Number.isFinite()`** — safe number
- **Consistent return** — hamesha `{ status, ok, data | error }`
- **Defense in depth** — saaf karo main mein, guard rakho helper mein

---

## 🗺️ Roadmap

- [x] Module 01 — Spend Report
- [ ] Module 02 — Subscription leak (3+ baar, same price)
- [ ] Module 03 — Duplicate charge detect
- [ ] Module 04 — Overspend warning
- [ ] npm package

---

## 👤 Author

**Debjeet Dhar** — Kolkata, India 🇮🇳
Building ULTRON, one pure-logic module at a time.

## 📄 License

MIT — see [LICENSE](./LICENSE)
