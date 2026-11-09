
import { useState, useEffect } from 'react'
import './AdminDashboard.css'

const HARI = [
  'Senin',
  'Selasa',
  'Rabu',
  'Kamis',
  'Jumat',
  'Sabtu',
  'Minggu',
]

// DATABASE FOTO PENGAJAR (INDEXEDDB)
const bukaDatabaseFoto = () =>
  new Promise((resolve, reject) => {
    const request = indexedDB.open('JurnalTahfidzFoto', 1)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains('fotoPengajar')) {
        db.createObjectStore('fotoPengajar', { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })

const simpanFotoDatabase = async (id, foto) => {
  if (!foto) return

  const db = await bukaDatabaseFoto()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('fotoPengajar', 'readwrite')

    transaction.objectStore('fotoPengajar').put({ id, foto })

    transaction.oncomplete = () => {
      db.close()
      resolve()
    }

    transaction.onerror = () => {
      db.close()
      reject(transaction.error)
    }
  })
}

const ambilFotoDatabase = async (id) => {
  const db = await bukaDatabaseFoto()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction('fotoPengajar', 'readonly')
    const request = transaction.objectStore('fotoPengajar').get(id)

    request.onsuccess = () => {
      resolve(request.result?.foto || '')
      db.close()
    }

    request.onerror = () => {
      db.close()
      reject(request.error)
    }
  })
}

// DATA DUMMY PENGAJAR
const PENGAJAR_DUMMY = [
  {
    id: 'pengajar-imam',
    sapaan: 'Ustadz',
    nama: 'Imam',
    nomorHp: '081234567890',
    alamat: 'Depok',
    password: 'imam123',
    foto: '',
    hariMengajar: ['Senin', 'Rabu', 'Jumat'],
  },
  {
    id: 'pengajar-fulanah',
    sapaan: 'Ustadzah',
    nama: 'Fulanah',
    nomorHp: '081234567891',
    alamat: 'Depok',
    password: 'fulanah123',
    foto: '',
    hariMengajar: ['Selasa', 'Kamis', 'Sabtu'],
  },
]

// DATA DUMMY KELOMPOK DAN SANTRI
const KELOMPOK_DUMMY = [
  {
    id: 'kelompok-a',
    nama: 'Kelompok A',
    pengajarId: 'pengajar-imam',
    santri: [
      'Ahmad Fauzan',
      'Muhammad Zaid',
      'Abdullah Fikri',
      'Ali Akbar',
      'Yusuf Ibrahim',
    ],
  },
  {
    id: 'kelompok-b',
    nama: 'Kelompok B',
    pengajarId: 'pengajar-fulanah',
    santri: [
      'Aisyah Zahra',
      'Fatimah Azzahra',
      'Maryam Khadijah',
      'Hafshah Nabila',
      'Zainab Safira',
    ],
  },
]

export default function AdminDashboard({
  onLogout,
  daftarMenunggu = [],
  daftarAktif = [],
  onSetujuiSantri = () => {},
  onHapusPendaftaran = () => {},
}) {
  const [halaman, setHalaman] = useState('dashboard')
  const [tabSantri, setTabSantri] = useState('menunggu')
  const [santriDipilih, setSantriDipilih] = useState(null)

  const [daftarPengajar, setDaftarPengajar] = useState(PENGAJAR_DUMMY)
  const [dataSiap, setDataSiap] = useState(false)

  const [pengajarDipilih, setPengajarDipilih] = useState(null)
  const [modePengajar, setModePengajar] = useState('tambah')

  // MEMUAT DATA PENGAJAR DAN FOTO
  useEffect(() => {
    let batal = false

    const muatData = async () => {
      try {
        const dataTersimpan = localStorage.getItem('dataPengajarTahfidz')

        let dataPengajar = dataTersimpan
          ? JSON.parse(dataTersimpan)
          : PENGAJAR_DUMMY

        if (!Array.isArray(dataPengajar)) {
          dataPengajar = PENGAJAR_DUMMY
        }

        const dataLengkap = await Promise.all(
          dataPengajar.map(async (pengajar) => {
            let foto = pengajar.foto || ''

            // Pindahkan foto lama dari localStorage ke IndexedDB
            if (foto.startsWith('data:image/')) {
              await simpanFotoDatabase(pengajar.id, foto)
            } else {
              foto = await ambilFotoDatabase(pengajar.id)
            }

            return {
              ...pengajar,
              foto,
              hariMengajar: pengajar.hariMengajar || [],
            }
          })
        )

        if (!batal) {
          setDaftarPengajar(dataLengkap)
          setDataSiap(true)
        }
      } catch (error) {
        console.error('Gagal memuat data pengajar:', error)

        if (!batal) {
          alert('Data pengajar gagal dimuat. Silakan muat ulang halaman.')
          setDataSiap(true)
        }
      }
    }

    muatData()

    return () => {
      batal = true
    }
  }, [])

  // SIMPAN DATA PENGAJAR DAN FOTO
  useEffect(() => {
    if (!dataSiap) return

    const simpanData = async () => {
      try {
        // Foto tidak dimasukkan ke localStorage
        const dataTanpaFoto = daftarPengajar.map((pengajar) => {
          const { foto, ...dataLain } = pengajar
          return dataLain
        })

        localStorage.setItem(
          'dataPengajarTahfidz',
          JSON.stringify(dataTanpaFoto)
        )

        // Foto disimpan terpisah di IndexedDB
        await Promise.all(
          daftarPengajar.map(async (pengajar) => {
            if (pengajar.foto) {
              await simpanFotoDatabase(pengajar.id, pengajar.foto)
            }
          })
        )
      } catch (error) {
        console.error('Gagal menyimpan data pengajar:', error)
        alert('Penyimpanan data atau foto pengajar gagal. Silakan coba kembali.')
      }
    }

    simpanData()
  }, [daftarPengajar, dataSiap])

  // DATA KELOMPOK
  const [daftarKelompok] = useState(KELOMPOK_DUMMY)
  const [kelompokDipilih, setKelompokDipilih] = useState(null)

  // CARI PENGAJAR PADA KELOMPOK
  const pengajarKelompokDipilih = kelompokDipilih
    ? daftarPengajar.find(
        (item) => item.id === kelompokDipilih.pengajarId
      )
    : null

  const [formPengajar, setFormPengajar] = useState({
    sapaan: 'Ustadz',
    nama: '',
    nomorHp: '',
    alamat: '',
    password: '',
    foto: '',
    hariMengajar: [],
  })

  const menu = [
    { icon: '🎓', title: 'Data Santri', desc: 'Kelola data santri' },
    {
      icon: '👨‍🏫',
      title: 'Data Pengajar',
      desc: 'Kelola data dan akun login pengajar',
    },
    {
      icon: '👥',
      title: 'Kelompok Tahfidz',
      desc: 'Lihat kelompok dan daftar santri',
    },
  ]

  // BUKA FORM PENGAJAR
  const bukaFormPengajar = (mode, pengajar = null) => {
    setModePengajar(mode)
    setPengajarDipilih(pengajar)

    if (pengajar) {
      setFormPengajar({
        ...pengajar,
        hariMengajar: pengajar.hariMengajar || [],
      })
    } else {
      setFormPengajar({
        sapaan: 'Ustadz',
        nama: '',
        nomorHp: '',
        alamat: '',
        password: '',
        foto: '',
        hariMengajar: [],
      })
    }

    setHalaman('form-pengajar')
  }

  // PILIH HARI MENGAJAR
  const toggleHariMengajar = (hari) => {
    setFormPengajar((prev) => ({
      ...prev,
      hariMengajar: prev.hariMengajar.includes(hari)
        ? prev.hariMengajar.filter((item) => item !== hari)
        : [...prev.hariMengajar, hari],
    }))
  }

  // UPLOAD FOTO PENGAJAR
  const handleUploadFoto = (e) => {
    const file = e.target.files[0]

    if (!file) return

    if (!['image/jpeg', 'image/png', 'image/webp'].includes(file.type)) {
      alert('Gunakan foto JPG, PNG, atau WebP.')
      e.target.value = ''
      return
    }

    if (file.size > 2 * 1024 * 1024) {
      alert('Ukuran foto maksimal 2 MB.')
      e.target.value = ''
      return
    }

    const reader = new FileReader()

    reader.onload = () => {
      const gambar = new Image()

      gambar.onload = () => {
        const canvas = document.createElement('canvas')
        const batas = 500

        let lebar = gambar.width
        let tinggi = gambar.height

        if (lebar > tinggi && lebar > batas) {
          tinggi = Math.round((tinggi * batas) / lebar)
          lebar = batas
        } else if (tinggi > batas) {
          lebar = Math.round((lebar * batas) / tinggi)
          tinggi = batas
        }

        canvas.width = lebar
        canvas.height = tinggi

        const konteks = canvas.getContext('2d')

        if (!konteks) {
          alert('Foto gagal diproses. Silakan coba kembali.')
          return
        }

        konteks.drawImage(gambar, 0, 0, lebar, tinggi)

        const fotoKompres = canvas.toDataURL('image/jpeg', 0.75)

        setFormPengajar((prev) => ({
          ...prev,
          foto: fotoKompres,
        }))
      }

      gambar.onerror = () => {
        alert('Foto gagal diproses. Silakan gunakan foto lain.')
      }

      gambar.src = reader.result
    }

    reader.onerror = () => {
      alert('Foto gagal dibaca. Silakan coba kembali.')
    }

    reader.readAsDataURL(file)
  }

  // SIMPAN DATA PENGAJAR
  const simpanPengajar = (e) => {
    e.preventDefault()

    if (
      !formPengajar.nama.trim() ||
      !formPengajar.nomorHp.trim() ||
      !formPengajar.alamat.trim() ||
      !formPengajar.password.trim()
    ) {
      alert('Mohon lengkapi seluruh data pengajar.')
      return
    }

    const nomorHp = formPengajar.nomorHp.trim()

    const nomorSudahAda = daftarPengajar.some(
      (item) =>
        item.nomorHp === nomorHp &&
        item.id !== pengajarDipilih?.id
    )

    if (nomorSudahAda) {
      alert('Nomor HP tersebut sudah digunakan sebagai username.')
      return
    }

    if (modePengajar === 'tambah') {
      setDaftarPengajar((prev) => [
        ...prev,
        {
          ...formPengajar,
          id: Date.now(),
          nomorHp,
        },
      ])
    } else {
      setDaftarPengajar((prev) =>
        prev.map((item) =>
          item.id === pengajarDipilih.id
            ? { ...formPengajar, id: item.id, nomorHp }
            : item
        )
      )
    }

    setPengajarDipilih(null)
    setHalaman('pengajar')
  }

  // HAPUS PENGAJAR
  const hapusPengajar = (id) => {
    const konfirmasi = window.confirm(
      'Apakah Anda yakin ingin menghapus data dan akun pengajar ini?'
    )

    if (!konfirmasi) return

    setDaftarPengajar((prev) => prev.filter((item) => item.id !== id))
    setPengajarDipilih(null)
    setHalaman('pengajar')
  }

  // KOMPONEN FOTO PENGAJAR
  const AvatarPengajar = ({ foto, nama, ukuran = 'normal' }) => {
    return foto ? (
      <img
        src={foto}
        alt={nama || 'Foto Pengajar'}
        className={`foto-pengajar ${
          ukuran === 'besar' ? 'foto-pengajar-besar' : ''
        }`}
      />
    ) : (
      <div
        className={`foto-pengajar-placeholder ${
          ukuran === 'besar' ? 'foto-pengajar-placeholder-besar' : ''
        }`}
      >
        👤
      </div>
    )
  }

  return (
    <div className="admin-dashboard">
      <header className="admin-header">
        <div className="admin-brand">
          <img
            src="/images/logo-jurnal-tahfidz-512-white.png"
            alt="Logo Jurnal Tahfidz"
          />
        </div>

        <button className="logout-button" onClick={onLogout}>
          Keluar
        </button>
      </header>

      <main className="admin-content">

        {/* DASHBOARD UTAMA */}
        {halaman === 'dashboard' && (
          <>
            <section className="welcome-section">
              <h2>Assalamu'alaikum!</h2>
              <p>Selamat datang di Dashboard Administrator.</p>
            </section>

            <h3>Ringkasan Data</h3>

            <section className="stats-grid">
              <div className="stat-card">
                <span>🎓</span>
                <strong>{daftarAktif.length}</strong>
                <p>Santri Aktif</p>
              </div>

              <div className="stat-card">
                <span>📋</span>
                <strong>{daftarMenunggu.length}</strong>
                <p>Menunggu Persetujuan</p>
              </div>

              <div className="stat-card">
                <span>👨‍🏫</span>
                <strong>{daftarPengajar.length}</strong>
                <p>Pengajar</p>
              </div>

              <div className="stat-card">
                <span>👥</span>
                <strong>{daftarKelompok.length}</strong>
                <p>Kelompok Tahfidz</p>
              </div>
            </section>

            <h3>Menu Administrator</h3>

            <section className="admin-menu">
              {menu.map((item) => (
                <button
                  className="menu-card"
                  key={item.title}
                  onClick={() => {
                    if (item.title === 'Data Santri') {
                      setHalaman('santri')
                      setSantriDipilih(null)
                    }

                    if (item.title === 'Data Pengajar') {
                      setHalaman('pengajar')
                      setPengajarDipilih(null)
                    }

                    if (item.title === 'Kelompok Tahfidz') {
                      setHalaman('kelompok')
                      setKelompokDipilih(null)
                    }
                  }}
                >
                  <span className="menu-icon">{item.icon}</span>

                  <span className="menu-info">
                    <strong>{item.title}</strong>
                    <small>{item.desc}</small>
                  </span>

                  <span className="menu-arrow">›</span>
                </button>
              ))}
            </section>
          </>
        )}

        {/* HALAMAN DATA SANTRI */}
        {halaman === 'santri' && (
          <>
            <section className="page-header">
              <div>
                <h2>Data Santri</h2>
                <p>Kelola pendaftaran dan data santri.</p>
              </div>

              <button
                className="back-button"
                onClick={() => setHalaman('dashboard')}
              >
                ← Kembali
              </button>
            </section>

            <div className="santri-tabs">
              <button
                className={`santri-tab ${
                  tabSantri === 'menunggu' ? 'active' : ''
                }`}
                onClick={() => {
                  setTabSantri('menunggu')
                  setSantriDipilih(null)
                }}
              >
                Menunggu Persetujuan ({daftarMenunggu.length})
              </button>

              <button
                className={`santri-tab ${
                  tabSantri === 'aktif' ? 'active' : ''
                }`}
                onClick={() => {
                  setTabSantri('aktif')
                  setSantriDipilih(null)
                }}
              >
                Santri Aktif ({daftarAktif.length})
              </button>
            </div>

            <section className="santri-panel">
              {santriDipilih ? (
                <div className="detail-santri">
                  <h3>Detail Pendaftaran</h3>

                  <p>
                    <strong>Nama Santri:</strong> {santriDipilih.nama}
                  </p>
                  <p>
                    <strong>Jenis Kelamin:</strong>{' '}
                    {santriDipilih.jenisKelamin}
                  </p>
                  <p>
                    <strong>Usia:</strong> {santriDipilih.usia} tahun
                  </p>
                  <p>
                    <strong>Alamat:</strong> {santriDipilih.alamat}
                  </p>
                  <p>
                    <strong>Nama Orang Tua / Wali:</strong>{' '}
                    {santriDipilih.namaWali}
                  </p>
                  <p>
                    <strong>Nomor WhatsApp:</strong>{' '}
                    {santriDipilih.nomorWhatsapp}
                  </p>

                  <button
                    className="back-button"
                    onClick={() => setSantriDipilih(null)}
                  >
                    ← Kembali ke Daftar
                  </button>

                  {tabSantri === 'menunggu' && (
                    <div className="aksi-santri">
                      <button
                        className="primary-button"
                        onClick={() => {
                          onSetujuiSantri(santriDipilih.id)
                          setSantriDipilih(null)
                        }}
                      >
                        Setujui Pendaftaran
                      </button>

                      <button
                        className="back-button"
                        onClick={() => {
                          onHapusPendaftaran(santriDipilih.id)
                          setSantriDipilih(null)
                        }}
                      >
                        Hapus Pendaftaran
                      </button>
                    </div>
                  )}
                </div>
              ) : tabSantri === 'menunggu' ? (
                daftarMenunggu.length > 0 ? (
                  <div className="daftar-santri">
                    {daftarMenunggu.map((santri) => (
                      <div className="santri-item" key={santri.id}>
                        <div>
                          <strong>{santri.nama}</strong>
                          <p>
                            {santri.usia} tahun · {santri.namaWali}
                          </p>
                          <span className="status-badge">
                            Menunggu Persetujuan
                          </span>
                        </div>

                        <button
                          className="back-button"
                          onClick={() => setSantriDipilih(santri)}
                        >
                          Lihat Detail
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="santri-empty">
                    <span>📋</span>
                    <strong>Belum Ada Pendaftaran</strong>
                    <p>Pendaftaran santri baru akan muncul di sini.</p>
                  </div>
                )
              ) : daftarAktif.length > 0 ? (
                <div className="daftar-santri">
                  {daftarAktif.map((santri) => (
                    <div className="santri-item" key={santri.id}>
                      <div>
                        <strong>{santri.nama}</strong>
                        <p>
                          {santri.usia} tahun · {santri.namaWali}
                        </p>
                        <span className="status-badge">Santri Aktif</span>
                      </div>

                      <button
                        className="back-button"
                        onClick={() => setSantriDipilih(santri)}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="santri-empty">
                  <span>🎓</span>
                  <strong>Belum Ada Santri Aktif</strong>
                  <p>Santri yang telah disetujui akan muncul di sini.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* HALAMAN DATA PENGAJAR */}
        {halaman === 'pengajar' && (
          <>
            <section className="page-header">
              <div>
                <h2>Data Pengajar</h2>
                <p>Kelola data pribadi dan akun login pengajar.</p>
              </div>

              <button
                className="back-button"
                onClick={() => setHalaman('dashboard')}
              >
                ← Kembali
              </button>
            </section>

            <div className="pengajar-toolbar">
              <div>
                <strong>{daftarPengajar.length} Pengajar</strong>
                <p>Daftar pengajar yang terdaftar di sistem.</p>
              </div>

              <button
                className="primary-button"
                onClick={() => bukaFormPengajar('tambah')}
              >
                + Tambah Pengajar
              </button>
            </div>

            <section className="santri-panel">
              {daftarPengajar.length > 0 ? (
                <div className="daftar-santri">
                  {daftarPengajar.map((pengajar) => (
                    <div className="santri-item" key={pengajar.id}>
                      <div className="pengajar-identitas">
                        <AvatarPengajar
                          foto={pengajar.foto}
                          nama={pengajar.nama}
                        />

                        <div>
                          <strong>
                            {pengajar.sapaan} {pengajar.nama}
                          </strong>
                          <p>Username: {pengajar.nomorHp}</p>
                          <p>
                            Hari Mengajar:{' '}
                            {(pengajar.hariMengajar || []).join(', ') || '-'}
                          </p>
                        </div>
                      </div>

                      <button
                        className="back-button"
                        onClick={() => {
                          setPengajarDipilih(pengajar)
                          setHalaman('detail-pengajar')
                        }}
                      >
                        Lihat Detail
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="santri-empty">
                  <span>👨‍🏫</span>
                  <strong>Belum Ada Data Pengajar</strong>
                  <p>Silakan tambahkan pengajar melalui tombol di atas.</p>
                </div>
              )}
            </section>
          </>
        )}

        {/* FORM TAMBAH DAN EDIT PENGAJAR */}
        {halaman === 'form-pengajar' && (
          <>
            <section className="page-header">
              <div>
                <h2>
                  {modePengajar === 'tambah'
                    ? 'Tambah Pengajar'
                    : 'Edit Data Pengajar'}
                </h2>
                <p>Lengkapi data pribadi dan akun login pengajar.</p>
              </div>

              <button
                className="back-button"
                onClick={() => setHalaman('pengajar')}
              >
                ← Kembali
              </button>
            </section>

            <form className="pengajar-form" onSubmit={simpanPengajar}>
              <h3>Data Pengajar</h3>

              <label>Foto Pengajar</label>

              <div className="preview-foto-container">
                <AvatarPengajar
                  foto={formPengajar.foto}
                  nama={formPengajar.nama}
                  ukuran="besar"
                />
              </div>

              <input
                type="file"
                accept="image/jpeg,image/png,image/webp"
                onChange={handleUploadFoto}
              />

              <small className="pengajar-hint">
                Format JPG, PNG, atau WebP. Ukuran maksimal 2 MB.
              </small>

              <label>Sapaan</label>
              <select
                value={formPengajar.sapaan}
                onChange={(e) =>
                  setFormPengajar({
                    ...formPengajar,
                    sapaan: e.target.value,
                  })
                }
              >
                <option value="Ustadz">Ustadz</option>
                <option value="Ustadzah">Ustadzah</option>
              </select>

              <label>Nama Lengkap</label>
              <input
                type="text"
                placeholder="Masukkan nama lengkap"
                value={formPengajar.nama}
                onChange={(e) =>
                  setFormPengajar({
                    ...formPengajar,
                    nama: e.target.value,
                  })
                }
              />

              <label>Nomor HP / WhatsApp</label>
              <input
                type="tel"
                placeholder="Contoh: 081234567890"
                value={formPengajar.nomorHp}
                onChange={(e) =>
                  setFormPengajar({
                    ...formPengajar,
                    nomorHp: e.target.value,
                  })
                }
              />

              <label>Alamat</label>
              <textarea
                rows="3"
                placeholder="Masukkan alamat lengkap"
                value={formPengajar.alamat}
                onChange={(e) =>
                  setFormPengajar({
                    ...formPengajar,
                    alamat: e.target.value,
                  })
                }
              />

              <label>Hari Mengajar</label>
              <div className="hari-mengajar-list">
                {HARI.map((hari) => (
                  <label className="hari-mengajar-item" key={hari}>
                    <input
                      type="checkbox"
                      checked={formPengajar.hariMengajar.includes(hari)}
                      onChange={() => toggleHariMengajar(hari)}
                    />
                    <span>{hari}</span>
                  </label>
                ))}
              </div>

              <h3>Data Login</h3>

              <label>Username</label>
              <input
                type="text"
                value={formPengajar.nomorHp}
                readOnly
                placeholder="Username mengikuti nomor HP"
              />

              <small className="pengajar-hint">
                Username otomatis menggunakan nomor HP pengajar.
              </small>

              <label>Password</label>
              <input
                type="password"
                placeholder="Buat password untuk pengajar"
                value={formPengajar.password}
                onChange={(e) =>
                  setFormPengajar({
                    ...formPengajar,
                    password: e.target.value,
                  })
                }
              />

              <div className="pengajar-form-actions">
                <button type="submit" className="primary-button">
                  {modePengajar === 'tambah'
                    ? 'Simpan Pengajar'
                    : 'Simpan Perubahan'}
                </button>

                <button
                  type="button"
                  className="back-button"
                  onClick={() => setHalaman('pengajar')}
                >
                  Batal
                </button>
              </div>
            </form>
          </>
        )}

        {/* DETAIL PENGAJAR */}
        {halaman === 'detail-pengajar' && pengajarDipilih && (
          <>
            <section className="page-header">
              <div>
                <h2>Detail Pengajar</h2>
                <p>Informasi data pribadi dan akun login.</p>
              </div>

              <button
                className="back-button"
                onClick={() => setHalaman('pengajar')}
              >
                ← Kembali
              </button>
            </section>

            <section className="santri-panel detail-pengajar">
              <div className="detail-foto-pengajar">
                <AvatarPengajar
                  foto={pengajarDipilih.foto}
                  nama={pengajarDipilih.nama}
                  ukuran="besar"
                />
              </div>

              <h3>Data Pengajar</h3>

              <p>
                <strong>Sapaan:</strong> {pengajarDipilih.sapaan}
              </p>
              <p>
                <strong>Nama Lengkap:</strong> {pengajarDipilih.nama}
              </p>
              <p>
                <strong>Nomor HP:</strong> {pengajarDipilih.nomorHp}
              </p>
              <p>
                <strong>Alamat:</strong> {pengajarDipilih.alamat}
              </p>
              <p>
                <strong>Hari Mengajar:</strong>{' '}
                {(pengajarDipilih.hariMengajar || []).join(', ') || '-'}
              </p>

              <h3>Data Login</h3>

              <p>
                <strong>Username:</strong> {pengajarDipilih.nomorHp}
              </p>
              <p>
                <strong>Password:</strong> ••••••••
              </p>

              <div className="pengajar-form-actions">
                <button
                  className="primary-button"
                  onClick={() => bukaFormPengajar('edit', pengajarDipilih)}
                >
                  Edit Data / Password
                </button>

                <button
                  className="back-button"
                  onClick={() => hapusPengajar(pengajarDipilih.id)}
                >
                  Hapus Pengajar
                </button>
              </div>
            </section>
          </>
        )}

        {/* HALAMAN KELOMPOK TAHFIDZ */}
        {halaman === 'kelompok' && (
          <>
            <section className="page-header">
              <div>
                <h2>Kelompok Tahfidz</h2>
                <p>Daftar kelompok, pengajar, dan santri.</p>
              </div>

              <button
                className="back-button"
                onClick={() => {
                  setHalaman('dashboard')
                  setKelompokDipilih(null)
                }}
              >
                ← Kembali
              </button>
            </section>

            {kelompokDipilih ? (
              <section className="santri-panel detail-kelompok">
                <button
                  className="back-button"
                  onClick={() => setKelompokDipilih(null)}
                >
                  ← Kembali ke Kelompok
                </button>

                <h3>{kelompokDipilih.nama}</h3>

                <div className="detail-pengajar-kelompok">
                  <AvatarPengajar
                    foto={pengajarKelompokDipilih?.foto}
                    nama={pengajarKelompokDipilih?.nama}
                    ukuran="besar"
                  />

                  <div>
                    <strong>Pengajar</strong>
                    <p>
                      {pengajarKelompokDipilih
                        ? `${pengajarKelompokDipilih.sapaan} ${pengajarKelompokDipilih.nama}`
                        : '-'}
                    </p>
                  </div>
                </div>

                <h3>Daftar Nama Santri</h3>

                <div className="daftar-santri">
                  {kelompokDipilih.santri.map((nama, index) => (
                    <div className="kelompok-santri-item" key={index}>
                      <span>{index + 1}</span>
                      <strong>{nama}</strong>
                    </div>
                  ))}
                </div>
              </section>
            ) : (
              <div className="kelompok-grid">
                {daftarKelompok.map((kelompok) => {
                  const pengajar = daftarPengajar.find(
                    (item) => item.id === kelompok.pengajarId
                  )

                  return (
                    <section className="kelompok-card" key={kelompok.id}>
                      <div className="kelompok-foto-pengajar">
                        <AvatarPengajar
                          foto={pengajar?.foto}
                          nama={pengajar?.nama}
                          ukuran="besar"
                        />
                      </div>

                      <h3>{kelompok.nama}</h3>

                      <p>
                        <strong>Pengajar:</strong>{' '}
                        {pengajar
                          ? `${pengajar.sapaan} ${pengajar.nama}`
                          : '-'}
                      </p>

                      <p>
                        <strong>Jumlah Santri:</strong>{' '}
                        {kelompok.santri.length}
                      </p>

                      <button
                        className="primary-button"
                        onClick={() => setKelompokDipilih(kelompok)}
                      >
                        Lihat Detail
                      </button>
                    </section>
                  )
                })}
              </div>
            )}
          </>
        )}

      </main>
    </div>
  )
}
