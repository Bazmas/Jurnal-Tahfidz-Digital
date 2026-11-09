
import { useEffect, useState } from 'react'
import './InputJurnalHafalan.css'

const DAFTAR_SANTRI = [
  { id: 1, nama: 'Ahmad Fauzan', usia: 14, kelompok: 'Kelompok A', foto: 'AF' },
  { id: 2, nama: 'Muhammad Rafi', usia: 13, kelompok: 'Kelompok A', foto: 'MR' },
  { id: 3, nama: 'Abdullah Fathan', usia: 15, kelompok: 'Kelompok A', foto: 'AF' },
  { id: 4, nama: 'Yusuf Alfarizi', usia: 12, kelompok: 'Kelompok A', foto: 'YA' },
  { id: 5, nama: 'Salman Alfaruq', usia: 16, kelompok: 'Kelompok A', foto: 'SA' },
]

const DAFTAR_SURAH = [
  ['Al-Fatihah', 7], ['Al-Baqarah', 286], ['Ali Imran', 200],
  ['An-Nisa', 176], ['Al-Maidah', 120], ['Al-Anam', 165],
  ['Al-Araf', 206], ['Al-Anfal', 75], ['At-Taubah', 129],
  ['Yunus', 109], ['Hud', 123], ['Yusuf', 111],
  ['Ar-Rad', 43], ['Ibrahim', 52], ['Al-Hijr', 99],
  ['An-Nahl', 128], ['Al-Isra', 111], ['Al-Kahfi', 110],
  ['Maryam', 98], ['Taha', 135], ['Al-Anbiya', 112],
  ['Al-Hajj', 78], ['Al-Muminun', 118], ['An-Nur', 64],
  ['Al-Furqan', 77], ['Asy-Syuara', 227], ['An-Naml', 93],
  ['Al-Qasas', 88], ['Al-Ankabut', 69], ['Ar-Rum', 60],
  ['Luqman', 34], ['As-Sajdah', 30], ['Al-Ahzab', 73],
  ['Saba', 54], ['Fatir', 45], ['Yasin', 83],
  ['As-Saffat', 182], ['Sad', 88], ['Az-Zumar', 75],
  ['Ghafir', 85], ['Fussilat', 54], ['Asy-Syura', 53],
  ['Az-Zukhruf', 89], ['Ad-Dukhan', 59], ['Al-Jasiyah', 37],
  ['Al-Ahqaf', 35], ['Muhammad', 38], ['Al-Fath', 29],
  ['Al-Hujurat', 18], ['Qaf', 45], ['Az-Zariyat', 60],
  ['At-Tur', 49], ['An-Najm', 62], ['Al-Qamar', 55],
  ['Ar-Rahman', 78], ['Al-Waqiah', 96], ['Al-Hadid', 29],
  ['Al-Mujadilah', 22], ['Al-Hasyr', 24], ['Al-Mumtahanah', 13],
  ['As-Saff', 14], ['Al-Jumuah', 11], ['Al-Munafiqun', 11],
  ['At-Tagabun', 18], ['At-Talaq', 12], ['At-Tahrim', 12],
  ['Al-Mulk', 30], ['Al-Qalam', 52], ['Al-Haqqah', 52],
  ['Al-Maarij', 44], ['Nuh', 28], ['Al-Jinn', 28],
  ['Al-Muzzammil', 20], ['Al-Muddassir', 56], ['Al-Qiyamah', 40],
  ['Al-Insan', 31], ['Al-Mursalat', 50], ['An-Naba', 40],
  ['An-Naziat', 46], ['Abasa', 42], ['At-Takwir', 29],
  ['Al-Infitar', 19], ['Al-Mutaffifin', 36], ['Al-Insyiqaq', 25],
  ['Al-Buruj', 22], ['At-Tariq', 17], ['Al-Ala', 19],
  ['Al-Ghasyiyah', 26], ['Al-Fajr', 30], ['Al-Balad', 20],
  ['Asy-Syams', 15], ['Al-Lail', 21], ['Ad-Duha', 11],
  ['Asy-Syarh', 8], ['At-Tin', 8], ['Al-Alaq', 19],
  ['Al-Qadr', 5], ['Al-Bayyinah', 8], ['Az-Zalzalah', 8],
  ['Al-Adiyat', 11], ['Al-Qariah', 11], ['At-Takasur', 8],
  ['Al-Asr', 3], ['Al-Humazah', 9], ['Al-Fil', 5],
  ['Quraisy', 4], ['Al-Maun', 7], ['Al-Kausar', 3],
  ['Al-Kafirun', 6], ['An-Nasr', 3], ['Al-Lahab', 5],
  ['Al-Ikhlas', 4], ['Al-Falaq', 5], ['An-Nas', 6],
]

// DATA DUMMY RIWAYAT UNTUK 5 SANTRI
const DUMMY_RIWAYAT = [
  {
    id: 'dummy-1',
    santriId: 1,
    namaSantri: 'Ahmad Fauzan',
    tanggal: '2026-11-08',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 10,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Hafalan sudah lancar. Pertahankan makhraj dan panjang pendek bacaan.',
  },
  {
    id: 'dummy-2',
    santriId: 1,
    namaSantri: 'Ahmad Fauzan',
    tanggal: '2026-11-06',
    jenisSetoran: 'Murajaah',
    surah: 'Al-Mulk',
    ayatMulai: 1,
    ayatSampai: 10,
    kelancaran: 'Sangat Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Murajaah berjalan dengan baik.',
  },
  {
    id: 'dummy-3',
    santriId: 1,
    namaSantri: 'Ahmad Fauzan',
    tanggal: '2026-11-04',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 5,
    kelancaran: 'Cukup',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Perlu mengulang beberapa bagian agar lebih lancar.',
  },
  {
    id: 'dummy-4',
    santriId: 2,
    namaSantri: 'Muhammad Rafi',
    tanggal: '2026-11-08',
    jenisSetoran: 'Murajaah',
    surah: 'An-Naziat',
    ayatMulai: 1,
    ayatSampai: 10,
    kelancaran: 'Cukup',
    ketepatan: 'Baik',
    status: 'Perlu Perbaikan',
    catatan: 'Ulangi kembali ayat yang masih tertukar.',
  },
  {
    id: 'dummy-5',
    santriId: 2,
    namaSantri: 'Muhammad Rafi',
    tanggal: '2026-11-06',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naziat',
    ayatMulai: 1,
    ayatSampai: 5,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Setoran diterima. Tingkatkan konsistensi murajaah.',
  },
  {
    id: 'dummy-6',
    santriId: 2,
    namaSantri: 'Muhammad Rafi',
    tanggal: '2026-11-04',
    jenisSetoran: 'Murajaah',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 20,
    kelancaran: 'Lancar',
    ketepatan: 'Cukup',
    status: 'Diterima',
    catatan: 'Perhatikan kembali ketepatan beberapa bacaan.',
  },
  {
    id: 'dummy-7',
    santriId: 3,
    namaSantri: 'Abdullah Fathan',
    tanggal: '2026-11-08',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 11,
    ayatSampai: 20,
    kelancaran: 'Sangat Lancar',
    ketepatan: 'Sangat Baik',
    status: 'Diterima',
    catatan: 'Alhamdulillah, setoran sangat baik. Pertahankan.',
  },
  {
    id: 'dummy-8',
    santriId: 3,
    namaSantri: 'Abdullah Fathan',
    tanggal: '2026-11-06',
    jenisSetoran: 'Murajaah',
    surah: 'Al-Mulk',
    ayatMulai: 1,
    ayatSampai: 15,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Hafalan lama terjaga dengan baik.',
  },
  {
    id: 'dummy-9',
    santriId: 3,
    namaSantri: 'Abdullah Fathan',
    tanggal: '2026-11-04',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 10,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Terus jaga kualitas hafalan.',
  },
  {
    id: 'dummy-10',
    santriId: 4,
    namaSantri: 'Yusuf Alfarizi',
    tanggal: '2026-11-08',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 5,
    kelancaran: 'Cukup',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Hafalan diterima. Perlu pengulangan mandiri agar lebih kuat.',
  },
  {
    id: 'dummy-11',
    santriId: 4,
    namaSantri: 'Yusuf Alfarizi',
    tanggal: '2026-11-06',
    jenisSetoran: 'Murajaah',
    surah: 'Al-Ikhlas',
    ayatMulai: 1,
    ayatSampai: 4,
    kelancaran: 'Sangat Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Bacaan sudah baik.',
  },
  {
    id: 'dummy-12',
    santriId: 4,
    namaSantri: 'Yusuf Alfarizi',
    tanggal: '2026-11-04',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 3,
    kelancaran: 'Perlu Bimbingan',
    ketepatan: 'Cukup',
    status: 'Perlu Perbaikan',
    catatan: 'Perlu mengulang ayat secara bertahap bersama pengajar.',
  },
  {
    id: 'dummy-13',
    santriId: 5,
    namaSantri: 'Salman Alfaruq',
    tanggal: '2026-11-08',
    jenisSetoran: 'Murajaah',
    surah: 'An-Naba',
    ayatMulai: 1,
    ayatSampai: 20,
    kelancaran: 'Sangat Lancar',
    ketepatan: 'Sangat Baik',
    status: 'Diterima',
    catatan: 'Murajaah sangat baik. Pertahankan hafalan.',
  },
  {
    id: 'dummy-14',
    santriId: 5,
    namaSantri: 'Salman Alfaruq',
    tanggal: '2026-11-06',
    jenisSetoran: 'Hafalan Baru',
    surah: 'An-Naba',
    ayatMulai: 11,
    ayatSampai: 15,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Setoran diterima dengan baik.',
  },
  {
    id: 'dummy-15',
    santriId: 5,
    namaSantri: 'Salman Alfaruq',
    tanggal: '2026-11-04',
    jenisSetoran: 'Murajaah',
    surah: 'Al-Mulk',
    ayatMulai: 1,
    ayatSampai: 15,
    kelancaran: 'Lancar',
    ketepatan: 'Baik',
    status: 'Diterima',
    catatan: 'Terus jaga kelancaran dan ketepatan bacaan.',
  },
]

const formatTanggal = (tanggal) => {
  if (!tanggal) return '-'

  return new Date(`${tanggal}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

const tanggalHariIni = () => {
  const sekarang = new Date()
  const tahun = sekarang.getFullYear()
  const bulan = String(sekarang.getMonth() + 1).padStart(2, '0')
  const hari = String(sekarang.getDate()).padStart(2, '0')

  return `${tahun}-${bulan}-${hari}`
}

function InputJurnalHafalan({ mode }) {
  const [santriId, setSantriId] = useState('1')
  const [tanggal, setTanggal] = useState(tanggalHariIni())
  const [jenisSetoran, setJenisSetoran] = useState('Hafalan Baru')
  const [surah, setSurah] = useState('Al-Mulk')
  const [ayatMulai, setAyatMulai] = useState('1')
  const [ayatSampai, setAyatSampai] = useState('5')
  const [kelancaran, setKelancaran] = useState('Lancar')
  const [ketepatan, setKetepatan] = useState('Baik')
  const [status, setStatus] = useState('Diterima')
  const [catatan, setCatatan] = useState('')
  const [pesan, setPesan] = useState('')
  const [jenisPesan, setJenisPesan] = useState('success')
  const [jurnal, setJurnal] = useState([])
  const [santriRiwayatId, setSantriRiwayatId] = useState('')
  useEffect(() => {
  if (mode === 'riwayat-jurnal') {
    setTimeout(() => {
      document.getElementById('riwayat-jurnal-section')
        ?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }, 100)
  }
}, [mode])

  const santriTerpilih = DAFTAR_SANTRI.find(
    (santri) => santri.id === Number(santriId)
  )

  const surahTerpilih = DAFTAR_SURAH.find((item) => item[0] === surah)
  const jumlahAyat = surahTerpilih ? surahTerpilih[1] : 0

  useEffect(() => {
    try {
      const dataTersimpan = localStorage.getItem('jurnalTahfidzPengajar')

      if (dataTersimpan) {
        setJurnal(JSON.parse(dataTersimpan))
      }
    } catch {
      setJurnal([])
    }
  }, [])

  function handleSimpan(e) {
    e.preventDefault()
    setPesan('')

    const mulai = Number(ayatMulai)
    const sampai = Number(ayatSampai)

    if (!santriTerpilih) {
      setJenisPesan('error')
      setPesan('Silakan pilih santri terlebih dahulu.')
      return
    }

    if (!tanggal) {
      setJenisPesan('error')
      setPesan('Tanggal setoran wajib diisi.')
      return
    }

    if (
      !mulai ||
      !sampai ||
      mulai < 1 ||
      sampai < mulai ||
      sampai > jumlahAyat
    ) {
      setJenisPesan('error')
      setPesan(
        `Rentang ayat tidak valid. Surah ${surah} memiliki ${jumlahAyat} ayat.`
      )
      return
    }

    const jurnalBaru = {
      id: `${Date.now()}`,
      santriId: santriTerpilih.id,
      namaSantri: santriTerpilih.nama,
      tanggal,
      jenisSetoran,
      surah,
      ayatMulai: mulai,
      ayatSampai: sampai,
      kelancaran,
      ketepatan,
      status,
      catatan: catatan.trim(),
      dibuatPada: new Date().toISOString(),
    }

    const jurnalTerbaru = [jurnalBaru, ...jurnal]

    try {
      localStorage.setItem(
        'jurnalTahfidzPengajar',
        JSON.stringify(jurnalTerbaru)
      )

      setJurnal(jurnalTerbaru)
      setJenisPesan('success')
      setPesan(`Jurnal setoran ${santriTerpilih.nama} berhasil disimpan.`)

      setCatatan('')
      setAyatMulai('1')
      setAyatSampai('5')
      setKelancaran('Lancar')
      setKetepatan('Baik')
      setStatus('Diterima')
    } catch {
      setJenisPesan('error')
      setPesan(
        'Jurnal belum berhasil disimpan. Periksa penyimpanan browser.'
      )
    }
  }

  const jumlahHariIni = jurnal.filter(
    (item) => item.tanggal === tanggalHariIni()
  ).length

  const jumlahDiterima = jurnal.filter(
    (item) => item.status === 'Diterima'
  ).length

  const jumlahMurajaah = jurnal.filter(
    (item) => item.jenisSetoran === 'Murajaah'
  ).length

  const riwayatSantri = santriRiwayatId
    ? [
        ...DUMMY_RIWAYAT.filter(
          (item) => item.santriId === Number(santriRiwayatId)
        ).map((item) => ({ ...item, sumber: 'Contoh' })),

        ...jurnal.filter(
          (item) => item.santriId === Number(santriRiwayatId)
        ).map((item) => ({ ...item, sumber: 'Tersimpan' })),
      ].sort((a, b) => {
        if (a.tanggal !== b.tanggal) {
          return b.tanggal.localeCompare(a.tanggal)
        }

        return String(b.dibuatPada || b.id).localeCompare(
          String(a.dibuatPada || a.id)
        )
      })
    : []

  const santriRiwayatTerpilih = DAFTAR_SANTRI.find(
    (santri) => santri.id === Number(santriRiwayatId)
  )

  return (
    <>
      <section className="page-heading">
        <div>
          <span className="heading-label">JURNAL SANTRI</span>
          <h1>Input Jurnal Hafalan</h1>
          <p>Catat setoran hafalan dan evaluasi santri bimbingan Anda.</p>
        </div>

        <div className="heading-date">
          <span>Hari ini</span>
          <strong>{formatTanggal(tanggalHariIni())}</strong>
        </div>
      </section>

      <section className="jurnal-summary">
        <div className="summary-card summary-green">
          <div className="summary-icon">♙</div>
          <div>
            <span>Santri Bimbingan</span>
            <strong>5</strong>
            <small>Santri aktif</small>
          </div>
        </div>

        <div className="summary-card summary-blue">
          <div className="summary-icon">✎</div>
          <div>
            <span>Setoran Hari Ini</span>
            <strong>{jumlahHariIni}</strong>
            <small>Catatan setoran</small>
          </div>
        </div>

        <div className="summary-card summary-orange">
          <div className="summary-icon">✓</div>
          <div>
            <span>Setoran Diterima</span>
            <strong>{jumlahDiterima}</strong>
            <small>Total jurnal diterima</small>
          </div>
        </div>

        <div className="summary-card summary-purple">
          <div className="summary-icon">↻</div>
          <div>
            <span>Catatan Murajaah</span>
            <strong>{jumlahMurajaah}</strong>
            <small>Total jurnal murajaah</small>
          </div>
        </div>
      </section>

      <form className="jurnal-form" onSubmit={handleSimpan}>
        <section className="form-section">
          <div className="form-section-heading">
            <div className="section-number">01</div>
            <div>
              <h3>Pilih Santri</h3>
              <p>Pilih santri yang menyetorkan hafalan.</p>
            </div>
          </div>

          <div className="student-picker">
            <div className="form-field student-select-field">
              <label htmlFor="pilihSantri">Nama Santri</label>
              <select
                id="pilihSantri"
                value={santriId}
                onChange={(e) => setSantriId(e.target.value)}
              >
                {DAFTAR_SANTRI.map((santri) => (
                  <option key={santri.id} value={santri.id}>
                    {santri.nama}
                  </option>
                ))}
              </select>
            </div>

            {santriTerpilih && (
              <div className="selected-student">
                <div className="student-avatar">{santriTerpilih.foto}</div>
                <div>
                  <strong>{santriTerpilih.nama}</strong>
                  <span>
                    {santriTerpilih.usia} tahun · {santriTerpilih.kelompok}
                  </span>
                </div>
                <span className="student-active">Aktif</span>
              </div>
            )}
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <div className="section-number">02</div>
            <div>
              <h3>Informasi Setoran</h3>
              <p>Masukkan detail hafalan yang disetorkan santri.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="tanggalSetoran">Tanggal Setoran</label>
              <input
                id="tanggalSetoran"
                type="date"
                value={tanggal}
                onChange={(e) => setTanggal(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label>Jenis Setoran</label>
              <div className="choice-group">
                {['Hafalan Baru', 'Murajaah'].map((jenis) => (
                  <button
                    type="button"
                    key={jenis}
                    className={
                      jenisSetoran === jenis
                        ? 'choice-button selected'
                        : 'choice-button'
                    }
                    onClick={() => setJenisSetoran(jenis)}
                  >
                    {jenisSetoran === jenis ? '● ' : '○ '}
                    {jenis}
                  </button>
                ))}
              </div>
            </div>

            <div className="form-field full-width">
              <label htmlFor="pilihSurah">Nama Surah</label>
              <select
                id="pilihSurah"
                value={surah}
                onChange={(e) => {
                  setSurah(e.target.value)
                  setAyatMulai('1')
                  setAyatSampai('1')
                }}
              >
                {DAFTAR_SURAH.map(([nama]) => (
                  <option key={nama} value={nama}>
                    {nama}
                  </option>
                ))}
              </select>

              <small className="field-hint">
                Surah {surah} terdiri dari {jumlahAyat} ayat.
              </small>
            </div>

            <div className="form-field">
              <label htmlFor="ayatMulai">Ayat Mulai</label>
              <input
                id="ayatMulai"
                type="number"
                min="1"
                max={jumlahAyat}
                value={ayatMulai}
                onChange={(e) => setAyatMulai(e.target.value)}
                required
              />
            </div>

            <div className="form-field">
              <label htmlFor="ayatSampai">Ayat Sampai</label>
              <input
                id="ayatSampai"
                type="number"
                min="1"
                max={jumlahAyat}
                value={ayatSampai}
                onChange={(e) => setAyatSampai(e.target.value)}
                required
              />
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <div className="section-number">03</div>
            <div>
              <h3>Penilaian Setoran</h3>
              <p>Berikan penilaian berdasarkan setoran langsung santri.</p>
            </div>
          </div>

          <div className="form-grid">
            <div className="form-field">
              <label htmlFor="kelancaran">Kelancaran</label>
              <select
                id="kelancaran"
                value={kelancaran}
                onChange={(e) => setKelancaran(e.target.value)}
              >
                <option>Sangat Lancar</option>
                <option>Lancar</option>
                <option>Cukup</option>
                <option>Perlu Bimbingan</option>
              </select>
            </div>

            <div className="form-field">
              <label htmlFor="ketepatan">Ketepatan Bacaan</label>
              <select
                id="ketepatan"
                value={ketepatan}
                onChange={(e) => setKetepatan(e.target.value)}
              >
                <option>Sangat Baik</option>
                <option>Baik</option>
                <option>Cukup</option>
                <option>Perlu Perbaikan</option>
              </select>
            </div>

            <div className="form-field full-width">
              <label>Status Setoran</label>
              <div className="status-options">
                <button
                  type="button"
                  className={
                    status === 'Diterima'
                      ? 'status-option accepted active'
                      : 'status-option accepted'
                  }
                  onClick={() => setStatus('Diterima')}
                >
                  <span>✓</span>
                  <div>
                    <strong>Diterima</strong>
                    <small>Setoran diterima oleh pengajar</small>
                  </div>
                </button>

                <button
                  type="button"
                  className={
                    status === 'Perlu Perbaikan'
                      ? 'status-option revision active'
                      : 'status-option revision'
                  }
                  onClick={() => setStatus('Perlu Perbaikan')}
                >
                  <span>!</span>
                  <div>
                    <strong>Perlu Perbaikan</strong>
                    <small>Santri perlu memperbaiki setoran</small>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </section>

        <section className="form-section">
          <div className="form-section-heading">
            <div className="section-number">04</div>
            <div>
              <h3>Catatan Pengajar</h3>
              <p>Tuliskan evaluasi atau pesan untuk santri.</p>
            </div>
          </div>

          <div className="form-field">
            <label htmlFor="catatanPengajar">Catatan / Evaluasi</label>
            <textarea
              id="catatanPengajar"
              rows="4"
              placeholder="Contoh: Bacaan sudah cukup lancar. Perhatikan kembali makhraj huruf dan terus murajaah."
              value={catatan}
              onChange={(e) => setCatatan(e.target.value)}
            />

            <small className="field-hint">
              Catatan ini akan ditampilkan pada Dashboard Santri.
            </small>
          </div>
        </section>

        {pesan && (
          <div className={`form-message ${jenisPesan}`}>
            {jenisPesan === 'success' ? '✓' : '!'} {pesan}
          </div>
        )}

        <div className="form-actions">
          <span>Pastikan data setoran sudah benar sebelum disimpan.</span>
          <button type="submit" className="save-journal-button">
            ✓ Simpan Jurnal
          </button>
        </div>
      </form>

      <section className="recent-journal">
        <div className="recent-heading">
          <div>
            <h3>Riwayat Setoran Terbaru</h3>
            <p>Catatan jurnal yang tersimpan pada perangkat ini.</p>
          </div>
          <span className="journal-count">{jurnal.length} Jurnal</span>
        </div>

        {jurnal.length === 0 ? (
          <div className="empty-journal">
            <div className="empty-icon">▤</div>
            <strong>Belum ada jurnal setoran</strong>
            <span>Jurnal yang disimpan akan tampil di bagian ini.</span>
          </div>
        ) : (
          <div className="journal-table-wrap">
            <table className="journal-table">
              <thead>
                <tr>
                  <th>Tanggal</th>
                  <th>Nama Santri</th>
                  <th>Setoran</th>
                  <th>Penilaian</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {jurnal.map((item) => (
                  <tr key={item.id}>
                    <td>{formatTanggal(item.tanggal)}</td>
                    <td><strong>{item.namaSantri}</strong></td>
                    <td>
                      {item.jenisSetoran}<br />
                      <small>
                        {item.surah} ayat {item.ayatMulai}–{item.ayatSampai}
                      </small>
                    </td>
                    <td>
                      {item.kelancaran}<br />
                      <small>{item.ketepatan}</small>
                    </td>
                    <td>
                      <span
                        className={
                          item.status === 'Diterima'
                            ? 'table-status accepted'
                            : 'table-status revision'
                        }
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      <section className="recent-journal" id="riwayat-jurnal">
        <div className="recent-heading">
          <div>
            <span className="heading-label">RIWAYAT JURNAL SANTRI</span>
            <p>Pilih nama santri untuk melihat seluruh riwayat setorannya.</p>
          </div>
        </div>

        <div
  id="riwayat-jurnal-section"
  className="form-field"
  style={{ maxWidth: '420px', marginBottom: '24px' }}
>
          <label htmlFor="pilihSantriRiwayat">Nama Santri</label>
          <select
            id="pilihSantriRiwayat"
            value={santriRiwayatId}
            onChange={(e) => setSantriRiwayatId(e.target.value)}
          >
            <option value="">-- Pilih Nama Santri --</option>
            {DAFTAR_SANTRI.map((santri) => (
              <option key={santri.id} value={santri.id}>
                {santri.nama}
              </option>
            ))}
          </select>
        </div>

        {!santriRiwayatId ? (
          <div className="empty-journal">
            <div className="empty-icon">♙</div>
            <strong>Silakan pilih nama santri</strong>
            <span>Riwayat setoran akan ditampilkan setelah nama dipilih.</span>
          </div>
        ) : (
          <>
            <div
              className="selected-student"
              style={{ marginBottom: '20px' }}
            >
              <div className="student-avatar">
                {santriRiwayatTerpilih?.foto}
              </div>
              <div>
                <strong>{santriRiwayatTerpilih?.nama}</strong>
                <span>
                  {santriRiwayatTerpilih?.usia} tahun ·{' '}
                  {santriRiwayatTerpilih?.kelompok}
                </span>
              </div>
              <span className="journal-count">
                {riwayatSantri.length} Jurnal
              </span>
            </div>

            {riwayatSantri.length === 0 ? (
              <div className="empty-journal">
                <div className="empty-icon">▤</div>
                <strong>Belum ada riwayat setoran</strong>
                <span>Belum ada jurnal untuk santri ini.</span>
              </div>
            ) : (
              <div className="journal-table-wrap">
                <table className="journal-table">
                  <thead>
                    <tr>
                      <th>Tanggal</th>
                      <th>Jenis Setoran</th>
                      <th>Surah / Ayat</th>
                      <th>Penilaian</th>
                      <th>Status</th>
                      <th>Sumber</th>
                    </tr>
                  </thead>
                  <tbody>
                    {riwayatSantri.map((item) => (
                      <tr key={`${item.sumber}-${item.id}`}>
                        <td>{formatTanggal(item.tanggal)}</td>
                        <td>{item.jenisSetoran}</td>
                        <td>
                          <strong>{item.surah}</strong><br />
                          <small>
                            Ayat {item.ayatMulai}–{item.ayatSampai}
                          </small>
                        </td>
                        <td>
                          {item.kelancaran}<br />
                          <small>{item.ketepatan}</small>
                        </td>
                        <td>
                          <span
                            className={
                              item.status === 'Diterima'
                                ? 'table-status accepted'
                                : 'table-status revision'
                            }
                          >
                            {item.status}
                          </span>
                        </td>
                        <td>
                          <small>
                            {item.sumber === 'Contoh'
                              ? 'Dummy'
                              : 'Input Ustadz'}
                          </small>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {riwayatSantri.length > 0 && (
              <div style={{ marginTop: '18px' }}>
                <h4 style={{ marginBottom: '12px' }}>Catatan Pengajar</h4>

                {riwayatSantri.map((item) =>
                  item.catatan ? (
                    <div
                      key={`catatan-${item.sumber}-${item.id}`}
                      style={{
                        padding: '14px',
                        marginBottom: '10px',
                        borderRadius: '10px',
                        background: '#f5f8f5',
                        borderLeft: '4px solid #27834b',
                      }}
                    >
                      <strong>
                        {item.surah} · {formatTanggal(item.tanggal)}
                      </strong>
                      <p style={{ margin: '6px 0' }}>{item.catatan}</p>
                      <small style={{ color: '#718078' }}>
                        {item.namaSantri} ·{' '}
                        {item.sumber === 'Contoh'
                          ? 'Data Dummy'
                          : 'Input Ustadz'}
                      </small>
                    </div>
                  ) : null
                )}
              </div>
            )}
          </>
        )}
      </section>
    </>
  )
}

export default InputJurnalHafalan
