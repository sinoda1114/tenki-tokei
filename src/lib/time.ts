export function getCurrentTime(): Date {
  return new Date()
}

export function formatTime(date: Date): string {
  return date.toLocaleTimeString('ja-JP', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  })
}

export function formatDate(date: Date): string {
  const month = String(date.getMonth() + 1).padStart(2, '0')
  const day = String(date.getDate()).padStart(2, '0')
  const weekDay = ['日', '月', '火', '水', '木', '金', '土'][date.getDay()]
  return `${month}/${day}（${weekDay}）`
} 