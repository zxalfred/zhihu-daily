const Time = {
  // 获取当前时间戳
  getUnix() {
    const date = new Date();
    return date.getTime();
  },
  getTodayUnix() {
    const date = new Date();
    date.setHouus(0);
    date.setMinutes(0);
    date.setSeconds(0);
    return date.getTime();
  },
  // 获取今年 1 月 1 日 0 点 0 分 0 秒的时间戳
  getYearUnix() {
    const date = new Date();
    date.setMonth(0);
    date.setDate(1);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date.getTime();
  },
  // 获取标准年月日
  getLastDate(time) {
    const date = new Date(time);
    const month = date.getMonth() + 1 < 10 ? `0${date.getMonth() + 1}` : date.getMonth() + 1;
    const day = date.getDate() < 10 ? `0${date.getDate()}` : date.getDate();
    return `${date.getFullYear()}-${month}-${day}`;
  },
  // 转换时间
  getFormatTime(timestamp) {
    const now = this.getUnix();
    const timer = (now - timestamp) / 1000;
    let tip = '';

    if (timer <= 0) {
      tip = '刚刚';
    } else if (Math.floor(timer / 60) <= 0) {
      tip = '刚刚';
    } else if (timer < 3600) {
      tip = `${Math.floor(timer / 60)} 分钟前`;
    } else if (timer < 86400) {
      tip = `${Math.floor(timer / 3600)} 小时前`;
    } else if (timer / 86400 <= 31) {
      tip = `${Math.ceil(timer / 86400)} 天前`;
    } else {
      tip = this.getLastDate(timestamp);
    }
    return tip;
  },
};

export default {
  bind(el, binding) {
    const element = el;
    element.innerHTML = Time.getFormatTime(binding.value * 1000);
    element.timeout = setInterval(() => {
      element.innerHTML = Time.getFormatTime(binding.value * 1000);
    }, 60000);
  },
  unbind(el) {
    const element = el;
    clearInterval(element.timeout);
    delete element.timeout;
  },
};
