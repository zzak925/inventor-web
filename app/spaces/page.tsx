import Link from "next/link";
import { spaces } from "@/lib/sample-data";

export default function SpacesPage() {
  return (
    <section className="grid">
      <div>
        <div className="kicker">공간 목록</div>
        <h1>창고/백룸/매장 위치</h1>
        <p>직원이 휴대폰으로 공간을 선택한 뒤 사진 위 좌표에 임시 재고를 기록하는 흐름입니다.</p>
      </div>

      <div className="grid cols-3">
        {spaces.map((space) => (
          <Link className="card" href={`/spaces/${space.id}`} key={space.id}>
            <span className="badge">{space.type}</span>
            <h2 style={{ marginTop: 14 }}>{space.name}</h2>
            <p>{space.description}</p>
            <div className="grid cols-2">
              <div className="stat"><strong>{space.pointCount}</strong><span>위치 포인트</span></div>
              <div className="stat"><strong>{space.unconfirmedCount}</strong><span>미확인 재고</span></div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
