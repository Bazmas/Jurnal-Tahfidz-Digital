
import './BerandaPengajar.css'

const RINGKASAN = [
  {
    angka: '5',
    label: 'Santri Bimbingan',
    keterangan: 'Santri aktif Ustadz Imam',
    icon: '👥',
    warna: 'hijau',
  },
  {
    angka: '12',
    label: 'Setoran Hari Ini',
    keterangan: 'Contoh data aktivitas',
    icon: '📖',
    warna: 'biru',
  },
  {
    angka: '8',
    label: 'Hafalan Diterima',
    keterangan: 'Contoh data penilaian',
    icon: '✓',
    warna: 'kuning',
  },
  {
    angka: '4',
    label: 'Perlu Perbaikan',
    keterangan: 'Contoh data penilaian',
    icon: '↻',
    warna: 'merah',
  },
]

const AKTIVITAS = [
  {
    nama: 'Ahmad Fauzan',
    surah: 'An-Naba’',
    ayat: '1–10',
    jenis: 'Hafalan Baru',
    status: 'Diterima',
    waktu: '16.15',
  },
  {
    nama: 'Muhammad Rafi',
    surah: 'An-Nazi’at',
    ayat: '1–8',
    jenis: 'Murajaah',
    status: 'Diterima',
    waktu: '16.30',
  },
  {
    nama: 'Abdullah Fathan',
    surah: '‘Abasa',
    ayat: '1–12',
    jenis: 'Hafalan Baru',
    status: 'Perlu Perbaikan',
    waktu: '16.45',
  },
  {
    nama: 'Yusuf Alfarizi',
    surah: 'At-Takwir',
    ayat: '1–10',
    jenis: 'Murajaah',
    status: 'Diterima',
    waktu: '17.00',
  },
]

const AKSES_CEPAT = [
  {
    judul: 'Input Jurnal Hafalan',
    deskripsi: 'Catat setoran hafalan santri',
    icon: '✍️',
    halaman: 'input-jurnal',
  },
  {
    judul: 'Data Santri Bimbingan',
    deskripsi: 'Lihat daftar santri bimbingan',
    icon: '👥',
    halaman: 'data-santri',
  },
  {
    judul: 'Riwayat Jurnal Santri',
    deskripsi: 'Periksa riwayat setoran santri',
    icon: '📚',
    halaman: 'riwayat-jurnal',
  },
  {
    judul: 'Target Hafalan Santri',
    deskripsi: 'Pantau target hafalan',
    icon: '🎯',
    halaman: 'target-hafalan',
  },
]

function BerandaPengajar() {
  const bukaMenu = (halaman) => {
    window.dispatchEvent(
      new CustomEvent('navigasi-pengajar', {
        detail: halaman,
      })
    )
  }

  return (
    <div className="beranda-pengajar">

      {/* JUDUL HALAMAN */}
      <div className="beranda-heading">
        <div>
          <span className="beranda-eyebrow">DASHBOARD PENGAJAR</span>
          <h1>Beranda</h1>
          <p>Ringkasan aktivitas bimbingan tahfidz Anda.</p>
        </div>

        <div className="beranda-tanggal">
          <span>📅</span>
          <div>
            <strong>Ahad, 8 November 2026</strong>
            <small>Jurnal Tahfidz Digital</small>
          </div>
        </div>
      </div>

      {/* BANNER SAMBUTAN */}
      <section className="pengajar-welcome">
        <div className="welcome-content">
          <span className="welcome-label">ASSALAMU'ALAIKUM WARAHMATULLAHI WABARAKATUH</span>
          <img
  src="/images/foto-ustadz-dummy.png"
  alt="Ustadz Imam"
  className="welcome-photo"
/>
          <h2>Selamat Datang, Ustadz Imam</h2>
          <p>
            Semoga Allah memudahkan setiap langkah dalam membimbing
            para santri menghafal dan menjaga Al-Qur'an.
          </p>
          <button
            type="button"
            onClick={() => bukaMenu('data-santri')}
          >
            Lihat Santri Bimbingan <span>→</span>
          </button>
        </div>

        <div className="welcome-decoration">
          <div className="welcome-quran">۞</div>
          <span>خيركم من تعلم القرآن وعلمه</span>
        </div>
      </section>

      {/* RINGKASAN */}
      <section className="beranda-section">
        <div className="section-heading">
          <div>
            <h2>Ringkasan Aktivitas</h2>
            <p>Gambaran aktivitas bimbingan tahfidz.</p>
          </div>
        </div>

        <div className="ringkasan-grid">
          {RINGKASAN.map((item, index) => (
            <div className="ringkasan-card" key={index}>
              <div className={`ringkasan-icon ${item.warna}`}>
                {item.icon}
              </div>
              <div className="ringkasan-info">
                <span>{item.label}</span>
                <strong>{item.angka}</strong>
                <small>{item.keterangan}</small>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* JADWAL DAN PERKEMBANGAN */}
      <section className="beranda-middle-grid">

        <div className="beranda-card jadwal-card">
          <div className="card-heading">
            <div>
              <h2>Jadwal Mengajar</h2>
              <p>Jadwal bimbingan Ustadz Imam</p>
            </div>
            <span className="card-heading-icon">🗓️</span>
          </div>

          <div className="jadwal-waktu">
            <span>WAKTU MENGAJAR</span>
            <strong>Bada Ashar</strong>
          </div>

          <div className="jadwal-hari">
            {['Senin', 'Rabu', 'Jumat'].map((hari) => (
              <span key={hari}>{hari}</span>
            ))}
          </div>

          <div className="jadwal-catatan">
            <span>📍</span>
            <p>Kelompok A · Bimbingan Tahfidz</p>
          </div>
        </div>

        <div className="beranda-card perkembangan-card">
          <div className="card-heading">
            <div>
              <h2>Perkembangan Hafalan</h2>
              <p>Ringkasan progres santri bimbingan</p>
            </div>
            <span className="card-heading-icon">📈</span>
          </div>

          <div className="perkembangan-content">
            <div className="perkembangan-total">
              <strong>5 Santri</strong>
              <span>Dalam bimbingan</span>
            </div>

            <div className="perkembangan-bar-list">
              <div className="perkembangan-bar-item">
                <div>
                  <span>Hafalan diterima</span>
                  <strong>65%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill diterima" style={{ width: '65%' }} />
                </div>
              </div>

              <div className="perkembangan-bar-item">
                <div>
                  <span>Dalam proses</span>
                  <strong>25%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill proses" style={{ width: '25%' }} />
                </div>
              </div>

              <div className="perkembangan-bar-item">
                <div>
                  <span>Perlu perbaikan</span>
                  <strong>10%</strong>
                </div>
                <div className="progress-track">
                  <div className="progress-fill perbaikan" style={{ width: '10%' }} />
                </div>
              </div>
            </div>
          </div>

          <small className="data-demo-note">
            Ilustrasi visual · Menunggu data jurnal sebenarnya
          </small>
        </div>

      </section>

      {/* AKTIVITAS SETORAN */}
      <section className="beranda-card aktivitas-card">
        <div className="card-heading">
          <div>
            <h2>Aktivitas Setoran Terbaru</h2>
            <p>Contoh riwayat aktivitas santri bimbingan</p>
          </div>

          <button
            type="button"
            className="lihat-semua-button"
            onClick={() => bukaMenu('riwayat-jurnal')}
          >
            Lihat Semua →
          </button>
        </div>

        <div className="aktivitas-table-wrapper">
          <table className="aktivitas-table">
            <thead>
              <tr>
                <th>Nama Santri</th>
                <th>Surah / Ayat</th>
                <th>Jenis Setoran</th>
                <th>Waktu</th>
                <th>Status</th>
              </tr>
            </thead>

            <tbody>
              {AKTIVITAS.map((item, index) => (
                <tr key={index}>
                  <td>
                    <strong>{item.nama}</strong>
                  </td>
                  <td>{item.surah} ({item.ayat})</td>
                  <td>{item.jenis}</td>
                  <td>{item.waktu}</td>
                  <td>
                    <span
                      className={`status-setoran ${
                        item.status === 'Diterima'
                          ? 'status-diterima'
                          : 'status-perbaikan'
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* AKSES CEPAT */}
      <section className="beranda-section akses-section">
        <div className="section-heading">
          <div>
            <h2>Akses Cepat</h2>
            <p>Menu yang sering digunakan pengajar.</p>
          </div>
        </div>

        <div className="akses-grid">
          {AKSES_CEPAT.map((item) => (
            <button
              type="button"
              className="akses-card"
              key={item.halaman}
              onClick={() => bukaMenu(item.halaman)}
            >
              <span className="akses-icon">{item.icon}</span>
              <span className="akses-text">
                <strong>{item.judul}</strong>
                <small>{item.deskripsi}</small>
              </span>
              <span className="akses-arrow">→</span>
            </button>
          ))}
        </div>
      </section>

    </div>
  )
}

export default BerandaPengajar
