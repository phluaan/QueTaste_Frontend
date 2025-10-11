import { useMemo, useState } from "react";
import { Search, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import AdminLayout from "../../layouts/AdminLayout";
import UserCard from "../../../../features/admin/components/UserCard"; // kiểm tra lại path cho đúng

const MOCK_USERS = [
    { id: "u01", name: "Nguyễn Văn A", email: "a@example.com", avatar: "", totalSpend: 128_000_000, orders: 36, memberSince: "2023-02-11" },
    { id: "u02", name: "Trần Thị B", email: "b@example.com", avatar: "", totalSpend: 96_500_000, orders: 28, memberSince: "2022-10-03" },
    { id: "u03", name: "Phạm Hoàng C", email: "c@example.com", avatar: "", totalSpend: 75_300_000, orders: 21, memberSince: "2024-01-19" },
    { id: "u04", name: "Lê Minh D", email: "le.minh.d@example.com", avatar: "", totalSpend: 12_000_000, orders: 8, memberSince: "2024-06-01" },
    { id: "u05", name: "Đặng Thu E", email: "dang.thu.e@example.com", avatar: "", totalSpend: 250_000_000, orders: 52, memberSince: "2022-12-25" },

    { id: "u06", name: "Bùi Anh F", email: "bui.anh.f@example.com", avatar: "", totalSpend: 18_400_000, orders: 9, memberSince: "2023-03-14" },
    { id: "u07", name: "Võ Hồng G", email: "vo.hong.g@example.com", avatar: "", totalSpend: 42_700_000, orders: 15, memberSince: "2021-11-02" },
    { id: "u08", name: "Tạ Quốc H", email: "ta.quoc.h@example.com", avatar: "", totalSpend: 310_000_000, orders: 61, memberSince: "2022-01-20" },
    { id: "u09", name: "Dương Gia I", email: "duong.gia.i@example.com", avatar: "", totalSpend: 5_200_000, orders: 3, memberSince: "2025-02-10" },
    { id: "u10", name: "Phùng Khánh J", email: "phung.khanh.j@example.com", avatar: "", totalSpend: 64_500_000, orders: 19, memberSince: "2023-07-08" },

    { id: "u11", name: "Đỗ Ngọc K", email: "do.ngoc.k@example.com", avatar: "", totalSpend: 820_000_000, orders: 102, memberSince: "2021-06-30" },
    { id: "u12", name: "Mai Thu L", email: "mai.thu.l@example.com", avatar: "", totalSpend: 27_800_000, orders: 11, memberSince: "2024-03-22" },
    { id: "u13", name: "La Chí M", email: "la.chi.m@example.com", avatar: "", totalSpend: 9_700_000, orders: 5, memberSince: "2024-11-15" },
    { id: "u14", name: "Hồ Nhật N", email: "ho.nhat.n@example.com", avatar: "", totalSpend: 112_300_000, orders: 33, memberSince: "2022-05-05" },
    { id: "u15", name: "Tôn Tử O", email: "ton.tu.o@example.com", avatar: "", totalSpend: 1_500_000, orders: 1, memberSince: "2025-06-01" },

    { id: "u16", name: "Đinh Văn P", email: "dinh.van.p@example.com", avatar: "", totalSpend: 38_000_000, orders: 12, memberSince: "2023-09-10" },
    { id: "u17", name: "Huỳnh Như Q", email: "huynh.nhu.q@example.com", avatar: "", totalSpend: 205_000_000, orders: 48, memberSince: "2022-02-14" },
    { id: "u18", name: "Chu Hải R", email: "chu.hai.r@example.com", avatar: "", totalSpend: 57_300_000, orders: 17, memberSince: "2023-12-01" },
    { id: "u19", name: "Trịnh Bảo S", email: "trinh.bao.s@example.com", avatar: "", totalSpend: 23_900_000, orders: 10, memberSince: "2024-08-19" },
    { id: "u20", name: "Vũ Quân T", email: "vu.quan.t@example.com", avatar: "", totalSpend: 144_000_000, orders: 31, memberSince: "2021-09-09" },

    { id: "u21", name: "Phan Khôi U", email: "phan.khoi.u@example.com", avatar: "", totalSpend: 66_600_000, orders: 20, memberSince: "2023-04-27" },
    { id: "u22", name: "Ngô Hà V", email: "ngo.ha.v@example.com", avatar: "", totalSpend: 8_400_000, orders: 4, memberSince: "2025-01-12" },
    { id: "u23", name: "Lưu Diệp W", email: "luu.diep.w@example.com", avatar: "", totalSpend: 370_000_000, orders: 77, memberSince: "2022-07-07" },
    { id: "u24", name: "Từ Yến X", email: "tu.yen.x@example.com", avatar: "", totalSpend: 52_500_000, orders: 16, memberSince: "2024-04-02" },
    { id: "u25", name: "Giang Nam Y", email: "giang.nam.y@example.com", avatar: "", totalSpend: 19_900_000, orders: 7, memberSince: "2023-10-30" },

    { id: "u26", name: "Quách Hạo Z", email: "quach.hao.z@example.com", avatar: "", totalSpend: 280_000_000, orders: 63, memberSince: "2021-12-18" },
    { id: "u27", name: "Tạ Phương AA", email: "ta.phuong.aa@example.com", avatar: "", totalSpend: 47_000_000, orders: 14, memberSince: "2024-09-21" },
    { id: "u28", name: "Lý Hiếu AB", email: "ly.hieu.ab@example.com", avatar: "", totalSpend: 5_800_000, orders: 3, memberSince: "2025-03-05" },
    { id: "u29", name: "Đoàn Minh AC", email: "doan.minh.ac@example.com", avatar: "", totalSpend: 101_000_000, orders: 29, memberSince: "2022-11-11" },
    { id: "u30", name: "Trà Khánh AD", email: "tra.khanh.ad@example.com", avatar: "", totalSpend: 34_600_000, orders: 12, memberSince: "2023-01-03" },

    { id: "u31", name: "Hoàng Vỹ AE", email: "hoang.vy.ae@example.com", avatar: "", totalSpend: 615_000_000, orders: 95, memberSince: "2021-04-25" },
    { id: "u32", name: "Tống Thiên AF", email: "tong.thien.af@example.com", avatar: "", totalSpend: 72_200_000, orders: 23, memberSince: "2023-05-17" },
    { id: "u33", name: "Đặng Hải AG", email: "dang.hai.ag@example.com", avatar: "", totalSpend: 2_300_000, orders: 1, memberSince: "2025-07-01" },
    { id: "u34", name: "Cao Minh AH", email: "cao.minh.ah@example.com", avatar: "", totalSpend: 58_800_000, orders: 18, memberSince: "2022-03-09" },
    { id: "u35", name: "Kiều Lan AI", email: "kieu.lan.ai@example.com", avatar: "", totalSpend: 86_000_000, orders: 26, memberSince: "2023-08-28" },

    { id: "u36", name: "Lâm Phát AJ", email: "lam.phat.aj@example.com", avatar: "", totalSpend: 14_400_000, orders: 6, memberSince: "2024-02-16" },
    { id: "u37", name: "Thái Dương AK", email: "thai.duong.ak@example.com", avatar: "", totalSpend: 220_000_000, orders: 50, memberSince: "2022-06-06" },
    { id: "u38", name: "Hà Vy AL", email: "ha.vy.al@example.com", avatar: "", totalSpend: 41_300_000, orders: 13, memberSince: "2024-10-03" },
    { id: "u39", name: "Trịnh Khoa AM", email: "trinh.khoa.am@example.com", avatar: "", totalSpend: 11_800_000, orders: 5, memberSince: "2023-02-02" },
    { id: "u40", name: "Nguyễn Hạo AN", email: "nguyen.hao.an@example.com", avatar: "", totalSpend: 480_000_000, orders: 88, memberSince: "2021-08-12" },
];


export default function UsersListPage() {
    const [q, setQ] = useState("");
    const navigate = useNavigate();

    // Lọc theo tên/email (bỏ dấu đơn giản)
    const normalize = (s) =>
        (s || "")
        .toLowerCase()
        .normalize("NFD")
        .replace(/\p{Diacritic}/gu, "");

    const filtered = useMemo(() => {
        const k = normalize(q);
        if (!k) return MOCK_USERS;
        return MOCK_USERS.filter((u) => {
        const hay = `${normalize(u.name)} ${normalize(u.email)}`;
        return hay.includes(k);
        });
    }, [q]);

    return (
        <AdminLayout>
        {/* Header: trái là tiêu đề + mô tả, phải là nút quay lại */}
        <div className="mb-4 flex items-start justify-between gap-3">
            <div>
            <h1 className="text-2xl font-semibold">Danh sách người dùng</h1>
            <p className="text-sm text-gray-500">
                Tìm kiếm và xem thông tin nhanh người dùng trên hệ thống
            </p>
            </div>

            <button
            onClick={() => navigate(-1)}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition text-sm"
            aria-label="Quay lại"
            title="Quay lại"
            >
            <ArrowLeft className="w-4 h-4" />
            Quay lại
            </button>
        </div>

        {/* Thanh search: nằm dưới header */}
        <div className="mb-6">
            <label htmlFor="user-search" className="sr-only">
            Tìm người dùng
            </label>
            <div className="relative max-w-xl">
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
                id="user-search"
                type="text"
                placeholder="Tìm theo tên hoặc email…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="w-full pl-9 pr-3 py-2.5 text-sm rounded-lg border border-gray-200 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-200"
                autoComplete="off"
            />
            </div>
        </div>

        {/* Grid user */}
        {filtered.length === 0 ? (
            <div className="bg-white border border-dashed border-gray-200 rounded-2xl p-10 text-center text-gray-500">
            Không tìm thấy người dùng nào phù hợp.
            </div>
        ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {filtered.map((u) => (
                <UserCard key={u.id} user={u} />
            ))}
            </div>
        )}
        </AdminLayout>
    );
}