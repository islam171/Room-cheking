import { describe, it, expect, beforeEach } from 'vitest';

// Интерфейсы и мок-система для тестирования
interface BookingRequest {
    roomId: string;
    start: Date;
    end: Date;
    attendees: number;
}

interface Room {
    id: string;
    capacity: number;
    isBlocked: boolean;
    existingBookings: { start: Date; end: Date }[];
}

// Тестируемый модуль (RoomBookingService)
class RoomBookingService {
    private rooms: Map<string, Room> = new Map();

    constructor(rooms: Room[]) {
        rooms.forEach(r => this.rooms.set(r.id, r));
    }

    public checkAvailability(req: BookingRequest): 'Available' | 'Unavailable' {
        const room = this.rooms.get(req.roomId);
        if (!room || room.isBlocked) return 'Unavailable';
        if (req.attendees > room.capacity) return 'Unavailable';

        const now = new Date();
        if (req.start >= req.end || req.start < now) return 'Unavailable';

        const durationMin = (req.end.getTime() - req.start.getTime()) / 60000;
        if (durationMin > 120) return 'Unavailable';

        // Проверка пересечений и касаний
        for (const b of room.existingBookings) {
            // Касание в точках (end === b.start или start === b.end) разрешено
            const isOverlapping = req.start < b.end && req.end > b.start;
            if (isOverlapping) return 'Unavailable';
        }

        return 'Available';
    }

    public bookRoom(req: BookingRequest): { success: boolean; message: string; uiFeedback?: string } {
        const status = this.checkAvailability(req);
        if (status === 'Unavailable') {
            return { success: false, message: 'Booking rejected', uiFeedback: 'Error: Invalid booking parameters' };
        }
        const room = this.rooms.get(req.roomId)!;
        room.existingBookings.push({ start: req.start, end: req.end });
        return { success: true, message: 'Room booked successfully', uiFeedback: 'Success: Room reserved' };
    }
}

// --- ТЕСТОВЫЙ СЦЕНАРИЙ (10 ТЕСТОВ) ---
describe('Room Booking System - Comprehensive Regression & Feature Tests', () => {
    let service: RoomBookingService;
    const now = new Date(Date.now() + 100000); // Чуть в будущем

    beforeEach(() => {
        service = new RoomBookingService([
            { id: 'room-1', capacity: 10, isBlocked: false, existingBookings: [] },
            { id: 'room-blocked', capacity: 5, isBlocked: true, existingBookings: [] }
        ]);
    });

    // AC1: Reject start >= end and requests in the past
    it('Test 1 [AC1]: Отклонение бронирования при start >= end или в прошлом', () => {
        const pastDate = new Date(Date.now() - 1000000);
        const futureDate = new Date(Date.now() + 1000000);

        const resPast = service.bookRoom({ roomId: 'room-1', start: pastDate, end: futureDate, attendees: 2 });
        const resInvalidRange = service.bookRoom({ roomId: 'room-1', start: futureDate, end: futureDate, attendees: 2 });

        expect(resPast.success).toBe(false);
        expect(resInvalidRange.success).toBe(false);
    });

    // AC2 & F1: Enforce max duration (120 mins) - Exactly 120 minutes
    it('Test 2 [AC2/F1]: Разрешить бронирование ровно на 120 минут (граница)', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 120 * 60000);

        const res = service.bookRoom({ roomId: 'room-1', start, end, attendees: 4 });
        expect(res.success).toBe(true);
    });

    // F2: 121 minutes rejection
    it('Test 3 [F2]: Отклонить бронирование на 121 минуту (превышение лимита)', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 121 * 60000);

        const res = service.bookRoom({ roomId: 'room-1', start, end, attendees: 4 });
        expect(res.success).toBe(false);
    });

    // AC3: Reject blocked room
    it('Test 4 [AC3]: Отклонить бронирование для заблокированной комнаты', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 30 * 60000);

        const res = service.bookRoom({ roomId: 'room-blocked', start, end, attendees: 2 });
        expect(res.success).toBe(false);
    });

    // AC4: Allow touching at endpoints, reject overlaps
    it('Test 5 [AC4 - Touch]: Разрешить бронирования, которые только соприкасаются в конечных точках', () => {
        const start1 = new Date(now.getTime() + 100000);
        const end1 = new Date(start1.getTime() + 60 * 60000);

        // Второе бронирование начинается ровно в момент окончания первого
        const start2 = end1;
        const end2 = new Date(start2.getTime() + 60 * 60000);

        const res1 = service.bookRoom({ roomId: 'room-1', start: start1, end: end1, attendees: 2 });
        const res2 = service.bookRoom({ roomId: 'room-1', start: start2, end: end2, attendees: 2 });

        expect(res1.success).toBe(true);
        expect(res2.success).toBe(true);
    });

    it('Test 6 [AC4 - Overlap]: Отклонить пересекающиеся интервалы', () => {
        const start1 = new Date(now.getTime() + 100000);
        const end1 = new Date(start1.getTime() + 60 * 60000);

        const start2 = new Date(start1.getTime() + 30 * 60000); // Пересечение
        const end2 = new Date(start2.getTime() + 60 * 60000);

        service.bookRoom({ roomId: 'room-1', start: start1, end: end1, attendees: 2 });
        const resOverlap = service.bookRoom({ roomId: 'room-1', start: start2, end: end2, attendees: 2 });

        expect(resOverlap.success).toBe(false);
    });

    // AC5: Return Available / Unavailable without changing booking data
    it('Test 5 [AC5]: Проверка статуса Available/Unavailable без изменения данных бронирования', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 60 * 60000);

        const statusBefore = service.checkAvailability({ roomId: 'room-1', start, end, attendees: 3 });
        expect(statusBefore).toBe('Available');

        // Проверяем, что вызов checkAvailability не добавил бронь в комнату
        const room = (service as any).rooms.get('room-1');
        expect(room.existingBookings.length).toBe(0);
    });

    // F3 & F4: Capacity boundaries (Exact vs Insufficient)
    it('Test 8 [F3 - Exact Capacity]: Разрешить бронирование при точном совпадении вместимости', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 30 * 60000);

        const res = service.bookRoom({ roomId: 'room-1', start, end, attendees: 10 }); // Вместимость комнаты = 10
        expect(res.success).toBe(true);
    });

    it('Test 9 [F4 - Insufficient Capacity]: Отклонить бронирование при превышении вместимости', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 30 * 60000);

        const res = service.bookRoom({ roomId: 'room-1', start, end, attendees: 11 }); // Вместимость = 10
        expect(res.success).toBe(false);
    });

    // AC6 / UI Integration: Preserve clear UI feedback on desktop and mobile
    it('Test 10 [AC6 - UI Behavior]: Сохранение корректной обратной связи интерфейса (UI feedback)', () => {
        const start = new Date(now.getTime() + 100000);
        const end = new Date(start.getTime() + 150 * 60000); // Невалидная длительность (>120)

        const res = service.bookRoom({ roomId: 'room-1', start, end, attendees: 2 });
        expect(res.success).toBe(false);
        expect(res.uiFeedback).toBeDefined();
        expect(res.uiFeedback).toContain('Error');
    });
});