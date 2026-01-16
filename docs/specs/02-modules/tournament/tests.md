---
id: tournament-tests
title: Tournament Test Cases
sidebar_label: Tests
---

# Tournament & Competition - Test Cases

## Overview
Các test case cho module Tournament.

## Test Coverage Matrix
| Đặc tả | Test Cases | Độ phủ | Trạng thái |
|---------------|------------|---------|--------|
| Business Logic | 5 | 100% | Planned |
| API Endpoints | 4 | 100% | Planned |
| Workflows | 2 | 100% | Planned |

## Test Categories

### 1. Functional Tests
#### Business Logic
| Test ID | Mô tả | Rules | Kết quả mong đợi | Độ ưu tiên |
|---------|-------------|-------|-----------------|----------|
| TC-TOUR-FUN-001 | Join trước khi bắt đầu | BR-TOUR-001 | Cho phép (Waiting) | P0 |
| TC-TOUR-FUN-002 | Join muộn | BR-TOUR-001 | Bị chặn | P1 |
| TC-TOUR-FUN-003 | Điểm chính xác | BR-TOUR-003 | Điểm khớp công thức | P0 |

### 2. Integration Tests
| Test ID | Mô tả | Components | Kết quả |
|---------|-------------|------------|--------|
| TC-TOUR-INT-001 | User thắng nhận Badge | Tour, Game | Badge được gán |

### 3. Performance Tests
| Test ID | Kịch bản | Tải | Kết quả |
|---------|----------|------|--------|
| TC-TOUR-PERF-001 | 100k Concurrent | Start Event | Latency < 200ms |

---

## Validation Checklist
- [ ] Xử lý gửi bài đồng thời


---

# Performance Requirements

## Overview
Đặc tả hiệu năng cho module Tournament.

## Performance Targets

### Response Times
| Thao tác | P50 | P95 | P99 | Max | Đo lường |
|-----------|-----|-----|-----|-----|-------------|
| Join Round | 200ms | 500ms | 1s | 3s | DB Write + Logic |
| Submit Answer (WS) | 50ms | 100ms | 200ms | 500ms | Server Ack |
| Leaderboard Refresh | 100ms | 200ms | 500ms | 1s | Broadcast |

### Throughput Requirements
| Kịch bản | Requests/sec | Concurrent Users |
|----------|--------------|------------------|
| Sự kiện lớn | 50,000 Answers/sec | 100,000 |

## Scalability Requirements
### Horizontal Scaling
- **WebSocket Cluster**: Auto-scale dựa trên CPU/Connections.
- **Room Sharding**: Phân phối room trên các node.

## Resource Utilization Limits
| Tài nguyên | Ngưỡng cảnh báo | Ngưỡng nghiêm trọng |
|----------|-------------------|--------------------|
| Redis CPU | 60% | 85% |

## Load Testing Scenarios
### Scenario 1: Big Rush
**Description**: 100k users tham gia trong 1 phút.
**Success Criteria**:
- [ ] Không có DB Deadlock
- [ ] Tỷ lệ kết nối thành công > 99.9%

---

## Validation Checklist
- [ ] Đã xác minh Redis Cluster failover
