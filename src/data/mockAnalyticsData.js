/**
 * Mock Data for Analytics View Widgets:
 * 1. Tag Status Distribution (Pie / Donut Chart)
 * 2. Category Wise Loss (Horizontal Bar Chart)
 * 3. Top Stolen Items (Articles with counts, values, and progress bars)
 */

export const STATCARD_METRICS = {
  totalTags: 12568,
  untagged: 315,
  theftAlerts: 280,
  potentialLoss: '₹4,23,010',
  potentialLossRaw: 423010,
  securedTags: 11973, // 12568 - 315 - 280
};

export const TAG_STATUS_DATA = {
  total: 12568,
  totalLabel: 'Total Tags',
  potentialLoss: '₹4,23,010',
  segments: [
    {
      id: 'total-tags',
      label: 'Total Tags',
      sublabel: 'Active & verified in store',
      count: 12568,
      percentage: 95.3,
      color: '#10b981', // Emerald matching Image 2
      darkColor: '#047857',
      lightColor: '#34d399',
      textColor: 'text-emerald-700',
      bgColor: 'bg-emerald-500',
      badgeClass: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    },
    {
      id: 'untagged',
      label: 'Untagged',
      sublabel: 'Tag not removed at POS',
      count: 315,
      percentage: 2.5,
      color: '#00a8e7', // Sky Blue matching Image 2
      darkColor: '#0284c7',
      lightColor: '#38bdf8',
      textColor: 'text-sky-700',
      bgColor: 'bg-[#00a8e7]',
      badgeClass: 'bg-sky-50 text-sky-700 border-sky-200',
    },
    {
      id: 'theft-alerts',
      label: 'Theft Alerts',
      sublabel: 'Gate scanner alarms',
      count: 280,
      percentage: 2.2,
      color: '#f43f5e', // Rose Red matching Image 2
      darkColor: '#be123c',
      lightColor: '#fb7185',
      textColor: 'text-rose-700',
      bgColor: 'bg-rose-500',
      badgeClass: 'bg-rose-50 text-rose-700 border-rose-200',
    },
  ],
};

export const CATEGORY_LOSS_DATA = [
  {
    category: 'Apparel',
    lossCount: 4568,
    lossValue: 182720,
    color: '#00a8e7',
    barClass: 'bg-[#00a8e7]',
  },
  {
    category: 'Footwear',
    lossCount: 2234,
    lossValue: 89360,
    color: '#10b981',
    barClass: 'bg-emerald-500',
  },
  {
    category: 'Accessories',
    lossCount: 1568,
    lossValue: 47040,
    color: '#f97316',
    barClass: 'bg-orange-500',
  },
  {
    category: 'Home & Living',
    lossCount: 987,
    lossValue: 39480,
    color: '#8b5cf6',
    barClass: 'bg-purple-500',
  },
  {
    category: 'Electronics',
    lossCount: 654,
    lossValue: 98100,
    color: '#ec4899',
    barClass: 'bg-pink-500',
  },
  {
    category: 'Others',
    lossCount: 557,
    lossValue: 16710,
    color: '#64748b',
    barClass: 'bg-slate-500',
  },
];

export const TOP_STOLEN_ITEMS_DATA = [
  {
    rank: 1,
    articleNumber: 'AR12345',
    itemDescription: "Men's T-Shirt",
    theftCount: 12,
    lossValue: 24000,
    color: '#8b5cf6', // Purple matching Image 2
    dotClass: 'bg-purple-500',
    barClass: 'bg-purple-500',
  },
  {
    rank: 2,
    articleNumber: 'AR54321',
    itemDescription: 'Sports Shoes',
    theftCount: 8,
    lossValue: 32000,
    color: '#00a8e7', // Sky Blue
    dotClass: 'bg-[#00a8e7]',
    barClass: 'bg-[#00a8e7]',
  },
  {
    rank: 3,
    articleNumber: 'AR67890',
    itemDescription: 'Denim Jeans',
    theftCount: 6,
    lossValue: 18000,
    color: '#f59e0b', // Amber
    dotClass: 'bg-amber-500',
    barClass: 'bg-amber-500',
  },
  {
    rank: 4,
    articleNumber: 'AR11223',
    itemDescription: 'Cap',
    theftCount: 5,
    lossValue: 7500,
    color: '#10b981', // Emerald
    dotClass: 'bg-emerald-500',
    barClass: 'bg-emerald-500',
  },
  {
    rank: 5,
    articleNumber: 'AR99887',
    itemDescription: 'Backpack',
    theftCount: 4,
    lossValue: 16800,
    color: '#f43f5e', // Rose
    dotClass: 'bg-rose-500',
    barClass: 'bg-rose-500',
  },
];

export const THEFT_BY_TIME_DATA = [
  { timeSlot: '6AM - 9AM', count: 12, label: 'Early Morning' },
  { timeSlot: '9AM - 12PM', count: 18, label: 'Late Morning' },
  { timeSlot: '12PM - 3PM', count: 25, label: 'Afternoon Peak' },
  { timeSlot: '3PM - 6PM', count: 20, label: 'Late Afternoon' },
  { timeSlot: '6PM - 9PM', count: 15, label: 'Evening' },
  { timeSlot: '9PM - 12AM', count: 8, label: 'Night / Closing' },
];

export const THEFT_BY_TIME_SUMMARY = {
  totalIncidents: 98,
  peakSlot: '12PM - 3PM',
  peakCount: 25,
  peakPercentage: 25.5,
  rushWindowPercentage: 45.9, // (25 + 20) / 98
};

export const THEFT_BY_DAY_OF_WEEK_DATA = [
  { day: 'Mon', fullDay: 'Monday', count: 22 },
  { day: 'Tue', fullDay: 'Tuesday', count: 18 },
  { day: 'Wed', fullDay: 'Wednesday', count: 35 },
  { day: 'Thu', fullDay: 'Thursday', count: 27 },
  { day: 'Fri', fullDay: 'Friday', count: 30 },
  { day: 'Sat', fullDay: 'Saturday', count: 25 },
  { day: 'Sun', fullDay: 'Sunday', count: 20 },
];

export const THEFT_BY_DAY_OF_WEEK_SUMMARY = {
  totalIncidents: 177,
  peakDay: 'Wednesday',
  peakDayShort: 'Wed',
  peakCount: 35,
  peakPercentage: 19.8,
  weekdayTotal: 132,
  weekendTotal: 45,
  midweekRushPercentage: 52.0, // Wed (35) + Thu (27) + Fri (30) = 92 / 177
};
