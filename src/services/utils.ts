import { ICookieProps } from './types'

const getDaysFromToday = (dateTime: Date): number => {
  const MILLISECONDS_PER_DAY: number = 1000 * 60 * 60 * 24;
  const today: Date = new Date(Date.now());

  // discard the time and time-zone information.
  const utcDateTime: number = Date.UTC (
    dateTime.getFullYear(),
    dateTime.getMonth(),
    dateTime.getDate()
  );
  const utcToday: number = Date.UTC (
    today.getFullYear(),
    today.getMonth(),
    today.getDate()
  );

  return Math.floor((utcToday - utcDateTime) / MILLISECONDS_PER_DAY);
}

export const formatDateTime = (time: string): string => {
  const dateTime: Date = new Date(time);
  const daysFromToday: number = getDaysFromToday(dateTime);

  const getPluralDayForm = (n: number): string => (
    (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ?
      'дня' : 'дней'
  );
  
  const day: string = (
    daysFromToday === 0 ?
      'Сегодня' :
      daysFromToday === 1 ?
        'Вчера' : 
        `${daysFromToday} ${getPluralDayForm(daysFromToday)} назад`
  );
  const hours: string = dateTime.getHours().toString().padStart(2, '0');
  const mins: string = dateTime.getMinutes().toString().padStart(2, '0');
  const timeZone: string = new Intl.NumberFormat("ru-RU", {
    // always display the plus sign
    signDisplay: "exceptZero"
  }).format(
    0 - dateTime.getTimezoneOffset() / 60
  );

  return (`${day}, ${hours}:${mins} i-GMT${timeZone}`);
}

export function getCookie(name: string): string {
  const matches: RegExpMatchArray | null = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([$?*|{}\]\\^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : '';
}

export function setCookie(
  name: string,
  value: string | number | boolean,
  props: ICookieProps = {}
): void {
  if (typeof props.expires == 'number' && props.expires) {
    const d = new Date();
    d.setTime(d.getTime() + props.expires * 1000);
    props.expires = d;
  }
  if (props.expires instanceof Date && props.expires) {
    props.expires = props.expires.toUTCString();
  }
  const cookieValue: string = encodeURIComponent(value);
  let updatedCookie: string = name + '=' + cookieValue;
  let propName: keyof ICookieProps;
  for (propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name: string): void {
  setCookie(name, '', { path: '/', expires: -1 });
}
