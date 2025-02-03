interface WeatherData {
  location: string
  temperature: number
  condition: string
  humidity: number
}

export async function getWeatherData(postalCode: string): Promise<WeatherData> {
  // 郵便番号のバリデーション
  const cleanPostalCode = postalCode.replace('-', '')
  if (!/^\d{7}$/.test(cleanPostalCode)) {
    throw new Error('無効な郵便番号です')
  }

  try {
    // 実際のAPIエンドポイントに置き換える必要があります
    const response = await fetch(`/api/weather?postalCode=${cleanPostalCode}`)
    if (!response.ok) {
      throw new Error('天気情報の取得に失敗しました')
    }
    return await response.json()
  } catch (error) {
    console.error('Weather API Error:', error)
    throw new Error('天気情報の取得中にエラーが発生しました')
  }
} 