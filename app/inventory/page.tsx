import { badgeClass, inventoryItems, spaces, statusLabel } from "@/lib/sample-data";

export default function InventoryPage() {
  return (
    <section className="grid">
      <div>
        <div className="kicker">재고 목록</div>
        <h1>전체 임시 재고</h1>
        <p>첫 버전에서는 완벽한 상품 정보보다 위치, 상태, 담당자, 메모를 빠르게 남기는 것이 목표입니다.</p>
      </div>
      <div className="panel">
        <table className="table">
          <thead><tr><th>코드</th><th>상품/묶음</th><th>공간</th><th>카테고리</th><th>수량</th><th>상태</th><th>메모</th></tr></thead>
          <tbody>
            {inventoryItems.map((item) => {
              const space = spaces.find((s) => s.id === item.spaceId);
              return (
                <tr key={item.id}>
                  <td>{item.itemCode}</td>
                  <td>{item.name}</td>
                  <td>{space?.name}</td>
                  <td>{item.category}</td>
                  <td>{item.quantity}</td>
                  <td><span className={badgeClass(item.status)}>{statusLabel(item.status)}</span></td>
                  <td>{item.memo}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </section>
  );
}
