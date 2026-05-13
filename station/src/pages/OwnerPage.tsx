import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { cafes, Cafe } from '../data/cafes';
import './OwnerPage.css';

type Reservation = {
  id: string;
  cafeId: number;
  name: string;
  date: string;
  slot: string;
  seats: number;
};

const mockReservations: Reservation[] = [
  {
    id: 'r1',
    cafeId: 2,
    name: 'Alex M.',
    date: '2026-03-22',
    slot: '11:00',
    seats: 1
  },
  {
    id: 'r2',
    cafeId: 2,
    name: 'Clara S.',
    date: '2026-03-22',
    slot: '14:00',
    seats: 2
  },
  {
    id: 'r3',
    cafeId: 1,
    name: 'Jules R.',
    date: '2026-03-23',
    slot: '10:00',
    seats: 1
  }
];

const OwnerPage = () => {
  const [selectedCafeId, setSelectedCafeId] = useState<number>(cafes[0]?.id ?? 1);

  const selectedCafe = useMemo(() => {
    return cafes.find((c) => c.id === selectedCafeId) as Cafe | undefined;
  }, [selectedCafeId]);

  const reservations = useMemo(() => {
    return mockReservations
      .filter((r) => r.cafeId === selectedCafeId)
      .slice()
      .sort((a, b) => (a.date + a.slot).localeCompare(b.date + b.slot));
  }, [selectedCafeId]);

  const [hourlyMin, setHourlyMin] = useState<number>(selectedCafe?.minConsumption ?? 6);
  const [seatCount, setSeatCount] = useState<number>(selectedCafe?.availableSlots ?? 10);

  return (
    <main className="container">
      <div className="owner-header">
        <div>
          <h2 className="owner-title">Café Dashboard</h2>
          <p className="owner-subtitle">Manage stations, pricing, and reservations.</p>
        </div>
        <Link className="owner-back" to="/">Back to customer view</Link>
      </div>

      <div className="owner-card card owner-card--pad">
        <div className="owner-row">
          <div className="owner-field">
            <label className="owner-label" htmlFor="cafe">Café</label>
            <select
              id="cafe"
              className="owner-select"
              value={selectedCafeId}
              onChange={(e) => {
                const nextId = Number(e.target.value);
                setSelectedCafeId(nextId);
                const nextCafe = cafes.find((c) => c.id === nextId);
                setHourlyMin(nextCafe?.minConsumption ?? 6);
                setSeatCount(nextCafe?.availableSlots ?? 10);
              }}
            >
              {cafes.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
            <p className="owner-hint">{selectedCafe?.address}</p>
          </div>

          <div className="owner-field">
            <label className="owner-label" htmlFor="hourlyMin">Hourly minimum (€)</label>
            <input
              id="hourlyMin"
              className="owner-input"
              type="number"
              min={0}
              value={hourlyMin}
              onChange={(e) => setHourlyMin(Number(e.target.value))}
            />
            <p className="owner-hint">Shown to customers as “Min / hr”.</p>
          </div>

          <div className="owner-field">
            <label className="owner-label" htmlFor="seats">Stations available</label>
            <input
              id="seats"
              className="owner-input"
              type="number"
              min={0}
              value={seatCount}
              onChange={(e) => setSeatCount(Number(e.target.value))}
            />
            <p className="owner-hint">How many bookable stations you offer.</p>
          </div>
        </div>

        <div className="owner-actions">
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => {
              alert('Saved (mock). Backend not wired yet.');
            }}
          >
            Save changes
          </button>
        </div>
      </div>

      <div className="owner-grid">
        <div className="owner-card card owner-card--pad">
          <h3 className="owner-section-title">Availability</h3>
          <p className="owner-hint">Customer booking slots (mock): 09:00–18:00.</p>
          <div className="owner-slots">
            {(selectedCafe?.slots ?? []).map((s) => (
              <span key={s} className="owner-chip">{s}</span>
            ))}
          </div>
        </div>

        <div className="owner-card card owner-card--pad">
          <h3 className="owner-section-title">Reservations</h3>
          {reservations.length === 0 ? (
            <p className="owner-hint">No reservations yet.</p>
          ) : (
            <div className="owner-table">
              <div className="owner-table-row owner-table-head">
                <div>Date</div>
                <div>Slot</div>
                <div>Name</div>
                <div>Seats</div>
              </div>
              {reservations.map((r) => (
                <div key={r.id} className="owner-table-row">
                  <div>{r.date}</div>
                  <div>{r.slot}</div>
                  <div>{r.name}</div>
                  <div>{r.seats}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <p className="owner-footnote">
        This dashboard is currently a mock. Next step is wiring persistence + auth for cafés.
      </p>
    </main>
  );
};

export default OwnerPage;
