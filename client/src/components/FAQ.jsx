import React, { useState } from 'react';

const faqs = [
  { q: "Who can participate in VENTURERS 2026?", a: "VENTURERS 2026 is open to all undergraduate and postgraduate students from any college across Pune. No prior entrepreneurship experience is required — just a willingness to learn and compete." },
  { q: "Is there a registration fee?", a: "Most events have a nominal registration fee: Shark Tank ₹99, Zero to One ₹149, Wolf of Wall Street ₹99, Game of Brands ₹149, Cric Auction ₹149. The Guest Session and Chai Pe Charcha! are completely free and open to all." },
  { q: "Can I register for multiple events?", a: "Yes, you can register for multiple events using the cart system. Browse the events, add your preferred ones to your cart, and complete a single registration for all of them. Note that some events have timing overlaps, so plan accordingly." },
  { q: "What should I bring for Shark Tank?", a: "For Shark Tank, you'll need a prepared pitch deck (we'll share a template post-registration), your idea clearly defined across problem, solution, market, revenue model and team. A laptop or printed deck is recommended." },
  { q: "What is the team size for each event?", a: "Shark Tank: 1–4 members · Zero to One: 2–4 members · Game of Brands: exactly 3 members · Cric Auction: individual or pairs · Thrones of Wall Street: 2–3 members · Chai Pe Charcha & Guest Session: individual." },
  { q: "What is the total prize pool?", a: "The total prize money to be distributed is ₹10,000 — spread across Shark Tank (₹1,000 + Trophy), Zero to One (₹5,000), Game of Brands (₹1,700), Wolf of Wall Street (₹1,700), and Cric Auction (₹600)." },
  { q: "Will certificates be provided?", a: "Yes! All participants will receive a digital participation certificate. Winners and runners-up will receive special merit certificates along with their prizes at the closing ceremony." },
];

export default function FAQ() {
  const [openIdx, setOpenIdx] = useState(null);

  const toggle = (idx) => {
    if (openIdx === idx) setOpenIdx(null);
    else setOpenIdx(idx);
  };

  return (
    <section id="faq" style={{ background: 'var(--deep)', padding: '100px 24px' }}>
      <div className="container">
        <div className="faq-grid">
          <div>
            <p className="s-label reveal">Got Questions?</p>
            <h2 className="s-title reveal" style={{ transitionDelay: '.1s' }}>Frequently Asked</h2>
            <div className="s-rule reveal" style={{ transitionDelay: '.15s' }}></div>
            <p className="reveal" style={{ color: 'var(--muted)', fontSize: '14px', lineHeight: 1.8, transitionDelay: '.2s' }}>
              Everything you need to know about VENTURERS 2026.
            </p>
          </div>
          <div className="faq-list reveal" style={{ transitionDelay: '.1s' }}>
            {faqs.map((f, i) => (
              <div key={i} className={`faq-item ${openIdx === i ? 'open' : ''}`}>
                <div className="faq-q" onClick={() => toggle(i)}>
                  {f.q} <span className="faq-icon">+</span>
                </div>
                <div className="faq-a"><p>{f.a}</p></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
