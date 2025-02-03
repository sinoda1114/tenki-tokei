import { formatDate, getDayOfWeek } from './i18n.js';

export class TimeManager {
  constructor() {
    this.timeElement = null;
    this.dateElement = null;
    this.updateInterval = null;
  }

  init(timeElementId, dateElementId) {
    this.timeElement = document.getElementById(timeElementId);
    this.dateElement = document.getElementById(dateElementId);
    this.startTimeUpdate();
  }

  startTimeUpdate() {
    this.updateTime();
    this.updateInterval = setInterval(() => this.updateTime(), 1000);
  }

  stopTimeUpdate() {
    if (this.updateInterval) {
      clearInterval(this.updateInterval);
    }
  }

  updateTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    });

    const dateString = formatDate(now);
    const dayOfWeek = getDayOfWeek(now);

    if (this.timeElement) {
      this.timeElement.textContent = timeString;
    }

    if (this.dateElement) {
      this.dateElement.textContent = `${dateString} (${dayOfWeek})`;
    }
  }

  getCurrentTime() {
    return new Date();
  }

  formatTimeForDisplay(date) {
    return date.toLocaleTimeString('ja-JP', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZone: 'Asia/Tokyo'
    });
  }

  destroy() {
    this.stopTimeUpdate();
    this.timeElement = null;
    this.dateElement = null;
  }
}

export default new TimeManager();