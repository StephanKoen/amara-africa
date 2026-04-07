import styles from './DataTable.module.css'

export default function DataTable({ headers, rows, renderCell }) {
  return (
    <div className={styles.wrap}>
      <table className={styles.table}>
        <thead>
          <tr>{headers.map(h => <th key={h}>{h}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              {headers.map(h => (
                <td key={h}>
                  {renderCell ? renderCell(h, row[h], row) : (row[h] ?? '—')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
