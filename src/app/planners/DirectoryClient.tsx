'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PLANNERS, USE_CASES } from '@/lib/data';
import Icon from '@/components/Icon';
import PlannerCard from '@/components/PlannerCard';

export default function DirectoryClient() {
  const [filters, setFilters] = useState({
    types: new Set<string>(),
    locations: new Set<string>(),
    budget: 'any',
    guests: 'any',
  });
  const [saved, setSaved] = useState(new Set<string>());

  const locations = Array.from(new Set(PLANNERS.map(p => p.location)));

  const toggleType = (key: string) => {
    const next = new Set(filters.types);
    next.has(key) ? next.delete(key) : next.add(key);
    setFilters({ ...filters, types: next });
  };

  const toggleLoc = (loc: string) => {
    const next = new Set(filters.locations);
    next.has(loc) ? next.delete(loc) : next.add(loc);
    setFilters({ ...filters, locations: next });
  };

  const clearAll = () => setFilters({ types: new Set(), locations: new Set(), budget: 'any', guests: 'any' });

  const filtered = PLANNERS.filter(p => {
    if (filters.types.size > 0 && !Array.from(filters.types).some(t => p.types.includes(t))) return false;
    if (filters.locations.size > 0 && !filters.locations.has(p.location)) return false;
    if (filters.budget !== 'any') {
      const [lo, hi] = filters.budget.split('-').map(Number);
      if (p.maxBudget < lo || p.minBudget > hi) return false;
    }
    if (filters.guests !== 'any') {
      const [lo, hi] = filters.guests.split('-').map(Number);
      if (p.maxGuests < lo || p.minGuests > hi) return false;
    }
    return true;
  });

  const hasFilters = filters.types.size > 0 || filters.locations.size > 0 || filters.budget !== 'any' || filters.guests !== 'any';

  return (
    <>
      {/* Mini hero */}
      <section className="wrap" style={{ padding: '56px 24px 40px' }}>
        <span className="kicker">Verified planners on the island</span>
        <h1 className="serif-h1" style={{ marginTop: 12, marginBottom: 12 }}>Wedding planners in Mallorca</h1>
        <p className="lead" style={{ maxWidth: 720 }}>
          Twelve hand-vetted planners, each verified in person. Filter by region, guest count, budget and style — or skip the filtering and let the matcher do it.
        </p>
        <div style={{ display: 'flex', gap: 12, marginTop: 16, flexWrap: 'wrap' }}>
          <Link href="/matcher" className="btn btn--primary">
            <Icon name="sparkle" size={14} /> Use the matcher instead
          </Link>
        </div>
      </section>

      {/* Directory layout */}
      <section className="wrap sec--sm" style={{ paddingTop: 0 }}>
        <div className="dir-layout">
          {/* SIDEBAR */}
          <aside className="dir-filters">
            <h3>
              Filters
              {hasFilters && (
                <button onClick={clearAll} type="button">Clear all</button>
              )}
            </h3>

            <div className="dir-group">
              <h4>Wedding type</h4>
              {USE_CASES.slice(0, 6).map(u => {
                const count = PLANNERS.filter(p => p.types.includes(u.key)).length;
                return (
                  <label key={u.key} className="dir-check">
                    <input type="checkbox" checked={filters.types.has(u.key)} onChange={() => toggleType(u.key)} />
                    <span>{u.title.replace(/weddings?/i, '').trim()}</span>
                    <span className="dir-check__count">{count}</span>
                  </label>
                );
              })}
            </div>

            <div className="dir-group">
              <h4>Region</h4>
              {locations.map(l => {
                const count = PLANNERS.filter(p => p.location === l).length;
                return (
                  <label key={l} className="dir-check">
                    <input type="checkbox" checked={filters.locations.has(l)} onChange={() => toggleLoc(l)} />
                    <span>{l}</span>
                    <span className="dir-check__count">{count}</span>
                  </label>
                );
              })}
            </div>

            <div className="dir-group">
              <h4>Budget</h4>
              {[
                { v: 'any', t: 'Any' },
                { v: '15000-40000', t: 'Up to €40k' },
                { v: '40000-80000', t: '€40–80k' },
                { v: '80000-150000', t: '€80–150k' },
                { v: '150000-500000', t: '€150k+' },
              ].map(o => (
                <label key={o.v} className="dir-check">
                  <input type="radio" name="budget" checked={filters.budget === o.v} onChange={() => setFilters({ ...filters, budget: o.v })} />
                  <span>{o.t}</span>
                </label>
              ))}
            </div>

            <div className="dir-group">
              <h4>Guests</h4>
              {[
                { v: 'any', t: 'Any' },
                { v: '10-40', t: 'Intimate · 10–40' },
                { v: '40-100', t: 'Medium · 40–100' },
                { v: '100-300', t: 'Large · 100+' },
              ].map(o => (
                <label key={o.v} className="dir-check">
                  <input type="radio" name="guests" checked={filters.guests === o.v} onChange={() => setFilters({ ...filters, guests: o.v })} />
                  <span>{o.t}</span>
                </label>
              ))}
            </div>
          </aside>

          {/* RESULTS */}
          <div>
            <div className="dir-results-head">
              <h2 style={{ fontFamily: 'var(--font-body)', fontSize: 18, fontWeight: 700 }}>
                {filtered.length} planner{filtered.length !== 1 ? 's' : ''}
              </h2>
              <span className="count">Sorted by best match</span>
            </div>
            {filtered.length === 0 ? (
              <div style={{ padding: 64, textAlign: 'center', background: 'var(--surface)', borderRadius: 'var(--radius-md)', border: '1px solid var(--hairline)' }}>
                <h3 className="serif-h3">No planners match those filters.</h3>
                <p className="body-md" style={{ marginTop: 8, marginBottom: 24 }}>Try clearing one to see more.</p>
                <button className="btn btn--secondary" onClick={clearAll} type="button">Clear all filters</button>
              </div>
            ) : (
              <div className="pcard-grid">
                {filtered.map(p => (
                  <PlannerCard key={p.id} planner={p} saved={saved.has(p.id)} onSave={id => setSaved(s => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; })} />
                ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
