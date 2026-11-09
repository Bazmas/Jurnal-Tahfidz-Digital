
import { useState } from 'react'
import './SantriDashboard.css'

const DAFTAR_SURAH = [
  { nama: "An-Naba'", ayat: 40 },
  { nama: 'An-Nazi’at', ayat: 46 },
  { nama: "'Abasa", ayat: 42 },
  { nama: 'At-Takwir', ayat: 29 },
  { nama: 'Al-Infitar', ayat: 19 },
]

export default function SantriDashboard({ onLogout, dataSantri }) {
  const [lihatSertifikat, setLihatSertifikat] = useState(false)

  const santri = dataSantri || {
    nama: 'Ahmad Fauzan',
    jenisKelamin: 'Laki-laki',
    usia: '14',
    namaWali: 'Budi Santoso',
    nomorWhatsapp: '0895123456789',
    alamat: 'Jl. Raya Sawangan No. 24, Sawangan, Depok',
  }

  return (
    <main className="santri-dashboard">
      <header className="santri-header">
        <div className="santri-header-brand">
          <img
            src="/images/logo-jurnal-tahfidz-512.png"
            alt="Logo Jurnal Tahfidz"
          />
          <div>
            <span>JURNAL TAHFIDZ DIGITAL</span>
            <h2>Dashboard Santri</h2>
          </div>
        </div>
        <button onClick={onLogout}>Keluar</button>
      </header>

      <section className="santri-welcome">
        <img
          src="images/santri-pria/santri-pria-dummy.png"
          alt="Foto santri"
        />
        <div>
          <p>Assalamu'alaikum,</p>
          <h1>{santri.nama}</h1>
          <span>Kelompok Tahfidz A · Ustadz Imam</span>
        </div>
      </section>

      {/* PROFIL SANTRI */}
      <section className="santri-profil">
        <div className="santri-section-heading">
          <span>👤</span>
          <h2>Profil Santri</h2>
        </div>

        <div className="santri-profil-list">
          <p>
            <span>Nama lengkap</span>
            <strong>{santri.nama}</strong>
          </p>
          <p>
            <span>Jenis kelamin</span>
            <strong>{santri.jenisKelamin}</strong>
          </p>
          <p>
            <span>Usia</span>
            <strong>{santri.usia} tahun</strong>
          </p>
          <p>
            <span>Orang tua / wali</span>
            <strong>{santri.namaWali}</strong>
          </p>
          <p>
            <span>Nomor WhatsApp wali</span>
            <strong>{santri.nomorWhatsapp}</strong>
          </p>
          <p>
            <span>Alamat</span>
            <strong>{santri.alamat}</strong>
          </p>
        </div>
      </section>

      {/* RANGKUMAN */}
      <section className="santri-summary-grid">
        <div className="summary-card summary-green">
          <span className="summary-icon">📖</span>
          <div className="summary-copy">
            <h3 className="summary-label-chip">Surah Sudah Dihafal</h3>
            <p>5 Surat</p>
          </div>
        </div>

        <div className="summary-card summary-blue summary-target">
          <span className="summary-icon">🎯</span>
          <div className="summary-copy">
            <h3 className="summary-label-chip">Target Ayat</h3>
            <p>Al-Mulk ayat 1–5</p>
          </div>
        </div>
      </section>

      {/* KELOMPOK, JADWAL, DAN PROGRES */}
      <section className="santri-detail-grid">
        <div className="santri-detail-left">
          <div className="summary-card summary-orange">
            <span className="summary-icon">👥</span>
            <div className="summary-copy">
              <h3 className="summary-label-chip">Target Waktu Menghafal</h3>
              <strong className="summary-duration">3-7hari</strong>
            </div>
          </div>

          <div className="santri-schedule-card">
            <div className="schedule-title">
              <span>📅</span>
              <h3>Jadwal Mengaji</h3>
            </div>
            <strong>Bada Ashar</strong>
            <div className="schedule-days">
              <span>Senin</span>
              <span>Rabu</span>
              <span>Jumat</span>
            </div>
          </div>
        </div>

        <div className="santri-progress-card">
          <div className="progress-heading">
            <span>📊</span>
            <h3>Progres Hafalan</h3>
          </div>

          <div className="progress-item progress-item--juz30">
            <span>Juz 30</span>
            <strong>13,5%</strong>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: '13.5%' }}
              />
            </div>
            <small>5 dari 37 surah</small>
          </div>

          <div className="progress-divider" />

          <div className="progress-item progress-item--all-juz">
            <span>30 Juz</span>
            <strong>4,39%</strong>
            <div className="progress-track">
              <div
                className="progress-fill"
                style={{ width: '4.39%' }}
              />
            </div>
            <small>5 dari 114 surah</small>
          </div>
        </div>
      </section>

      {/* TARGET HAFALAN */}
<section className="santri-target">
  <div className="santri-section-heading">
    <span>🎯</span>
    <h2>Target Hafalan Saat Ini</h2>
  </div>
  <h3>Surah Al-Mulk</h3>
  <p>Ayat 1–5</p>

  <div
    style={{
      marginTop: '18px',
      padding: '16px',
      background: '#ffffff',
      borderRadius: '10px',
      borderLeft: '4px solid #16834a',
      textAlign: 'left',
    }}
  >
    <div style={{ fontWeight: '700', color: '#064e3b', marginBottom: '8px' }}>
      📝 Catatan Pengajar
    </div>
    <p style={{ margin: '0 0 8px', color: '#26352c', fontSize: '14px' }}>
      Pertahankan kelancaran hafalan dan perhatikan makhraj huruf.
      Terus murajaah agar hafalan semakin kuat.
    </p>
    <small style={{ color: '#607568' }}>
      Ustadz Imam · 12 Juni 2026
    </small>
  </div>
</section>

      {/* RIWAYAT HAFALAN */}
      <section className="santri-hafalan">
        <div className="santri-section-heading">
          <span>📖</span>
          <h2>Riwayat Hafalan</h2>
        </div>

        <p className="santri-subtitle">Juz 30 (Juz Amma)</p>

        <div className="santri-daftar-surah">
          {DAFTAR_SURAH.map((surah, index) => (
            <div className="santri-surah" key={surah.nama}>
              <div className="santri-nomor">{index + 1}</div>
              <div className="santri-info-surah">
                <strong>{surah.nama}</strong>
                <span>{surah.ayat} ayat</span>
              </div>
              <span className="santri-status">✓ Hafal</span>
            </div>
          ))}
        </div>
      </section>

      {/* SERTIFIKAT HAFALAN */}
      <section
        style={{
          background: '#f5f8f6',
          padding: '22px',
          borderRadius: '14px',
          marginTop: '24px',
          boxShadow: '0 3px 12px rgba(0,0,0,0.05)',
        }}
      >
        <div className="santri-section-heading">
          <span>🏆</span>
          <h2>Sertifikat Hafalan</h2>
        </div>

        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: '14px',
            marginTop: '18px',
          }}
        >
          <div
            style={{
              flex: '1 1 220px',
              padding: '18px',
              borderRadius: '12px',
              background: '#e8f4ed',
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#064e3b' }}>
              🏅 Sertifikat Juz 30
            </h3>
            <p style={{ fontSize: '13px', color: '#52645a' }}>
              Sertifikat hafalan Juz 30.
            </p>
            <button
              onClick={() => setLihatSertifikat(true)}
              style={{
                width: '100%',
                padding: '11px',
                border: 'none',
                borderRadius: '8px',
                background: '#16834a',
                color: '#ffffff',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              Lihat Sertifikat
            </button>
          </div>

          <div
            style={{
              flex: '1 1 220px',
              padding: '18px',
              borderRadius: '12px',
              background: '#e8f4ed',
            }}
          >
            <h3 style={{ margin: '0 0 8px', color: '#52645a' }}>
              🎓 Sertifikat Khatam 30 Juz
            </h3>
            <p style={{ fontSize: '13px', color: '#52645a' }}>
              Penghargaan setelah menyelesaikan seluruh 30 Juz.
            </p>
            <button
              disabled
              style={{
                width: '100%',
                padding: '11px',
                border: 'none',
                borderRadius: '8px',
                background: '#c3e4ce',
                color: '#064e3b',
                fontWeight: '600',
                cursor: 'not-allowed',
              }}
            >
              Belum Tersedia
            </button>
          </div>
        </div>
      </section>

      {/* POP-UP VISUAL SERTIFIKAT */}
      {lihatSertifikat && (
        <div
          onClick={() => setLihatSertifikat(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            background: 'rgba(6,78,59,0.78)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '18px',
            overflowY: 'auto',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              width: '100%',
              maxWidth: '900px',
              background: '#ffffff',
              padding: '16px',
              borderRadius: '14px',
              position: 'relative',
              margin: 'auto',
            }}
          >
            <button
              onClick={() => setLihatSertifikat(false)}
              style={{
                display: 'block',
                marginLeft: 'auto',
                marginBottom: '12px',
                padding: '9px 18px',
                border: 'none',
                borderRadius: '8px',
                background: '#16834a',
                color: '#ffffff',
                fontWeight: '600',
                cursor: 'pointer',
              }}
            >
              ✕ Tutup
            </button>

            <img
              src="/images/sertifikat-juz-30-dummy.png"
              alt="Sertifikat Hafalan Juz 30"
              style={{
                display: 'block',
                width: '100%',
                height: 'auto',
                borderRadius: '6px',
              }}
            />
          </div>
        </div>
      )}

      <footer className="santri-footer">
        © 2026 Jurnal Tahfidz Digital. Prototype by Basuki
      </footer>
    </main>
  )
}
