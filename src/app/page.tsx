'use client'

import React, { useState, useEffect } from 'react'
import { getCurrentTime, formatTime, formatDate } from '@/lib/time'
import Image from 'next/image'

interface WeatherInfo {
  location: {
    prefecture: string
    city: string
    area: string  // 地域区分（東部/西部など）を追加
  }
  weather: {
    temperature: number
    maxTemp: number
    minTemp: number
    condition: string
    icon: string
    text: string
  }
}

export default function Home() {
  const [postalCode, setPostalCode] = useState('')
  const [weatherInfo, setWeatherInfo] = useState<WeatherInfo | null>(null)
  const [error, setError] = useState('')
  const [currentTime, setCurrentTime] = useState('')
  const [currentDate, setCurrentDate] = useState('')

  // 天気情報を取得する関数
  const fetchWeather = async (code: string) => {
    if (!code) return

    try {
      console.log('天気情報を更新中:', code)
      const response = await fetch(`/api/weather?postalCode=${code}`)
      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || '天気情報の取得に失敗しました')
      }

      setWeatherInfo(data)
      setError('')
    } catch (err) {
      console.error('天気情報の取得エラー:', err)
      setError(err instanceof Error ? err.message : '天気情報の取得に失敗しました')
    }
  }

  useEffect(() => {
    const updateDateTime = () => {
      const now = getCurrentTime()
      const timeStr = formatTime(now)
      setCurrentTime(timeStr)
      setCurrentDate(formatDate(now))

      // 毎時00分と30分に天気を更新
      const minutes = now.getMinutes()
      if (weatherInfo && postalCode && (minutes === 0 || minutes === 30)) {
        fetchWeather(postalCode)
      }
    }

    updateDateTime()
    const timer = setInterval(updateDateTime, 1000)
    return () => clearInterval(timer)
  }, [weatherInfo, postalCode]) // weatherInfoとpostalCodeを依存配列に追加

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    await fetchWeather(postalCode)
  }

  return (
    <div className="min-h-screen bg-[#1a1b26] pt-8 px-4">
      <div className="max-w-[400px] mx-auto">
        <div className="grid grid-cols-2 gap-4">
          {/* 左側: 時刻と日付 */}
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="text-7xl font-bold text-white leading-none mb-2">
              {currentTime}
            </div>
            <div className="text-2xl text-white">
              {currentDate}
            </div>
          </div>

          {/* 右側: 郵便番号入力と天気情報 */}
          <div className="flex flex-col items-center space-y-4">
            <form onSubmit={handleSubmit} className="w-[160px]">
              <input
                type="text"
                placeholder="郵便番号を入力"
                className="w-full px-3 py-2 bg-[#24283b] text-white border-none rounded focus:ring-0 text-right text-lg"
                value={postalCode}
                onChange={(e) => setPostalCode(e.target.value)}
                required
              />
            </form>

            {weatherInfo ? (
              <div className="w-full">
                <div className="text-white mb-2 text-center">
                  <div className="text-white">
                    {weatherInfo.location.prefecture}{weatherInfo.location.area}の天気
                  </div>
                </div>
                <div className="bg-[#24283b] rounded p-4">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <div className="text-4xl">{weatherInfo.weather.icon}</div>
                    <div className="text-3xl text-white">{weatherInfo.weather.temperature}°C</div>
                  </div>
                  <div className="text-white text-center mb-2">
                    {weatherInfo.weather.text}
                  </div>
                  <div className="flex justify-center gap-4">
                    <span className="text-red-400">{weatherInfo.weather.maxTemp}°C</span>
                    <span className="text-blue-400">{weatherInfo.weather.minTemp}°C</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-gray-400 text-center text-sm px-2">
                <p>郵便番号を入力すると、</p>
                <p>その地域の天気が表示されます</p>
                <p className="mt-2 text-xs">例: 1000001</p>
              </div>
            )}
          </div>
        </div>

        {error && (
          <div className="mt-4 text-red-400 text-sm text-center">
            {error}
          </div>
        )}
      </div>
    </div>
  )
} 