export interface DataField {
  name: string
  type: string
  required: boolean
  description: string
  example?: string
}

export interface UseCase {
  id: string
  name: string
  description?: string
}

export interface Module {
  id: string
  name: string
  type: string
  priority: 'Rất cao' | 'Cao' | 'Trung bình' | 'Thấp'
  effortFE: number
  effortBE: number
  totalEffort: number
  price: number
  description: string
  icon: string
  isCore?: boolean
  useCases: UseCase[]
  dataFields?: DataField[]
  screenDescription?: string
  formDescription?: string
  sideEffects?: string[]
  logic?: string[]
  flow?: string
  statuses?: string[]
  comparisonTable?: { label: string; sell: string; return: string }[]
}

export const projectInfo = {
  title: 'Hệ thống Quản lý Bán hàng & Công Nợ',
  subtitle: 'Production-Grade Clone MISA AMIS',
  tagline: 'Xây dựng hệ thống web app quản lý bán hàng và công nợ riêng, tập trung phân hệ Bán hàng. Tối ưu cho tốc độ thao tác, tracking công nợ chính xác, in phiếu chuyên nghiệp.',
  provider: {
    name: 'Freelance Team',
    location: 'TP. Hồ Chí Minh, Việt Nam',
    contact: 'Võ Quốc Huy',
    date: '20/03/2026',
    validity: '30 ngày',
  },
  goals: [
    'Tốc độ thao tác nhanh — lập phiếu bán hàng trong < 30 giây',
    'Tracking công nợ chính xác — realtime, phân tích aging tự động',
    'In phiếu chuyên nghiệp — 2 mẫu: Custom + 02-VT theo TT99/2025',
    'Đơn giản hóa — bỏ kế toán sổ cái, BCTC, thuế phức tạp',
    'Sở hữu 100% source code — không phụ thuộc vendor',
  ],
  scope: {
    included: [
      '8 modules phân hệ Bán hàng',
      '2 mẫu phiếu in chuyên nghiệp',
      'Phân quyền user (3 roles)',
      'Import data từ Excel',
      'Deploy trên GCP',
      'Bảo hành 3 tháng',
      'Bàn giao 100% source code',
    ],
    excluded: [
      'Mobile app (iOS/Android)',
      'Phân hệ Kho',
      'Phân hệ Mua hàng',
      'Kế toán sổ cái / BCTC / Thuế',
      'Hóa đơn điện tử',
      'Chi phí GCP hàng tháng',
      'Domain / SSL',
    ],
  },
}

export const techStack = [
  {
    layer: 'Frontend',
    tech: 'Next.js (React)',
    icon: 'Monitor',
    description: 'SSR/SSG, responsive web app, Tailwind CSS',
    color: 'indigo',
  },
  {
    layer: 'Backend API',
    tech: 'Cloud Functions',
    icon: 'Server',
    description: 'Serverless Node.js, auto-scale, TypeScript',
    color: 'cyan',
  },
  {
    layer: 'Database',
    tech: 'MongoDB (NoSQL)',
    icon: 'Database',
    description: 'Atlas managed, flexible schema',
    color: 'emerald',
  },
  {
    layer: 'Hosting',
    tech: 'Google Cloud Platform',
    icon: 'Cloud',
    description: 'Cloud Run + Cloud Functions + Cloud Storage',
    color: 'amber',
  },
  {
    layer: 'Auth',
    tech: 'Firebase Auth / NextAuth',
    icon: 'Shield',
    description: 'Email/password, JWT, role-based access',
    color: 'violet',
  },
  {
    layer: 'PDF / Print',
    tech: 'Puppeteer + React-PDF',
    icon: 'Printer',
    description: 'Generate phiếu XKBH + 02-VT chuyên nghiệp',
    color: 'rose',
  },
]

export const modules: Module[] = [
  {
    id: 'm01',
    name: 'Danh mục Khách hàng',
    type: 'Master Data',
    priority: 'Cao',
    effortFE: 5,
    effortBE: 4,
    totalEffort: 9,
    price: 13500000,
    icon: 'Users',
    description:
      'Quản lý toàn bộ thông tin 1.564 khách hàng. Hỗ trợ tìm kiếm nhanh theo tên/biệt danh, SĐT, mã KH. Quick action: Lập CT bán hàng hoặc Thu tiền trực tiếp từ danh sách.',
    screenDescription:
      'Dashboard trên cùng: 3 metric cards (Nợ quá hạn | Tổng nợ phải thu | Đã thanh toán 30 ngày gần đây). Bảng danh sách: Mã KH, Tên KH, Địa chỉ, Công nợ, MST/CCCD, Điện thoại. Cột Chức năng: "Thu tiền" / "Lập CT bán hàng". Toolbar: Tìm kiếm, Lọc, Thêm.',
    formDescription:
      'Popup modal: Radio Tổ chức/Cá nhân, MST/CCCD, Mã KH (auto), Điện thoại, Tên KH (bắt buộc), Nhóm KH, Địa chỉ, NV bán hàng. Tabs: Thông tin liên hệ | Điều khoản thanh toán | TK ngân hàng | Địa chỉ khác | Ghi chú.',
    useCases: [
      { id: 'UC01', name: 'Xem danh sách KH + dashboard', description: 'Hiển thị nợ quá hạn, tổng nợ, đã thanh toán' },
      { id: 'UC02', name: 'Tìm kiếm fuzzy', description: 'Tìm theo tên/biệt danh/SĐT/mã' },
      { id: 'UC03', name: 'Thêm mới KH', description: 'Popup modal, auto generate mã' },
      { id: 'UC04', name: 'Sửa / Ẩn KH' },
      { id: 'UC05', name: 'Quick action: Lập CT bán hàng từ KH' },
      { id: 'UC06', name: 'Quick action: Thu tiền từ KH' },
      { id: 'UC07', name: 'Import 1.564 KH từ Excel' },
      { id: 'UC08', name: 'Export danh sách KH ra Excel' },
    ],
    dataFields: [
      { name: 'ma_kh', type: 'String(20)', required: true, description: 'Auto generate hoặc nhập tay', example: 'A001, KH00028' },
      { name: 'ten_kh', type: 'String(200)', required: true, description: 'Tên/biệt danh', example: 'Sơn 92, Long Minh 44' },
      { name: 'loai_kh', type: 'Enum', required: true, description: 'Tổ chức / Cá nhân', example: 'Cá nhân' },
      { name: 'nhom_kh', type: 'FK', required: false, description: 'Nhóm KH (cho chính sách giá)', example: 'Đại lý huyện' },
      { name: 'dien_thoai', type: 'String(20)', required: false, description: 'SĐT chính', example: '098.3779142' },
      { name: 'dt_di_dong', type: 'String(20)', required: false, description: 'SĐT người liên hệ', example: '0905192021' },
      { name: 'dia_chi', type: 'String(500)', required: false, description: 'Địa chỉ', example: 'Huyện KM110' },
      { name: 'khu_vuc', type: 'String(100)', required: false, description: 'Khu vực/vùng', example: 'Nông Trường' },
      { name: 'mst', type: 'String(20)', required: false, description: 'Mã số thuế/CCCD' },
      { name: 'email', type: 'String(100)', required: false, description: 'Email nhận HĐĐT' },
      { name: 'ghi_chu', type: 'Text', required: false, description: 'Ghi chú nội bộ' },
      { name: 'nv_ban_hang', type: 'FK', required: false, description: 'NV phụ trách' },
      { name: 'cong_no_hien_tai', type: 'Decimal', required: false, description: 'Calculated field', example: '82.158.000' },
      { name: 'trang_thai', type: 'Boolean', required: false, description: 'Active/Inactive', example: 'true' },
    ],
  },
  {
    id: 'm02',
    name: 'Danh mục Hàng hóa, Dịch vụ',
    type: 'Master Data',
    priority: 'Cao',
    effortFE: 6,
    effortBE: 4,
    totalEffort: 10,
    price: 15000000,
    icon: 'Package',
    description:
      'Quản lý 3.734 sản phẩm phụ tùng máy nông nghiệp. 25 loại đơn vị tính. Dashboard cảnh báo tồn kho. Hỗ trợ 3 mức giá bán.',
    screenDescription:
      'Dashboard: "Hàng hóa SẮP HẾT HÀNG" (icon cam) | "Hàng hóa HẾT HÀNG" (icon đỏ). Bảng: Tên, Mã, Tính chất, Số lượng tồn, Giá trị tồn. Toolbar: Lọc, Tìm kiếm, Thêm.',
    formDescription:
      'Popup chọn tính chất (6 loại: Hàng hóa, Dịch vụ, NVL, Thành phẩm, CCDC, Combo). Form: Mã HH (auto), Tên HH (bắt buộc), ĐVT chính, Nhóm HH, 3 mức giá bán, Tồn tối thiểu, Mã vạch.',
    useCases: [
      { id: 'UC01', name: 'Xem danh sách + dashboard tồn kho' },
      { id: 'UC02', name: 'Tìm kiếm hàng hóa' },
      { id: 'UC03', name: 'Thêm mới hàng hóa' },
      { id: 'UC04', name: 'Sửa thông tin hàng hóa' },
      { id: 'UC05', name: 'Import 3.734 HH từ Excel' },
      { id: 'UC06', name: 'Cập nhật giá hàng loạt' },
      { id: 'UC07', name: 'Xem lịch sử giá' },
    ],
    dataFields: [
      { name: 'ma_hh', type: 'String(20)', required: true, description: 'Auto/manual', example: 'CTYND00911127' },
      { name: 'ten_hh', type: 'String(500)', required: true, description: 'Tên đầy đủ', example: 'Que Hàn Sắt Kim Tín 2.6ly 20kg/thùng' },
      { name: 'dvt_chinh', type: 'String(20)', required: true, description: 'Đơn vị tính chính', example: 'Cái, Sợi, Bộ, kg...' },
      { name: 'tinh_chat', type: 'Enum', required: true, description: 'HH/DV/NVL/TP/CCDC/Combo', example: 'Hàng hóa' },
      { name: 'nhom_hh', type: 'FK', required: false, description: 'Nhóm hàng hóa', example: 'Phụ tùng côn' },
      { name: 'so_luong_ton', type: 'Decimal', required: false, description: 'Tồn kho hiện tại', example: '288' },
      { name: 'ton_toi_thieu', type: 'Decimal', required: false, description: 'Cảnh báo sắp hết', example: '10' },
      { name: 'gia_ban_1', type: 'Decimal', required: false, description: 'Giá bán mức 1', example: '570.000' },
      { name: 'gia_ban_2', type: 'Decimal', required: false, description: 'Giá bán mức 2', example: '600.000' },
      { name: 'gia_ban_3', type: 'Decimal', required: false, description: 'Giá bán mức 3', example: '650.000' },
      { name: 'gia_mua_gan_nhat', type: 'Decimal', required: false, description: 'Giá mua gần nhất', example: '450.000' },
      { name: 'ma_vach', type: 'String(50)', required: false, description: 'Barcode' },
      { name: 'trang_thai', type: 'Boolean', required: false, description: 'Còn kinh doanh', example: 'true' },
    ],
  },
  {
    id: 'm03',
    name: 'Báo giá',
    type: 'Nghiệp vụ',
    priority: 'Thấp',
    effortFE: 5,
    effortBE: 4,
    totalEffort: 9,
    price: 13500000,
    icon: 'FileText',
    description:
      'Lập báo giá gửi KH. Có thời hạn hiệu lực. Chuyển đổi thành CT bán hàng. Trạng thái: Nháp → Đã gửi → Đã chuyển đổi / Hết hạn.',
    screenDescription:
      'Bảng: Ngày báo giá, Số báo giá (BG00001), Hiệu lực đến, Khách hàng, Tổng tiền hàng, Tổng tiền CK, Tổng tiền thuế GTGT. Panel chi tiết bên dưới hiển thị dòng hàng.',
    formDescription:
      'Header 3 cột: Thông tin KH (trái) | Tên KH + Địa chỉ (giữa) | Số BG + Ngày (phải). Bảng hàng tiền: Mã hàng, Tên hàng, ĐVT, SL, Đơn giá, Thành tiền. Chiết khấu dropdown. Đính kèm file (5MB). Footer: Tổng tiền.',
    flow: 'Báo giá → Chứng từ bán hàng (M04). Khi chuyển, hệ thống kế thừa toàn bộ KH + dòng hàng.',
    statuses: ['Nháp', 'Đã gửi', 'Đã chuyển đổi', 'Hết hạn'],
    useCases: [
      { id: 'UC01', name: 'Xem danh sách báo giá' },
      { id: 'UC02', name: 'Tạo báo giá mới' },
      { id: 'UC03', name: 'Chuyển đổi thành CT bán hàng' },
      { id: 'UC04', name: 'Sửa / Hủy báo giá' },
      { id: 'UC05', name: 'In báo giá' },
    ],
  },
  {
    id: 'm04',
    name: 'Bán hàng (Chứng từ bán hàng)',
    type: 'Nghiệp vụ CORE',
    priority: 'Rất cao',
    effortFE: 14,
    effortBE: 12,
    totalEffort: 26,
    price: 39000000,
    icon: 'ShoppingCart',
    isCore: true,
    description:
      'Module nhân viên sử dụng hàng ngày. Lập phiếu xuất kho bán hàng, ghi nợ hoặc thu tiền ngay, tự động tính công nợ, in phiếu giao hàng.',
    screenDescription:
      'Bảng: Ngày hạch toán, Số CT, Khách hàng, Tổng tiền, TT hóa đơn, TT thanh toán, TT xuất hàng. Panel chi tiết bên dưới hiển thị dòng hàng với giá và thuế.',
    formDescription:
      'Radio: Chưa thu tiền / Thu tiền ngay (TM/CK). Checkbox: Kiêm phiếu xuất + Lập kèm hóa đơn. 3 Tab: Chứng từ ghi nợ | Phiếu xuất | Hóa đơn. Header: Mã KH, Tên KH, Ngày, NV bán hàng, Điều khoản thanh toán. Bảng hàng tiền đầy đủ.',
    logic: [
      'Thành tiền = Số lượng × Đơn giá',
      'Tổng tiền hàng = Σ(Thành tiền)',
      'Tổng CK = Σ(Tiền CK)',
      'Thuế GTGT = Σ(Tiền thuế)',
      'Tổng thanh toán = Tổng hàng - CK + Thuế',
      'Công nợ đầu = load từ DB',
      'Tiền KH trả = nhập tay (nếu Thu tiền ngay)',
      'Công nợ sau trừ = Công nợ đầu - Tiền trả',
      'Công nợ cuối ngày = Công nợ sau trừ + Tổng thanh toán',
    ],
    sideEffects: [
      'Ghi sổ công nợ KH (+) — tăng nợ phải thu',
      'Giảm số lượng tồn kho từng mặt hàng (nếu tích Kiêm phiếu xuất)',
      'Sinh phiếu xuất kho tương ứng (nếu tích Kiêm phiếu xuất)',
      'Sinh hóa đơn GTGT (nếu tích Lập kèm hóa đơn)',
      'Sinh phiếu thu TM/CK (nếu chọn Thu tiền ngay)',
      'Cập nhật 3 trạng thái: Hóa đơn, Thanh toán, Xuất hàng',
    ],
    statuses: ['Chưa lập HĐ / Đã lập', 'Chưa TT / Đã TT 1 phần / Đã TT', 'Chưa xuất / Đã xuất đủ'],
    useCases: [
      { id: 'UC04-01', name: 'Lập phiếu bán hàng mới', description: 'Full flow: Thêm → Chọn KH → auto load công nợ đầu → Thêm dòng hàng → search HH → auto fill giá/DVT → Nhập SL → Chọn PT thu tiền → Cất' },
      { id: 'UC04-02', name: 'Lập từ Báo giá', description: 'Kế thừa data từ Báo giá M03' },
      { id: 'UC04-03', name: 'Thu tiền tại chỗ', description: 'Radio Thu tiền ngay → nhập số tiền → auto tính công nợ sau trừ → sinh phiếu thu' },
      { id: 'UC04-04', name: 'In phiếu XKBH custom', description: 'Header DN, danh sách hàng, tổng tiền, số tiền bằng chữ, công nợ đầu/sau/cuối, lưu ý 3 ngày' },
      { id: 'UC04-05', name: 'In phiếu 02-VT TT99/2025', description: 'Mẫu kế toán chuẩn, Nợ 632/Có 156, SL yêu cầu + thực xuất, chữ ký 5 người' },
      { id: 'UC04-06', name: 'Tracking 3 trạng thái' },
      { id: 'UC04-07', name: 'Sửa phiếu (chưa in)', description: 'Cập nhật lại công nợ' },
      { id: 'UC04-08', name: 'Hủy phiếu (soft delete)', description: 'Hoàn lại tồn kho + giảm công nợ' },
    ],
  },
  {
    id: 'm05',
    name: 'Trả lại hàng bán',
    type: 'Nghiệp vụ',
    priority: 'Cao',
    effortFE: 5,
    effortBE: 4,
    totalEffort: 9,
    price: 13500000,
    icon: 'RotateCcw',
    description:
      'Khi KH trả lại hàng đã mua. 2 phương thức: Giảm trừ công nợ hoặc Trả lại tiền mặt.',
    screenDescription:
      'Bảng: Ngày, Số CT (BTL00001), Khách hàng, Tổng tiền, Phương thức lập HĐ, TT nhập hàng. Panel chi tiết hiển thị dòng hàng kèm số CT bán hàng gốc.',
    formDescription:
      'Radio: Giảm trừ công nợ / Trả lại tiền mặt. Checkbox: Kiêm phiếu nhập kho. Input search chứng từ bán hàng gốc. Bảng hàng tương tự CT bán hàng.',
    sideEffects: [
      'Giảm công nợ KH (nếu Giảm trừ) HOẶC sinh phiếu chi (nếu Trả lại tiền mặt)',
      'Tăng tồn kho (nếu tích Kiêm phiếu nhập kho)',
      'Cập nhật trạng thái nhập hàng',
    ],
    comparisonTable: [
      { label: 'Phương thức', sell: 'Chưa thu / Thu ngay', return: 'Giảm trừ nợ / Hoàn tiền' },
      { label: 'Phiếu kho', sell: 'Xuất kho', return: 'Nhập kho' },
      { label: 'Công nợ', sell: 'Tăng (+)', return: 'Giảm (-)' },
      { label: 'Tồn kho', sell: 'Giảm', return: 'Tăng' },
    ],
    useCases: [
      { id: 'UC01', name: 'Lập phiếu trả hàng' },
      { id: 'UC02', name: 'Link đến CT bán hàng gốc' },
      { id: 'UC03', name: 'Chọn phương thức xử lý' },
      { id: 'UC04', name: 'Hoàn tồn kho + giảm nợ' },
    ],
  },
  {
    id: 'm06',
    name: 'Công nợ Khách hàng',
    type: 'Tiện ích CORE',
    priority: 'Rất cao',
    effortFE: 8,
    effortBE: 7,
    totalEffort: 15,
    price: 22500000,
    icon: 'Wallet',
    isCore: true,
    description:
      'Dashboard tổng quan công nợ. Phân tích aging (tuổi nợ). Thu tiền nhanh. Đối trừ chứng từ.',
    screenDescription:
      'Dashboard 3 metric cards: Nợ quá hạn | Tổng nợ phải thu | Đã thanh toán 30 ngày. Bảng KH có nợ. Panel 2 tab: Phân tích nợ theo HĐ (3 bảng: trước hạn, quá hạn, tình trạng) | Chi tiết.',
    logic: [
      'Công nợ cuối kỳ = Nợ đầu kỳ + Bán hàng - Thanh toán - Trả hàng ± Bù trừ',
      '(+) Bán hàng ghi nợ → TĂNG công nợ',
      '(-) Thanh toán TM/CK → GIẢM công nợ',
      '(-) Trả lại hàng → GIẢM công nợ',
      '(±) Bù trừ công nợ → ĐIỀU CHỈNH',
      'VD: Sơn 92: 82.158.000 + 18.888.900 - 0 - 0 = 101.046.900đ',
    ],
    useCases: [
      { id: 'UC06-01', name: 'Xem dashboard 3 metrics + bảng KH có nợ' },
      { id: 'UC06-02', name: 'Xem phân tích aging', description: 'Click 1 KH → tab phân tích: 3 bảng trước hạn, quá hạn, tình trạng' },
      { id: 'UC06-03', name: 'Thu tiền nhanh', description: 'Click "Thu tiền" → nhập số tiền, hình thức TM/CK → Lưu → giảm nợ' },
      { id: 'UC06-04', name: 'Đối trừ chứng từ', description: 'Match CT bán hàng với phiếu thu theo từng hóa đơn' },
      { id: 'UC06-05', name: 'Sổ chi tiết công nợ', description: 'Xem tất cả giao dịch 1 KH: bán hàng (+), thu tiền (-), trả hàng (-), bù trừ (±)' },
      { id: 'UC06-06', name: 'In biên bản đối chiếu công nợ', description: 'Gửi KH ký xác nhận' },
    ],
  },
  {
    id: 'm07',
    name: 'Bù trừ Công nợ',
    type: 'Tiện ích',
    priority: 'Trung bình',
    effortFE: 4,
    effortBE: 3,
    totalEffort: 7,
    price: 10500000,
    icon: 'ArrowLeftRight',
    description:
      'Bù trừ công nợ phải thu và phải trả cho đối tượng vừa là KH vừa là NCC.',
    screenDescription:
      'Popup: Đối tượng, TK phải thu (131), TK phải trả (331), Ngày bù trừ, nút "Lấy dữ liệu". 2 bảng: Chứng từ phải thu + Chứng từ phải trả. Tick chọn → auto tính số tiền bù trừ.',
    flow: 'Chọn đối tượng → "Lấy dữ liệu" → Load 2 bảng → Tick CT → Auto tính → Click "Bù trừ" → Sinh chứng từ',
    useCases: [
      { id: 'UC01', name: 'Chọn đối tượng bù trừ' },
      { id: 'UC02', name: 'Load chứng từ phải thu / phải trả' },
      { id: 'UC03', name: 'Chọn và bù trừ' },
      { id: 'UC04', name: 'Sinh chứng từ bù trừ' },
    ],
  },
  {
    id: 'm08',
    name: 'Chính sách giá & Tính giá bán',
    type: 'Tiện ích',
    priority: 'Trung bình',
    effortFE: 4,
    effortBE: 3,
    totalEffort: 7,
    price: 10500000,
    icon: 'Tag',
    description:
      'Thiết lập chính sách giá bán, chiết khấu cho từng nhóm KH, từng nhóm HH, trong khoảng thời gian nhất định. Auto apply khi lập CT bán hàng.',
    logic: [
      'Giá bán mới = Giá gốc × (100 + %)/100',
      'Hoặc: Giá bán mới = Giá gốc + Số tiền',
      'Chiết khấu: % hoặc số tiền, áp dụng theo nhóm KH',
      'Căn cứ tính: Giá bán danh mục / Giá bán cố định / Giá mua gần nhất / Giá mua cố định',
    ],
    flow: 'Thiết lập ĐVT → Hiển thị danh sách HH → Chọn căn cứ + phương pháp + % → Click "Tính giá bán" → Auto cập nhật Giá bán 1, 2, 3',
    useCases: [
      { id: 'UC01', name: 'Tạo chính sách giá' },
      { id: 'UC02', name: 'Thiết lập chiết khấu theo nhóm KH' },
      { id: 'UC03', name: 'Tính giá bán hàng loạt' },
      { id: 'UC04', name: 'Auto apply khi lập CT bán hàng' },
    ],
  },
]

export const supplementary: Module[] = [
  {
    id: 'p01',
    name: 'In phiếu (2 mẫu)',
    type: 'Bổ trợ',
    priority: 'Cao',
    effortFE: 5,
    effortBE: 3,
    totalEffort: 8,
    price: 12000000,
    icon: 'Printer',
    description: 'Phiếu XKBH Custom (header DN, công nợ, lưu ý 3 ngày) + Phiếu XK 02-VT theo TT99/2025 (mẫu kế toán chuẩn, chữ ký 5 người).',
    useCases: [
      { id: 'UC01', name: 'In phiếu XKBH Custom' },
      { id: 'UC02', name: 'In phiếu 02-VT TT99/2025' },
    ],
  },
  {
    id: 'p02',
    name: 'Auth & Phân quyền',
    type: 'Bổ trợ',
    priority: 'Cao',
    effortFE: 3,
    effortBE: 3,
    totalEffort: 6,
    price: 9000000,
    icon: 'Shield',
    description: 'Login/Logout, 3 roles: Admin (toàn quyền) / NV bán hàng (lập phiếu, xem KH/HH, xem công nợ) / Kế toán (xem báo cáo, thu tiền, bù trừ, đối trừ).',
    useCases: [
      { id: 'UC01', name: 'Login / Logout' },
      { id: 'UC02', name: 'Phân quyền 3 roles' },
      { id: 'UC03', name: 'Quản lý user (CRUD, đổi mật khẩu)' },
    ],
  },
  {
    id: 'p03',
    name: 'Import data & Setup GCP',
    type: 'Bổ trợ',
    priority: 'Cao',
    effortFE: 2,
    effortBE: 4,
    totalEffort: 6,
    price: 9000000,
    icon: 'Upload',
    description: 'Import 1.564 KH + 3.734 HH từ Excel. Setup MongoDB schema, migration scripts, seed data. Config GCP (Cloud Run, Cloud Functions, Cloud Storage, Firebase Auth).',
    useCases: [
      { id: 'UC01', name: 'Import KH từ Excel (clean SĐT, normalize mã)' },
      { id: 'UC02', name: 'Import HH từ Excel' },
      { id: 'UC03', name: 'Setup MongoDB + GCP' },
    ],
  },
  {
    id: 'p04',
    name: 'Testing, QA & Deploy',
    type: 'Bổ trợ',
    priority: 'Cao',
    effortFE: 5,
    effortBE: 5,
    totalEffort: 10,
    price: 15000000,
    icon: 'TestTube',
    description: 'Unit + Integration test. UAT với dữ liệu thực (1.564 KH + 3.734 HH). Bug fix, performance optimize. Deploy GCP production.',
    useCases: [
      { id: 'UC01', name: 'Unit + Integration test' },
      { id: 'UC02', name: 'UAT với data thực' },
      { id: 'UC03', name: 'Deploy GCP production' },
    ],
  },
]

export const businessRules = [
  { id: 'BR01', module: 'M04', rule: 'Công nợ cuối = Nợ đầu + BH - TT - TL ± BT', description: 'Công thức tính công nợ realtime, hiển thị trên phiếu in' },
  { id: 'BR02', module: 'M04', rule: 'Kiêm phiếu xuất → giảm tồn kho', description: 'Tích checkbox = auto giảm SL tồn' },
  { id: 'BR03', module: 'M04', rule: 'Thu tiền ngay → sinh phiếu thu', description: 'Chọn Thu tiền ngay = auto sinh phiếu thu TM/CK' },
  { id: 'BR04', module: 'M05', rule: 'Trả hàng → tăng tồn + giảm nợ', description: 'Kiêm phiếu nhập = tăng tồn; Giảm trừ = giảm nợ' },
  { id: 'BR05', module: 'M04', rule: 'Số CT auto increment', description: 'BH00001, BH00002... không cho sửa' },
  { id: 'BR06', module: 'M02', rule: 'Cảnh báo hết hàng', description: 'Tồn kho <= tồn tối thiểu → badge "Sắp hết"' },
  { id: 'BR07', module: 'M06', rule: 'Aging tự động', description: 'Nợ tự động phân loại theo ngày' },
  { id: 'BR08', module: 'M08', rule: 'Auto fill giá khi bán hàng', description: 'Chọn HH → auto fill giá theo chính sách giá nhóm KH' },
  { id: 'BR09', module: 'M04', rule: 'Không xóa phiếu đã in', description: 'Chỉ Hủy (soft delete), không xóa cứng' },
  { id: 'BR10', module: 'M04', rule: 'Số tiền bằng chữ', description: 'Auto convert VN: "Mười tám triệu..."' },
  { id: 'BR11', module: 'M04', rule: 'Lưu ý 3 ngày', description: 'In trên phiếu: "Hàng báo thiếu trong 3 ngày..."' },
]

export const timeline = [
  {
    weeks: 'Tuần 1-2',
    phase: 'Foundation',
    label: 'Nền tảng',
    tasks: ['Setup project, DB schema, UI kit', 'Auth (P02)', 'CRUD KH + HH (M01, M02)', 'Import data Excel (P03)'],
    output: 'Đăng nhập được, xem danh sách KH + HH với data thực',
    milestone: false,
  },
  {
    weeks: 'Tuần 3-4',
    phase: 'Core Build',
    label: 'Core',
    tasks: ['M04 Bán hàng (CORE)', 'M06 Công nợ (CORE)', 'P01 In phiếu (2 mẫu)'],
    output: 'Lập phiếu + in + xem công nợ',
    milestone: true,
    milestoneLabel: 'DEMO V1 → THANH TOÁN ĐỢT 1',
  },
  {
    weeks: 'Tuần 5-6',
    phase: 'Extend',
    label: 'Mở rộng',
    tasks: ['M03 Báo giá', 'M05 Trả lại hàng', 'M07 Bù trừ', 'M08 Chính sách giá'],
    output: 'Toàn bộ 8 module hoàn thành',
    milestone: false,
  },
  {
    weeks: 'Tuần 7-8',
    phase: 'Go-live',
    label: 'Go-live',
    tasks: ['Testing, bug fix (P04)', 'UAT với KH', 'Training user', 'Deploy GCP production'],
    output: 'Production ready',
    milestone: true,
    milestoneLabel: 'GO-LIVE → THANH TOÁN ĐỢT 2',
  },
]

export const paymentTerms = [
  {
    phase: 1,
    milestone: 'Sau demo v1 (cuối tuần 4)',
    deliverables: 'M01 + M02 + M04 (Bán hàng) + M06 (Công nợ) + In phiếu hoạt động đúng với data thực',
    percent: 50,
    amount: 98900000,
  },
  {
    phase: 2,
    milestone: 'Nghiệm thu go-live (cuối tuần 8)',
    deliverables: 'Toàn bộ 8 module + deploy GCP + training + bàn giao source code & tài liệu',
    percent: 50,
    amount: 98900000,
  },
]

export const comparison = [
  { criteria: 'Chi phí năm 1', misa: '~8.000.000đ', custom: '197.800.000đ', customWin: false },
  { criteria: 'Chi phí năm 2+', misa: '~8.000.000đ/năm', custom: '~12-18 triệu/năm (GCP + duy trì)', customWin: true },
  { criteria: 'Custom nghiệp vụ', misa: 'Không', custom: '100% theo yêu cầu', customWin: true },
  { criteria: 'Sở hữu source code', misa: 'Không', custom: 'Có (100%)', customWin: true },
  { criteria: 'Phụ thuộc vendor', misa: 'Cao (MISA ngừng = mất)', custom: 'Không phụ thuộc', customWin: true },
  { criteria: 'Tính năng', misa: 'Rất nhiều (thừa, phức tạp)', custom: 'Vừa đủ (tối ưu cho nghiệp vụ)', customWin: true },
  { criteria: 'Hòa vốn sau', misa: '-', custom: '~3-4 năm (sau đó tiết kiệm hơn)', customWin: true },
]

export const gcpCosts = [
  { service: 'Cloud Run (Next.js)', config: '1 vCPU, 512MB RAM', cost: '~200.000đ' },
  { service: 'Cloud Functions', config: '256MB, auto-scale', cost: '~100.000đ' },
  { service: 'MongoDB Atlas', config: 'M10 Shared (10GB)', cost: '~500.000đ' },
  { service: 'Cloud Storage', config: '5GB', cost: '~10.000đ' },
]

export const warranty = {
  free: {
    duration: '3 tháng',
    items: [
      'Fix bug phát sinh trong quá trình sử dụng',
      'Hỗ trợ kỹ thuật qua Zalo/Telegram',
      'Training bổ sung cho nhân viên mới',
    ],
    excluded: 'KHÔNG bao gồm thay đổi/thêm tính năng mới',
  },
  paid: {
    monthly: 3000000,
    description: 'Gói duy trì: fix bug + minor updates + support',
    extras: ['Phát triển thêm tính năng: báo giá riêng', 'Phase 2 (Kho + Mua hàng + Mobile): báo giá riêng'],
  },
  ownership: [
    'KH sở hữu 100% source code sau thanh toán đầy đủ',
    'Bao gồm: FE + BE source, DB schema, API docs, deployment guide, user manual',
    'KH có quyền tự phát triển thêm hoặc thuê bên khác',
  ],
}

export const pricingSummary = {
  subtotal: 183000000,
  pmOverhead: 14800000,
  pmOverheadPercent: 8,
  total: 197800000,
  totalWords: 'Một trăm chín mươi bảy triệu tám trăm nghìn đồng',
  rate: 1500000,
  rateUSD: 18.75,
  totalDays: 122,
}
