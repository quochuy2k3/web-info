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
  E -->|"Chưa thu tiền\n ghi nợ"| F["Ghi nợ khách hàng\nPhải thu khách hàng"]
  E -->|"Thu tiền ngay"| G{"Hình thức\nthu tiền?"}
  G -->|"Tiền mặt"| H["Thu tiền mặt"]
  G -->|"Chuyển khoản"| I["Thu chuyển khoản"]
  F --> J{"Kiêm phiếu\nxuất kho?"}
  H --> J
  I --> J
  J -->|"Có"| K["Tự động sinh\nPhiếu xuất kho\nGiảm tồn kho"]
  J -->|"Không"| L["Lập phiếu xuất sau"]
  K --> M{"Lập kèm\nhóa đơn?"}
  L --> M
  M -->|"Có"| N["Tự động sinh\nHóa đơn GTGT"]
  M -->|"Không"| O["Lập hóa đơn sau"]
  N --> P["Cập nhật trạng thái\n+ Công nợ cuối kỳ"]
  O --> P`,
    },
    {
      title: 'Bút toán Hạch toán — Bán hàng trong nước',
      chart: `flowchart LR
  subgraph rev ["Ghi nhận Doanh thu"]
    A["Ghi Nợ:\nPhải thu khách hàng"] --> B["Ghi Có:\nDoanh thu bán hàng"]
    A --> C["Ghi Có:\nThuế GTGT phải nộp"]
  end
  subgraph cogs ["Ghi nhận Giá vốn"]
    D["Ghi Nợ:\nGiá vốn hàng bán"] --> E["Ghi Có:\nHàng hóa tồn kho"]
  end
  subgraph cash ["Thu tiền ngay - nếu có"]
    F["Ghi Nợ:\nTiền mặt hoặc\nTiền gửi ngân hàng"] --> G["Ghi Có:\nGiảm công nợ\nkhách hàng"]
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
  API->>DB: Lưu chứng từ
  API->>DB: Cập nhật công nợ khách hàng
  API->>DB: Giảm tồn kho hàng hóa
  API-->>UI: Thành công

  NV->>UI: Nhấn "In phiếu"
  UI->>API: Tạo file PDF
  API-->>UI: Phiếu xuất kho bán hàng`,
    },
    {
      title: 'Trạng thái Chứng từ Bán hàng',
      chart: `stateDiagram-v2
  state "Trạng thái Hóa đơn" as hd {
    [*] --> ChuaLapHD
    ChuaLapHD --> DaLapHD : Phát hành hóa đơn
    ChuaLapHD : Chưa lập hóa đơn
    DaLapHD : Đã lập hóa đơn
  }
  state "Trạng thái Thanh toán" as tt {
    [*] --> ChuaTT
    ChuaTT --> DaTT1Phan : Thu một phần
    DaTT1Phan --> DaTTDu : Thu đủ
    ChuaTT --> DaTTDu : Thu đủ ngay
    ChuaTT : Chưa thanh toán
    DaTT1Phan : Đã thanh toán một phần
    DaTTDu : Đã thanh toán đủ
  }
  state "Trạng thái Xuất hàng" as xh {
    [*] --> ChuaXuat
    ChuaXuat --> DaXuatDu : Xuất kho
    ChuaXuat : Chưa xuất hàng
    DaXuatDu : Đã xuất đủ hàng
  }`,
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
  D --> F{"Kiêm phiếu\nnhập kho?"}
  E --> F
  F -->|"Có"| G["Tự động sinh\nPhiếu nhập kho\nTăng tồn kho"]
  F -->|"Không"| H["Nhập kho\nthủ công sau"]
  G --> I["Hoàn tất\nCập nhật trạng thái"]
  H --> I`,
    },
    {
      title: 'Bút toán Hạch toán — Trả lại hàng bán',
      chart: `flowchart LR
  subgraph dt ["Giảm Doanh thu"]
    A["Ghi Nợ:\nHàng bán bị trả lại"] --> B["Ghi Có:\nGiảm phải thu\nkhách hàng"]
  end
  subgraph vat ["Hoàn Thuế GTGT"]
    C["Ghi Nợ:\nGiảm thuế\nGTGT phải nộp"] --> D["Ghi Có:\nGiảm phải thu\nkhách hàng"]
  end
  subgraph inv ["Hoàn Giá vốn"]
    E["Ghi Nợ:\nTăng hàng\ntồn kho"] --> F["Ghi Có:\nGiảm giá vốn\nhàng bán"]
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
