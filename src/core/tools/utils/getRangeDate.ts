import {
  addDays,
  startOfDay,
  startOfMonth,
  subDays,
  subMonths,
  subWeeks,
} from 'date-fns';

export function getDateRange(
  dateValue: string,
): { gte: Date; lt: Date } | undefined {
  const today = startOfDay(new Date());
  const tomorrow = startOfDay(addDays(today, 1));
  const yesterday = startOfDay(subDays(today, 1));

  switch (dateValue) {
    case 'Hoy': {
      return { gte: yesterday, lt: today };
      // return { gte: today, lt: tomorrow };
    }
    case 'Ayer': {
      return { gte: subDays(today, 2), lt: yesterday };
    }
    case 'Mañana': {
      return { gte: today, lt: tomorrow };
      // return { gte: subDays(today, -1), lt: subDays(today, -2) };
    }
    case 'Semana Pasada': {
      return { gte: subWeeks(today, 1), lt: today };
    }
    case 'Hace 2 Semanas': {
      return { gte: subWeeks(today, 2), lt: subWeeks(today, 1) };
    }
    case 'Hace 3 Semanas': {
      return { gte: subWeeks(today, 3), lt: subWeeks(today, 2) };
    }
    case 'Hace 1 mes': {
      // Ajuste para cubrir desde el inicio del mes anterior hasta el inicio de este mes
      const startOfLastMonth = startOfMonth(subMonths(today, 1));
      return { gte: startOfLastMonth, lt: startOfMonth(today) };
    }
    case 'Hace más de 1 mes': {
      // Ajuste para cubrir desde el inicio de dos meses atrás hasta el inicio del mes anterior
      const startOfTwoMonthsAgo = startOfMonth(subMonths(today, 2));
      return {
        gte: startOfTwoMonthsAgo,
        lt: startOfMonth(subMonths(today, 1)),
      };
    }
    default: {
      return undefined;
    }
  }
}
