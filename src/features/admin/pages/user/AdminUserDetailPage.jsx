import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft, Mail, User as UserIcon, Phone, CalendarDays,
  MapPin, CheckCircle2, XCircle, Shield, Coins
} from "lucide-react";
import AdminLayout from "../../layouts/AdminLayout";
import { useUserDetail } from "../../hooks/useStatistics";

const fmtNumber = (n) => new Intl.NumberFormat("vi-VN").format(n);
const fmtDate = (d) => (d ? new Date(d).toLocaleString("vi-VN") : "—");
const genderLabel = (g) => g === "male" ? "Nam" : g === "female" ? "Nữ" : "Khác";

function Pill({ children, className = "" }) { return <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs border ${className}`}>{children}</span>; }
function StatusBadge({ status }) {
  const map = { active: "bg-emerald-50 text-emerald-700 border-emerald-100", inactive: "bg-amber-50 text-amber-700 border-amber-100", banned: "bg-rose-50 text-rose-700 border-rose-100" };
  const label = status === "active" ? "Đang hoạt động" : status === "inactive" ? "Ngưng hoạt động" : "Đã cấm";
  return <Pill className={map[status] || "bg-gray-50 text-gray-700 border-gray-200"}>{label}</Pill>;
}
function RoleBadge({ role }) {
  const map = { admin: "bg-indigo-50 text-indigo-700 border-indigo-100", moderator: "bg-sky-50 text-sky-700 border-sky-100", user: "bg-gray-50 text-gray-700 border-gray-200" };
  const label = role === "admin" ? "Quản trị viên" : role === "moderator" ? "Điều phối" : "Người dùng";
  return <Pill className={map[role] || "bg-gray-50 text-gray-700 border-gray-200"}><Shield className="w-3.5 h-3.5" />{label}</Pill>;
}
function VerifyBadge({ isVerified }) {
  return isVerified ? (
    <Pill className="bg-emerald-50 text-emerald-700 border-emerald-100"><CheckCircle2 className="w-3.5 h-3.5" /> Đã xác thực</Pill>
  ) : (<Pill className="bg-gray-50 text-gray-700 border-gray-200"><XCircle className="w-3.5 h-3.5" /> Chưa xác thực</Pill>);
}
function InfoRow({ icon: Icon, label, value }) {
  return (
    <div className="flex items-start gap-3">
      {Icon && <Icon className="w-4 h-4 mt-[2px] text-gray-500" />}
      <div className="min-w-28 text-gray-500 text-sm">{label}</div>
      <div className="flex-1 text-sm font-medium break-words">{value || "—"}</div>
    </div>
  );
}
function DetailSkeleton() {
  return (
    <div className="animate-pulse grid grid-cols-1 xl:grid-cols-3 gap-6">
      <div className="xl:col-span-2 space-y-6">
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-64 bg-gray-100 rounded-2xl" />
      </div>
      <div className="space-y-6">
        <div className="h-40 bg-gray-100 rounded-2xl" />
        <div className="h-40 bg-gray-100 rounded-2xl" />
      </div>
    </div>
  );
}

export default function AdminUserDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { userDetail: user, loading, error } = useUserDetail(id);

  const avatarUrl = useMemo(() => {
    if (user?.avatar) return user.avatar;
    const seed = encodeURIComponent(user?.personalInfo?.fullName || user?.email || "U");
    return `https://api.dicebear.com/8.x/initials/svg?seed=${seed}`;
  }, [user]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <div className="h-6 w-64 bg-gray-100 rounded mb-2" />
            <div className="h-4 w-96 bg-gray-100 rounded" />
          </div>
          <div className="h-9 w-28 bg-gray-100 rounded" />
        </div>
        <DetailSkeleton />
      </AdminLayout>
    );
  }

  if (error || !user) {
    return (
      <AdminLayout>
        <div className="mb-4 flex items-start justify-between">
          <div>
            <h1 className="text-2xl font-semibold">Chi tiết người dùng</h1>
            <p className="text-sm text-gray-500">Không thể tải dữ liệu</p>
          </div>
          <button onClick={()=>navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition text-sm">
            <ArrowLeft className="w-4 h-4" /> Quay lại
          </button>
        </div>
        <div className="bg-rose-50 border border-rose-100 text-rose-700 p-4 rounded-xl">{error || "Không tìm thấy người dùng"}</div>
      </AdminLayout>
    );
  }

  const p = user.personalInfo || {};
  const addr = p.shippingAddress || {};
  const stats = user._stats || {}; // nếu sau này bạn bổ sung từ BE

  return (
    <AdminLayout>
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-2xl font-semibold">Chi tiết người dùng</h1>
          <p className="text-sm text-gray-500">Quản lý thông tin tài khoản & hồ sơ cá nhân</p>
        </div>
        <button onClick={()=>navigate(-1)} className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 active:bg-gray-100 transition text-sm">
          <ArrowLeft className="w-4 h-4" /> Quay lại
        </button>
      </div>

      {/* Summary */}
      <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 mb-6">
        <div className="flex items-center gap-4">
          <img src={avatarUrl} alt={p.fullName || user.email} className="w-16 h-16 rounded-full object-cover border" loading="lazy" />
          <div className="min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <div className="text-lg font-semibold truncate">{p.fullName || "Chưa có tên"}</div>
              <RoleBadge role={user.role} />
              <StatusBadge status={user.status} />
              <VerifyBadge isVerified={user.isVerified} />
            </div>
            <div className="text-sm text-gray-500 truncate flex items-center gap-2">
              <Mail className="w-4 h-4" /> {user.email}
            </div>
          </div>

          {(stats.totalSpend || stats.orders) && (
            <div className="ml-auto grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Coins className="w-4 h-4 text-amber-600" />
                <div>
                  <div className="text-gray-500">Tổng chi tiêu</div>
                  <div className="font-semibold">{fmtNumber(Math.round(stats.totalSpend || 0))} ₫</div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-indigo-600" />
                <div>
                  <div className="text-gray-500">Số đơn</div>
                  <div className="font-semibold">{fmtNumber(stats.orders || 0)}</div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <div className="xl:col-span-2 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="mb-4">
            <h2 className="font-semibold">Thông tin tài khoản</h2>
            <p className="text-xs text-gray-500">Trạng thái, vai trò, xác thực & thời điểm tạo/cập nhật</p>
          </div>
          <div className="space-y-3">
            <InfoRow icon={Mail} label="Email" value={user.email} />
            <InfoRow icon={UserIcon} label="Vai trò" value={user.role === "admin" ? "Quản trị viên" : user.role === "moderator" ? "Điều phối" : "Người dùng"} />
            <InfoRow icon={Shield} label="Trạng thái" value={<StatusBadge status={user.status} />} />
            <InfoRow icon={CheckCircle2} label="Xác thực" value={user.isVerified ? "Đã xác thực" : "Chưa xác thực"} />
            <InfoRow icon={Coins} label="Điểm tích lũy" value={`${fmtNumber(user.pointsBalance || 0)} điểm`} />
            <InfoRow icon={CalendarDays} label="Tạo lúc" value={fmtDate(user.createdAt)} />
            <InfoRow icon={CalendarDays} label="Cập nhật" value={fmtDate(user.updatedAt)} />
          </div>
        </div>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="mb-4">
            <h2 className="font-semibold">Thông tin cá nhân</h2>
            <p className="text-xs text-gray-500">Họ tên, số điện thoại, ngày sinh & giới tính</p>
          </div>
          <div className="space-y-3">
            <InfoRow icon={UserIcon} label="Họ tên" value={p.fullName} />
            <InfoRow icon={Phone} label="Điện thoại" value={p.phone} />
            <InfoRow icon={CalendarDays} label="Ngày sinh" value={p.dateOfBirth ? new Date(p.dateOfBirth).toLocaleDateString("vi-VN") : "—"} />
            <InfoRow icon={UserIcon} label="Giới tính" value={genderLabel(p.gender)} />
          </div>
        </div>

        <div className="xl:col-span-3 bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h2 className="font-semibold">Địa chỉ giao hàng</h2>
              <p className="text-xs text-gray-500">Địa chỉ mặc định lấy từ hồ sơ người dùng</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <div className="col-span-1">
              <div className="text-sm text-gray-500 mb-1">Địa chỉ</div>
              <div className="text-sm font-medium flex items-start gap-2">
                <MapPin className="w-4 h-4 mt-0.5 text-gray-500" />
                <span>{addr.street || "—"}</span>
              </div>
            </div>
            <div><div className="text-sm text-gray-500 mb-1">Phường/Xã</div><div className="text-sm font-medium">{addr.ward || "—"}</div></div>
            <div><div className="text-sm text-gray-500 mb-1">Quận/Huyện</div><div className="text-sm font-medium">{addr.district || "—"}</div></div>
            <div><div className="text-sm text-gray-500 mb-1">Tỉnh/Thành</div><div className="text-sm font-medium">{addr.province || "—"}</div></div>
            <div><div className="text-sm text-gray-500 mb-1">Mã bưu chính</div><div className="text-sm font-medium">{addr.postalCode || "—"}</div></div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}