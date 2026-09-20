import Link from "next/link";
import { badgeClass, inventoryItems, spaces, statusLabel } from "@/lib/sample-data";

export default function UnconfirmedInventoryPage() {
  const unconfirmed = inventoryItems.filter((item) => item.status === "unconfirmed" || item.status === "missing");

  return (
    <section className="grid">
      <div>
        <div className="kicker">미확인 재고</div>
        <h1>오늘 줄여야 할 재고</h1>
        <p>위치가 애매하거나 상태 확인이 필요한 항목만 따로 보는 화면입니다.</p>
      </div>
      <div className="grid cols-3">
        {unconfirmed.map((item) => {
          const space = spaces.find((s) => s.id === item.spaceId);
          return (
            <Link className="card" href={`/spaces/${item.spaceId}`} key={item.id}>
              <span className={badgeClass(item.status)}>{statusLabel(item.status)}</span>
              <h2 style={{ marginTop: 14 }}>{item.name}</h2>
              <p>{space?.name} · {item.category} · 수량 {item.quantity}</p>
              <p>{item.memo}</p>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
