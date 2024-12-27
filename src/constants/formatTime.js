export const formatTime = (minutes) =>
    minutes ? `${Math.floor(minutes / 60)} ч ${minutes % 60} мин` : '(требуется расчет)'
