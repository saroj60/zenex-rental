import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon,
  Car,
  User,
  Clock,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';

const STATUS_PILL_STYLES = {
  confirmed: 'bg-emerald-600 text-white hover:bg-emerald-700',
  ongoing: 'bg-[#0755C9] text-white hover:bg-[#053e94]',
  pending: 'bg-amber-500 text-white hover:bg-amber-600',
  completed: 'bg-slate-600 text-white hover:bg-slate-700',
  cancelled: 'bg-rose-500 text-white hover:bg-rose-600',
  rejected: 'bg-purple-600 text-white hover:bg-purple-700',
};

const BookingCalendarView = ({
  events = [],
  onSelectBooking,
  vehicles = [],
  drivers = [],
}) => {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 10, 1)); // Default to Nov 2026
  const [selectedVehicle, setSelectedVehicle] = useState('all');
  const [selectedDriver, setSelectedDriver] = useState('all');

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  // Navigation
  const prevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };
  const nextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };
  const goToToday = () => {
    setCurrentDate(new Date(2026, 10, 1)); // Current demo period
  };

  const monthName = currentDate.toLocaleString('default', {
    month: 'long',
    year: 'numeric',
  });

  // Filter events
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      if (selectedVehicle !== 'all') {
        const vId = ev.vehicle?._id || ev.vehicle;
        if (vId !== selectedVehicle) return false;
      }
      if (selectedDriver !== 'all') {
        const dId = ev.driver?._id || ev.driver;
        if (dId !== selectedDriver) return false;
      }
      return true;
    });
  }, [events, selectedVehicle, selectedDriver]);

  // Days calculations
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDayIndex = new Date(year, month, 1).getDay(); // 0 is Sun, 1 is Mon...

  const calendarDays = useMemo(() => {
    const days = [];
    // Previous month padding
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDayIndex - 1; i >= 0; i--) {
      days.push({
        dayNumber: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(year, month - 1, prevMonthDays - i),
      });
    }

    // Current month days
    for (let d = 1; d <= daysInMonth; d++) {
      days.push({
        dayNumber: d,
        isCurrentMonth: true,
        date: new Date(year, month, d),
      });
    }

    // Next month padding to complete 35 or 42 grid cells
    const remaining = (7 - (days.length % 7)) % 7;
    for (let j = 1; j <= remaining; j++) {
      days.push({
        dayNumber: j,
        isCurrentMonth: false,
        date: new Date(year, month + 1, j),
      });
    }

    return days;
  }, [year, month, daysInMonth, firstDayIndex]);

  // Map events to date
  const getEventsForDay = (date) => {
    const dayStart = new Date(date);
    dayStart.setHours(0, 0, 0, 0);
    const dayEnd = new Date(date);
    dayEnd.setHours(23, 59, 59, 999);

    return filteredEvents.filter((ev) => {
      const s = new Date(ev.start);
      const e = new Date(ev.end);
      return s <= dayEnd && e >= dayStart;
    });
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden space-y-4 p-5">
      {/* Calendar Header Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl">
            <button
              type="button"
              onClick={prevMonth}
              className="p-1.5 hover:bg-white text-slate-700 rounded-lg transition-colors"
              title="Previous Month"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={nextMonth}
              className="p-1.5 hover:bg-white text-slate-700 rounded-lg transition-colors"
              title="Next Month"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <h2 className="text-base font-black text-slate-900 tracking-tight">
            {monthName}
          </h2>

          <button
            type="button"
            onClick={goToToday}
            className="text-xs font-bold px-2.5 py-1 bg-blue-50 text-[#0755C9] hover:bg-blue-100 rounded-lg transition-colors"
          >
            Today
          </button>
        </div>

        {/* Calendar Filters: Vehicle & Driver Schedule */}
        <div className="flex items-center gap-2 text-xs">
          <select
            value={selectedVehicle}
            onChange={(e) => setSelectedVehicle(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">Fleet: All Vehicles</option>
            {vehicles.map((v) => (
              <option key={v._id} value={v._id}>
                {v.name}
              </option>
            ))}
          </select>

          <select
            value={selectedDriver}
            onChange={(e) => setSelectedDriver(e.target.value)}
            className="px-2.5 py-1.5 bg-slate-50 border border-slate-200 rounded-xl font-bold text-slate-700 focus:outline-none focus:ring-1 focus:ring-[#0755C9]"
          >
            <option value="all">Roster: All Drivers</option>
            {drivers.map((d) => (
              <option key={d._id} value={d._id}>
                {d.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Weekday Labels */}
      <div className="grid grid-cols-7 gap-1 text-center text-[11px] font-black uppercase text-slate-400">
        <div>Sun</div>
        <div>Mon</div>
        <div>Tue</div>
        <div>Wed</div>
        <div>Thu</div>
        <div>Fri</div>
        <div>Sat</div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {calendarDays.map((cell, idx) => {
          const dayEvents = getEventsForDay(cell.date);
          const isToday =
            cell.date.toDateString() === new Date(2026, 10, 4).toDateString(); // Nov 4, 2026 demo reference

          return (
            <div
              key={idx}
              className={`min-h-[105px] p-2 rounded-xl border transition-colors flex flex-col justify-between ${
                cell.isCurrentMonth
                  ? isToday
                    ? 'bg-blue-50/40 border-blue-300 ring-1 ring-blue-300'
                    : 'bg-white border-slate-100 hover:bg-slate-50/60'
                  : 'bg-slate-50/50 border-slate-100/60 opacity-40'
              }`}
            >
              <div className="flex items-center justify-between mb-1.5">
                <span
                  className={`text-xs font-black w-6 h-6 rounded-full flex items-center justify-center ${
                    isToday
                      ? 'bg-[#0755C9] text-white shadow-sm'
                      : cell.isCurrentMonth
                      ? 'text-slate-800'
                      : 'text-slate-400'
                  }`}
                >
                  {cell.dayNumber}
                </span>
                {dayEvents.length > 0 && (
                  <span className="text-[10px] font-bold text-slate-400">
                    {dayEvents.length} {dayEvents.length === 1 ? 'trip' : 'trips'}
                  </span>
                )}
              </div>

              {/* Event Pills */}
              <div className="space-y-1 flex-1 overflow-y-auto max-h-[80px]">
                {dayEvents.slice(0, 3).map((ev) => {
                  const style =
                    STATUS_PILL_STYLES[ev.status] || STATUS_PILL_STYLES.pending;

                  return (
                    <button
                      key={ev.id || ev.bookingId}
                      type="button"
                      onClick={() => onSelectBooking(ev)}
                      className={`w-full text-left px-2 py-1 rounded-md text-[10px] font-bold shadow-xs truncate block transition-all ${style}`}
                      title={`${ev.bookingId}: ${ev.title} (${ev.status})`}
                    >
                      <span className="font-mono uppercase mr-1">
                        {ev.bookingId}:
                      </span>
                      <span>{ev.title}</span>
                    </button>
                  );
                })}
                {dayEvents.length > 3 && (
                  <div className="text-[9px] font-bold text-slate-400 pl-1">
                    +{dayEvents.length - 3} more
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Calendar Legend */}
      <div className="flex flex-wrap items-center justify-between pt-3 border-t border-slate-100 text-xs text-slate-500 gap-3">
        <div className="flex flex-wrap items-center gap-4 text-[11px] font-bold">
          <span className="text-slate-400 uppercase text-[10px] tracking-wider">
            Legend:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-600" />
            <span>Confirmed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#0755C9]" />
            <span>Ongoing</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>Pending</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-600" />
            <span>Completed</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
            <span>Cancelled</span>
          </div>
        </div>

        <p className="text-[11px] text-slate-400">
          Click any trip pill to view full breakdown, driver, and workflow actions.
        </p>
      </div>
    </div>
  );
};

export default BookingCalendarView;
