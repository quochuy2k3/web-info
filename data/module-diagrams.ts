// Mermaid diagram definitions for each module

export const moduleDiagrams: Record<string, { title: string; chart: string }[]> = {
  m03: [
    {
      title: 'Quy trình chuyển đổi Báo giá',
      chart: `flowchart LR
  A["Lập Báo giá\\n(BG00001)"] --> B{"KH duyệt?"}
  B -->|Đồng ý| C["Chuyển đổi\\n→ CT Bán hàng"]
  B -->|Từ chối| D["Hết hạn / Hủy"]
  C --> E["Kế thừa KH\\n+ dòng hàng"]
  E --> F["CT Bán hàng\\n(BH00001)"]`,
    },
    {
      title: 'Trạng thái Báo giá',
      chart: `stateDiagram-v2
  [*] --> Nháp
  Nháp --> ĐãGửi : Gửi KH
  ĐãGửi --> ĐãChuyểnĐổi : KH duyệt
  ĐãGửi --> HếtHạn : Quá hạn hiệu lực
  ĐãChuyểnĐổi --> [*]
  HếtHạn --> [*]`,
    },
  ],

  m04: [
    {
      title: 'Quy trình Bán hàng (End-to-End)',
      chart: `flowchart TD
  A["Lập CT Bán hàng"] --> B["Chọn Khách hàng"]
  B --> C["Auto load Công nợ đầu kỳ"]
  C --> D["Thêm dòng hàng\\n(search HH → auto fill giá/ĐVT)"]
  D --> E{"Phương thức\\nthanh toán?"}
  E -->|"Chưa thu tiền"| F["Ghi nợ TK 131"]
  E -->|"Thu tiền ngay"| G{"Hình thức?"}
  G -->|"Tiền mặt"| H["Nợ TK 111 / Có TK 511"]
  G -->|"Chuyển khoản"| I["Nợ TK 112 / Có TK 511"]
  F --> J{"Kiêm phiếu\\nxuất kho?"}
  H --> J
  I --> J
  J -->|Có| K["Auto sinh Phiếu xuất kho\\n(Nợ 632 / Có 156)\\nGiảm tồn kho"]
  J -->|Không| L["Lập phiếu xuất sau"]
  K --> M{"Lập kèm\\nhóa đơn?"}
  L --> M
  M -->|Có| N["Auto sinh HĐ GTGT\\n(qua meInvoice)"]
  M -->|Không| O["Lập HĐ sau"]
  N --> P["Cập nhật 3 trạng thái\\n+ Công nợ cuối kỳ"]
  O --> P`,
    },
    {
      title: 'Bút toán Hạch toán (Bán hàng trong nước)',
      chart: `flowchart LR
  subgraph "Ghi nhận Doanh thu"
    A["Nợ TK 131\\n(Phải thu KH)"] --> B["Có TK 511\\n(Doanh thu)"]
    A --> C["Có TK 3331\\n(Thuế GTGT)"]
  end
  subgraph "Ghi nhận Giá vốn"
    D["Nợ TK 632\\n(Giá vốn hàng bán)"] --> E["Có TK 156\\n(Hàng hóa)"]
  end
  subgraph "Thu tiền ngay (nếu có)"
    F["Nợ TK 111/112\\n(TM / CK)"] --> G["Có TK 131\\n(Giảm công nợ)"]
  end`,
    },
    {
      title: 'Sequence: Lập phiếu Bán hàng',
      chart: `sequenceDiagram
  actor NV as NV Bán hàng
  participant UI as Giao diện
  participant API as Backend API
  participant DB as MongoDB

  NV->>UI: Click "Thêm CT Bán hàng"
  UI->>API: GET /customers/{id}
  API->>DB: Query customer + công nợ
  DB-->>API: Customer data + nợ đầu kỳ
  API-->>UI: Auto fill KH + công nợ đầu

  NV->>UI: Search & chọn Hàng hóa
  UI->>API: GET /products/search
  API-->>UI: Auto fill giá, ĐVT

  NV->>UI: Nhập SL, chọn PT thanh toán
  UI->>UI: Auto tính: Thành tiền, Thuế, Tổng TT

  NV->>UI: Click "Cất"
  UI->>API: POST /sale-vouchers
  API->>DB: Insert sale_voucher
  API->>DB: Update customer.cong_no (+)
  API->>DB: Update product.so_luong_ton (-)
  API-->>UI: Thành công + Số CT

  NV->>UI: Click "In phiếu"
  UI->>API: GET /print/xkbh/{id}
  API-->>UI: PDF phiếu XKBH`,
    },
    {
      title: 'Trạng thái Chứng từ Bán hàng',
      chart: `stateDiagram-v2
  state "TT Hóa đơn" as hd {
    [*] --> ChưaLậpHĐ
    ChưaLậpHĐ --> ĐãLậpHĐ : Phát hành HĐ
  }
  state "TT Thanh toán" as tt {
    [*] --> ChưaTT
    ChưaTT --> ĐãTT1Phần : Thu 1 phần
    ĐãTT1Phần --> ĐãTT : Thu đủ
    ChưaTT --> ĐãTT : Thu đủ ngay
  }
  state "TT Xuất hàng" as xh {
    [*] --> ChưaXuất
    ChưaXuất --> ĐãXuấtĐủ : Xuất kho
  }`,
    },
  ],

  m05: [
    {
      title: 'Quy trình Trả lại hàng bán',
      chart: `flowchart TD
  A["KH yêu cầu\\ntrả lại hàng"] --> B["Tìm CT bán hàng gốc\\n(BH00xxx)"]
  B --> C{"Phương thức\\nxử lý?"}
  C -->|"Giảm trừ công nợ"| D["Giảm nợ KH\\n(Nợ 521/Có 131)"]
  C -->|"Trả lại tiền mặt"| E["Hoàn tiền\\n(Nợ 521/Có 111)"]
  D --> F{"Kiêm phiếu\\nnhập kho?"}
  E --> F
  F -->|Có| G["Auto sinh\\nPhiếu nhập kho\\n(Nợ 156/Có 632)\\nTăng tồn kho"]
  F -->|Không| H["Nhập kho thủ công"]
  G --> I["Hoàn tất\\n+ Cập nhật trạng thái"]
  H --> I`,
    },
    {
      title: 'Bút toán Hạch toán (Trả lại hàng — TT200)',
      chart: `flowchart LR
  subgraph "Giảm Doanh thu"
    A["Nợ TK 5212\\n(Hàng bán bị trả lại)"] --> B["Có TK 131\\n(Giảm phải thu)"]
  end
  subgraph "Hoàn Thuế GTGT"
    C["Nợ TK 3331\\n(Giảm thuế phải nộp)"] --> D["Có TK 131\\n(Giảm phải thu)"]
  end
  subgraph "Hoàn Giá vốn"
    E["Nợ TK 156\\n(Tăng hàng tồn kho)"] --> F["Có TK 632\\n(Giảm giá vốn)"]
  end`,
    },
  ],

  m06: [
    {
      title: '4 Nguồn tác động Công nợ',
      chart: `flowchart TD
  CN["Công nợ\\nđầu kỳ"] --> CALC["Công nợ cuối kỳ\\n= Đầu kỳ + BH - TT - TL ± BT"]
  BH["+) Bán hàng ghi nợ\\n(M04)"] -->|TĂNG| CALC
  TT["-) Thanh toán TM/CK\\n(Thu tiền)"] -->|GIẢM| CALC
  TL["-) Trả lại hàng\\n(M05)"] -->|GIẢM| CALC
  BT["±) Bù trừ công nợ\\n(M07)"] -->|ĐIỀU CHỈNH| CALC

  CALC --> VD["VD: Sơn 92\\n82.158.000 + 18.888.900\\n- 0 - 0 = 101.046.900đ"]`,
    },
    {
      title: 'Phân tích Tuổi nợ (Aging)',
      chart: `flowchart LR
  subgraph "Trước hạn"
    A1["0-30 ngày"]
    A2["31-60 ngày"]
    A3["61-90 ngày"]
    A4["91-120 ngày"]
    A5["> 120 ngày"]
  end
  subgraph "Quá hạn"
    B1["1-30 ngày"]
    B2["31-60 ngày"]
    B3["61-90 ngày"]
    B4["91-120 ngày"]
    B5["> 120 ngày"]
  end
  subgraph "Tình trạng"
    C1["Nợ bình thường"]
    C2["Nợ khó đòi"]
    C3["Nợ không thể đòi"]
  end`,
    },
    {
      title: 'Quy trình Đối chiếu Công nợ',
      chart: `sequenceDiagram
  actor KT as Kế toán
  participant SYS as Hệ thống
  participant KH as Khách hàng

  KT->>SYS: Xem Báo cáo công nợ KH
  SYS-->>KT: Biên bản đối chiếu\\n(Số dư đầu kỳ, PS tăng/giảm, Số dư cuối kỳ)
  KT->>KT: In biên bản đối chiếu
  KT->>KH: Gửi biên bản xác nhận
  KH-->>KT: Ký xác nhận / Phản hồi chênh lệch
  alt Có chênh lệch
    KT->>SYS: Chỉnh sửa chứng từ
    SYS-->>KT: Cập nhật số liệu
  end
  KT->>KT: Lưu biên bản có chữ ký`,
    },
  ],

  m07: [
    {
      title: 'Quy trình Bù trừ Công nợ',
      chart: `flowchart TD
  A["Chọn Đối tượng\\n(vừa KH vừa NCC)"] --> B["Chọn TK phải thu (131)\\n+ TK phải trả (331)"]
  B --> C["Chọn Ngày bù trừ"]
  C --> D["Click 'Lấy dữ liệu'"]
  D --> E["Hệ thống load\\n2 bảng chứng từ"]
  E --> F["Bảng 1: CT Phải thu\\n(HĐ bán hàng chưa thu)"]
  E --> G["Bảng 2: CT Phải trả\\n(HĐ mua hàng chưa trả)"]
  F --> H["Tick chọn CT\\ncần bù trừ"]
  G --> H
  H --> I["Auto tính\\nSố tiền bù trừ"]
  I --> J["Click 'Bù trừ'"]
  J --> K["Sinh chứng từ bù trừ\\nNợ TK 331 / Có TK 131"]`,
    },
  ],

  m08: [
    {
      title: 'Quy trình Thiết lập Chính sách giá',
      chart: `flowchart TD
  A["Tạo Chính sách giá mới"] --> B["Khai báo thông tin\\n(Tên, Từ ngày → Đến ngày)"]
  B --> C["Chọn Nhóm KH\\náp dụng"]
  C --> D["Chọn Sản phẩm\\n(từng SP / tất cả)"]
  D --> E{"Phương pháp\\ntính giá?"}
  E -->|"% tăng/giảm"| F["Giá mới = Giá gốc\\n× (100 + %)/100"]
  E -->|"Số tiền +/-"| G["Giá mới = Giá gốc\\n+ Số tiền"]
  F --> H["Thiết lập Chiết khấu\\n(% hoặc số tiền)"]
  G --> H
  H --> I["Lưu chính sách"]
  I --> J["Auto apply khi\\nlập CT Bán hàng"]`,
    },
    {
      title: 'Cách áp dụng Chính sách giá',
      chart: `sequenceDiagram
  actor NV as NV Bán hàng
  participant UI as CT Bán hàng
  participant SYS as Hệ thống
  participant DB as Database

  NV->>UI: Chọn Khách hàng
  UI->>SYS: Lấy Nhóm KH
  NV->>UI: Chọn Hàng hóa
  SYS->>DB: Query chính sách giá\\n(Nhóm KH + Mã HH + Ngày hiện tại)
  DB-->>SYS: Chính sách đang áp dụng
  SYS-->>UI: Auto fill Đơn giá\\n+ Chiết khấu
  NV->>UI: Nhập Số lượng
  UI->>UI: Auto tính Thành tiền`,
    },
  ],

  // Overall system architecture flow
  system: [
    {
      title: 'Luồng nghiệp vụ tổng quan hệ thống',
      chart: `flowchart TD
  subgraph "Master Data"
    KH["M01\\nKhách hàng\\n(1.564)"]
    HH["M02\\nHàng hóa\\n(3.734)"]
    CS["M08\\nChính sách giá"]
  end

  subgraph "Nghiệp vụ chính"
    BG["M03\\nBáo giá"]
    BH["M04\\nBán hàng\\n⭐ CORE"]
    TL["M05\\nTrả lại hàng"]
  end

  subgraph "Công nợ & Thanh toán"
    CN["M06\\nCông nợ KH\\n⭐ CORE"]
    BT["M07\\nBù trừ\\nCông nợ"]
  end

  subgraph "Bổ trợ"
    IN["P01\\nIn phiếu"]
    AU["P02\\nAuth"]
  end

  KH --> BG
  KH --> BH
  HH --> BG
  HH --> BH
  CS -->|Auto fill giá| BH
  BG -->|Chuyển đổi| BH
  BH -->|+) Tăng nợ| CN
  BH -->|Giảm tồn kho| HH
  TL -->|-) Giảm nợ| CN
  TL -->|Tăng tồn kho| HH
  BT -->|±) Điều chỉnh| CN
  BH --> IN
  CN -->|Thu tiền| CN`,
    },
  ],
}
