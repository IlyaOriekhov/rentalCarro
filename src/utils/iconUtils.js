/**
 * Утиліти для роботи з іконками
 */

/**
 * Створює шлях до іконки в спрайті
 * @param {string} sprite - Шлях до спрайту
 * @param {string} iconName - Назва іконки
 * @returns {string} Повний шлях для використання в `<use href=...>`
 */
export const getIconPath = (sprite, iconName) => `${sprite}#icon-${iconName}`;
