---
id: realtime
title: Realtime Module Tests
sidebar_label: Realtime
sidebar_position: 8
---

# Realtime Module Tests

Các test case cho module Giao tiếp thời gian thực.

> **SSoT**: [Realtime Spec](../../spec/modules/realtime.md)

---

## Happy path

### TC-INT-RT-001: WebSocket connection with valid JWT

> **Validates**: [FR-RT-01](../../spec/modules/realtime.md#acceptance-criteria)

```gherkin
Feature: WebSocket Authentication

  Scenario: Connect with valid JWT
    Given I have a valid JWT access token
    When I connect to WebSocket endpoint "/ws"
    Then connection should be established
    And I should receive "connected" event
    And socket mapping should be stored in Redis
```

### TC-INT-RT-002: Receive broadcast message

> **Validates**: [FR-RT-02](../../spec/modules/realtime.md#acceptance-criteria)

```gherkin
Feature: Message Broadcast

  Scenario: Receive notification broadcast
    Given I am connected to WebSocket
    And I am subscribed to channel "notifications"
    When server publishes message to "notifications" channel
    Then I should receive the message within 50ms
```

### TC-INT-RT-003: Join and leave room

```gherkin
Feature: Room Management

  Scenario: Join tournament room
    Given I am connected to WebSocket
    When I send "join_room" with room_id "tournament_123"
    Then I should be added to room members
    And other members should receive "user_joined" event
```

---

## Negative cases

### TC-INT-RT-004: Connection with invalid token

```gherkin
Feature: Authentication Failure

  Scenario: Connect with expired JWT
    Given I have an expired JWT token
    When I try to connect to WebSocket
    Then connection should be rejected
    And I should receive "REJECTED" status with error
```

### TC-INT-RT-005: Token expires during session

```gherkin
Feature: Session Expiration

  Scenario: Token expires while connected
    Given I am connected with JWT expiring in 1 minute
    When 1 minute passes
    Then I should receive "force_disconnect" event
    And connection should be closed
```

---

## Performance & boundary

### TC-PERF-RT-001: High concurrency connections

> **Validates**: [FR-RT-03](../../spec/modules/realtime.md#acceptance-criteria)

```gherkin
Feature: Scalability

  Scenario: 10k concurrent connections
    Given WebSocket server is running
    When 10000 clients connect simultaneously
    Then all connections should be established
    And handshake time should be < 100ms per connection
    And no connection should be dropped
```

### TC-PERF-RT-002: Message delivery latency

```gherkin
Feature: Low Latency

  Scenario: Broadcast to 1000 clients
    Given 1000 clients are connected to same room
    When server broadcasts message to room
    Then P50 delivery time should be < 50ms
    And all clients should receive the message
```
