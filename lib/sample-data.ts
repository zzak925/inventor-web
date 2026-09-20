export type Space = {
  id: string;
  name: string;
  type: "storage" | "backroom" | "store";
  description: string;
  pointCount: number;
  unconfirmedCount: number;
};

export type LocationPoint = {
  id: string;
  spaceId: string;
  label: string;
  xPercent: number;
  yPercent: number;
  status: "active" | "needs_check" | "cleared";
};

export type InventoryItem = {
  id: string;
  itemCode: string;
  name: string;
  category: string;
  quantity: number;
  status: "unconfirmed" | "needs_photo" | "displayed" | "reserved" | "sold" | "missing";
  spaceId: string;
  locationPointId: string;
  assignedTo: string;
  memo: string;
};

export const spaces: Space[] = [
  { id: "warehouse-a", name: "창고 A", type: "storage", description: "주요 재고 보관 창고. 박스와 행거 혼합.", pointCount: 4, unconfirmedCount: 3 },
  { id: "backroom", name: "백룸", type: "backroom", description: "매장 뒤 임시 보관 및 촬영 대기 공간.", pointCount: 3, unconfirmedCount: 1 },
  { id: "store-rack", name: "매장 행거존", type: "store", description: "판매 중 상품 진열 공간.", pointCount: 2, unconfirmedCount: 0 },
];

export const locationPoints: LocationPoint[] = [
  { id: "p1", spaceId: "warehouse-a", label: "오른쪽 검정 박스", xPercent: 72, yPercent: 62, status: "needs_check" },
  { id: "p2", spaceId: "warehouse-a", label: "중앙 행거", xPercent: 46, yPercent: 44, status: "active" },
  { id: "p3", spaceId: "warehouse-a", label: "왼쪽 선반 2층", xPercent: 22, yPercent: 34, status: "active" },
  { id: "p4", spaceId: "warehouse-a", label: "바닥 미확인 박스", xPercent: 55, yPercent: 78, status: "needs_check" },
  { id: "p5", spaceId: "backroom", label: "촬영 대기 행거", xPercent: 40, yPercent: 48, status: "active" },
  { id: "p6", spaceId: "backroom", label: "검수 전 박스", xPercent: 68, yPercent: 70, status: "needs_check" },
  { id: "p7", spaceId: "store-rack", label: "아우터 행거", xPercent: 35, yPercent: 52, status: "active" },
];

export const inventoryItems: InventoryItem[] = [
  { id: "i1", itemCode: "TMP-001", name: "니트류 묶음", category: "니트", quantity: 20, status: "unconfirmed", spaceId: "warehouse-a", locationPointId: "p1", assignedTo: "민지", memo: "컬러/상태 확인 필요" },
  { id: "i2", itemCode: "TMP-002", name: "가죽/스웨이드 자켓", category: "자켓", quantity: 5, status: "needs_photo", spaceId: "warehouse-a", locationPointId: "p2", assignedTo: "현우", memo: "다음 촬영 후보" },
  { id: "i3", itemCode: "TMP-003", name: "데님 팬츠", category: "팬츠", quantity: 8, status: "unconfirmed", spaceId: "warehouse-a", locationPointId: "p4", assignedTo: "민지", memo: "사이즈 혼합" },
  { id: "i4", itemCode: "VT-202609-001", name: "Levi’s 데님 자켓", category: "자켓", quantity: 1, status: "displayed", spaceId: "store-rack", locationPointId: "p7", assignedTo: "사장님", memo: "매장 진열 완료" },
  { id: "i5", itemCode: "TMP-004", name: "가방류", category: "가방", quantity: 8, status: "unconfirmed", spaceId: "backroom", locationPointId: "p6", assignedTo: "현우", memo: "하자 확인 필요" },
];

export function statusLabel(status: InventoryItem["status"]): string {
  return {
    unconfirmed: "미확인",
    needs_photo: "촬영필요",
    displayed: "매장진열",
    reserved: "예약/보류",
    sold: "판매완료",
    missing: "위치불명",
  }[status];
}

export function badgeClass(status: InventoryItem["status"]): string {
  if (status === "unconfirmed" || status === "missing") return "badge red";
  if (status === "needs_photo" || status === "reserved") return "badge yellow";
  return "badge green";
}
