# inventor-web

samuelsmalls 창고/매장 재고 위치 조사 웹앱 MVP입니다.

## 1차 목표

- 매장/창고 공간 사진 등록
- 사진 위 클릭 좌표 저장
- 임시 재고 등록
- 위치별/미확인 재고 목록 보기

## 로컬 실행

```bash
npm install
npm run dev
```

브라우저에서 http://localhost:3000 을 엽니다.

## Supabase 설정

1. Supabase 프로젝트를 만듭니다.
2. SQL Editor에서 아래 migration 파일을 실행합니다.

```text
supabase/migrations/20260920130000_initial_inventory_location_schema.sql
```

3. `.env.example`을 참고해서 `.env.local`을 만듭니다.

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

## 주요 화면

- `/` 대시보드
- `/spaces` 공간 목록
- `/spaces/[id]` 공간 사진 좌표/위치별 재고
- `/inventory` 전체 재고
- `/inventory/unconfirmed` 미확인 재고

## 데이터베이스 핵심 테이블

- `staff_members`
- `spaces`
- `space_photos`
- `location_points`
- `inventory_items`
- `item_photos`
- `inventory_activity_logs`
