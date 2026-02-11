# ADR-{{NUMBER}}: {{TITLE}}

**상태**: {{STATUS}}  
**날짜**: {{DATE}}  
**결정자**: {{DECISION_MAKERS}}  
**작성자**: {{AUTHOR}}

---

## 1. 요약

### 1.1 맥락 (Context)

> 왜 이 결정이 필요한가?

{{CONTEXT}}

### 1.2 결정 (Decision)

> 내린 결정은 무엇인가?

{{DECISION}}

### 1.3 결과 (Consequences)

> 이 결정의 결과는 무엇인가?

- **긍정적**: {{POSITIVE_CONSEQUENCES}}
- **부정적**: {{NEGATIVE_CONSEQUENCES}}

---

## 2. 상세 내용

### 2.1 문제 정의

> 해결해야 할 문제의 상세 설명

{{PROBLEM_DESCRIPTION}}

### 2.2 제약사항

| 제약사항 | 설명 | 영향 |
|----------|------|------|
| {{CONSTRAINT_1}} | {{DESCRIPTION}} | {{IMPACT}} |
| {{CONSTRAINT_2}} | {{DESCRIPTION}} | {{IMPACT}} |

### 2.3 요구사항

- [ ] {{REQUIREMENT_1}}
- [ ] {{REQUIREMENT_2}}
- [ ] {{REQUIREMENT_3}}

---

## 3. 대안 분석

### 3.1 고려한 대안

#### 대안 1: {{OPTION_1_NAME}}

| 항목 | 내용 |
|------|------|
| **설명** | {{DESCRIPTION}} |
| **장점** | {{PROS}} |
| **단점** | {{CONS}} |
| **구현 복잡도** | Low/Medium/High |
| **유지보수 비용** | Low/Medium/High |
| **성능** | Good/Medium/Poor |

#### 대안 2: {{OPTION_2_NAME}}

| 항목 | 내용 |
|------|------|
| **설명** | {{DESCRIPTION}} |
| **장점** | {{PROS}} |
| **단점** | {{CONS}} |
| **구현 복잡도** | Low/Medium/High |
| **유지보수 비용** | Low/Medium/High |
| **성능** | Good/Medium/Poor |

#### 대안 3: {{OPTION_3_NAME}}

| 항목 | 내용 |
|------|------|
| **설명** | {{DESCRIPTION}} |
| **장점** | {{PROS}} |
| **단점** | {{CONS}} |
| **구현 복잡도** | Low/Medium/High |
| **유지보수 비용** | Low/Medium/High |
| **성능** | Good/Medium/Poor |

### 3.2 비교 매트릭스

| 기준 | 가중치 | {{OPTION_1}} | {{OPTION_2}} | {{OPTION_3}} |
|------|--------|--------------|--------------|--------------|
| 성능 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| 확장성 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| 보안 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| 구현 난이도 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| 팀 경험 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| 생태계 | {{WEIGHT}} | {{SCORE}} | {{SCORE}} | {{SCORE}} |
| **총점** | - | {{TOTAL}} | {{TOTAL}} | {{TOTAL}} |

> 점수: 1-5 (5가 가장 좋음)

### 3.3 선택 근거

> 왜 이 대안을 선택했는가?

{{DECISION_RATIONALE}}

---

## 4. 결정 상세

### 4.1 선택된 솔루션

> 선택한 대안의 상세 설명

{{SELECTED_SOLUTION_DETAILS}}

### 4.2 구현 계획

| 단계 | 작업 | 담당자 | 기간 |
|------|------|--------|------|
| 1 | {{TASK}} | {{OWNER}} | {{DURATION}} |
| 2 | {{TASK}} | {{OWNER}} | {{DURATION}} |
| 3 | {{TASK}} | {{OWNER}} | {{DURATION}} |

### 4.3 롤백 계획

> 문제 발생시 롤백 방법

{{ROLLBACK_PLAN}}

---

## 5. 결과 및 영향

### 5.1 긍정적 결과

1. {{POSITIVE_1}}
2. {{POSITIVE_2}}
3. {{POSITIVE_3}}

### 5.2 부정적 결과/리스크

1. {{NEGATIVE_1}}
2. {{NEGATIVE_2}}
3. {{NEGATIVE_3}}

### 5.3 완화 전략

| 리스크 | 완화 전략 |
|--------|-----------|
| {{RISK_1}} | {{MITIGATION}} |
| {{RISK_2}} | {{MITIGATION}} |

---

## 6. 관련 결정

### 6.1 선행 ADR

- [ADR-{{PREV_NUMBER}}](adr-{{PREV_NUMBER}}.md) - {{TITLE}}

### 6.2 후속 ADR

- ADR-{{NEXT_NUMBER}} - {{TITLE}} (예정)

### 6.3 관련 문서

- {{RELATED_DOC}}

---

## 7. 학습 및 피드백

### 7.1 결정 후 검토

| 검토 항목 | 예상 | 실제 | 차이 |
|-----------|------|------|------|
| 성능 | {{EXPECTED}} | {{ACTUAL}} | {{DIFF}} |
| 복잡도 | {{EXPECTED}} | {{ACTUAL}} | {{DIFF}} |
| 만족도 | {{EXPECTED}} | {{ACTUAL}} | {{DIFF}} |

### 7.1 교훈

> 이 결정에서 배운 것

{{LESSONS_LEARNED}}

---

## 8. 부록

### 8.1 참고 자료

- [링크]({{URL}}) - {{DESCRIPTION}}
- [링크]({{URL}}) - {{DESCRIPTION}}

### 8.2 용어 정의

| 용어 | 정의 |
|------|------|
| {{TERM}} | {{DEFINITION}} |

### 8.3 변경 이력

| 버전 | 날짜 | 상태 | 변경 내용 | 작성자 |
|------|------|------|-----------|--------|
| 0.1 | {{DATE}} | Proposed | 초안 작성 | {{AUTHOR}} |
| 0.2 | {{DATE}} | Accepted | 검토 완료 | {{AUTHOR}} |
| 0.3 | {{DATE}} | Superseded | ADR-{{NEW_NUMBER}}로 대체됨 | {{AUTHOR}} |

---

## 결정자 승인

| 역할 | 이름 | 서명 | 날짜 |
|------|------|------|------|
| {{ROLE}} | {{NAME}} | ✅ | {{DATE}} |
| {{ROLE}} | {{NAME}} | ✅ | {{DATE}} |

---

**상태 정의**:
- **Proposed**: 제안됨
- **Accepted**: 수락됨
- **Deprecated**: 더 이상 사용되지 않음
- **Superseded**: 다른 ADR로 대체됨 (링크 참조)
