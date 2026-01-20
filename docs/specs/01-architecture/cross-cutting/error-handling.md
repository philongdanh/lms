---
id: error-handling
title: Error Handling
sidebar_label: Error Handling
sidebar_position: 3
---

# Error Handling

Các patterns và best practices xử lý lỗi.

---

## Error Categories

| Category | HTTP Range | Description | Action |
|----------|------------|-------|-----------|
| Client Error | 4xx | Lỗi từ client | Sửa request |
| Server Error | 5xx | Lỗi server | Retry sau |
| Business Error | 422 | Vi phạm business rule | Tuân theo rules |

---

## Error Response Format

```json
{
  "status": "error",
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "User-friendly message",
    "details": {
      "field": "email",
      "reason": "Invalid email format"
    }
  },
  "meta": {
    "timestamp": "2024-01-01T00:00:00Z",
    "requestId": "uuid"
  }
}
```

---

## Error Codes

### Authentication Errors (401)

| Code | Message | Cause |
|------|---------|-------------|
| AUTH_REQUIRED | Authentication required | Thiếu token |
| TOKEN_EXPIRED | Token has expired | Access token hết hạn |
| TOKEN_INVALID | Invalid token | Token sai format |

### Authorization Errors (403)

| Code | Message | Cause |
|------|---------|-------------|
| FORBIDDEN | Access denied | Không đủ quyền |
| RESOURCE_FORBIDDEN | Cannot access resource | Không phải owner |

### Validation Errors (400)

| Code | Message | Cause |
|------|---------|-------------|
| VALIDATION_ERROR | Validation failed | Input không hợp lệ |
| MISSING_FIELD | Required field missing | Thiếu field bắt buộc |
| INVALID_FORMAT | Invalid format | Sai data format |

### Not Found Errors (404)

| Code | Message | Cause |
|------|---------|-------------|
| NOT_FOUND | Resource not found | ID không hợp lệ |
| ENDPOINT_NOT_FOUND | Endpoint not found | URL sai |

### Business Errors (422)

| Code | Message | Cause |
|------|---------|-------------|
| BUSINESS_RULE_VIOLATION | Business rule violated | Kiểm tra rule thất bại |
| INSUFFICIENT_BALANCE | Insufficient balance | Không đủ credits |
| LIMIT_EXCEEDED | Limit exceeded | Đạt quota |

### Server Errors (500)

| Code | Message | Cause |
|------|---------|-------------|
| INTERNAL_ERROR | Internal server error | Lỗi không mong đợi |
| SERVICE_UNAVAILABLE | Service unavailable | Dependency down |
| DATABASE_ERROR | Database error | Lỗi kết nối DB |

---

## Error Handling Patterns

### Retry Strategy

| Error Type | Retry | Backoff | Max Attempts |
|------------|-------|---------|--------------|
| Network Timeout | Yes | Exponential | 3 |
| 429 Rate Limited | Yes | Respect Retry-After | 3 |
| 5xx Server Error | Yes | Exponential | 3 |
| 4xx Client Error | No | - | - |

### Circuit Breaker

| State | Description | Action |
|-------|-------------|--------|
| Closed | Normal operation | Forward requests |
| Open | Too many failures | Fail fast |
| Half-Open | Testing recovery | Limited requests |

**Configuration**:
- Failure threshold: 5 failures in 60 seconds
- Recovery timeout: 30 seconds
- Success threshold: 3 successes to close

---

## Logging Errors

### Required Fields

| Field | Description |
|-------|-------------|
| timestamp | When error occurred |
| requestId | Request correlation ID |
| userId | User who experienced error |
| errorCode | Error code |
| message | Error message |
| stack | Stack trace (non-prod) |
| context | Relevant context |

### Example

```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "ERROR",
  "requestId": "req-123",
  "userId": "user-456",
  "errorCode": "VALIDATION_ERROR",
  "message": "Email format invalid",
  "context": {
    "field": "email",
    "value": "invalid-email"
  }
}
```

---

## User-Facing Messages

### Guidelines

- Be specific but not technical
- Suggest action when possible
- Never expose system details
- Localize messages

### Examples

| Code | Technical | User-Friendly |
|------|-----------|---------------|
| DB_CONNECTION_FAILED | Database connection pool exhausted | Service temporarily unavailable. Please try again. |
| VALIDATION_ERROR | Field 'email' failed regex validation | Please enter a valid email address. |

---

## References

- [API Gateway](./api-gateway.md)
- [Monitoring](./monitoring.md)
