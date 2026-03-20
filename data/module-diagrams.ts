// Mermaid diagram definitions for each module

export const moduleDiagrams: Record<string, { title: string; chart: string }[]> = {
  m03: [
    {
      title: 'Quy trinh chuyen doi Bao gia',
      chart: `flowchart LR
  A["Lap Bao gia\n BG00001"] --> B{"KH duyet?"}
  B -->|Dong y| C["Chuyen doi\nthanh CT Ban hang"]
  C --> E["Ke thua KH\n+ dong hang"]
  E --> F["CT Ban hang\n BH00001"]
  B -->|Tu choi| D["Het han / Huy"]`,
    },
    {
      title: 'Trang thai Bao gia',
      chart: `stateDiagram-v2
  [*] --> Nhap
  Nhap --> DaGui : Gui KH
  DaGui --> DaChuyenDoi : KH duyet
  DaGui --> HetHan : Qua han hieu luc
  DaChuyenDoi --> [*]
  HetHan --> [*]

  Nhap : Nhap (Draft)
  DaGui : Da gui KH
  DaChuyenDoi : Da chuyen doi
  HetHan : Het han`,
    },
  ],

  m04: [
    {
      title: 'Quy trinh Ban hang (End-to-End)',
      chart: `flowchart TD
  A["Lap CT Ban hang"] --> B["Chon Khach hang"]
  B --> C["Auto load Cong no dau ky"]
  C --> D["Them dong hang\nsearch HH, auto fill gia"]
  D --> E{"Phuong thuc\nthanh toan?"}
  E -->|"Chua thu tien"| F["Ghi no TK 131"]
  E -->|"Thu tien ngay"| G{"Hinh thuc?"}
  G -->|"Tien mat"| H["No TK 111 / Co TK 511"]
  G -->|"Chuyen khoan"| I["No TK 112 / Co TK 511"]
  F --> J{"Kiem phieu\nxuat kho?"}
  H --> J
  I --> J
  J -->|Co| K["Auto sinh Phieu xuat kho\nNo 632 / Co 156\nGiam ton kho"]
  J -->|Khong| L["Lap phieu xuat sau"]
  K --> M{"Lap kem\nhoa don?"}
  L --> M
  M -->|Co| N["Auto sinh HD GTGT"]
  M -->|Khong| O["Lap HD sau"]
  N --> P["Cap nhat 3 trang thai\n+ Cong no cuoi ky"]
  O --> P`,
    },
    {
      title: 'But toan Hach toan - Ban hang trong nuoc',
      chart: `flowchart LR
  subgraph rev ["Ghi nhan Doanh thu"]
    A["No TK 131\nPhai thu KH"] --> B["Co TK 511\nDoanh thu"]
    A --> C["Co TK 3331\nThue GTGT"]
  end
  subgraph cogs ["Ghi nhan Gia von"]
    D["No TK 632\nGia von hang ban"] --> E["Co TK 156\nHang hoa"]
  end
  subgraph cash ["Thu tien ngay - neu co"]
    F["No TK 111/112\nTM hoac CK"] --> G["Co TK 131\nGiam cong no"]
  end`,
    },
    {
      title: 'Sequence: Lap phieu Ban hang',
      chart: `sequenceDiagram
  actor NV as NV Ban hang
  participant UI as Giao dien
  participant API as Backend API
  participant DB as MongoDB

  NV->>UI: Click Them CT Ban hang
  UI->>API: GET /customers/id
  API->>DB: Query customer + cong no
  DB-->>API: Customer data + no dau ky
  API-->>UI: Auto fill KH + cong no dau

  NV->>UI: Search va chon Hang hoa
  UI->>API: GET /products/search
  API-->>UI: Auto fill gia, DVT

  NV->>UI: Nhap SL, chon PT thanh toan
  UI->>UI: Auto tinh Thanh tien, Thue, Tong TT

  NV->>UI: Click Luu
  UI->>API: POST /sale-vouchers
  API->>DB: Insert sale_voucher
  API->>DB: Update customer.cong_no +
  API->>DB: Update product.so_luong_ton -
  API-->>UI: Thanh cong + So CT

  NV->>UI: Click In phieu
  UI->>API: GET /print/xkbh/id
  API-->>UI: PDF phieu XKBH`,
    },
    {
      title: 'Trang thai Chung tu Ban hang',
      chart: `stateDiagram-v2
  state "TT Hoa don" as hd {
    [*] --> ChuaLapHD
    ChuaLapHD --> DaLapHD : Phat hanh HD
    ChuaLapHD : Chua lap hoa don
    DaLapHD : Da lap hoa don
  }
  state "TT Thanh toan" as tt {
    [*] --> ChuaTT
    ChuaTT --> DaTT1Phan : Thu 1 phan
    DaTT1Phan --> DaTTDu : Thu du
    ChuaTT --> DaTTDu : Thu du ngay
    ChuaTT : Chua thanh toan
    DaTT1Phan : Da TT 1 phan
    DaTTDu : Da thanh toan
  }
  state "TT Xuat hang" as xh {
    [*] --> ChuaXuat
    ChuaXuat --> DaXuatDu : Xuat kho
    ChuaXuat : Chua xuat
    DaXuatDu : Da xuat du
  }`,
    },
  ],

  m05: [
    {
      title: 'Quy trinh Tra lai hang ban',
      chart: `flowchart TD
  A["KH yeu cau\ntra lai hang"] --> B["Tim CT ban hang goc\nBH00xxx"]
  B --> C{"Phuong thuc\nxu ly?"}
  C -->|"Giam tru cong no"| D["Giam no KH\nNo 521 / Co 131"]
  C -->|"Tra lai tien mat"| E["Hoan tien\nNo 521 / Co 111"]
  D --> F{"Kiem phieu\nnhap kho?"}
  E --> F
  F -->|Co| G["Auto sinh\nPhieu nhap kho\nNo 156 / Co 632\nTang ton kho"]
  F -->|Khong| H["Nhap kho thu cong"]
  G --> I["Hoan tat\n+ Cap nhat trang thai"]
  H --> I`,
    },
    {
      title: 'But toan Hach toan - Tra lai hang TT200',
      chart: `flowchart LR
  subgraph dt ["Giam Doanh thu"]
    A["No TK 5212\nHang ban bi tra lai"] --> B["Co TK 131\nGiam phai thu"]
  end
  subgraph vat ["Hoan Thue GTGT"]
    C["No TK 3331\nGiam thue phai nop"] --> D["Co TK 131\nGiam phai thu"]
  end
  subgraph inv ["Hoan Gia von"]
    E["No TK 156\nTang hang ton kho"] --> F["Co TK 632\nGiam gia von"]
  end`,
    },
  ],

  m06: [
    {
      title: '4 Nguon tac dong Cong no',
      chart: `flowchart TD
  CN["Cong no\ndau ky"] --> CALC["Cong no cuoi ky\n= Dau ky + BH - TT - TL +/- BT"]
  BH["+  Ban hang ghi no\nM04"] -->|TANG| CALC
  TT["-  Thanh toan TM/CK\nThu tien"] -->|GIAM| CALC
  TL["-  Tra lai hang\nM05"] -->|GIAM| CALC
  BT["+/-  Bu tru cong no\nM07"] -->|DIEU CHINH| CALC

  CALC --> VD["VD: Son 92\n82.158.000 + 18.888.900\n- 0 - 0 = 101.046.900d"]`,
    },
    {
      title: 'Phan tich Tuoi no - Aging',
      chart: `flowchart LR
  subgraph before ["Truoc han"]
    A1["0-30 ngay"]
    A2["31-60 ngay"]
    A3["61-90 ngay"]
    A4["91-120 ngay"]
    A5["Tren 120 ngay"]
  end
  subgraph after ["Qua han"]
    B1["1-30 ngay"]
    B2["31-60 ngay"]
    B3["61-90 ngay"]
    B4["91-120 ngay"]
    B5["Tren 120 ngay"]
  end
  subgraph status ["Tinh trang"]
    C1["No binh thuong"]
    C2["No kho doi"]
    C3["No khong the doi"]
  end`,
    },
    {
      title: 'Quy trinh Doi chieu Cong no',
      chart: `sequenceDiagram
  actor KT as Ke toan
  participant SYS as He thong
  participant KH as Khach hang

  KT->>SYS: Xem Bao cao cong no KH
  SYS-->>KT: Bien ban doi chieu
  Note over KT,SYS: So du dau ky, PS tang/giam, So du cuoi ky
  KT->>KT: In bien ban doi chieu
  KT->>KH: Gui bien ban xac nhan
  KH-->>KT: Ky xac nhan hoac phan hoi chenh lech
  alt Co chenh lech
    KT->>SYS: Chinh sua chung tu
    SYS-->>KT: Cap nhat so lieu
  end
  KT->>KT: Luu bien ban co chu ky`,
    },
  ],

  m07: [
    {
      title: 'Quy trinh Bu tru Cong no',
      chart: `flowchart TD
  A["Chon Doi tuong\nvua KH vua NCC"] --> B["Chon TK phai thu 131\n+ TK phai tra 331"]
  B --> C["Chon Ngay bu tru"]
  C --> D["Click Lay du lieu"]
  D --> E["He thong load\n2 bang chung tu"]
  E --> F["Bang 1: CT Phai thu\nHD ban hang chua thu"]
  E --> G["Bang 2: CT Phai tra\nHD mua hang chua tra"]
  F --> H["Tick chon CT\ncan bu tru"]
  G --> H
  H --> I["Auto tinh\nSo tien bu tru"]
  I --> J["Click Bu tru"]
  J --> K["Sinh chung tu bu tru\nNo TK 331 / Co TK 131"]`,
    },
  ],

  m08: [
    {
      title: 'Quy trinh Thiet lap Chinh sach gia',
      chart: `flowchart TD
  A["Tao Chinh sach gia moi"] --> B["Khai bao thong tin\nTen, Tu ngay, Den ngay"]
  B --> C["Chon Nhom KH\nap dung"]
  C --> D["Chon San pham\ntung SP hoac tat ca"]
  D --> E{"Phuong phap\ntinh gia?"}
  E -->|"Phan tram tang/giam"| F["Gia moi = Gia goc\nx 100+pct / 100"]
  E -->|"So tien +/-"| G["Gia moi = Gia goc\n+ So tien"]
  F --> H["Thiet lap Chiet khau\npct hoac so tien"]
  G --> H
  H --> I["Luu chinh sach"]
  I --> J["Auto apply khi\nlap CT Ban hang"]`,
    },
    {
      title: 'Cach ap dung Chinh sach gia',
      chart: `sequenceDiagram
  actor NV as NV Ban hang
  participant UI as CT Ban hang
  participant SYS as He thong
  participant DB as Database

  NV->>UI: Chon Khach hang
  UI->>SYS: Lay Nhom KH
  NV->>UI: Chon Hang hoa
  SYS->>DB: Query chinh sach gia
  Note over SYS,DB: Nhom KH + Ma HH + Ngay hien tai
  DB-->>SYS: Chinh sach dang ap dung
  SYS-->>UI: Auto fill Don gia + Chiet khau
  NV->>UI: Nhap So luong
  UI->>UI: Auto tinh Thanh tien`,
    },
  ],

}
