// Mermaid diagram definitions for each module
// Labels use full Vietnamese with diacritics for clarity

export const moduleDiagrams: Record<string, { title: string; chart: string }[]> = {
  m03: [
    {
      title: 'Quy trình chuyển đổi Báo giá',
      chart: `flowchart LR
  A["Lập Báo giá\nBG00001"] --> B{"Khách hàng\nduyệt?"}
  B -->|"Đồng ý"| C["Chuyển đổi thành\nChứng từ Bán hàng"]
  C --> E["Kế thừa thông tin\nkhách hàng + dòng hàng"]
  E --> F["Chứng từ Bán hàng\nBH00001"]
  B -->|"Từ chối"| D["Hết hạn / Hủy"]`,
    },
    {
      title: 'Trạng thái Báo giá',
      chart: `stateDiagram-v2
  [*] --> Nhap
  Nhap --> DaGui : Gửi khách hàng
  DaGui --> DaChuyenDoi : Khách hàng duyệt
  DaGui --> HetHan : Quá hạn hiệu lực
  DaChuyenDoi --> [*]
  HetHan --> [*]

  Nhap : Nháp
  DaGui : Đã gửi khách hàng
  DaChuyenDoi : Đã chuyển đổi
  HetHan : Hết hạn`,
    },
  ],

  m04: [
    {
      title: 'Quy trình Bán hàng (từ đầu đến cuối)',
      chart: `flowchart TD
  A["Lập Chứng từ Bán hàng"] --> B["Chọn Khách hàng"]
  B --> C["Tự động tải\ncông nợ đầu kỳ"]
  C --> D["Thêm dòng hàng\ntìm hàng hóa, tự động điền giá"]
  D --> E{"Phương thức\nthanh toán?"}
  E -->|"Chưa thu tiền\n ghi nợ"| F["Ghi nợ khách hàng\nTăng công nợ"]
  E -->|"Thu tiền ngay"| G{"Hình thức\nthu tiền?"}
  G -->|"Tiền mặt"| H["Thu tiền mặt\nSinh phiếu thu"]
  G -->|"Chuyển khoản"| I["Thu chuyển khoản\nSinh phiếu thu"]
  F --> J["Lưu chứng từ"]
  H --> J
  I --> J
  J --> K["Tự động trừ tồn kho\ntừng mặt hàng"]
  K --> L["Cập nhật công nợ cuối kỳ\n+ Trạng thái thanh toán"]`,
    },
    {
      title: 'Bút toán Hạch toán — Bán hàng trong nước',
      chart: `flowchart LR
  subgraph rev ["Ghi nhận Doanh thu"]
    A["Nợ TK 131:\nPhải thu khách hàng"] --> B["Có TK 511:\nDoanh thu bán hàng"]
    A --> C["Có TK 3331:\nThuế GTGT phải nộp"]
  end
  subgraph cash ["Thu tiền ngay - nếu có"]
    F["Nợ TK 111/112:\nTiền mặt hoặc\nTiền gửi ngân hàng"] --> G["Có TK 131:\nGiảm công nợ\nkhách hàng"]
  end`,
    },
    {
      title: 'Trình tự: Nhân viên lập phiếu Bán hàng',
      chart: `sequenceDiagram
  actor NV as Nhân viên Bán hàng
  participant UI as Giao diện
  participant API as Máy chủ
  participant DB as Cơ sở dữ liệu

  NV->>UI: Nhấn "Thêm Chứng từ Bán hàng"
  UI->>API: Lấy thông tin khách hàng
  API->>DB: Truy vấn khách hàng + công nợ
  DB-->>API: Dữ liệu khách + nợ đầu kỳ
  API-->>UI: Tự động điền khách hàng + công nợ

  NV->>UI: Tìm và chọn Hàng hóa
  UI->>API: Tìm kiếm sản phẩm
  API-->>UI: Tự động điền giá, đơn vị tính

  NV->>UI: Nhập số lượng, chọn thanh toán
  UI->>UI: Tự động tính thành tiền, thuế, tổng

  NV->>UI: Nhấn "Lưu"
  UI->>API: Tạo chứng từ bán hàng
  API->>DB: Lưu chứng từ + cập nhật công nợ
  API->>DB: Trừ tồn kho từng mặt hàng
  API-->>UI: Thành công

  NV->>UI: Nhấn "In phiếu"
  UI->>API: Tạo file PDF
  API-->>UI: Phiếu bán hàng`,
    },
    {
      title: 'Trạng thái Chứng từ Bán hàng',
      chart: `stateDiagram-v2
  [*] --> ChuaTT
  ChuaTT --> DaTT1Phan : Thu một phần
  DaTT1Phan --> DaTTDu : Thu đủ
  ChuaTT --> DaTTDu : Thu đủ ngay
  DaTTDu --> [*]

  ChuaTT : Chưa thanh toán
  DaTT1Phan : Đã thanh toán một phần
  DaTTDu : Đã thanh toán đủ`,
    },
  ],

  m05: [
    {
      title: 'Quy trình Trả lại hàng bán',
      chart: `flowchart TD
  A["Khách hàng yêu cầu\ntrả lại hàng"] --> B["Tìm Chứng từ bán hàng gốc"]
  B --> C{"Phương thức\nxử lý?"}
  C -->|"Giảm trừ công nợ"| D["Giảm nợ khách hàng"]
  C -->|"Hoàn lại tiền mặt"| E["Hoàn tiền cho\nkhách hàng"]
  D --> F["Lưu chứng từ trả hàng"]
  E --> F
  F --> G["Tự động tăng lại\ntồn kho từng mặt hàng"]
  G --> H["Hoàn tất\nCập nhật trạng thái"]`,
    },
    {
      title: 'Bút toán Hạch toán — Trả lại hàng bán',
      chart: `flowchart LR
  subgraph dt ["Giảm Doanh thu"]
    A["Nợ TK 5212:\nHàng bán bị trả lại"] --> B["Có TK 131:\nGiảm phải thu\nkhách hàng"]
  end
  subgraph vat ["Hoàn Thuế GTGT"]
    C["Nợ TK 3331:\nGiảm thuế\nGTGT phải nộp"] --> D["Có TK 131:\nGiảm phải thu\nkhách hàng"]
  end`,
    },
  ],

  m06: [
    {
      title: '4 Nguồn tác động lên Công nợ khách hàng',
      chart: `flowchart TD
  CN["Công nợ\nđầu kỳ"] --> CALC["Công nợ cuối kỳ"]
  BH["Bán hàng ghi nợ\nModule M04"] -->|"TĂNG công nợ"| CALC
  TT["Khách hàng thanh toán\ntiền mặt hoặc chuyển khoản"] -->|"GIẢM công nợ"| CALC
  TL["Khách hàng trả lại hàng\nModule M05"] -->|"GIẢM công nợ"| CALC
  BT["Bù trừ công nợ\nModule M07"] -->|"ĐIỀU CHỈNH"| CALC

  CALC --> VD["Ví dụ: Khách hàng Sơn 92\n82.158.000 + 18.888.900\n= 101.046.900đ"]`,
    },
    {
      title: 'Phân tích Tuổi nợ (Aging)',
      chart: `flowchart LR
  subgraph before ["Nợ trước hạn"]
    A1["0 - 30 ngày"]
    A2["31 - 60 ngày"]
    A3["61 - 90 ngày"]
    A4["91 - 120 ngày"]
    A5["Trên 120 ngày"]
  end
  subgraph after ["Nợ quá hạn"]
    B1["1 - 30 ngày"]
    B2["31 - 60 ngày"]
    B3["61 - 90 ngày"]
    B4["91 - 120 ngày"]
    B5["Trên 120 ngày"]
  end
  subgraph status ["Tình trạng nợ"]
    C1["Nợ bình thường"]
    C2["Nợ khó đòi"]
    C3["Nợ không thể đòi"]
  end`,
    },
    {
      title: 'Quy trình Đối chiếu Công nợ với khách hàng',
      chart: `sequenceDiagram
  actor KT as Kế toán
  participant SYS as Hệ thống
  participant KH as Khách hàng

  KT->>SYS: Xem Báo cáo công nợ khách hàng
  SYS-->>KT: Hiển thị Biên bản đối chiếu
  Note over KT,SYS: Số dư đầu kỳ, phát sinh tăng/giảm, số dư cuối kỳ
  KT->>KT: In biên bản đối chiếu
  KT->>KH: Gửi biên bản để xác nhận
  KH-->>KT: Ký xác nhận hoặc phản hồi chênh lệch
  alt Có chênh lệch số liệu
    KT->>SYS: Chỉnh sửa chứng từ cho đúng
    SYS-->>KT: Cập nhật số liệu
  end
  KT->>KT: Lưu biên bản có chữ ký xác nhận`,
    },
  ],

  m07: [
    {
      title: 'Quy trình Bù trừ Công nợ',
      chart: `flowchart TD
  A["Chọn Đối tượng\nvừa là khách hàng\nvừa là nhà cung cấp"] --> B["Chọn tài khoản\nPhải thu + Phải trả"]
  B --> C["Chọn Ngày bù trừ"]
  C --> D["Nhấn Lấy dữ liệu"]
  D --> E["Hệ thống hiển thị\n2 bảng chứng từ"]
  E --> F["Bảng 1: Chứng từ Phải thu\nhóa đơn bán hàng chưa thu"]
  E --> G["Bảng 2: Chứng từ Phải trả\nhóa đơn mua hàng chưa trả"]
  F --> H["Chọn các chứng từ\ncần bù trừ"]
  G --> H
  H --> I["Hệ thống tự động tính\nSố tiền bù trừ"]
  I --> J["Nhấn Bù trừ"]
  J --> K["Sinh chứng từ bù trừ\nGiảm phải trả, Giảm phải thu"]`,
    },
  ],

  m08: [
    {
      title: 'Quy trình Thiết lập Chính sách giá',
      chart: `flowchart TD
  A["Tạo Chính sách giá mới"] --> B["Khai báo thông tin\nTên, Ngày bắt đầu, Ngày kết thúc"]
  B --> C["Chọn Nhóm khách hàng\nđược áp dụng"]
  C --> D["Chọn Sản phẩm\ntừng sản phẩm hoặc tất cả"]
  D --> E{"Phương pháp\ntính giá?"}
  E -->|"Phần trăm tăng/giảm"| F["Giá mới = Giá gốc\nnhân phần trăm"]
  E -->|"Cộng/trừ số tiền"| G["Giá mới = Giá gốc\ncộng/trừ số tiền cố định"]
  F --> H["Thiết lập Chiết khấu\ntheo phần trăm hoặc số tiền"]
  G --> H
  H --> I["Lưu chính sách giá"]
  I --> J["Tự động áp dụng khi\nlập Chứng từ Bán hàng"]`,
    },
    {
      title: 'Cách hệ thống áp dụng Chính sách giá',
      chart: `sequenceDiagram
  actor NV as Nhân viên Bán hàng
  participant UI as Chứng từ Bán hàng
  participant SYS as Hệ thống
  participant DB as Cơ sở dữ liệu

  NV->>UI: Chọn Khách hàng
  UI->>SYS: Xác định Nhóm khách hàng
  NV->>UI: Chọn Hàng hóa
  SYS->>DB: Tìm chính sách giá phù hợp
  Note over SYS,DB: Theo nhóm khách hàng + mã hàng + ngày hiện tại
  DB-->>SYS: Chính sách đang có hiệu lực
  SYS-->>UI: Tự động điền Đơn giá + Chiết khấu
  NV->>UI: Nhập Số lượng
  UI->>UI: Tự động tính Thành tiền`,
    },
  ],
}
