# Kimi Dev Framework (KDF) v1.0

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

| 티어 | 설명 | 기술 스택 예시 |
|------|------|---------------|
| **Lite** | 가벼운 프로젝트 | HTML, CSS, JS, 정적 사이트 생성기 |
| **Pro** | 표준 애플리케이션 | Next.js, React, Node.js, BaaS |
| **Scale** | 대규모 시스템 | K8s, Terraform, MSA, 이벤트 기반 |

---

## 🚀 빠른 시작

### 설치

```bash
# 1. 저장소 클론
git clone https://github.com/DeadfireKim/kimi-dev-framework.git

# 2. Kimi 스킬 디렉토리에 복사 (Windows)
Copy-Item -Recurse -Path "kimi-dev-framework" -Destination "$env:USERPROFILE\.config\agents\skills\"

# 2. Kimi 스킬 디렉토리에 복사 (Mac/Linux)
cp -r kimi-dev-framework ~/.config/agents/skills/
```

### 프로젝트 초기화

```bash
# 새 프로젝트 시작
/dev start my-project --tier=pro
```

---

## 📚 주요 명령어

### 🎯 PDCA 사이클 (`/pdca`)

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `/pdca plan {feature}` | 계획 수립 및 요구사항 분석 | `/pdca plan payment-system` |
| `/pdca do {feature}` | 구현 실행 | `/pdca do payment-system` |
| `/pdca check {feature}` | 품질 검증 및 리뷰 | `/pdca check payment-system` |
| `/pdca act {feature}` | 개선 및 리팩토링 | `/pdca act payment-system` |
| `/pdca status` | 현재 상태 확인 | `/pdca status` |
| `/pdca next` | 다음 단계 안내 및 실행 | `/pdca next` |

### 🚀 개발 워크플로우 (`/dev`)

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `/dev start {project}` | 새 프로젝트 초기화 | `/dev start my-app` |
| `/dev spec {feature}` | 간결한 기술 명세서 | `/dev spec fix-login` |
| `/dev arch {system}` | 아키텍처 설계 문서 | `/dev arch api-gateway` |
| `/dev review` | 코드 리뷰 수행 | `/dev review --scope=feature` |
| `/dev retro` | 회고 진행 | `/dev retro --sprint=sprint-1` |

### 📋 Agile 워크플로우 (`/agile`)

| 명령어 | 설명 | 예시 |
|--------|------|------|
| `/agile epic {title}` | 에픽 생성 | `/agile epic user-management` |
| `/agile story {title}` | 스토리 생성 및 구현 | `/agile story login-with-email` |
| `/agile task {story} {task}` | 태스크 분할 | `/agile task story-123 "Create DB"` |
| `/agile sprint plan` | 스프린트 계획 | `/agile sprint plan --duration=2` |
| `/agile sprint start` | 스프린트 시작 | `/agile sprint start` |
| `/agile sprint end` | 스프린트 종료 | `/agile sprint end` |

---

## 📁 생성되는 구조

KDF를 사용하면 다음과 같은 구조가 자동 생성됩니다:

```
.kdf/
├── status.json              # 현재 상태 추적
├── README.md                # 프로젝트 가이드
├── active/                  # 진행 중인 문서
│   ├── prd-{feature}.md
│   ├── arch-{system}.md
│   ├── review-{timestamp}.md
│   └── retro-{sprint}.md
├── backlog/
│   ├── epics/               # 에픽 목록
│   │   └── epic-{id}.md
│   └── stories/             # 백로그 스토리
│       └── story-{id}.md
├── completed/               # 완료된 문서
│   └── prd-{feature}-{timestamp}.md
└── templates/               # 프로젝트별 템플릿
```

---

## 🔄 Quality-First 개선 루프

KDF는 품질 중심의 자동 개선 사이클을 제공합니다:

```
/pdca check → 품질 평가 (점수 < 90%?)
     ↓ Yes
/pdca act → 개선 실행 → 재평가 (최대 5회)
     ↓ No (점수 >= 90%)
완료! 🎉
```

**품질 점수 기준**:
| 항목 | 가중치 |
|------|--------|
| 기능 정확성 | 30% |
| 코드 품질 | 25% |
| 테스트 | 20% |
| 성능 | 10% |
| 보안 | 10% |
| 문서화 | 5% |

---

## 📖 문서 구조

### 템플릿

| 템플릿 | 파일 | 용도 |
|--------|------|------|
| PRD | `templates/prd-template.md` | 제품 요구사항 문서 |
| Architecture | `templates/arch-template.md` | 아키텍처 설계 문서 |
| Story | `templates/story-template.md` | 사용자 스토리 |
| Review | `templates/review-template.md` | 코드 리뷰 보고서 |
| Retro | `templates/retro-template.md` | 회고 문서 |
| ADR | `templates/adr-template.md` | 아키텍처 결정 기록 |

### 레퍼런스

| 문서 | 설명 |
|------|------|
| `references/PDCA-GUIDE.md` | PDCA 방법론 상세 가이드 |
| `references/AGILE-WORKFLOWS.md` | Agile 워크플로우 상세 |
| `references/ARCHITECTURE-PATTERNS.md` | 티어별 아키텍처 패턴 |

---

## 🎓 사용 예시

### 시나리오 1: 신규 프로젝트

```bash
# 1. 프로젝트 초기화
/dev start my-saas --tier=pro

# 2. PDCA: Plan
/pdca plan subscription-system
# → PRD 작성
# → 아키텍처 설계

# 3. PDCA: Do
/pdca do subscription-system
# → /agile story create-subscription
# → /agile story update-subscription

# 4. PDCA: Check
/pdca check subscription-system
# → 코드 리뷰
# → 테스트 실행

# 5. PDCA: Act (품질 < 90%인 경우)
/pdca act subscription-system
# → 개선사항 반영

# 6. 완료
/pdca next
```

### 시나리오 2: 스프린트 기반 개발

```bash
# 스프린트 계획
/agile sprint plan --duration=2 --goal="결제 기능 완료"

# 스프린트 시작
/agile sprint start

# 스토리 구현
/agile story payment-integration
/agile story payment-history
/agile story refund

# 스프린트 종료 및 회고
/agile sprint end
/dev retro
```

### 시나리오 3: 빠른 버그 수정

```bash
# 간결한 명세
/dev spec fix-login-error

# 코드 수정...

# 리뷰
/dev review --scope=file
```

---

## 🔧 스크립트 유틸리티

`scripts/` 디렉토리의 Node.js 스크립트를 직접 사용할 수도 있습니다:

```bash
# 프로젝트 초기화
node scripts/init-project.js my-app --tier=pro

# 상태 확인
node scripts/status-manager.js get

# PDCA 진행
node scripts/status-manager.js pdca-start user-auth
node scripts/status-manager.js pdca-advance

# 문서 생성
node scripts/create-doc.js prd payment-system
node scripts/create-doc.js story "login with email" --points=3
```

---

## 🛠️ 커스터마이징

### 프로젝트별 템플릿

`.kdf/templates/`에 프로젝트별 커스텀 템플릿을 추가할 수 있습니다.

### 설정 오버라이드

`.kdf/config.json`을 생성하여 기본 설정을 변경할 수 있습니다:

```json
{
  "quality": {
    "threshold": 85,
    "maxIterations": 3
  },
  "templates": {
    "customPRD": "templates/my-prd.md"
  }
}
```

---

## 🤝 기여하기

1. Fork 저장소
2. Feature 브랜치 생성 (`git checkout -b feature/amazing-feature`)
3. 변경사항 커밋 (`git commit -m 'feat: add amazing feature'`)
4. 브랜치에 Push (`git push origin feature/amazing-feature`)
5. Pull Request 생성

---

## 📄 라이선스

MIT License - 자유롭게 수정 및 배포 가능

---

## 📮 문의 및 지원

- GitHub Issues: https://github.com/DeadfireKim/kimi-dev-framework/issues
- Discussions: https://github.com/DeadfireKim/kimi-dev-framework/discussions

**Happy Coding with Kimi Dev Framework! 🚀**
