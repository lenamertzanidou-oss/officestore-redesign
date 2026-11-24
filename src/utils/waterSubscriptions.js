export const WATER_SUBSCRIPTIONS_KEY = 'os-water-subscriptions';

const cloneNoon = (date) => {
  const next = new Date(date);
  next.setHours(12,0,0,0);
  return next;
};

const toKey = (date) => {
  const y = date.getFullYear();
  const m = String(date.getMonth()+1).padStart(2,'0');
  const d = String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
};

const shiftSunday = (date) => {
  const next = cloneNoon(date);
  if (next.getDay() === 0) next.setDate(next.getDate()+1);
  return next;
};

export function loadWaterSubscriptions(){
  if (typeof window === 'undefined') return [];
  try {
    return JSON.parse(window.localStorage.getItem(WATER_SUBSCRIPTIONS_KEY) || '[]');
  } catch {
    return [];
  }
}

export function saveWaterSubscription(subscription){
  if (typeof window === 'undefined') return subscription;
  const current = loadWaterSubscriptions();
  const next = [subscription, ...current.filter(item => item.id !== subscription.id)];
  window.localStorage.setItem(WATER_SUBSCRIPTIONS_KEY, JSON.stringify(next));
  return subscription;
}

export function buildUpcomingDeliveries(schedule, now = new Date(), limit = 8){
  const start = cloneNoon(now);
  const results = [];

  if (schedule.type === 'weekly') {
    const weekdays = [...(schedule.weekdays || [])].map(Number).sort((a,b) => a-b);
    for (let offset = 1; offset <= 120 && results.length < limit; offset += 1) {
      const date = cloneNoon(start);
      date.setDate(date.getDate()+offset);
      if (date.getDay() === 0) continue;
      if (weekdays.includes(date.getDay())) results.push(toKey(date));
    }
    return results;
  }

  const monthDays = [...(schedule.monthDays || [])].map(Number).sort((a,b) => a-b);
  for (let monthOffset = 0; monthOffset < 12 && results.length < limit; monthOffset += 1) {
    const year = start.getFullYear();
    const month = start.getMonth()+monthOffset;
    const maxDay = new Date(year, month+1, 0, 12,0,0,0).getDate();

    for (const day of monthDays) {
      if (day > maxDay) continue;
      let date = new Date(year, month, day, 12,0,0,0);
      date = shiftSunday(date);
      if (date <= start) continue;

      const key = toKey(date);
      if (!results.includes(key)) results.push(key);
      if (results.length >= limit) break;
    }
  }

  return results.sort().slice(0,limit);
}

export function formatSubscriptionDate(value){
  if (!value) return '';
  const [year,month,day] = value.split('-').map(Number);
  const date = new Date(year, month-1, day, 12,0,0,0);
  return new Intl.DateTimeFormat('hy-AM',{
    weekday:'short',
    day:'numeric',
    month:'short',
    year:'numeric'
  }).format(date);
}

export function createWaterSubscription(input){
  const id = input.id || globalThis.crypto?.randomUUID?.() || `water-${Date.now()}`;
  const upcomingDeliveries = buildUpcomingDeliveries(input.schedule);

  return {
    id,
    type:'water-recurring',
    status:'active',
    productSlug:'aparan-water-18-9',
    productName:'Ապարան Ջուր 18,9լ',
    quantity:Number(input.quantity),
    customerType:input.customerType,
    customer:input.customer,
    organization:input.customerType === 'corporate' ? input.organization : null,
    address:input.address,
    schedule:input.schedule,
    paymentMethod:input.customerType === 'corporate' ? 'bank_transfer' : 'cash',
    upcomingDeliveries,
    nextDeliveryDate:upcomingDeliveries[0] || null,
    createdAt:input.createdAt || new Date().toISOString(),
    updatedAt:new Date().toISOString(),
    automation:{
      orderCreation:'backend-required',
      notification:'backend-required'
    }
  };
}
