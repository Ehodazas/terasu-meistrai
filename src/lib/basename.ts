/** basename leidžia talpinti svetainę pakatalogyje (pvz., GitHub Pages /repo/). */
export const basename = import.meta.env.BASE_URL.replace(/\/$/, '') || '/'
