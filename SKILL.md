---
name: kimi-dev-framework
description: AI-Native 개발 프레임워크. Plan-Do-Check-Act 사이클 기반의 구조화된 개발 워크플로우, 자동 문서화, 품질 중심 개선 루프를 제공합니다. /pdca 명령어로 계획-실행-점검-개선 사이클을, /dev 명령어로 개발 라이프사이클을, /agile 명령어로 애자일 워크플로우를 관리합니다.
---

# Kimi Dev Framework (KDF)

**AI-Native 개발을 위한 구조화된 프레임워크**

PDCA(Plan-Do-Check-Act) 방법론과 현대적 개발 워크플로우를 결합하여 AI와 협업하는 개발자를 위한 체계적인 접근법을 제공합니다.

---

## 🎯 핵심 원칙

1. **AI-First Workflow** - 반복 작업은 AI가, 창의적 결정은 개발자가
2. **Docs as Code** - 문서는 코드와 동일하게 버전 관리되고 자동 동기화됨
3. **Evidence-Based** - 모든 결정은 명확한 근거와 함께 문서화
4. **Quality-First** - 품질 중심의 지속적 개선

---

## 📊 프로젝트 티어 (Project Tiers)

프로젝트 규모와 복잡도에 따라 세 가지 티어를 제공합니다:

| 티어 | 설명 | 기술 스택 예시 | 문서 복잡도 |
|------|------|---------------|------------|
| **Lite** | 가벼운 프로젝트 | HTML, CSS, JS, 정적 사이트 생성기 | 간결 |
| **Pro** | 표준 애플리케이션 | Next.js, React, Node.js, BaaS | 표준 |
| **Scale** | 대규모 시스템 | K8s, Terraform, MSA, 이벤트 기반 | 상세 |

---

## 🔄 9단계 개발 파이프라인

```
1. Discover    → 문제 정의, 사용자 리서치
2. Define      → 요구사항 명세, PRD 작성
3. Design      → 아키텍처 설계, 기술 스택 선정
4. Plan        → 스토리 분할, 스프린트 계획
5. Develop     → 코드 구현, 테스트 작성
6. Review      → 코드 리뷰, 품질 검증
7. Test        → 통합 테스트, QA
8. Deploy      → 배포, 모니터링 설정
9. Iterate     → 피드백 수집, 개선
```

---

## 🎯 명령어 레퍼런스

### PDCA 사이클 (`/pdca`)

#### `/pdca plan {feature}`
**목적**: 기능의 계획 수립 및 요구사항 분석

**실행 단계**:
1. 프로젝트 루트에 `.kdf/` 디렉토리가 없으면 `/dev start`를 먼저 실행하도록 안내
2. `{feature}` 이름으로 PRD 문서 초안 생성 (`.kdf/active/prd-{feature}.md`)
3. 사용자와 함께 PRD 검토 및 보완
4. 필요시 아키텍처 문서 초안 생성
5. 백로그에 스토리 목록 초안 작성
6. `status.json` 업데이트: `pdca.stage` = "plan", `pdca.current` = "{feature}"

**산출물**:
- `.kdf/active/prd-{feature}.md`
- `.kdf/active/arch-{feature}.md` (선택)
- `.kdf/backlog/stories/{feature}-*.md` (초안)

---

#### `/pdca do {feature}`
**목적**: 계획된 기능의 구현 실행

**실행 단계**:
1. `status.json` 확인 - 현재 PDCA stage가 "plan" 완료 상태인지 검증
2. PRD 문서 읽기
3. 백로그의 스토리 목록 확인
4. `/agile story` 명령어로 각 스토리 구현 진행
5. 각 스토리 완료시 체크리스트 업데이트
6. `status.json` 업데이트: `pdca.stage` = "do"

---

#### `/pdca check {feature}`
**목적**: 구현 결과의 품질 검증 및 평가

**실행 단계**:
1. 구현된 코드 전체 검토
2. 테스트 실행 및 커버리지 확인
3. `/dev review` 실행 - 코드 리뷰 수행
4. 품질 메트릭 수집 및 점수 계산 (0-100%)
5. 품질 보고서 생성
6. `status.json` 업데이트: `pdca.stage` = "check"

**품질 점수 기준**:
| 지표 | 가중치 | 최소 기준 | 권장 기준 |
|------|--------|-----------|-----------|
| 기능 정확성 | 30% | 80% | 95% |
| 코드 품질 | 25% | 75% | 90% |
| 테스트 커버리지 | 20% | 70% | 85% |
| 성능 | 10% | 기준 ±15% | 기준 ±5% |
| 보안 | 10% | 0 심각 이슈 | 0 이슈 |
| 문서화 | 5% | 기본 완료 | 상세 완료 |

---

#### `/pdca act {feature}`
**목적**: 점검 결과를 바탕으로 개선 및 표준화

**실행 단계**:
1. 품질 보고서 검토
2. 개선사항 우선순위 정렬 (P0/P1/P2/P3)
3. 개선 작업 수행
4. 개선 완료 후 자동으로 `/pdca check` 재실행
5. 반복 횟수 증가

**Quality-First 개선 루프**:
```
/pdca check → 품질 평가 (점수 < 90%?)
     ↓ Yes
/pdca act → 개선 실행
     ↓
/pdca check → 재평가 (반복, 최대 5회)
     ↓ No (점수 >= 90%)
완료! 🎉
```

**종료 조건**:
- 품질 점수 >= 90%
- 반복 횟수 >= 5회 (강제 종료)
- 사용자 수동 결정

---

#### `/pdca status`
**목적**: 현재 PDCA 및 프로젝트 상태 확인

**출력 내용**:
- 프로젝트 정보 (이름, 티어, 현재 페이즈)
- 활성 PDCA 사이클 (현재 기능, 단계, 반복 횟수, 품질 점수)
- 현재 스프린트 정보
- 기능 목록 및 상태 통계
- 다음 권장 액션

---

#### `/pdca next`
**목적**: 다음 단계 안내 및 자동 전환

**단계 전이**:
- plan → do: PRD 완료 확인 후 구현 시작
- do → check: 구현 완료 후 품질 검증
- check → act: 품질 < 90%시 개선
- check → complete: 품질 >= 90%시 완료
- act → check: 개선 후 재검증

---

### 개발 워크플로우 (`/dev`)

#### `/dev start {project} [--tier={tier}]`
**목적**: 새 프로젝트 초기화

**실행 단계**:
1. 프로젝트 티어 선택 (Lite/Pro/Scale)
2. `.kdf/` 디렉토리 생성
3. `status.json` 초기화
4. `.gitignore` 생성
5. 프로젝트 README 생성

**생성 구조**:
```
.kdf/
├── status.json              # 프로젝트 상태
├── README.md                # 프로젝트 가이드
├── active/                  # 진행 중인 문서
├── backlog/
│   ├── epics/              # 에픽 목록
│   └── stories/            # 백로그 스토리
├── completed/              # 완료된 문서
└── templates/              # 프로젝트별 템플릿
```

---

#### `/dev spec {feature}`
**목적**: 간결한 기술 명세서 작성 (Lite 티어용)

**실행 단계**:
1. Lite 티어용 간결 PRD 템플릿 생성
2. 핵심 섹션만 포함 (개요, 기능 요구사항, 인수 기준)
3. `.kdf/active/prd-{feature}.md`에 저장

---

#### `/dev review [--scope={scope}] [--focus={focus}]`
**목적**: 코드 리뷰 수행

**스코프 옵션**:
- `--scope=file`: 현재 파일만
- `--scope=feature`: 현재 기능 관련 파일
- `--scope=pr`: 전체 변경사항

**리뷰 항목**:
- 기능 정확성
- 코드 스타일 및 가독성
- 잠재적 버그
- 성능 이슈
- 보안 취약점
- 테스트 커버리지

**산출물**: `.kdf/active/review-{timestamp}.md`

---

#### `/dev retro [--sprint={sprint}]`
**목적**: 스프린트 회고 진행

**회고 템플릿 (KPT)**:
- **Keep**: 계속 유지할 것
- **Problem**: 개선이 필요한 것
- **Try**: 다음에 시도할 것
- **Action Items**: 구체적인 실행 계획

**산출물**: `.kdf/completed/retro-{sprint}-{date}.md`

---

#### `/dev arch {system}`
**목적**: 아키텍처 설계 문서 작성

**실행 단계**:
1. 아키텍처 템플릿으로 문서 초안 생성
2. 프로젝트 티어에 따른 상세도 조정
3. 핵심 결정사항 논의 및 기록
4. `.kdf/active/arch-{system}.md`에 저장

---

### Agile 워크플로우 (`/agile`)

#### `/agile epic {title}`
**목적**: 에픽 생성 및 관리

**에픽 구성요소**:
- 목표 (Objective)
- 사용자 가치 (User Value)
- 성공 기준 (Success Criteria)
- 포함 스토리 목록
- 예상 소요 시간
- 의존성

---

#### `/agile story {title} [--epic={epic}] [--points={points}]`
**목적**: 사용자 스토리 생성 및 구현

**INVEST 원칙**:
- **I**ndependent: 독립적
- **N**egotiable: 협상 가능
- **V**aluable: 가치 있음
- **E**stimable: 추정 가능
- **S**mall: 작음
- **T**estable: 테스트 가능

**스토리 포인트**:
| 포인트 | 크기 | 예상 소요 |
|--------|------|-----------|
| 1 | 매우 작음 | 1-2시간 |
| 2 | 작음 | 반나절 |
| 3 | 중간 | 1일 |
| 5 | 큼 | 2-3일 |
| 8 | 매우 큼 | 1주일 |
| 13 | 너무 큼 | 분할 필요 |

---

#### `/agile task {story} {task-description}`
**목적**: 스토리를 구체적인 태스크로 분할

**사용 예시**:
```
/agile task story-1234567890 "Create database schema"
/agile task story-1234567890 "Implement API endpoint"
```

---

#### `/agile sprint plan [--duration={weeks}] [--goal={goal}]`
**목적**: 스프린트 계획

**고려사항**:
- 스프린트 목표 설정
- 백로그에서 스토리 선정 (우선순위 기반)
- 팀 속도(velocity) 고려
- 용량 계획

---

#### `/agile sprint start`
**목적**: 스프린트 시작

**실행 단계**:
1. 스프린트 계획 확인
2. 스토리 상태 초기화
3. 데일리 스크럼 템플릿 제공

---

#### `/agile sprint end`
**목적**: 스프린트 종료

**실행 단계**:
1. 완료된 스토리 통계
2. 미완료 스토리 백로그로 이동
3. `/dev retro` 실행 권고

---

## 📊 상태 관리

KDF는 `.kdf/status.json`으로 모든 상태를 추적합니다:

```json
{
  "version": "2.0.0",
  "project": {
    "name": "my-app",
    "tier": "pro",
    "phase": "develop",
    "current_sprint": "sprint-3"
  },
  "pdca": {
    "current": "user-auth",
    "stage": "check",
    "iterations": 2,
    "quality_score": 87
  },
  "features": [
    {
      "name": "user-auth",
      "status": "in_progress",
      "pdca_stage": "check",
      "stories": ["story-1", "story-2"],
      "quality_score": 87
    }
  ],
  "sprints": [...],
  "metrics": {
    "total_stories": 15,
    "completed_stories": 12,
    "average_quality": 92
  }
}
```

---

## 🔄 통합 워크플로우 예시

### 시나리오 1: 신규 기능 개발

```
/dev start my-saas --tier=pro
/pdca plan subscription-system
    → PRD 작성
    → 아키텍처 설계
    → 스토리 분할

/pdca do subscription-system
    → /agile story create-subscription
    → /agile story update-subscription

/pdca check subscription-system
    → 코드 리뷰
    → 테스트 실행 (커버리지 75%)
    → 품질 점수: 85%

/pdca act subscription-system
    → 테스트 추가 (커버리지 85%로 개선)
    → /pdca check (재실행)
    → 품질 점수: 93%

/pdca next
    → Complete! 🎉
```

### 시나리오 2: 스프린트 기반 개발

```
/agile sprint plan --duration=2 --goal="결제 기능 완료"
/agile sprint start

/agile story payment-integration
/agile story payment-history
/agile story refund

/agile sprint end
/dev retro
```

### 시나리오 3: 빠른 버그 수정

```
/dev spec fix-login-error
    → 간결한 명세
    → 코드 수정
/dev review --scope=file
    → 리뷰 완료
```

---

## 📝 문서 템플릿

KDF는 다음 템플릿을 제공합니다:

| 템플릿 | 파일 | 용도 |
|--------|------|------|
| PRD | `templates/prd-template.md` | 제품 요구사항 문서 |
| Architecture | `templates/arch-template.md` | 아키텍처 설계 문서 |
| Story | `templates/story-template.md` | 사용자 스토리 |
| Review | `templates/review-template.md` | 코드 리뷰 보고서 |
| Retro | `templates/retro-template.md` | 회고 문서 |
| ADR | `templates/adr-template.md` | 아키텍처 결정 기록 |

---

## 🎓 모범 사례

### Plan 단계
- 충분한 시간 투자 (전체의 30-40%)
- 위험 요소를 미리 식별하고 문서화
- 스테이크홀더와 PRD 검토

### Do 단계
- 작은 단위로 커밋 (atomic commits)
- TDD 권장 (테스트 먼저)
- 문서화를 병행
- 블로커(장애물)는 즉시 공유

### Check 단계
- 객관적인 메트릭 사용
- 품질 점수 90%를 목표로
- 기술 부채를 별도로 기록

### Act 단계
- 완벽보다 개선에 초점
- 학습 내용 문서화
- 다음 사이클에 적용할 것 계획

---

## 📚 참고 문서

- `references/PDCA-GUIDE.md` - PDCA 방법론 상세 가이드
- `references/AGILE-WORKFLOWS.md` - Agile 워크플로우 상세
- `references/ARCHITECTURE-PATTERNS.md` - 티어별 아키텍처 패턴

---

**버전**: 2.0.0  
**라이선스**: MIT
