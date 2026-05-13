import React, { useEffect, useMemo, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { getCafeById } from '../data/cafes';
import { track } from '../lib/tracking';
import './CafeDetailPage.css';

const CafeDetailPage = () => {
  const { cafeId } = useParams();

  const cafe = useMemo(() => {
    const id = Number(cafeId);
    if (Number.isNaN(id)) return undefined;
    return getCafeById(id);
  }, [cafeId]);

  const [selectedSlot, setSelectedSlot] = useState<string>('');

  useEffect(() => {
    if (cafe) {
      track('view_cafe_detail', { cafeId: cafe.id });
    }
  }, [cafe]);

  if (!cafe) {
    return (
      <main className="container">
        <div className="detail-card card">
          <p className="detail-muted">Cafe not found.</p>
          <Link to="/" className="detail-back">Back to cafés</Link>
        </div>
      </main>
    );
  }

  return (
    <main className="container">
      <div className="detail-header">
        <Link to="/" className="detail-back">Back to cafés</Link>
      </div>

      <div className="detail-layout">
        <div className="detail-card card">
          <img src={cafe.image} alt={cafe.name} className="detail-image" />
          <div className="detail-content">
            <h2 className="detail-title">{cafe.name}</h2>
            <p className="detail-muted">{cafe.address}</p>
            <p className="detail-description">{cafe.description}</p>

            <div className="detail-badges">
              <span className="detail-badge">Min: ${cafe.minConsumption}/hr</span>
              <span className="detail-badge">{cafe.availableSlots} seats</span>
            </div>

            <div className="amenities">
              <h3 className="amenities-title">What this place offers</h3>
              <div className="amenities-list">
                {cafe.amenities.map((a: string) => (
                  <span key={a} className="amenity-chip">{a}</span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="detail-card card">
          <div className="detail-content">
            <h3 className="detail-subtitle">Pick a slot (9:00–18:00)</h3>

            <div className="slot-grid">
              {cafe.slots.map((slot: string) => {
                const active = selectedSlot === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    className={`slot-button ${active ? 'slot-button--active' : ''}`}
                    onClick={() => {
                      setSelectedSlot(slot);
                      track('slot_select', { cafeId: cafe.id, slot });
                    }}
                  >
                    {slot}
                  </button>
                );
              })}
            </div>

            <button
              className="btn btn-primary detail-cta"
              disabled={!selectedSlot}
              onClick={() => {
                track('reserve_click', { cafeId: cafe.id, slot: selectedSlot });
                alert(`Booked ${cafe.name} at ${selectedSlot}`);
              }}
            >
              Book your station
            </button>

            <p className="detail-muted detail-footnote">
              This is a prototype. No payment, no account.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default CafeDetailPage;
