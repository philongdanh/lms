---
id: contracts
title: API Contracts
sidebar_label: Contracts
---

# API Contracts

Consumer-driven contracts for API testing.

---

## Overview

API contracts define expected behavior between services (consumers and providers) using tools like Pact.

---

## Structure

```
contracts/
├── consumer-*.json     # Consumer contracts
└── provider-*.json     # Provider verification results
```

---

## Contract Template

### Pact Contract Example

```json
{
  "consumer": {
    "name": "frontend-app"
  },
  "provider": {
    "name": "api-service"
  },
  "interactions": [
    {
      "description": "a request for user profile",
      "providerState": "user exists",
      "request": {
        "method": "GET",
        "path": "/api/v1/users/123",
        "headers": {
          "Authorization": "Bearer token"
        }
      },
      "response": {
        "status": 200,
        "headers": {
          "Content-Type": "application/json"
        },
        "body": {
          "status": "success",
          "data": {
            "id": "123",
            "email": "user@example.com",
            "name": "John Doe"
          }
        }
      }
    }
  ],
  "metadata": {
    "pactSpecification": {
      "version": "2.0.0"
    }
  }
}
```

---

## Workflow

### Consumer Side

1. Write consumer tests to generate contracts
2. Publish contracts to Pact Broker
3. Run on every consumer PR

### Provider Side

1. Pull contracts from Pact Broker
2. Verify provider against contracts
3. Run on every provider PR

---

## Guidelines

| Guideline | Description |
|-----------|-------------|
| Keep contracts minimal | Include only required fields |
| Use provider states | Set up test data |
| Version management | Track breaking changes |
| Automate verification | Integrate with CI/CD |

---

## Tools

| Tool | Purpose |
|------|---------|
| Pact | Contract testing framework |
| Pact Broker | Contract storage |
| can-i-deploy | Safe deployment verification |

---

## References

- [OpenAPI](./openapi.md)
- [Mocks](./mocks.md)
- [API Gateway](../specs/01-architecture/cross-cutting/api-gateway.md)
