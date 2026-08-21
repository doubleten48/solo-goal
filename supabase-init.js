// ============================================================
// supabase-init.js — config กลาง ใช้ร่วมทุกหน้า
// ต้องโหลดหลัง <script src="...supabase-js@2"></script>
// ใช้งาน: หลังโหลดไฟล์นี้ จะมีตัวแปร global `sb` ให้ใช้ได้เลย
// ============================================================

const SUPABASE_URL = 'https://dnrcardbuuwnvuridubb.supabase.co'
const SUPABASE_KEY = 'sb_publishable_uz4Tj8HDZef7T2OLEzyvUw_wcGsn0ZW'

// จดจำการเข้าสู่ระบบ:
//   ติ๊ก (rememberMe=1)  = เก็บ session ใน localStorage   → อยู่ข้ามการปิดเบราว์เซอร์
//   ไม่ติ๊ก (rememberMe=0) = เก็บ session ใน sessionStorage → หายเมื่อปิดแท็บ/เบราว์เซอร์
// getItem อ่านจากทั้งสองที่ เพื่อให้ทุกหน้าเจอ session ตรงกัน (แก้ปัญหาจอกระพริบ)
const rememberStorage = {
  getItem: (key) => {
    const v = localStorage.getItem(key)
    if (v !== null) return v
    return sessionStorage.getItem(key)
  },
  setItem: (key, value) => {
    const remember = localStorage.getItem('rememberMe') === '1'
    if (remember) {
      localStorage.setItem(key, value)
      sessionStorage.removeItem(key)
    } else {
      sessionStorage.setItem(key, value)
      localStorage.removeItem(key)
    }
  },
  removeItem: (key) => {
    localStorage.removeItem(key)
    sessionStorage.removeItem(key)
  }
}

const sb = supabase.createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    storage: rememberStorage,
    persistSession: true,
    autoRefreshToken: true
  }
})
