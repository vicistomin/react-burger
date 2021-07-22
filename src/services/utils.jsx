export const formatDateTime = (time) => {
  const dateTime = new Date(time);
  const today = new Date(Date.now()).getDate();
  const daysFromToday = today - dateTime.getDate();

  const getPluralDayForm = (n) => (
    (n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20)) ?
      'дня' : 'дней'
  );
  
  const day = (
    daysFromToday === 0 ?
      'Сегодня' :
      daysFromToday === 1 ?
        'Вчера' : 
        `${daysFromToday} ${getPluralDayForm(daysFromToday)} назад`
  );
  const hours = dateTime.getHours().toString().padStart(2, '0');
  const mins = dateTime.getMinutes().toString().padStart(2, '0');
  const timeZone = new Intl.NumberFormat("ru-RU", {
    // always display the plus sign
    signDisplay: "exceptZero"
  }).format(
    0 - dateTime.getTimezoneOffset() / 60
  );

  return (`${day}, ${hours}:${mins} i-GMT${timeZone}`);
}

export function getCookie(name) {
  const matches = document.cookie.match(
    new RegExp('(?:^|; )' + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + '=([^;]*)')
  );
  return matches ? decodeURIComponent(matches[1]) : undefined;
}

export function setCookie(name, value, props) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function deleteCookie(name) {
  setCookie(name, null, { expires: -1 });
}
