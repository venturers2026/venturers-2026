import React from 'react';
import sharkTankImg from '../assets/sharktank.jpeg';
import wallstImg from '../assets/wallst.jpeg';
import chaiImg from '../assets/chai.jpeg';
import guestImg from '../assets/guest.jpeg';
import zerotoneImg from '../assets/zerotone.jpeg';
import cricImg from '../assets/cric.jpeg';
import gobImg from '../assets/gob.jpeg';

const eventsList = [
  { 
    id: 'sharktank', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '01', tag: 'Flagship', title: 'Shark Tank', 
    desc: 'Pitch your startup to a panel of real Sharks. Convince investors and industry experts. Bring your deck, own the room.', 
    fee: 'Registration: ₹99  ·  Prize: ₹1,000 + Trophy', delay: '0s',
    icon: sharkTankImg 
  },
  { 
    id: 'wallst', day: 'day2', dayLabel: 'Day 1 — Apr 10', num: '02', tag: 'Finance', title: 'Wolf of Wall Street', 
    desc: 'Live stock market simulation. Buy, sell, react to market events — build the strongest portfolio and claim the throne.', 
    fee: 'Registration: ₹99  ·  Prize Pool: ₹1,700', delay: '.30s',
    icon: wallstImg 
  },
  { 
    id: 'chai', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '03', tag: 'Networking', title: 'Chai Pe Charcha!', 
    desc: 'Intimate founder networking over chai. Meet real entrepreneurs, spark mentorships and collabs.', 
    fee: 'Free · Open to All', delay: '.12s',
    icon: chaiImg 
  },
  { 
    id: 'guest', day: 'day1', dayLabel: 'Day 1 — Apr 10', num: '04', tag: 'Keynote', title: 'Speaker Session', 
    desc: 'Inspiring keynote from a leading entrepreneur — real journey, failures, scaling strategies, and live Q&A with students.', 
    fee: 'Free · Open to All', delay: '.36s',
    icon: guestImg 
  },
  { 
    id: 'zerotone', day: 'day1', dayLabel: 'Day 2 — Apr 11', num: '05', tag: 'Makeathon', title: 'Zero to One', 
    desc: 'Build a viable startup concept across 3 elimination rounds — Blueprint, Beta Users, and a live Demo Day inspired by Y Combinator.', 
    fee: 'Registration: ₹149  ·  Prize Pool: ₹5,000', delay: '.06s',
    icon: zerotoneImg 
  },
  { 
    id: 'cric', day: 'day2', dayLabel: 'Day 2 — Apr 11', num: '06', tag: 'Strategy', title: 'Cric Auction', 
    desc: 'IPL-inspired bidding game. Use your budget to build a dream team from real IPL stats — strategy, intuition, and nerve win the day.', 
    fee: 'Registration: ₹149  ·  Prize: ₹600', delay: '.24s',
    icon: cricImg 
  },
  { 
    id: 'gob', day: 'day2', dayLabel: 'Day 2 — Apr 11', num: '07', tag: 'Debate', title: 'Game of Brands', 
    desc: 'Teams of three defend their secret brand in a high-stakes Brand War. Audience votes in prelims; judges crown the champions.', 
    fee: 'Registration: ₹149  ·  Prize Pool: ₹1,700', delay: '.18s',
    icon: gobImg 
  }
];

export default function Events({ openModal, addToCart, cart }) {
  return (
    <section id="events">
      <div className="container">
        <div className="reveal" style={{ textAlign: 'center', marginBottom: '48px' }}>
          <p className="s-label" style={{ justifyContent: 'center', display: 'flex' }}>What's Inside</p>
          <h2 className="s-title">Event Highlights</h2>
          <div className="s-rule" style={{ marginLeft: 'auto', marginRight: 'auto' }}></div>
        </div>
        
        <div className="events-grid">
          {eventsList.map(ev => {
            const inCart = cart.find(c => c.id === ev.id);

            return (
              <div key={ev.id} className="ev-card reveal" style={{ transitionDelay: ev.delay }}>
                <div className="ev-day-badge">{ev.dayLabel}</div>
                <div className="ev-num">{ev.num}</div>
                <div className="ev-icon"><img src={ev.icon} alt={ev.title} /></div>
                <div className="ev-tag">{ev.tag}</div>
                <h3>{ev.title}</h3>
                <p>{ev.desc}</p>
                <div className="ev-fee">{ev.fee}</div>
                <div className="ev-actions">
                  <button className="ev-more" onClick={() => openModal(ev.id)}>Learn More <span>→</span></button>
                  <button 
                    className={`ev-add-cart ${inCart ? 'added' : ''}`} 
                    onClick={() => !inCart && addToCart(ev.id, ev.title, ev.dayLabel)}
                  >
                    {inCart ? '✓ Added' : '+ Add'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}