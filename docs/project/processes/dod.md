---
id: dod
title: Definition of Done
sidebar_label: Definition of Done
---

# Definition of Done

Tiêu chí để xác định một story/task "Done".


## Story Definition of Done

Một User Story được coi là **Done** khi:

### Code

- [ ] Code implemented theo requirements
- [ ] Code follows coding standards
- [ ] TypeScript strict mode passes
- [ ] No ESLint errors
- [ ] No console.log/debugger statements

### Testing

- [ ] Unit tests written và pass
- [ ] Test coverage ≥ 70% cho code mới
- [ ] Integration tests pass (nếu applicable)
- [ ] Manual testing completed
- [ ] Edge cases covered

### Review

- [ ] Code reviewed bởi ít nhất 1 team member
- [ ] Review comments addressed
- [ ] PR approved

### Documentation

- [ ] Code comments cho complex logic
- [ ] API documentation updated (nếu applicable)
- [ ] README updated (nếu applicable)

### Quality

- [ ] No regressions introduced
- [ ] Performance acceptable
- [ ] Accessibility requirements met
- [ ] Responsive design verified

### Deployment

- [ ] CI pipeline passes
- [ ] Deployed to staging
- [ ] Smoke test passes on staging

### Acceptance

- [ ] PO reviewed và accepted
- [ ] Acceptance criteria met


## Sprint Definition of Done

Một Sprint được coi là **Done** khi:

- [ ] Tất cả committed stories Done
- [ ] Sprint goal achieved
- [ ] Demo completed
- [ ] Retrospective conducted
- [ ] Documentation updated
- [ ] No critical bugs


## Release Definition of Done

Một Release được coi là **Done** khi:

- [ ] All planned features complete
- [ ] All tests pass
- [ ] Performance benchmarks met
- [ ] Security scan passed
- [ ] Documentation complete
- [ ] Release notes written
- [ ] Stakeholder approval
- [ ] Deployed to production
- [ ] Monitoring confirmed


## Bug Fix Definition of Done

- [ ] Root cause identified
- [ ] Fix implemented
- [ ] Unit test added để prevent regression
- [ ] Verified fix works
- [ ] Related bugs checked
- [ ] PR reviewed và merged


## Task Types

| Type | DoD Level |
|------|-----------|
| Feature | Full Story DoD |
| Bug Fix | Bug Fix DoD |
| Spike | Document findings + demo |
| Chore | Verify completion + review |
