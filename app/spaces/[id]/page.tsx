import Link from "next/link";
import { notFound } from "next/navigation";
import { inventoryItems, locationPoints, spaces, statusLabel, badgeClass } from "@/lib/sample-data";

export default async function SpaceDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const space = spaces.find((item) => item.id === id);
  if (!space) notFound();

  const points = locationPoints.filter((point) => point.spaceId === space.id);
  const items = inventoryItems.filter((item) => item.spaceId === space.id);

  return (
    <section className="grid">
      <div>
        <Link href="/spaces" className="badge">← 공간 목록</Link>
        <h1 style={{ marginTop: 16 }}>{space.name}</h1>
        <p>{space.description}</p>
      </div>

      <div className="grid cols-2">
        <div className="panel">
          <h2>공간 사진 좌표 예시</h2>
          <div className="space-map" aria-label={`${space.name} 사진 위 위치 포인트`}>
            {points.map((point, index) => (
              <div key={point.id}>
                <div className="point" style={{ left: `${point.xPercent}%`, top: `${point.yPercent}%` }}>{index + 1}</div>
                <div className="point-label" style={{ left: `${point.xPercent}%`, top: `${point.yPercent}%` }}>{point.label}</div>
              </div>
            ))}
          </div>
          <p>실제 구현에서는 공간 사진을 업로드하고, 클릭 위치를 x_percent/y_percent로 저장합니다.</p>
        </div>

        <div className="panel">
          <h2>새 위치/재고 등록 폼</h2>
          <form className="form-grid">
            <div className="field"><label>위치 라벨</label><input placeholder="예: 오른쪽 검정 박스" /></div>
            <div className="field"><label>카테고리</label><input placeholder="예: 니트, 자켓" /></div>
            <div className="field"><label>임시 재고명</label><input placeholder="예: 니트류 묶음" /></div>
            <div className="field"><label>수량</label><input type="number" placeholder="1" /></div>
            <div className="field"><label>상태</label><select defaultValue="unconfirmed"><option value="unconfirmed">미확인</option><option value="needs_photo">촬영필요</option><option value="displayed">매장진열</option></select></div>
            <div className="field"><label>담당자</label><input placeholder="예: 민지" /></div>
            <div className="field full"><label>메모</label><textarea placeholder="확인할 내용, 다음 작업" rows={4} /></div>
          </form>
        </div>
      </div>

      <div className="panel">
        <h2>이 공간의 재고</h2>
        <table className="table">
          <thead><tr><th>코드</th><th>상품/묶음</th><th>카테고리</th><th>수량</th><th>상태</th><th>담당자</th></tr></thead>
          <tbody>
            {items.map((item) => (
              <tr key={item.id}>
                <td>{item.itemCode}</td>
                <td>{item.name}</td>
                <td>{item.category}</td>
                <td>{item.quantity}</td>
                <td><span className={badgeClass(item.status)}>{statusLabel(item.status)}</span></td>
                <td>{item.assignedTo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
