import React, { useEffect } from 'react';

const modalsData = {
  sharktank: {
    id: 'sharktank', badge: 'Flagship Event', day: 'Day 1 — Apr 10', title: 'Shark Tank', 
    meta: [
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: '1–4 members' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Reg: ₹99' }
    ],
    prizeTitle: 'Prize Money', prizes: [{ name: '🏆 Shark\'s Choice Award', amount: '₹1,000 + Trophy' }],
    content: (
      <>
        <p>The <strong>Shark Tank</strong> event is a live startup pitching experience where student teams pitch their venture ideas to a panel of <strong>3–4 Sharks</strong> — real entrepreneurs, investors, and industry leaders.</p>
        <p>Teams register via this form and receive a <strong>Pitch Deck Template</strong>.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span>Register below — submit your problem statement, solution, and team details.</span></li>
          <li><span className="m-n">2</span><span>Prepare your pitch using the provided Pitch Deck template and bring it on event day.</span></li>
          <li><span className="m-n">3</span><span>Cover the problem, solution, target market, revenue model, and growth plan.</span></li>
          <li><span className="m-n">4</span><span>Answer Shark questions on concept, execution plan, and market viability.</span></li>
          <li><span className="m-n">5</span><span>Sharks may choose to <strong>mentor, collaborate, or invest</strong> in promising ideas at their discretion.</span></li>
          <li><span className="m-n">6</span><span>Top team wins the <strong>Shark's Choice Award</strong> announced at the closing ceremony.</span></li>
        </ol>
      </>
    )
  },
  zerotone: {
    id: 'zerotone', badge: 'Makeathon', day: 'Day 2 — Apr 11', title: 'Zero to One', 
    meta: [
      { i: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: '3 rounds' },
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: '2–4 members' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Reg: ₹149' }
    ],
    prizeTitle: 'Prize Money — Total ₹5,000', prizes: [{ name: '🥇 1st Place', amount: '₹2,500' }, { name: '🥈 2nd Place', amount: '₹1,500' }, { name: '🥉 3rd Place', amount: '₹1,000' }],
    content: (
      <>
        <p><strong>Zero to One</strong> is a startup-focused Makeathon that takes teams through the complete lifecycle of an early-stage startup — from a given problem statement all the way to a public Demo Day.</p>
        <p>Teams receive a predefined problem statement with a defined context, target user segment, quantifiable goal, and constraints. No slide decks permitted at any stage — the landing page tells your story.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span><strong>Round 1 — Blueprint &amp; Landing Page:</strong> Submit a Blueprint Document + a live single-page landing page. All teams proceed to Round 2.</span></li>
          <li><span className="m-n">2</span><span><strong>Round 2 — Beta Users:</strong> Each team presents to a mixed panel. Evaluators have limited tokens to allocate — representing real user signups. Top token-earners advance.</span></li>
          <li><span className="m-n">3</span><span><strong>Round 3 — Demo Day:</strong> Finalists present in a live showcase open to all attendees, inspired by Y Combinator's Demo Day format.</span></li>
        </ol>
      </>
    )
  },
  chai: {
    id: 'chai', badge: 'Networking Session', day: 'Day 1 — Apr 10', title: 'Chai Pe Charcha!', 
    meta: [
      { i: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: '2 hours' },
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, text: 'Individual' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Free' }
    ],
    prizeTitle: null, prizes: [],
    content: (
      <>
        <p><strong>Chai Pe Charcha!</strong> is an intimate networking session where students connect directly with real startup founders and entrepreneurs — over chai.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span><strong>Guest Arrival &amp; Welcome:</strong> Founders arrive, warm welcome and brief orientation.</span></li>
          <li><span className="m-n">2</span><span><strong>Introduction Session:</strong> Short intros highlighting each founder's background and journey.</span></li>
          <li><span className="m-n">3</span><span><strong>Founder Talk:</strong> Each founder shares their startup journey, challenges, and practical advice.</span></li>
          <li><span className="m-n">4</span><span><strong>Open Networking Round:</strong> Small group discussions and one-on-one conversations.</span></li>
          <li><span className="m-n">5</span><span><strong>Idea Pitch &amp; Feedback:</strong> Students get to pitch and receive quick constructive feedback.</span></li>
          <li><span className="m-n">6</span><span><strong>Mentorship &amp; Collaboration:</strong> Exchange contacts, explore collaborations, and seek long-term mentorship.</span></li>
        </ol>
      </>
    )
  },
  gob: {
    id: 'gob', badge: 'Debate Competition', day: 'Day 2 — Apr 11', title: 'Game of Brands — The Brand War',
    meta: [
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: '3 members/team' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Reg: ₹149' }
    ],
    prizeTitle: 'Prize Money — Total ₹1,700', prizes: [{ name: '🥇 1st Place', amount: '₹1,000' }, { name: '🥈 2nd Place', amount: '₹700' }],
    content: (
      <>
        <p><strong>Game of Brands</strong> is an exciting brand-strategy debate where <strong>teams of three</strong> compete to showcase their brand prowess. Each team is secretly assigned a real brand and must defend it in battle.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span><strong>Group Formation:</strong> A WhatsApp group is created for team leaders. Each receives their secret brand assignment.</span></li>
          <li><span className="m-n">2</span><span><strong>Brand Introduction:</strong> Two teams face off — each presenting their brand with a powerful intro round.</span></li>
          <li><span className="m-n">3</span><span><strong>The Debate:</strong> Teams go head-to-head defending their brand's value, strategy, and market position.</span></li>
          <li><span className="m-n">4</span><span><strong>Audience Vote:</strong> The audience selects the winner of each preliminary round.</span></li>
          <li><span className="m-n">5</span><span><strong>Finals — Judge's Round:</strong> Top teams face judges who evaluate brand defense, strategic thinking, and creativity.</span></li>
          <li><span className="m-n">6</span><span>The <strong>top three brands</strong> are crowned winners of the Brand War.</span></li>
        </ol>
      </>
    ),
    regFields: [
      <input key="1" className="m-inp" type="text" placeholder="Team Leader Name" />,
      <input key="2" className="m-inp" type="text" placeholder="College / Branch" />,
      <input key="3" className="m-inp" type="email" placeholder="Email Address" />,
      <input key="4" className="m-inp" type="tel" placeholder="Phone Number" />
    ],
    regExtra: <input className="m-inp" type="text" placeholder="Team Name (exactly 3 members)" style={{ marginBottom: '12px' }} />
  },
  cric: {
    id: 'cric', badge: 'Strategy Game', day: 'Day 2 — Apr 11', title: 'Cric Auction',
    meta: [
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, text: 'Individual / Pairs' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Reg: ₹149' }
    ],
    prizeTitle: 'Prize Money', prizes: [{ name: '🏆 Winner', amount: '₹600' }],
    content: (
      <>
        <p><strong>Cric Auction</strong> is a dynamic, IPL-inspired bidding game designed to immerse participants in the excitement of a real cricket auction — blending strategy, statistics, and high-stakes fun.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span>Each participant receives a <strong>fixed amount of fake currency</strong> as their auction budget.</span></li>
          <li><span className="m-n">2</span><span>IPL players are displayed with <strong>detailed stats, current form, and past performances</strong> to inform your bids.</span></li>
          <li><span className="m-n">3</span><span>Participants <strong>bid strategically</strong> to build the best possible team with a cap on the number of players.</span></li>
          <li><span className="m-n">4</span><span>Winners decided by <strong>admin evaluation</strong> considering real-world player stats, points, and overall team strategy.</span></li>
        </ol>
        <p style={{ marginTop: '12px', fontSize: '12px', color: 'var(--grey)' }}>A taste of the high-stakes world of IPL auctions — where every bid is a strategic decision.</p>
      </>
    )
  },
  wallst: {
    id: 'wallst', badge: 'Finance Simulation', day: 'Day 1 — Apr 10', title: 'Wolf of Wall Street',
    meta: [
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>, text: '2–3 members' },
      { i: <svg viewBox="0 0 24 24"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/></svg>, text: 'Portfolio battle' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Reg: ₹99' }
    ],
    prizeTitle: 'Prize Money — Total ₹1,700', prizes: [{ name: '🥇 1st Place', amount: '₹1,000' }, { name: '🥈 2nd Place', amount: '₹700' }],
    content: (
      <>
        <p><strong>Wolf of Wall Street</strong> is an interactive simulation that recreates a simplified trading environment. Participants form teams and enter a virtual marketplace with multiple <strong>fictional companies across different sectors</strong>.</p>
        <p>Each company starts with a defined market value that <strong>changes dynamically</strong> based on simulated market events, corporate announcements, and economic updates.</p>
        <p>Teams must <strong>analyze information, evaluate opportunities, and make informed investment decisions</strong> to build the strongest portfolio.</p>
      </>
    ),
    regExtra: <input className="m-inp" type="text" placeholder="Team Name (2–3 members)" style={{ marginBottom: '12px' }} />
  },
  guest: {
    id: 'guest', badge: 'Keynote', day: 'Day 1 — Apr 10', title: 'Speaker Session',
    meta: [
      { i: <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>, text: '~1 hour' },
      { i: <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/></svg>, text: 'Open to all' },
      { i: <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>, text: 'Free' }
    ],
    prizeTitle: null, prizes: [],
    content: (
      <>
        <p>The <strong>Guest Session</strong> brings an accomplished entrepreneur or industry leader to share their journey, experiences, and insights with students — live on stage at VENTURERS.</p>
        <ol className="m-steps">
          <li><span className="m-n">1</span><span><strong>Guest Arrival &amp; Welcome:</strong> Speaker is welcomed and briefed on the session flow.</span></li>
          <li><span className="m-n">2</span><span><strong>Introduction:</strong> Host presents the speaker's journey, achievements, and ecosystem contributions.</span></li>
          <li><span className="m-n">3</span><span><strong>Keynote Address (20–30 min):</strong> Speaker shares their entrepreneurial journey — key experiences, challenges, and insights.</span></li>
          <li><span className="m-n">4</span><span><strong>Insight &amp; Learning Segment:</strong> Practical takeaways on startup strategies and industry trends.</span></li>
          <li><span className="m-n">5</span><span><strong>Interactive Q&amp;A (10–15 min):</strong> Students ask questions about startups, career paths, and real-world business scenarios.</span></li>
          <li><span className="m-n">6</span><span><strong>Student Interaction &amp; Felicitation:</strong> Selected students share ideas for feedback. Vote of thanks and token of appreciation.</span></li>
        </ol>
      </>
    )
  }
};

export default function Modals({ activeModal, closeM, addToCart, cart, showToast }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') closeM();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [closeM]);

  return (
    <>
      {Object.values(modalsData).map((m) => {
        const inCart = cart.find(c => c.id === m.id);
        const isOpen = activeModal === m.id;
        
        return (
          <div key={m.id} className={`modal-bg ${isOpen ? 'on' : ''}`} onClick={(e) => { if (e.target === e.currentTarget) closeM(); }}>
            <div className="modal-panel">
              <button className="m-close" onClick={closeM}>✕</button>
              <span className="m-badge">{m.badge}</span><span className="m-day-tag">{m.day}</span>
              <div className="m-title">{m.title}</div>
              <div className="m-rule"></div>
              <div className="m-meta">
                {m.meta.map((meta, i) => (
                   <div key={i} className="m-meta-item">{meta.i}{meta.text}</div>
                ))}
              </div>
              <div className="m-body">
                {m.content}
                {m.prizeTitle && (
                  <div className="m-prize-box">
                    <div className="m-prize-title">{m.prizeTitle}</div>
                    {m.prizes.map((p, i) => (
                      <div key={i} className="m-prize-row"><span>{p.name}</span><span>{p.amount}</span></div>
                    ))}
                    <p className="m-prize-note">* Prize money is subject to number of participants.</p>
                  </div>
                )}
                {m.id === 'sharktank' && <p style={{ marginTop: '16px', fontSize: '12px', color: 'var(--grey)' }}>Evaluated on: Innovation · Feasibility · Scalability · Market Potential · Overall Impression</p>}
              </div>
              <div className="m-register-section">
                <div className="m-register-title">Register for {m.title} — {m.id === 'guest' || m.id === 'chai' ? 'Free' : (m.id === 'sharktank' ? '₹99' : (m.id === 'wallst' ? '₹99' : '₹149'))}</div>
                
                <div className="m-form-row">
                  {m.regFields ? m.regFields.slice(0, 2) : (
                    <>
                      <input className="m-inp" type="text" placeholder="Full Name" />
                      <input className="m-inp" type="text" placeholder="College / Branch" />
                    </>
                  )}
                </div>
                <div className="m-form-row">
                  {m.regFields ? m.regFields.slice(2, 4) : (
                    <>
                      <input className="m-inp" type="email" placeholder="Email Address" />
                      <input className="m-inp" type="tel" placeholder="Phone Number" />
                    </>
                  )}
                </div>
                {m.regExtra ? m.regExtra : (
                  (m.id === 'sharktank' || m.id === 'zerotone' || m.id === 'wallst' || m.id === 'gob') ? 
                  <input className="m-inp" type="text" placeholder={m.id === 'sharktank' ? "Team Name" : m.id === 'zerotone' ? "Team Name (2–4 members)" : "Team Name"} style={{ marginBottom: '12px' }} /> 
                  : null
                )}
                
                <div className="m-btn-row">
                  <button className="m-btn-register" onClick={(e) => {
                    e.target.textContent = `✓ Registered for ${m.title}!`;
                    e.target.style.background = '#2ecc71';
                    e.target.disabled = true;
                    showToast(`Successfully registered for ${m.title}!`);
                  }}>Register Now →</button>
                  <button 
                    className={`m-btn-cart ${inCart ? 'added' : ''}`} 
                    onClick={() => {
                      if (!inCart) addToCart(m.id, m.title, m.day);
                    }}
                  >
                    {inCart ? '✓ In Cart' : '+ Add to Cart'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
