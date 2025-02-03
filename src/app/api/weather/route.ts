import { NextResponse } from 'next/server'

interface WeatherArea {
  area: {
    name: string
  }
  temps: string[]
  weatherCodes: string[]
  weathers: string[]
}

// 都道府県コードと気象庁地域コードのマッピング
const prefectureToJmaCode: { [key: string]: string } = {
  '北海道': '016000',
  '青森県': '020000',
  '岩手県': '030000',
  '宮城県': '040000',
  '秋田県': '050000',
  '山形県': '060000',
  '福島県': '070000',
  '茨城県': '080000',
  '栃木県': '090000',
  '群馬県': '100000',
  '埼玉県': '110000',
  '千葉県': '120000',
  '東京都': '130000',
  '神奈川県': '140000',
  '新潟県': '150000',
  '富山県': '160000',
  '石川県': '170000',
  '福井県': '180000',
  '山梨県': '190000',
  '長野県': '200000',
  '岐阜県': '210000',
  '静岡県': '220000',
  '愛知県': '230000',
  '三重県': '240000',
  '滋賀県': '250000',
  '京都府': '260000',
  '大阪府': '270000',
  '兵庫県': '280000',
  '奈良県': '290000',
  '和歌山県': '300000',
  '鳥取県': '310000',
  '島根県': '320000',
  '岡山県': '330000',
  '広島県': '340000',
  '山口県': '350000',
  '徳島県': '360000',
  '香川県': '370000',
  '愛媛県': '380000',
  '高知県': '390000',
  '福岡県': '400000',
  '佐賀県': '410000',
  '長崎県': '420000',
  '熊本県': '430000',
  '大分県': '440000',
  '宮崎県': '450000',
  '鹿児島県': '460100',
  '沖縄県': '471000'
}

function getWeatherIcon(code: string): string {
  // 気象庁の天気コードに基づくアイコンマッピング
  const iconMap: { [key: string]: string } = {
    // 晴れ系統
    '100': '☀️',   // 晴れ
    '101': '🌤️',   // 晴れ時々くもり
    '102': '🌤️',   // 晴れ一時くもり
    '103': '⛅',   // くもり時々晴れ
    '104': '⛅',   // くもり一時晴れ
    '105': '🌤️',   // 晴れ時々雨
    '106': '🌤️',   // 晴れ一時雨
    '107': '🌤️',   // 晴れ時々雪
    '108': '🌤️',   // 晴れ一時雪
    '110': '🌦️',   // 晴れ後時々くもり
    '111': '🌦️',   // 晴れ後くもり
    '112': '🌦️',   // 晴れ後一時くもり
    '115': '🌦️',   // 晴れ後一時雨
    '116': '🌨️',   // 晴れ後一時雪
    '117': '🌤️',   // 晴れ時々雨で雷を伴う
    '119': '🌤️',   // 晴れ時々雪で雷を伴う
    // くもり系統
    '200': '☁️',   // くもり
    '201': '⛅',   // くもり時々晴れ
    '202': '⛅',   // くもり一時晴れ
    '203': '🌧️',   // くもり時々雨
    '204': '🌧️',   // くもり一時雨
    '205': '🌨️',   // くもり時々雪
    '206': '🌨️',   // くもり一時雪
    '207': '⛅',   // くもり後晴れ
    '208': '🌧️',   // くもり後雨
    '209': '🌨️',   // くもり後雪
    '210': '🌨️',   // くもり後みぞれ
    '211': '⛅',   // くもり後一時晴れ
    '212': '🌧️',   // くもり後一時雨
    '213': '🌨️',   // くもり後一時雪
    '214': '⛈️',   // くもり後雨か雪
    '215': '⛈️',   // くもり後雨か雪で雷を伴う
    // 雨系統
    '300': '🌧️',   // 雨
    '301': '🌦️',   // 雨時々晴れ
    '302': '🌦️',   // 雨一時晴れ
    '303': '🌨️',   // 雨時々雪
    '304': '🌨️',   // 雨一時雪
    '306': '🌧️',   // 大雨
    '307': '🌦️',   // 雨後晴れ
    '308': '🌧️',   // 雨後曇り
    '309': '🌨️',   // 雨後雪
    '311': '🌦️',   // 雨後一時晴れ
    '313': '🌨️',   // 雨後一時雪
    '314': '⛈️',   // 雨と雷
    '315': '⛈️',   // 雨で暴風を伴う
    // 雪系統
    '400': '🌨️',   // 雪
    '401': '🌨️',   // 雪時々晴れ
    '402': '🌨️',   // 雪一時晴れ
    '403': '🌨️',   // 雪時々雨
    '405': '🌨️',   // 大雪
    '406': '🌨️',   // 風雪強い
    '407': '🌨️',   // 暴風雪
    '409': '⛈️',   // 雪と雷
    '411': '🌨️',   // 雪後晴れ
    '413': '🌨️',   // 雪後一時雨
    '414': '🌨️',   // 雪後みぞれ
    // 特殊
    '500': '🌫️',   // 霧
    '501': '🌫️',   // 霧で雷を伴う
    '502': '🌫️',   // 霧雨
    '504': '🌪️',   // 付近で竜巻発生
    '550': '🌂',   // 雨または雪
    '560': '⛈️',   // 大雨または大雪
  }

  if (!iconMap[code]) {
    console.error('未定義の天気コード:', code)
    throw new Error('不正な天気コードです')
  }

  return iconMap[code]
}

async function getLocationFromInput(input: string) {
  const postalPattern = /^\d{3}-?\d{4}$/

  if (postalPattern.test(input)) {
    const response = await fetch(`https://zipcloud.ibsnet.co.jp/api/search?zipcode=${input}`)
    const data = await response.json()
    
    if (data.status === 200 && data.results) {
      const location = data.results[0]
      const jmaCode = prefectureToJmaCode[location.address1]
      
      if (!jmaCode) {
        throw new Error('対応していない地域です')
      }

      const weatherResponse = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${jmaCode}.json`)
      const weatherData = await weatherResponse.json()
      
      if (!Array.isArray(weatherData) || !weatherData[0]?.timeSeries?.[0]?.areas) {
        throw new Error('気象データの取得に失敗しました')
      }

      const areas = weatherData[0].timeSeries[0].areas as WeatherArea[]
      console.log('利用可能な地域:', areas.map(a => a.area.name))

      // 市区町村名から最適な地域を選択
      const cityName = location.address2
      let bestMatchArea = areas[0]
      let bestMatchIndex = 0

      // 地域名に市区町村名が含まれている場合はその地域を優先
      for (let i = 0; i < areas.length; i++) {
        const area = areas[i]
        if (area.area.name.includes(cityName)) {
          bestMatchArea = area
          bestMatchIndex = i
          break
        }
      }

      return {
        prefecture: location.address1,
        city: `${location.address2}${location.address3 || ''}`,
        area: bestMatchArea.area.name,
        jmaCode,
        areaIndex: bestMatchIndex
      }
    }
    throw new Error('郵便番号が見つかりません')
  }
  throw new Error('無効な郵便番号です')
}

async function getWeatherData(location: { prefecture: string; city: string; area: string; jmaCode: string; areaIndex: number }) {
  try {
    const response = await fetch(`https://www.jma.go.jp/bosai/forecast/data/forecast/${location.jmaCode}.json`)
    if (!response.ok) {
      throw new Error('天気情報の取得に失敗しました')
    }
    
    const data = await response.json()
    if (!Array.isArray(data) || !data[0]?.timeSeries) {
      throw new Error('気象データの形式が不正です')
    }

    const timeSeriesData = data[0].timeSeries
    const weatherAreas = timeSeriesData[0].areas[location.areaIndex] as WeatherArea
    const tempAreas = timeSeriesData[2].areas[location.areaIndex] as WeatherArea

    if (!weatherAreas || !tempAreas) {
      throw new Error('地域の天気データが見つかりません')
    }

    const weatherCode = weatherAreas.weatherCodes[0]
    const weatherText = weatherAreas.weathers[0]
      .replace(/くもり/g, '曇り')
      .replace(/　/g, ' ')

    const temps = tempAreas.temps.map((temp: string) => {
      const parsed = parseInt(temp)
      return isNaN(parsed) ? null : parsed
    }).filter((temp: number | null): temp is number => temp !== null)

    if (temps.length === 0) {
      throw new Error('気温データが取得できません')
    }

    const currentTemp = temps[0]
    const maxTemp = Math.max(...temps)
    const minTemp = Math.min(...temps)

    console.log('気温データ:', {
      地点: location.area,
      気温リスト: temps,
      現在気温: currentTemp,
      最高気温: maxTemp,
      最低気温: minTemp
    })

    return {
      temperature: currentTemp,
      maxTemp: maxTemp,
      minTemp: minTemp,
      icon: getWeatherIcon(weatherCode),
      text: weatherText
    }
  } catch (error) {
    console.error('Weather API Error:', error)
    throw new Error('天気情報の取得に失敗しました')
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const searchInput = searchParams.get('postalCode')

    if (!searchInput) {
      return NextResponse.json(
        { error: '郵便番号が指定されていません' },
        { status: 400 }
      )
    }

    const location = await getLocationFromInput(searchInput)
    const weather = await getWeatherData(location)

    return NextResponse.json({
      location: {
        prefecture: location.prefecture,
        city: location.city,
        area: location.area
      },
      weather
    })

  } catch (error) {
    console.error('API Error:', error)
    return NextResponse.json(
      { error: error instanceof Error ? error.message : '天気情報の取得中にエラーが発生しました' },
      { status: 500 }
    )
  }
} 