import type { Room } from './types';

// Entirely fictional demonstration data. Each room owns its own bookings.
export const rooms: Room[] = [
  {
    id: 'lib-201',
    name: 'Library Study Room A',
    building: 'Northstar Library',
    capacity: 8,
    equipment: ['Whiteboard', 'Projector', 'Video conferencing'],
    blocked: false,
    bookings: [
      { id: 1, start: 540, end: 600, label: 'Morning Study Group' },
      { id: 2, start: 780, end: 840, label: 'Faculty Meeting' },
      { id: 3, start: 1020, end: 1080, label: 'Book Club' },
    ],
  },
  {
    id: 'sci-104',
    name: 'Science Lab 104',
    building: 'Meridian Science Hall',
    capacity: 30,
    equipment: ['Projector', 'Computers', 'Whiteboard'],
    blocked: false,
    bookings: [
      { id: 4, start: 600, end: 720, label: 'Chemistry Workshop' },
      { id: 5, start: 900, end: 960, label: 'Physics Demonstration' },
    ],
  },
  {
    id: 'aud-300',
    name: 'Grand Auditorium',
    building: 'Cedar Arts Center',
    capacity: 200,
    equipment: ['Projector', 'Microphone', 'Sound system', 'Video conferencing'],
    blocked: true,
    bookings: [
      { id: 6, start: 480, end: 600, label: 'Guest Lecture Setup' },
      { id: 7, start: 780, end: 900, label: 'Community Forum' },
    ],
  },
  {
    id: 'gym-1',
    name: 'Main Gymnasium',
    building: 'Summit Athletics Center',
    capacity: 120,
    equipment: ['Sound system', 'Projector'],
    blocked: false,
    bookings: [
      { id: 8, start: 480, end: 540, label: 'Morning Basketball' },
      { id: 9, start: 1020, end: 1140, label: 'Volleyball Practice' },
    ],
  },
  {
    id: 'art-205',
    name: 'Art Studio 205',
    building: 'Orion Creative Wing',
    capacity: 15,
    equipment: ['Whiteboard', 'Computers'],
    blocked: false,
    bookings: [
      { id: 10, start: 840, end: 960, label: 'Painting Workshop' },
      { id: 11, start: 1140, end: 1200, label: 'Sculpture Class' },
    ],
  },
];

export const equipmentOptions = [
  'Whiteboard',
  'Projector',
  'Computers',
  'Microphone',
  'Sound system',
  'Video conferencing',
];
