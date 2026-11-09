import { useEffect, useState } from 'react'
import './RiwayatJurnalSantri.css'

const DAFTAR_SANTRI = [
  { id: 1, nama: 'Ahmad Fauzan', usia: 14, kelompok: 'Kelompok A', foto: 'AF' },
  { id: 2, nama: 'Muhammad Rafi', usia: 13, kelompok: 'Kelompok A', foto: 'MR' },
  { id: 3, nama: 'Abdullah Fathan', usia: 15, kelompok: 'Kelompok A', foto: 'AF' },
  { id: 4, nama: 'Yusuf Alfarizi', usia: 12, kelompok: 'Kelompok A', foto: 'YA' },
  { id: 5, nama: 'Salman Alfaruq', usia: 16, kelompok: 'Kelompok A', foto: 'SA' },
]

const DATA_DUMMY = [
  [1, '2026-11-08', 'Hafalan Baru', 'An-Naba', 1, 10, 'Lancar', 'Baik', 'Diterima', 'Hafalan sudah lancar. Pertahankan makhraj dan panjang pendek bacaan.'],
  [1, '2026-11-06', 'Murajaah', 'Al-Mulk', 1, 10, 'Sangat Lancar', 'Baik', 'Diterima', 'Murajaah berjalan dengan baik.'],
  [1, '2026-11-04', 'Hafalan Baru', 'An-Naba', 1, 5, 'Cukup', 'Baik', 'Diterima', 'Perlu mengulang beberapa bagian agar lebih lancar.'],
  [2, '2026-11-08', 'Murajaah', 'An-Naziat', 1, 10, 'Cukup', 'Baik', 'Perlu Perbaikan', 'Ulangi kembali ayat yang masih tertukar.'],
  [2, '2026-11-06', 'Hafalan Baru', 'An-Naziat', 1, 5, 'Lancar', 'Baik', 'Diterima', 'Setoran diterima. Tingkatkan konsistensi murajaah.'],
  [2, '2026-11-04', 'Murajaah', 'An-Naba', 1, 20, 'Lancar', 'Cukup', 'Diterima', 'Perhatikan kembali ketepatan beberapa bacaan.'],
  [3, '2026-11-08', 'Hafalan Baru', 'An-Naba', 11, 20, 'Sangat Lancar', 'Sangat Baik', 'Diterima', 'Alhamdulillah, setoran sangat baik. Pertahankan.'],
  [3, '2026-11-06', 'Murajaah', 'Al-Mulk', 1, 15, 'Lancar', 'Baik', 'Diterima', 'Hafalan lama terjaga dengan baik.'],
  [3, '2026-11-04', 'Hafalan Baru', 'An-Naba', 1, 10, 'Lancar', 'Baik', 'Diterima', 'Terus jaga kualitas hafalan.'],
  [4, '2026-11-08', 'Hafalan Baru', 'An-Naba', 1, 5, 'Cukup', 'Baik', 'Diterima', 'Hafalan diterima. Perlu pengulangan mandiri agar lebih kuat.'],
  [4, '2026-11-06', 'Murajaah', 'Al-Ikhlas', 1, 4, 'Sangat Lancar', 'Baik', 'Diterima', 'Bacaan sudah baik.'],
  [4, '2026-11-04', 'Hafalan Baru', 'An-Naba', 1, 3, 'Perlu Bimbingan', 'Cukup', 'Perlu Perbaikan', 'Perlu mengulang ayat secara bertahap bersama pengajar.'],
  [5, '2026-11-08', 'Murajaah', 'An-Naba', 1, 20, 'Sangat Lancar', 'Sangat Baik', 'Diterima', 'Murajaah sangat baik. Pertahankan hafalan.'],
  [5, '2026-11-06', 'Hafalan Baru', 'An-Naba', 11, 15, 'Lancar', 'Baik', 'Diterima', 'Setoran diterima dengan baik.'],
  [5, '2026-11-04', 'Murajaah', 'Al-Mulk', 1, 15, 'Lancar', 'Baik', 'Diterima', 'Terus jaga kelancaran dan ketepatan bacaan.'],
].map((item, index) => ({
  id: `dummy-${index + 1}`,
  santriId: item[0],
  tanggal: item[1],
  jenisSetoran: item[2],
  surah: item[3],
  ayatMulai: item[4],
  ayatSampai: item[5],
  kelancaran: item[6],
  ketepatan: item[7],
  status: item[8],
  catatan: item[9],
  sumber: 'Contoh',
}))

const formatTanggal = (tanggal) => {
  if (!tanggal) return '-'

  return new Date(`${tanggal}T00:00:00`).toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })
}

function RiwayatJurnalSantri() {
  const [santriId, setSantriId] = useState('')
  const [jurnal, setJurnal] = useState([])

  useEffect(() => {
    const bacaJurnal = () => {
      try {
        const data = localStorage.getItem('jurnalTahfidzPengajar')
        setJurnal(data ? JSON.parse(data) : [])
      } catch {
        setJurnal([])
      }
    }

    bacaJurnal()
  }, [])

  const santriTerpilih = DAFTAR_SANTRI.find(
    (santri) => santri.id === Number(santriId)
  )

  const riwayatSantri = santriId
    ? [
        ...DATA_DUMMY.filter(
          (item) => item.santriId === Number(santriId)
        ),
        ...jurnal
          .filter((item) => item.santriId === Number(santriId))
          .map((item) => ({ ...item, sumber: 'Tersimpan' })),
      ].sort((a, b) => {
        if (a.tanggal !== b.tanggal) {
          return b.tanggal.localeCompare(a.tanggal)
        }

        return String(b.dibuatPada || b.id).localeCompare(
          String(a.dibuatPada || a.id)
        )
      })
    : []

  return (
    <div className="riwayat-page">
      <section className="riwayat-heading">
        <div>
          <span className="riwayat-heading-label">JURNAL SANTRI</span>
          <h1>Riwayat Jurnal Santri</h1>
          <p>Pantau riwayat setoran, penilaian, dan catatan santri bimbingan.</p>
        </div>
        <div className="riwayat-total">
          <span>Total Santri</span>
          <strong>{DAFTAR_SANTRI.length}</strong>
        </div>
      </section>

      <section className="riwayat-filter">
        <div className="riwayat-filter-icon">♙</div>
        <div className="riwayat-filter-content">
          <label htmlFor="pilihSantriRiwayat">Pilih Nama Santri</label>
          <select
            id="pilihSantriRiwayat"
            value={santriId}
            onChange={(e) => setSantriId(e.target.value)}
          >
            <option value="">-- Pilih Nama Santri --</option>
            {DAFTAR_SANTRI.map((santri) => (
              <option key={santri.id} value={santri.id}>
                {santri.nama}
              </option>
            ))}
          </select>
        </div>
      </section>

      {!santriId ? (
        <div className="riwayat-empty">
          <div className="riwayat-empty-icon">▤</div>
          <strong>Silakan pilih nama santri</strong>
          <span>Riwayat setoran akan ditampilkan setelah nama dipilih.</span>
        </div>
      ) : (
        <>
          <section className="riwayat-student-card">
            <div className="riwayat-student-avatar">
              {santriTerpilih?.foto}
            </div>
            <div className="riwayat-student-info">
              <strong>{santriTerpilih?.nama}</strong>
              <span>
                {santriTerpilih?.usia} tahun · {santriTerpilih?.kelompok}
              </span>
            </div>
            <div className="riwayat-count">
              <strong>{riwayatSantri.length}</strong>
              <span>Jurnal</span>
            </div>
          </section>

          {riwayatSantri.length === 0 ? (
            <div className="riwayat-empty">
              <div className="riwayat-empty-icon">▤</div>
              <strong>Belum ada riwayat setoran</strong>
              <span>Belum ada jurnal untuk santri ini.</span>
            </div>
          ) : (
            <>
              <section className="riwayat-table-card">
                <div className="riwayat-section-heading">
                  <div>
                    <h2>Riwayat Setoran</h2>
                    <p>Daftar setoran dari yang terbaru.</p>
                  </div>
                </div>

                <div className="riwayat-table-wrap">
                  <table className="riwayat-table">
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
                            <strong>{item.surah}</strong>
                            <small>
                              Ayat {item.ayatMulai}–{item.ayatSampai}
                            </small>
                          </td>
                          <td>
                            {item.kelancaran}
                            <small>{item.ketepatan}</small>
                          </td>
                          <td>
                            <span
                              className={`riwayat-status ${
                                item.status === 'Diterima'
                                  ? 'accepted'
                                  : 'revision'
                              }`}
                            >
                              {item.status}
                            </span>
                          </td>
                          <td>
                            <span className="riwayat-source">
                              {item.sumber === 'Contoh' ? 'Dummy' : 'Input Ustadz'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>

              <section className="riwayat-notes-card">
                <div className="riwayat-section-heading">
                  <div>
                    <h2>Catatan Pengajar</h2>
                    <p>Catatan evaluasi pada setiap setoran.</p>
                  </div>
                </div>

                {riwayatSantri.map((item) =>
                  item.catatan ? (
                    <article
                      className="riwayat-note"
                      key={`catatan-${item.sumber}-${item.id}`}
                    >
                      <strong>
                        {item.surah} · {formatTanggal(item.tanggal)}
                      </strong>
                      <p>{item.catatan}</p>
                      <small>
                        {santriTerpilih?.nama} ·{' '}
                        {item.sumber === 'Contoh' ? 'Data Dummy' : 'Input Ustadz'}
                      </small>
                    </article>
                  ) : null
                )}
              </section>
            </>
          )}
        </>
      )}
    </div>
  )
}

export default RiwayatJurnalSantri