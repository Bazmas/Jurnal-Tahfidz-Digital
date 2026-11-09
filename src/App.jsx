
import { useState, useEffect } from 'react'
import './App.css'
import AdminDashboard from './AdminDashboard'
import SantriDashboard from './SantriDashboard'
import DashboardPengajar from './DashboardPengajar'

function App() {
  const [namaPengguna, setNamaPengguna] = useState('')
  const [kataSandi, setKataSandi] = useState('')
  const [lihatSandi, setLihatSandi] = useState(false)
  const [pesan, setPesan] = useState('')
  const [sudahLogin, setSudahLogin] = useState(false)
  const [sudahLoginSantri, setSudahLoginSantri] = useState(false)
  const [sudahLoginPengajar, setSudahLoginPengajar] = useState(false)
  const [halaman, setHalaman] = useState('welcome')
  const [pendaftaranTerkirim, setPendaftaranTerkirim] = useState(false)

  const dataAwalSantri = {
    nama: '',
    jenisKelamin: '',
    usia: '',
    alamat: '',
    namaWali: '',
    nomorWhatsapp: '',
  }

  const DATA_SANTRI_AWAL = [
    {
      id: 'santri-awal-1',
      nama: 'Ahmad Fauzan',
      jenisKelamin: 'Laki-laki',
      usia: '14',
      namaWali: 'Budi Santoso',
      nomorWhatsapp: '0895123456789',
      alamat: 'Jl. Raya Sawangan No. 24, Sawangan, Depok',
    },
    {
      id: 'santri-awal-2',
      nama: 'Muhammad Rafi',
      jenisKelamin: 'Laki-laki',
      usia: '13',
      namaWali: 'Agus Setiawan',
      nomorWhatsapp: '0895123456790',
      alamat: 'Jl. Abdul Wahab No. 15, Sawangan, Depok',
    },
    {
      id: 'santri-awal-3',
      nama: 'Abdullah Fathan',
      jenisKelamin: 'Laki-laki',
      usia: '15',
      namaWali: 'Hendra Wijaya',
      nomorWhatsapp: '0895123456791',
      alamat: 'Gg. H. Sairi No. 8, Pasir Putih, Depok',
    },
    {
      id: 'santri-awal-4',
      nama: 'Yusuf Alfarizi',
      jenisKelamin: 'Laki-laki',
      usia: '12',
      namaWali: 'Dedi Kurniawan',
      nomorWhatsapp: '0895123456792',
      alamat: 'Jl. Pendidikan No. 32, Pasir Putih, Depok',
    },
    {
      id: 'santri-awal-5',
      nama: 'Salman Alfaruq',
      jenisKelamin: 'Laki-laki',
      usia: '16',
      namaWali: 'Rudi Hartono',
      nomorWhatsapp: '0895123456793',
      alamat: 'Gg. Mushola Al-Ikhlas No. 11, Pasir Putih, Depok',
    },
    {
      id: 'santri-awal-6',
      nama: 'Aisyah Putri',
      jenisKelamin: 'Perempuan',
      usia: '13',
      namaWali: 'Fajar Nugroho',
      nomorWhatsapp: '0812345678910',
      alamat: 'Jl. Pengasinan Raya No. 17, Bedahan, Depok',
    },
    {
      id: 'santri-awal-7',
      nama: 'Fatimah Zahra',
      jenisKelamin: 'Perempuan',
      usia: '15',
      namaWali: 'Eko Prasetyo',
      nomorWhatsapp: '0812345678911',
      alamat: 'Gg. H. Nawi No. 6, Bedahan, Depok',
    },
    {
      id: 'santri-awal-8',
      nama: 'Khadijah Aulia',
      jenisKelamin: 'Perempuan',
      usia: '12',
      namaWali: 'Bambang Irawan',
      nomorWhatsapp: '0812345678912',
      alamat: 'Jl. Kampung Kandang No. 29, Bedahan, Depok',
    },
    {
      id: 'santri-awal-9',
      nama: 'Maryam Safitri',
      jenisKelamin: 'Perempuan',
      usia: '14',
      namaWali: 'Taufik Hidayat',
      nomorWhatsapp: '0812345678913',
      alamat: 'Jl. Masjid Al-Muhajirin No. 12, Sawangan, Depok',
    },
    {
      id: 'santri-awal-10',
      nama: 'Siti Humairah',
      jenisKelamin: 'Perempuan',
      usia: '16',
      namaWali: 'Wahyu Firmansyah',
      nomorWhatsapp: '0812345678914',
      alamat: 'Gg. Melati No. 9, Bedahan, Depok',
    },
  ]

  const [dataSantri, setDataSantri] = useState(dataAwalSantri)

  // DATA SANTRI MENUNGGU
    // DATA SANTRI MENUNGGU
  const [daftarMenunggu, setDaftarMenunggu] = useState(() => {
    const dataTersimpan = localStorage.getItem(
      'jurnalTahfidz_daftarMenunggu'
    )

    const dataAktifTersimpan = localStorage.getItem(
      'jurnalTahfidz_daftarAktif'
    )

    let dataMenunggu = []
    let dataAktif = []

    try {
      dataMenunggu = dataTersimpan
        ? JSON.parse(dataTersimpan)
        : []
    } catch {
      dataMenunggu = []
    }

    try {
      dataAktif = dataAktifTersimpan
        ? JSON.parse(dataAktifTersimpan)
        : []
    } catch {
      dataAktif = []
    }

    // Jika masih ada data menunggu, gunakan data tersebut
    if (
      Array.isArray(dataMenunggu) &&
      dataMenunggu.length > 0
    ) {
      return dataMenunggu
    }

    // Jika sudah ada santri aktif, jangan munculkan ulang data dummy
    if (
      Array.isArray(dataAktif) &&
      dataAktif.length > 0
    ) {
      return []
    }

    // Pemulihan satu kali jika kedua daftar kosong
    const sudahDipulihkan = localStorage.getItem(
      'jurnalTahfidz_dataDummyDipulihkan'
    )

    if (!sudahDipulihkan) {
      localStorage.setItem(
        'jurnalTahfidz_dataDummyDipulihkan',
        'true'
      )

      return DATA_SANTRI_AWAL
    }

    return []
  })

  // DATA SANTRI AKTIF
  // MEMUAT DATA LAMA DARI LOCALSTORAGE
  const [daftarAktif, setDaftarAktif] = useState(() => {
    const dataTersimpan = localStorage.getItem(
      'jurnalTahfidz_daftarAktif'
    )

    if (dataTersimpan) {
      try {
        const data = JSON.parse(dataTersimpan)
        return Array.isArray(data) ? data : []
      } catch {
        return []
      }
    }

    return []
  })

  // SIMPAN DATA SANTRI MENUNGGU
  useEffect(() => {
    localStorage.setItem('jurnalTahfidz_dataAwalDimuat', 'true')

    localStorage.setItem(
      'jurnalTahfidz_daftarMenunggu',
      JSON.stringify(daftarMenunggu)
    )
  }, [daftarMenunggu])

  // SIMPAN DATA SANTRI AKTIF
  useEffect(() => {
    localStorage.setItem(
      'jurnalTahfidz_daftarAktif',
      JSON.stringify(daftarAktif)
    )
  }, [daftarAktif])

  function handleLogin(e) {
    e.preventDefault()

    if (namaPengguna === 'admin' && kataSandi === 'admin123') {
      setSudahLogin(true)
      setSudahLoginSantri(false)
      setSudahLoginPengajar(false)
      setPesan('')
    } else if (
      namaPengguna === 'santri' &&
      kataSandi === 'santri123'
    ) {
      setSudahLoginSantri(true)
      setSudahLogin(false)
      setSudahLoginPengajar(false)
      setPesan('')
    } else if (
      namaPengguna === 'ustadz' &&
      kataSandi === 'ustadz123'
    ) {
      setSudahLoginPengajar(true)
      setSudahLogin(false)
      setSudahLoginSantri(false)
      setPesan('')
    } else {
      setPesan('Nama pengguna atau kata sandi tidak sesuai.')
    }
  }

  function handleLogout() {
    setSudahLogin(false)
    setSudahLoginSantri(false)
    setSudahLoginPengajar(false)
    setNamaPengguna('')
    setKataSandi('')
    setPesan('')
    setHalaman('login')
  }

  function handlePendaftaran(e) {
    e.preventDefault()

    const pendaftarBaru = {
      ...dataSantri,
      id: Date.now(),
      tanggalDaftar: new Date().toISOString(),
    }

    setDaftarMenunggu((dataSebelumnya) => [
      ...dataSebelumnya,
      pendaftarBaru,
    ])

    setPendaftaranTerkirim(true)
  }

  // SETUJUI PENDAFTARAN SANTRI
  function handleSetujuiSantri(id) {
    const santriDisetujui = daftarMenunggu.find(
      (santri) => santri.id === id
    )

    if (!santriDisetujui) return

    setDaftarAktif((dataSebelumnya) => {
      const sudahAda = dataSebelumnya.some(
        (santri) => santri.id === id
      )

      if (sudahAda) return dataSebelumnya

      return [
        ...dataSebelumnya,
        {
          ...santriDisetujui,
          tanggalDisetujui: new Date().toISOString(),
        },
      ]
    })

    setDaftarMenunggu((dataSebelumnya) =>
      dataSebelumnya.filter((santri) => santri.id !== id)
    )
  }

  function handleHapusPendaftaran(id) {
    setDaftarMenunggu((dataSebelumnya) =>
      dataSebelumnya.filter((santri) => santri.id !== id)
    )
  }

  // DASHBOARD PENGAJAR
  if (sudahLoginPengajar) {
    return <DashboardPengajar onLogout={handleLogout} />
  }

  // DASHBOARD SANTRI
  if (sudahLoginSantri) {
    return (
      <SantriDashboard
        onLogout={handleLogout}
        dataSantri={DATA_SANTRI_AWAL[0]}
      />
    )
  }

  // DASHBOARD ADMIN
  if (sudahLogin) {
    return (
      <AdminDashboard
        onLogout={handleLogout}
        daftarMenunggu={daftarMenunggu}
        daftarAktif={daftarAktif}
        onSetujuiSantri={handleSetujuiSantri}
        onHapusPendaftaran={handleHapusPendaftaran}
      />
    )
  }

  /* =====================================
     WELCOME PAGE
  ===================================== */

  if (halaman === 'welcome') {
    return (
      <main className="halaman-welcome">
        <header className="welcome-header">
          <div className="welcome-logo">
            <img
              src="/images/logo-jurnal-tahfidz-600x200.png"
              alt="Logo Jurnal Tahfidz"
            />
          </div>
        </header>

        <section className="welcome-hero">
          <div className="welcome-content">
            <span className="welcome-label">
              ✦ JURNAL TAHFIDZ DIGITAL
            </span>

            <h1>
              Jurnal Tahfidz Digital,
              <br />
              Pantau Hafalan Lebih Terarah
            </h1>

            <p>
              Menghafal Al-Qur'an, menjaga Kalam-Nya. Catat setoran,
              pantau target, dan ikuti perkembangan hafalan santri
              dalam satu aplikasi.
            </p>

            <div className="welcome-image">
              <img
                src="/images/hero-contoh.png"
                alt="Santri sedang menghafal Al-Qur'an"
              />
            </div>

            <div className="welcome-actions">
              <button
                onClick={() => setHalaman('login')}
                className="welcome-button"
              >
                Masuk ke Aplikasi →
              </button>

              <button
                onClick={() => setHalaman('daftar')}
                className="welcome-register"
              >
                Daftar sebagai Santri
              </button>
            </div>
          </div>
        </section>

        <footer className="welcome-footer">
          © 2026 Jurnal Tahfidz Digital. Prototype by Basuki
        </footer>
      </main>
    )
  }

  /* =====================================
     PENDAFTARAN SANTRI
  ===================================== */

  if (halaman === 'daftar') {
    return (
      <main className="halaman-pendaftaran">
        <div className="form-pendaftaran">
          {!pendaftaranTerkirim ? (
            <>
              <div className="logo-pendaftaran">
                <img
                  src="/images/logo-jurnal-tahfidz-512.png"
                  alt="Logo Jurnal Tahfidz"
                />
              </div>

              <div className="judul-form">
                <span className="ikon-login">✦</span>
                <h2>Pendaftaran Santri</h2>
                <p>
                  Silakan lengkapi data untuk mendaftar sebagai santri.
                </p>
              </div>

              <form onSubmit={handlePendaftaran}>
                <div className="kolom-form">
                  <label>Nama Lengkap Santri</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama lengkap"
                    value={dataSantri.nama}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        nama: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="kolom-form">
                  <label>Jenis Kelamin</label>
                  <select
                    value={dataSantri.jenisKelamin}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        jenisKelamin: e.target.value,
                      })
                    }
                    required
                  >
                    <option value="">Pilih jenis kelamin</option>
                    <option value="Laki-laki">Laki-laki</option>
                    <option value="Perempuan">Perempuan</option>
                  </select>
                </div>

                <div className="kolom-form">
                  <label>Usia</label>
                  <input
                    type="number"
                    placeholder="Masukkan usia (tahun)"
                    min="1"
                    max="100"
                    value={dataSantri.usia}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        usia: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="kolom-form">
                  <label>Alamat</label>
                  <textarea
                    rows="3"
                    value={dataSantri.alamat}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        alamat: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="kolom-form">
                  <label>Nama Orang Tua / Wali</label>
                  <input
                    type="text"
                    placeholder="Masukkan nama orang tua atau wali"
                    value={dataSantri.namaWali}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        namaWali: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="kolom-form">
                  <label>Nomor WhatsApp Orang Tua / Wali</label>
                  <input
                    type="tel"
                    placeholder="Contoh: 081234567890"
                    value={dataSantri.nomorWhatsapp}
                    onChange={(e) =>
                      setDataSantri({
                        ...dataSantri,
                        nomorWhatsapp: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <button type="submit" className="tombol-masuk">
                  Kirim Pendaftaran <span>→</span>
                </button>
              </form>

              <button
                className="tombol-kembali-login"
                onClick={() => setHalaman('login')}
              >
                ← Kembali ke halaman login
              </button>
            </>
          ) : (
            <div className="konfirmasi-pendaftaran">
              <span>✓</span>
              <h2>Pendaftaran Berhasil Dikirim</h2>
              <p>
                Terima kasih. Pendaftaran Anda menunggu persetujuan
                Administrator.
              </p>

              <button
                className="tombol-masuk"
                onClick={() => {
                  setHalaman('login')
                  setPendaftaranTerkirim(false)
                  setDataSantri({ ...dataAwalSantri })
                }}
              >
                Kembali ke Login
              </button>
            </div>
          )}
        </div>
      </main>
    )
  }

  /* =====================================
     LOGIN PAGE
  ===================================== */

  return (
    <main className="halaman-login">
      <section className="login-kiri">
        <div className="identitas-aplikasi">
          <div
            className="logo-aplikasi"
            onClick={() => setHalaman('welcome')}
            role="button"
            tabIndex={0}
            title="Kembali ke halaman utama"
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                setHalaman('welcome')
              }
            }}
          >
            <img
              src="/images/logo-jurnal-tahfidz-512.png"
              alt="Logo Jurnal Tahfidz"
            />
          </div>

          <div>
            <h2>Jurnal Tahfidz</h2>
            <p>Al-Qur'an Digital</p>
          </div>
        </div>

        <div className="sambutan">
          <h1>Ahlan bikum</h1>

          <div className="login-hero-image">
            <img
              src="/images/login-hero.png"
              alt="Santri sedang menghafal Al-Qur'an"
            />
          </div>
        </div>
      </section>

      <section className="login-kanan">
        <div className="form-login">
          <div className="judul-form">
            <h2>LOGIN</h2>
            <p>Silakan masuk ke akun Anda untuk melanjutkan.</p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="kolom-form">
              <label htmlFor="namaPengguna">Nama Pengguna</label>
              <input
                id="namaPengguna"
                type="text"
                placeholder="Masukkan nama pengguna"
                value={namaPengguna}
                onChange={(e) => setNamaPengguna(e.target.value)}
                required
              />
            </div>

            <div className="kolom-form">
              <label htmlFor="kataSandi">Kata Sandi</label>

              <div className="input-sandi">
                <input
                  id="kataSandi"
                  type={lihatSandi ? 'text' : 'password'}
                  placeholder="Masukkan kata sandi"
                  value={kataSandi}
                  onChange={(e) => setKataSandi(e.target.value)}
                  required
                />

                <button
                  type="button"
                  onClick={() => setLihatSandi(!lihatSandi)}
                  className="tombol-lihat"
                >
                  {lihatSandi ? 'Sembunyikan' : 'Lihat'}
                </button>
              </div>
            </div>

            <button type="submit" className="tombol-masuk">
              Masuk ke Aplikasi
              <span>→</span>
            </button>

            {pesan && <p className="pesan-login">{pesan}</p>}
          </form>

          <button
            className="link-daftar-santri"
            onClick={() => {
              setHalaman('daftar')
              setPendaftaranTerkirim(false)
            }}
          >
            Daftar sebagai Santri
          </button>

          <div className="kredit-aplikasi">
            <span>—</span>
            © 2026 Jurnal Tahfidz Digital. Prototype by Basuki
            <span>—</span>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
