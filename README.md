# LMS Documentation

Welcome to the official LMS documentation.

## Documentation Structure

### 1. [Blueprint](./blueprint/product/vision.md)

Strategic documents and core architecture.

- **Product**: [Vision](./blueprint/product/vision.md),
  [Roadmap](./blueprint/product/roadmap.md),
  [Backlog](./blueprint/product/backlog.md)
- **Architecture**: [System Design](./blueprint/architecture/system-design.md),
  [Tech Stack](./blueprint/architecture/stack.md),
  [Database](./blueprint/architecture/database.md)

### 2. [Specifications](./spec/modules/auth.md)

Detailed technical specifications.

- **Modules**: [Auth](./spec/modules/auth.md),
  [Learning](./spec/modules/learning.md), [Admin](./spec/modules/admin.md), etc.
- **Interfaces**: [UI System](./spec/interface/ui-system.md),
  [Gateway](./spec/interface/gateway.md), [API](./spec/interface/api-v1.yaml)

### 3. [Quality](./qa/cases/happy-path.md)

Quality assurance and testing.

- [Strategy](./qa/strategy.md)
- [Test Cases](./qa/cases/happy-path.md)
- [Benchmarks](./qa/benchmarks.md)

### 4. Guides

- **[Onboarding (Dev)](./docs/onboarding/setup.md)**:
  [Setup](./docs/onboarding/setup.md),
  [Contributing](./docs/onboarding/contributing.md)
- **[Handbook (User)](./docs/handbook/getting-started.md)**:
  [Getting Started](./docs/handbook/getting-started.md),
  [FAQ](./docs/handbook/faq.md)

---

## Docusaurus Setup

This repository contains the documentation website.

### Installation

```bash
yarn
```

### Local Development

```bash
yarn start
```

### Build

```bash
yarn build
```
