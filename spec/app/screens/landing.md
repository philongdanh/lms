---
id: landing
title: Landing Page
sidebar_label: Landing
sidebar_position: 2
---

# Landing Page

Trang chủ công khai của ứng dụng.

---

## Overview

```yaml
route: /
layout: PublicLayout
access: All
```

---

## Screen Structure

### Hierarchy

```yaml
LandingPage:
  - Header:
      - Logo: image
      - NavLinks:
          - FeaturesLink: anchor
          - PricingLink: anchor
          - AboutLink: anchor
      - AuthButtons:
          - LoginButton: button[secondary]
          - RegisterButton: button[primary]
  - HeroSection:
      - Headline: text
      - Subheadline: text
      - CTAButton: button[primary]
      - HeroImage: image
  - FeaturesSection:
      - SectionTitle: text
      - FeatureCards: card-grid (3 columns)
  - TestimonialsSection:
      - SectionTitle: text
      - TestimonialCards: card-carousel
  - CTASection:
      - Title: text
      - CTAButton: button[primary]
  - Footer:
      - FooterLinks: link-groups
      - Copyright: text
```

---

## Components

### HeroSection

| Element       | Type     | Props                                                           |
| :------------ | :------- | :-------------------------------------------------------------- |
| `Headline`    | `Text`   | `variant="h1"`, `content="Học tập thông minh"`                  |
| `Subheadline` | `Text`   | `variant="subtitle"`                                            |
| `CTAButton`   | `Button` | `variant="primary"`, `size="large"`, `label="Bắt đầu miễn phí"` |

### FeatureCards

| Element       | Type   | Props                          |
| :------------ | :----- | :----------------------------- |
| `FeatureCard` | `Card` | `icon`, `title`, `description` |

**FeatureCard Schema:**

```yaml
FeatureCard:
  icon: icon-name
  title: string
  description: string
```

---

## States

| State  | Trigger      | UI Changes        |
| :----- | :----------- | :---------------- |
| `idle` | Initial load | Show all sections |

---

## Responsive

```yaml
mobile:
  HeroSection: stack-vertical, text-center
  FeatureCards: single-column
tablet:
  FeatureCards: 2-column grid
desktop:
  HeroSection: side-by-side
  FeatureCards: 3-column grid
```
