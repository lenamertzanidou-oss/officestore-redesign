const DELIVERY_CUTOFF_HOUR = 18;

function cloneAtNoon(date) {
  const next = new Date(date);
  next.setHours(12, 0, 0, 0);
  return next;
}

function isWeekend(date) {
  const day = date.getDay();
  return day === 0 || day === 6;
}

function nextBusinessDay(date) {
  const next = cloneAtNoon(date);
  do {
    next.setDate(next.getDate() + 1);
  } while (isWeekend(next));
  return next;
}

export function addBusinessDays(date, count) {
  let result = cloneAtNoon(date);
  for (let i = 0; i < count; i += 1) {
    result = nextBusinessDay(result);
  }
  return result;
}

export function getEarliestDeliveryDate(now = new Date()) {
  const current = new Date(now);
  const day = current.getDay();

  if (day === 0 || day === 6) {
    return nextBusinessDay(current);
  }

  return addBusinessDays(current, current.getHours() >= DELIVERY_CUTOFF_HOUR ? 2 : 1);
}

export function toDeliveryDateKey(date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fromDeliveryDateKey(value) {
  if (!value) return null;
  const [year, month, day] = value.split('-').map(Number);
  if (!year || !month || !day) return null;
  const date = new Date(year, month - 1, day, 12, 0, 0, 0);
  return Number.isNaN(date.getTime()) ? null : date;
}

export function formatDeliveryDate(value, options = {}) {
  const date = typeof value === 'string' ? fromDeliveryDateKey(value) : value;
  if (!date) return '';
  return new Intl.DateTimeFormat('hy-AM', {
    weekday: options.short ? 'short' : 'long',
    day: 'numeric',
    month: 'short',
  }).format(date);
}

export function getDeliveryOptions(now = new Date()) {
  const earliest = getEarliestDeliveryDate(now);
  const endOfMonth = new Date(earliest.getFullYear(), earliest.getMonth() + 1, 0, 12, 0, 0, 0);
  const options = [];

  for (let date = cloneAtNoon(earliest); date <= endOfMonth; date.setDate(date.getDate() + 1)) {
    if (isWeekend(date)) continue;
    const current = cloneAtNoon(date);
    options.push({
      value: toDeliveryDateKey(current),
      label: formatDeliveryDate(current),
      shortLabel: formatDeliveryDate(current, { short: true }),
      isEarliest: options.length === 0,
    });
  }

  return options;
}

export function getDeliveryCalendar(now = new Date()) {
  const earliest = getEarliestDeliveryDate(now);
  const year = earliest.getFullYear();
  const month = earliest.getMonth();
  const firstDay = new Date(year, month, 1, 12, 0, 0, 0);
  const lastDay = new Date(year, month + 1, 0, 12, 0, 0, 0);
  const available = new Set(getDeliveryOptions(now).map((option) => option.value));
  const leadingBlanks = (firstDay.getDay() + 6) % 7;
  const days = Array.from({ length: leadingBlanks }, () => null);

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const date = new Date(year, month, day, 12, 0, 0, 0);
    const value = toDeliveryDateKey(date);
    days.push({
      value,
      day,
      label: formatDeliveryDate(date),
      isWeekend: isWeekend(date),
      isAvailable: available.has(value),
      isEarliest: value === toDeliveryDateKey(earliest),
    });
  }

  return {
    monthLabel: new Intl.DateTimeFormat('hy-AM', { month: 'long', year: 'numeric' }).format(firstDay),
    days,
  };
}
