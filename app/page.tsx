import Link from "next/link";
import { inventoryItems, spaces } from "@/lib/sample-data";

export default function HomePage() {
  const unconfirmed = inventoryItems.filter((item) => item.status === "unconfirmed");
  const totalQuantity = inventoryItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      <section className="hero">
        <div className="card">
          <div className="kicker">samuelsmalls inventory MVP</div>
          <h1>사진 위에 위치를 찍고 재고를 빠르게 기록합니다.</h1>
          <p>
            첫 버전은 완성형 재고 시스템이 아니라, 창고와 백룸에서 “어디에 뭐가 있는지”를 빠르게 조사하는 웹앱입니다.
          </p>
          <div className="actions">
            <Link className="button" href="/spaces">공간 조사 시작</Link>
            <Link className="button secondary" href="/inventory/unconfirmed">미확인 재고 보기</Link>
          </div>
        </div>
        <div className="grid">
          <div className="stat"><strong>{spaces.length}</strong><span>등록 공간</span></div>
          <div className="stat"><strong>{totalQuantity}</strong><span>임시 재고 수량</span></div>
          <div className="stat"><strong>{unconfirmed.length}</strong><span>미확인 항목</span></div>
        </div>
      </section>

      <section className="section panel">
        <h2>1차 MVP 범위</h2>
        <div className="grid cols-2">
          <p>1. 매장/창고 공간 사진 등록</p>
          <p>2. 사진 위 클릭 좌표 저장</p>
          <p>3. 임시 재고 등록</p>
          <p>4. 위치별/미확인 재고 목록 보기</p>
        </div>
      </section>
    </>
  );
}
