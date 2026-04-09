export const EVENT_CATALOG = [
  { id: 'sharktank', title: 'Shark Tank', fee: 99 },
  { id: 'zerotone', title: 'Zero to One', fee: 149 },
  { id: 'chai', title: 'Chai Pe Charcha!', fee: 0 },
  { id: 'gob', title: 'Game of Brands', fee: 149 },
  { id: 'cric', title: 'Cric Auction', fee: 149 },
  { id: 'wallst', title: 'Wolf of Wall Street', fee: 99 },
  { id: 'guest', title: 'Speaker Session', fee: 0 }
];

export function getEventById(eventId) {
  return EVENT_CATALOG.find((eventItem) => eventItem.id === eventId);
}
