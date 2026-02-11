# 아키텍처 패턴 참조 v2.0

프로젝트 티어별 권장 아키텍처 패턴입니다.

---

## 프로젝트 티어별 아키텍처

### Lite Tier

**특징**:
- 단순한 정적 웹사이트
- 서버사이드 로직 최소화
- 빠른 개발과 배포
- 관리 복잡성 최소

**적합한 경우**:
- 포트폴리오 웹사이트
- 마케팅 랜딩 페이지
- 블로그
- 문서 사이트
- 프로토타입

**기술 스택 예시**:
| 영역 | 기술 | 대안 |
|------|------|------|
| 마크업 | HTML5 | - |
| 스타일링 | Tailwind CSS | Bootstrap, Bulma |
| 프레임워크 | Jekyll | Hugo, 11ty, Astro |
| 호스팅 | GitHub Pages | Netlify, Vercel |
| CDN | Cloudflare | - |
| 분석 | Google Analytics | Plausible |

**아키텍처 다이어그램**:
```
[User] → [CDN] → [Static Hosting]
                ↓
           [Assets: CSS/JS/Images]
```

**KDF 적용**:
- PRD: 간결하게 (핵심 섹션만)
- 아키텍처: 간단한 구조 설명
- 스토리: 페이지/섹션 단위

---

### Basic Tier

**특징**:
- 풀스택 애플리케이션
- 데이터베이스 연동
- 사용자 인증/인가
- API 기반 통신
- SSR/CSR 하이브리드

**적합한 경우**:
- SaaS 애플리케이션
- 전자상거래 플랫폼
- 커뮤니티/소셜 앱
- 대시보드/관리자 패널
- CMS 기반 사이트

**기술 스택 예시**:
| 영역 | 기술 | 대안 |
|------|------|------|
| Frontend | Next.js | Nuxt, SvelteKit, Remix |
| Backend | Node.js/Express | Python/FastAPI, Go |
| Database | PostgreSQL | MySQL, MongoDB |
| ORM | Prisma | TypeORM, Drizzle |
| Auth | Clerk | Auth0, NextAuth |
| Hosting | Vercel | Railway, Render |
| Storage | AWS S3 | Cloudflare R2 |
| Cache | Redis | Upstash |

**아키텍처 다이어그램**:
```
[User] → [CDN] → [Next.js Frontend]
                    ↓
              [API Routes]
                    ↓
            ┌──────┴──────┐
            ▼             ▼
      [Auth Service]  [Database]
            ↓
      [External APIs]
```

**레이어별 책임**:

| 레이어 | 책임 | 예시 | 테스트 |
|--------|------|------|--------|
| Presentation | UI 렌더링, 사용자 상호작용 | React Components | E2E, Visual |
| API Layer | 요청 라우팅, 인증 | Next.js API Routes | Integration |
| Service Layer | 비즈니스 로직 | Services, Hooks | Unit |
| Data Layer | 데이터 접근, ORM | Prisma, Repositories | Unit |

**폴더 구조 예시**:
```
app/
├── api/                    # API 라우트
│   └── [resource]/
├── (routes)/               # 페이지 라우트
├── components/             # UI 컴포넌트
├── lib/                    # 유틸리티
├── services/               # 비즈니스 로직
├── hooks/                  # 커스텀 훅
└── types/                  # 타입 정의

prisma/
├── schema.prisma          # 데이터베이스 스키마
└── migrations/            # 마이그레이션
```

**KDF 적용**:
- PRD: 표준 템플릿 사용
- 아키텍처: 레이어 구조 상세 설명
- 스토리: API/컴포넌트 단위
- 테스트: 단위 + 통합 + E2E

---

### Pro Tier

**특징**:
- 마이크로서비스 아키텍처
- 이벤트 기반 통신
- 분산 데이터 관리
- 높은 가용성과 확장성
- 다중 팀 협업

**적합한 경우**:
- 대규모 SaaS 플랫폼
- 금융/핀테크 시스템
- 헬스케어 시스템
- IoT 플랫폼
- 대용량 트래픽 서비스

**기술 스택 예시**:
| 영역 | 기술 | 대안 |
|------|------|------|
| Frontend | Next.js | React, Vue |
| Gateway | Kong | Envoy, NGINX |
| Services | Go, Rust | Java/Spring, Node.js |
| Message | Kafka | RabbitMQ, NATS |
| Database | PostgreSQL | CockroachDB |
| Cache | Redis | Memcached |
| Analytics | ClickHouse | BigQuery |
| Container | Kubernetes | ECS, GKE |
| IaC | Terraform | Pulumi, CDK |
| Observability | Datadog | New Relic, Grafana Stack |

**아키텍처 다이어그램**:
```
                        ┌─────────────────────────────────────┐
[User] → [CDN/WAF] → [API Gateway] → [Auth Service]          │
                        ↓                                      │
              ┌─────────┼─────────┐                           │
              ▼         ▼         ▼                           │
         [Service A] [Service B] [Service C] ←→ [Message Bus] │
              ↓         ↓         ↓                           │
         [DB A]     [DB B]    [Cache]                         │
                                                                │
         ┌─────────────────────────────────────────────────────┘
         ▼
    [Monitoring & Logging]
```

**서비스 분할 기준**:

| 기준 | 설명 | 예시 |
|------|------|------|
| Business Capability | 비즈니스 능력별 | 주문, 결제, 배송 |
| Subdomain | 도메인 주도 설계 | 핵심, 지원, 일반 |
| Transaction Boundary | 트랜잭션 경계 | 일관성 필요 범위 |
| Team Structure | 팀 구조 | 콘웨이의 법칙 |

**KDF 적용**:
- PRD: 상세 템플릿, NFR 상세
- 아키텍처: ADR 필수, 패턴 문서화
- 스토리: 서비스/이벤트 단위
- 테스트: 계약 테스트, 카오스 테스트

---

## 일반적 아키텍처 패턴

### Layered Architecture (계층형)

```
┌─────────────────┐
│  Presentation   │ ← UI, Controllers, DTOs
├─────────────────┤
│    Business     │ ← Services, Domain Logic
├─────────────────┤
│     Data        │ ← Repositories, DAO
├─────────────────┤
│   Database      │ ← DBMS
└─────────────────┘
```

**장점**: 
- 단순함
- 테스트 용이
- 팀 학습 곡선 낮음

**단점**: 
- 계층 간 강한 결합
- 비즈니스 로직이 여러 계층에 분산

**적용**: Lite, Basic 티어

---

### Hexagonal Architecture (Ports & Adapters)

```
         ┌─────────────┐
    ┌───→│   Primary   │────┐
    │    │   Adapters  │    │
    │    └─────────────┘    │
┌───┴─────────────────────────┴───┐
│                                 │
│         Application Core        │
│      (Domain + Use Cases)       │
│                                 │
└───┬─────────────────────────┬───┘
    │    ┌─────────────┐    │
    └────│  Secondary  │←───┘
         │   Adapters  │
         └─────────────┘
```

**장점**: 
- 외부 의존성 격리
- 테스트 용이성
- 기술 변경 유연성

**단점**: 
- 복잡성 증가
- 보일러플레이트 코드

**적용**: Basic, Pro 티어

---

### Clean Architecture

```
           ┌─────────────────────┐
           │   External Layer    │
           │  (Frameworks, UI,   │
           │   External APIs)    │
           └──────────┬──────────┘
                      │
           ┌──────────▼──────────┐
           │   Interface Layer   │
           │  (Controllers,      │
           │   Presenters)       │
           └──────────┬──────────┘
                      │
           ┌──────────▼──────────┐
           │   Use Cases Layer   │
           │  (Application       │
           │   Business Rules)   │
           └──────────┬──────────┘
                      │
           ┌──────────▼──────────┐
           │    Domain Layer     │
           │  (Entities,         │
           │   Core Logic)       │
           └─────────────────────┘
```

**의존성 규칙**: 내부 계층은 외부 계층에 의존하지 않음

**장점**:
- 높은 테스트 커버리지 가능
- 프레임워크 독립성
- 비즈니스 로직 보호

**적용**: Basic, Pro 티어

---

### Event-Driven Architecture

```
┌──────────┐     ┌──────────┐     ┌──────────┐
│ Producer │────→│  Event   │────→│ Consumer │
│          │     │  Bus     │     │    A     │
└──────────┘     │          │     └──────────┘
                 │          │     ┌──────────┐
                 │          │────→│ Consumer │
                 │          │     │    B     │
                 └──────────┘     └──────────┘
```

**패턴 유형**:

| 유형 | 설명 | 사용 예 |
|------|------|---------|
| Event Notification | 단순 알림 | 이메일 발송 트리거 |
| Event-Carried State Transfer | 상태 전달 | 캐시 업데이트 |
| Event Sourcing | 모든 상태 변경을 이벤트로 저장 | 감사 로그, 재생 |

**장점**:
- 느슨한 결합
- 확장성
- 실시간 처리

**단점**:
- 디버깅 복잡성
- 이벤트 순서 보장
- 데이터 일관성

**적용**: Pro 티어

---

### CQRS (Command Query Responsibility Segregation)

```
         ┌──────────────┐
         │   Command    │
         │   (Write)    │
         └──────┬───────┘
                │
         ┌──────▼───────┐
         │ Command      │
         │ Handler      │
         └──────┬───────┘
                │
         ┌──────▼───────┐
         │ Write Model  │
         └──────┬───────┘
                │ Sync
         ┌──────▼───────┐
         │  Read Model  │
         └──────┬───────┘
                │
         ┌──────▼───────┐
         │    Query     │
         │    (Read)    │
         └──────────────┘
```

**적용 시나리오**:
- 읽기/쓰기 비율이 극도로 차이남
- 복잡한 조회가 많음
- 확장성이 중요

**적용**: Pro 티어

---

### Saga Pattern (분산 트랜잭션)

**Orchestration Saga**:
```
┌──────────┐
│Orchestrator│
└────┬─────┘
     │ command1
     ▼
┌──────────┐    command2    ┌──────────┐
│Service A │───────────────→│Service B │
└──────────┘                └──────────┘
```

**Choreography Saga**:
```
┌──────────┐   event A    ┌──────────┐   event B    ┌──────────┐
│Service A │─────────────→│Service B │─────────────→│Service C │
└──────────┘              └──────────┘              └──────────┘
```

**적용**: Pro 티어, 마이크로서비스

---

## 아키텍처 결정 기록 (ADR)

### ADR 템플릿 사용

```bash
node scripts/create-doc.js adr "{결정 제목}" --number={번호}
```

**주요 결정사항 예시**:
- 아키텍처 패턴 선택
- 데이터베이스 선택
- 인증 방식 결정
- API 설계 (REST vs GraphQL)
- 배포 전략

---

## 기술 선택 기준

### 의사결정 매트릭스

| 기준 | 가중치 | 측정 방법 |
|------|--------|-----------|
| 성능 | 20% | 벤치마크, 부하 테스트 |
| 확장성 | 20% | 수평/수직 확장 용이성 |
| 보안 | 15% | 보안 체크리스트 |
| 개발 속도 | 15% | 팀 생산성 |
| 생태계 | 10% | 커뮤니티, 문서 |
| 운영성 | 10% | 모니터링, 디버깅 |
| 학습 곡선 | 5% | 팀 역량 |
| 비용 | 5% | 인프라, 라이선스 |

### 성능 기준

| 지표 | Lite | Basic | Pro |
|------|------|-----|-------|
| 응답 시간 (p95) | < 1s | < 200ms | < 100ms |
| 가용성 | 99% | 99.9% | 99.99% |
| 동시 사용자 | 100 | 10,000 | 1,000,000 |
| 데이터 저장 | 10GB | 1TB | 100TB+ |

---

## KDF 아키텍처 워크플로우

### 아키텍처 설계 프로세스

1. **요구사항 분석** (`/pdca plan`)
   - 기능 요구사항
   - 비기능 요구사항 (성능, 보안, 가용성)

2. **아키텍처 설계** (`/dev arch {system}`)
   - 패턴 선택
   - 컴포넌트 정의
   - 데이터 흐름 설계

3. **ADR 작성** (필요시)
   - 중요 결정사항 문서화
   - 대안 검토

4. **검증** (`/pdca check`)
   - 프로토타입
   - 성능 테스트

### 예시 워크플로우

```
# 새 시스템 아키텍처 설계
/pdca plan payment-service
→ 요구사항 분석

/dev arch payment-service
→ 아키텍처 문서 생성
→ 패턴: Event-Driven + Saga

node scripts/create-doc.js adr "Event-Driven Architecture for Payment" --number=001
→ 결정 사항 문서화

/pdca do payment-service
→ /agile story payment-orchestrator
→ /agile story payment-saga-implementation

/pdca check payment-service
→ 검증
```
