export interface Sessions {
  readonly id: number;
  eventId: number;
  title: string;
  startAt: string;
  endsAt: string;
}

export const SESSION_SEED: Sessions[] = [
  {
    id: 1,
    eventId: 1,
    title: 'Welcome & What is Cloud Computing?',
    startAt: '2026-12-04T09:00:00.000Z',
    endsAt: '2026-12-04T10:00:00.000Z',
  },
  {
    id: 2,
    eventId: 1,
    title: 'Core Services: Compute, Storage & Networking',
    startAt: '2026-12-04T10:15:00.000Z',
    endsAt: '2026-12-04T11:30:00.000Z',
  },
  {
    id: 3,
    eventId: 2,
    title: 'Hands-On Lab: Deploying Your First App',
    startAt: '2026-12-04T11:45:00.000Z',
    endsAt: '2026-12-04T13:00:00.000Z',
  },
  {
    id: 4,
    eventId: 2,
    title: 'Hands-On Lab: Training Your First Model',
    startAt: '2026-12-25T11:45:00.000Z',
    endsAt: '2026-12-25T13:00:00.000Z',
  },
];
