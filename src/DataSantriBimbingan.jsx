
import './DataSantriBimbingan.css'


const DAFTAR_SANTRI = [
  {
    id: 1,
    nama: 'Ahmad Fauzan',
    usia: 14,
    kelompok: 'Kelompok A',
    foto: 'AF',
    hafalan: 'An-Naba’',
    target: 'Al-Mulk',
    progres: 65,
    status: 'Aktif',
  },
  {
    id: 2,
    nama: 'Muhammad Rafi',
    usia: 13,
    kelompok: 'Kelompok A',
    foto: 'MR',
    hafalan: 'An-Nazi’at',
    target: 'Al-Mulk',
    progres: 55,
    status: 'Aktif',
  },
  {
    id: 3,
    nama: 'Abdullah Fathan',
    usia: 15,
    kelompok: 'Kelompok A',
    foto: 'AF',
    hafalan: '‘Abasa',
    target: 'Al-Mulk',
    progres: 70,
    status: 'Aktif',
  },
  {
    id: 4,
    nama: 'Yusuf Alfarizi',
    usia: 12,
    kelompok: 'Kelompok A',
    foto: 'YA',
    hafalan: 'At-Takwir',
    target: 'Al-Mulk',
    progres: 45,
    status: 'Aktif',
  },
  {
    id: 5,
    nama: 'Salman Alfaruq',
    usia: 16,
    kelompok: 'Kelompok A',
    foto: 'SA',
    hafalan: 'Belum tercatat',
    target: 'Belum tercatat',
    progres: 0,
    status: 'Aktif',
  },
]

function DataSantriBimbingan() {
  return (
    <div className="data-santri-page">
      <div className="data-santri-heading">
        <div>
          <h2>Data Santri Bimbingan</h2>
          <p>Daftar santri yang berada dalam bimbingan Ustadz Imam.</p>
        </div>

        <div className="jumlah-santri-badge">
          <span>{DAFTAR_SANTRI.length}</span>
          <small>Santri</small>
        </div>
      </div>

      <div className="data-santri-info">
        <div className="data-santri-info-icon">♧</div>
        <div>
          <strong>Kelompok Bimbingan Ustadz Imam</strong>
          <p>Senin, Rabu, dan Jumat · Bada Ashar</p>
        </div>
      </div>

      <div className="data-santri-list">
        {DAFTAR_SANTRI.map((santri) => (
          <article className="data-santri-card" key={santri.id}>
            <div className="data-santri-card-top">
              <div className="data-santri-avatar">
                {santri.foto}
              </div>

              <div className="data-santri-identity">
                <h3>{santri.nama}</h3>
                <p>{santri.usia} tahun · {santri.kelompok}</p>
              </div>

              <span className="santri-status">{santri.status}</span>
            </div>

            <div className="data-santri-details">
              <div>
                <span>Hafalan terakhir</span>
                <strong>{santri.hafalan}</strong>
              </div>

              <div>
                <span>Target hafalan</span>
                <strong>{santri.target}</strong>
              </div>
            </div>

            <div className="data-santri-progress">
              <div className="data-santri-progress-label">
                <span>Progres hafalan</span>
                <strong>{santri.progres}%</strong>
              </div>

              <div className="data-santri-progress-track">
                <div
                  className="data-santri-progress-fill"
                  style={{ width: `${santri.progres}%` }}
                />
              </div>
            </div>

            <button
              type="button"
              className="btn-detail-santri"
              onClick={() =>
                window.dispatchEvent(
                  new CustomEvent('detail-santri-pengajar', {
                    detail: santri.id,
                  })
                )
              }
            >
              Lihat Detail <span>→</span>
            </button>
          </article>
        ))}
      </div>
    </div>
  )
}

export default DataSantriBimbingan
