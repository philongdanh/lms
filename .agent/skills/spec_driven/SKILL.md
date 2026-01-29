---
name: spec_driven
description: Enforces the Spec -> Plan -> Code -> Verify cycle.
---

# Spec-Driven Development

Strict lifecycle to ensure alignment between requirements and code.

## 1. The Cycle

| Stage         | Role        | Activity         | Output                       |
| :------------ | :---------- | :--------------- | :--------------------------- |
| **1. Spec**   | Legislative | Define _WHAT_    | `docs/spec/*.md` (with D2)   |
| **2. Plan**   | Architect   | Define _HOW_     | `implementation_plan.md`     |
| **3. Code**   | Executive   | Implement _HOW_  | Source code (`api/`, `web/`) |
| **4. Verify** | Judicial    | Prove _IT WORKS_ | `walkthrough.md`             |

## 2. Rules

- **No Spec, No Code**: Spec must exist and be current before coding starts.
- **Spec First**: If requirements change, update Spec -> Plan -> Code.
- **Traceability**: Every code block should trace back to a Spec requirement.
