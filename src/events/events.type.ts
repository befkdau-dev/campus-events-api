export interface Events {
  readonly id: number;
  title: string;
  description: string;
  location: string;
  eventDate: string;
  category: string;
  isPublished: Boolean;
}

export const SEED: Events[] = [
  {
    id: 1,
    title: 'Intro to Cloud Computing',
    description: 'A beginner-friendly campus workshop.',
    location: 'Engineering Block, Room 2',
    eventDate: '2026-12-04T09:00:00.000Z',
    category: 'technology',
    isPublished: true,
  },
  {
    id: 2,
    title: 'Modern UI/UX Design Principles',
    description: 'Hands-on session covering wireframing and prototyping.',
    location: 'Design Studio, Lab 4',
    eventDate: '2026-12-10T14:00:00.000Z',
    category: 'design',
    isPublished: true,
  },
  {
    id: 3,
    title: 'Startup Pitch Night',
    description: 'Local student founders present their early-stage ideas.',
    location: 'Main Auditorium',
    eventDate: '2026-12-15T17:30:00.000Z',
    category: 'business',
    isPublished: false,
  },
  {
    id: 4,
    title: 'Cybersecurity Essentials',
    description: 'Learn how to protect web applications from common threats.',
    location: 'ICT Center, Hall B',
    eventDate: '2026-12-20T10:00:00.000Z',
    category: 'technology',
    isPublished: true,
  },
];
