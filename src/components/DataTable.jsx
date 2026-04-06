import styles from './DataTable.module.css'
export default function DataTable({ data }) {
  if (!data || data.length === 0) return null
  const headers = Object.keys(data[0])
  return (
    <div className={styles.wrapper}>
      <div className={styles.meta}>{data.length} rows · {headers.length} columns</div>
      <div className={styles.scroll}>
        <table className={styles.table}>
          <thead><tr>{headers.map(h => <th key={h}>{h}</th>)}</tr></thead>
          <tbody>
            {data.slice(0, 100).map((row, i) => (
              <tr key={i}>{headers.map(h => <td key={h}>{row[h] ?? "—"}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
      {data.length > 100 && <div className={styles.truncNote}>Showing first 100 of {data.length} rows</div>}
    </div>
  )
}