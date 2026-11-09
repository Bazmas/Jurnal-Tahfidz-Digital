
import { useEffect, useState } from 'react'
import './DashboardPengajar.css'
import BerandaPengajar from './BerandaPengajar'
import DataSantriBimbingan from './DataSantriBimbingan'
import InputJurnalHafalan from './InputJurnalHafalan'
import RiwayatJurnalSantri from './RiwayatJurnalSantri'

const MENU_PENGAJAR = [
  { id: 'beranda', label: 'Beranda', icon: '⌂' },
  { id: 'data-santri', label: 'Data Santri Bimbingan', icon: '♧' },
  { id: 'input-jurnal', label: 'Input Jurnal Hafalan', icon: '✎' },
  { id: 'riwayat-jurnal', label: 'Riwayat Jurnal Santri', icon: '▤' },
  { id: 'catatan-murajaah', label: 'Catatan Murajaah', icon: '◷' },
  { id: 'target-hafalan', label: 'Target Hafalan Santri', icon: '◎' },
  { id: 'rekap-perkembangan', label: 'Rekap Perkembangan', icon: '▥' },
  { id: 'laporan-penilaian', label: 'Laporan Penilaian', icon: '▧' },
]

function DashboardPengajar() {
  const [halamanAktif, setHalamanAktif] = useState('beranda')
  const [menuMobileTerbuka, setMenuMobileTerbuka] = useState(false)

  const pindahHalaman = (id) => {
    setHalamanAktif(id)
    setMenuMobileTerbuka(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  // Menerima navigasi dari tombol akses cepat di Beranda
  useEffect(() => {
    const handleNavigasi = (event) => {
      pindahHalaman(event.detail)
    }

    window.addEventListener('navigasi-pengajar', handleNavigasi)

    return () => {
      window.removeEventListener('navigasi-pengajar', handleNavigasi)
    }
  }, [])

  const menuAktif = MENU_PENGAJAR.find(
    (menu) => menu.id === halamanAktif
  )

  return (
    <div className="dashboard-pengajar">

      <aside className="pengajar-sidebar">

        <div className="sidebar-brand">
          <div className="sidebar-brand-icon">📖</div>
          <div>
            <h2>Jurnal Tahfidz</h2>
            <span>Digital</span>
          </div>
        </div>

        <div className="sidebar-menu-title">
          MENU PENGAJAR
        </div>

        <nav className={`sidebar-nav ${menuMobileTerbuka ? 'mobile-open' : ''}`}>
          {MENU_PENGAJAR.map((menu) => (
            <button
              key={menu.id}
              type="button"
              className={`sidebar-nav-item ${
                halamanAktif === menu.id ? 'active' : ''
              }`}
              onClick={() => pindahHalaman(menu.id)}
            >
              <span className="sidebar-nav-icon">{menu.icon}</span>
              <span>{menu.label}</span>
            </button>
          ))}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-teacher">
            <div className="sidebar-teacher-avatar">UI</div>
            <div className="sidebar-teacher-info">
              <strong>Ustadz Imam</strong>
              <span>Pengajar Tahfidz</span>
            </div>
          </div>

          <button
            type="button"
            className="logout-button"
            onClick={() => {
              window.location.href = '/'
            }}
          >
            Keluar
          </button>
        </div>

      </aside>

      <main className="pengajar-main">

        <header className="pengajar-topbar">
          <button
            type="button"
            className="mobile-menu-button"
            onClick={() => setMenuMobileTerbuka(!menuMobileTerbuka)}
          >
            ☰
          </button>

          <div className="topbar-breadcrumb">
            Dashboard Pengajar
            <span>/</span>
            <strong>{menuAktif?.label}</strong>
          </div>

          <div className="topbar-profile">
            <div className="topbar-avatar">UI</div>
            <div>
              <strong>Ustadz Imam</strong>
              <span>Pengajar</span>
            </div>
          </div>
        </header>

        <div className="pengajar-page-content">

          {halamanAktif === 'beranda' && (
            <BerandaPengajar />
          )}

{halamanAktif === 'riwayat-jurnal' && (
  <RiwayatJurnalSantri />
)}

          {halamanAktif === 'input-jurnal' && (
  <InputJurnalHafalan />
)}

          {halamanAktif === 'data-santri' && (
            <DataSantriBimbingan />
          )}

          {!['beranda', 'data-santri', 'input-jurnal', 'riwayat-jurnal'].includes(halamanAktif) && (
  <div>
    <h2>{menuAktif?.label}</h2>
    <p>Halaman ini akan dibuat pada tahap berikutnya.</p>
  </div>
)}

        </div>

      </main>

    </div>
  )
}

export default DashboardPengajar
