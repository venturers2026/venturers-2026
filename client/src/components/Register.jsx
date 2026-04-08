import React, { useEffect, useState } from 'react';
import paymentSSImg from '../assets/payment_ss.jpeg';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000';

const EVENT_CATALOG = [
  { id: 'sharktank', title: 'Shark Tank', fee: 99 },
  { id: 'zerotone', title: 'Zero to One', fee: 149 },
  { id: 'chai', title: 'Chai Pe Charcha!', fee: 0 },
  { id: 'gob', title: 'Game of Brands', fee: 149 },
  { id: 'cric', title: 'Cric Auction', fee: 149 },
  { id: 'wallst', title: 'Wolf of Wall Street', fee: 99 },
  { id: 'guest', title: 'Speaker Session', fee: 0 }
];

const PASS_TIER = {
  PREMIUM: 'Premium',
  CUSTOMIZED: 'Customized'
};

function getEventById(eventId) {
  return EVENT_CATALOG.find((eventItem) => eventItem.id === eventId);
}

function calculateBilling(passTier, selectedEventIds) {
  const selectedEvents = selectedEventIds
    .map((eventId) => getEventById(eventId))
    .filter(Boolean);

  const subtotal = selectedEvents.reduce((sum, eventItem) => sum + eventItem.fee, 0);

  let discountPercent = 0;
  if (passTier === PASS_TIER.PREMIUM) {
    discountPercent = 20;
  } else if (passTier === PASS_TIER.CUSTOMIZED && selectedEvents.filter((eventItem) => eventItem.fee > 0).length > 2) {
    // Only count paid events (fee > 0) towards the 3-event threshold
    discountPercent = 10;
  }

  const discountAmount = Math.round((subtotal * discountPercent) / 100);
  const payable = Math.max(subtotal - discountAmount, 0);

  return {
    subtotal,
    discountPercent,
    discountAmount,
    payable
  };
}

export default function Register({ cart, removeFromCart, showToast }) {
  const [busy, setBusy] = useState(false);
  
  // New state to track if user is on the payment step
  const [isPaymentStep, setIsPaymentStep] = useState(false);
  const [availability, setAvailability] = useState({});

  const [formValues, setFormValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    institute: '',
    phoneNumber: '',
    passTier: PASS_TIER.CUSTOMIZED
  });

  const [selectedEventIds, setSelectedEventIds] = useState([]);
  const [eventToAdd, setEventToAdd] = useState('');
  const [paymentSSFile, setPaymentSSFile] = useState(null);

  useEffect(() => {
    if (formValues.passTier === PASS_TIER.PREMIUM) {
      setSelectedEventIds(EVENT_CATALOG.map((eventItem) => eventItem.id));
      setEventToAdd('');
    }
  }, [formValues.passTier]);

  useEffect(() => {
    if (formValues.passTier !== PASS_TIER.CUSTOMIZED) return;
    if (!Array.isArray(cart) || cart.length === 0) return;

    setSelectedEventIds((prev) => {
      const merged = new Set(prev);
      cart.forEach((cartItem) => {
        if (getEventById(cartItem.id)) merged.add(cartItem.id);
      });
      return Array.from(merged);
    });
  }, [cart, formValues.passTier]);

  const selectedEvents = selectedEventIds
    .map((eventId) => getEventById(eventId))
    .filter(Boolean);

  const billing = calculateBilling(formValues.passTier, selectedEventIds);
  
  // Boolean to easily check if payment is needed
  const requiresPayment = billing.payable > 0;
  useEffect(() => {
    fetch(`${API_BASE_URL}/api/participants/availability`)
      .then(res => res.json())
      .then(data => setAvailability(data))
      .catch(err => console.error("Failed to fetch availability", err));
  }, []);

  // Determine if Premium Pass can be bought (Disable if ANY event is completely full)
  const isPremiumAvailable = EVENT_CATALOG.every(ev => {
    const avail = availability[ev.title];
    return !avail || avail.available > 0;
  });

  // Reset payment step if the cart becomes free
  useEffect(() => {
    if (!requiresPayment) {
      setIsPaymentStep(false);
    }
  }, [requiresPayment]);

  const updateField = (field, value) => {
    setFormValues((prev) => ({ ...prev, [field]: value }));
  };

  const addSelectedEvent = () => {
    if (!eventToAdd) return;
    setSelectedEventIds((prev) => {
      if (prev.includes(eventToAdd)) return prev;
      return [...prev, eventToAdd];
    });
    setEventToAdd('');
  };

  const removeSelectedEvent = (eventId) => {
    setSelectedEventIds((prev) => prev.filter((id) => id !== eventId));
    const cartMatch = cart.find((item) => item.id === eventId);
    if (cartMatch) removeFromCart(eventId);
  };

  // Extracted validation logic so both buttons can use it
  const validateBasicDetails = () => {
    const requiredFields = ['firstName', 'lastName', 'email', 'institute', 'phoneNumber'];
    const missing = requiredFields.find((field) => !formValues[field]?.trim());
    if (missing) {
      showToast('Please fill all required registration fields.');
      return false;
    }

    if (selectedEventIds.length === 0) {
      showToast('Please select at least one event.');
      return false;
    }
    return true;
  };

  const handleProceedToPayment = () => {
    if (validateBasicDetails()) {
      setIsPaymentStep(true);
    }
  };

  const submitForm = async () => {
    if (!validateBasicDetails()) return;

    // Only require screenshot if there is an amount to pay
    if (requiresPayment && !paymentSSFile) {
      showToast('Please upload your payment screenshot.');
      return;
    }

    setBusy(true);

    try {
      const payload = new FormData();
      payload.append('firstName', formValues.firstName.trim());
      payload.append('lastName', formValues.lastName.trim());
      payload.append('email', formValues.email.trim());
      payload.append('institute', formValues.institute.trim());
      payload.append('phoneNumber', formValues.phoneNumber.trim());
      payload.append('passTier', formValues.passTier);
      payload.append('eventsApplied', selectedEvents.map((eventItem) => eventItem.title).join(','));
      payload.append('billingAmount', String(billing.payable));
      if (paymentSSFile) {
        payload.append('paymentSS', paymentSSFile);
      }

      const response = await fetch(`${API_BASE_URL}/api/participants/register`, {
        method: 'POST',
        body: payload
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData?.error || 'Registration failed. Please try again.');
      }

      showToast('Registration successful! Your participant entry has been created.');
      setFormValues({
        firstName: '',
        lastName: '',
        email: '',
        institute: '',
        phoneNumber: '',
        passTier: PASS_TIER.CUSTOMIZED
      });
      setSelectedEventIds([]);
      setEventToAdd('');
      setPaymentSSFile(null);
      setIsPaymentStep(false);
    } catch (error) {
      showToast(error?.message || 'Unable to submit registration right now.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <section id="register">
      <div className="container">
        <div className="reg-wrap reveal">
          <p className="s-label" style={{ textAlign: 'center', display: 'block', marginBottom: '12px' }}>Join the Movement</p>
          <h2>Secure Your Spot</h2>
          <p>Choose your pass, build your event list, check payable amount, and complete payment via the QR below.</p>
          
          <div className={`cart-summary-box ${cart.length > 0 ? 'show' : ''}`} id="regCartBox">
            <div className="cart-summary-label">Events in your cart</div>
            <div className="cart-items-list" id="regCartList">
              {cart.map(item => (
                <span key={`rt-${item.id}`} className="cart-tag">
                  {item.name} <span className="rm" onClick={() => removeFromCart(item.id)}>✕</span>
                </span>
              ))}
            </div>
          </div>
          
          <div className="form-row">
            <input className="inp" type="text" placeholder="First Name" value={formValues.firstName} onChange={(event) => updateField('firstName', event.target.value)} />
            <input className="inp" type="text" placeholder="Last Name" value={formValues.lastName} onChange={(event) => updateField('lastName', event.target.value)} />
          </div>
          <div className="form-row">
            <input className="inp" type="email" placeholder="Email Address" value={formValues.email} onChange={(event) => updateField('email', event.target.value)} />
            <input className="inp" type="tel" placeholder="Phone Number" value={formValues.phoneNumber} onChange={(event) => updateField('phoneNumber', event.target.value)} />
          </div>
          <div className="form-row">
            <input className="inp" type="text" placeholder="Institute" value={formValues.institute} onChange={(event) => updateField('institute', event.target.value)} />
          </div>

          <div className="reg-pass-wrap">
            <div className="reg-pass-head">Pass Tier</div>
            <div className="reg-pass-tabs">
              <button 
                type="button" 
                className={`reg-pass-btn ${formValues.passTier === PASS_TIER.PREMIUM ? 'active' : ''}`} 
                onClick={() => isPremiumAvailable && updateField('passTier', PASS_TIER.PREMIUM)}
                disabled={!isPremiumAvailable}
                style={{ opacity: isPremiumAvailable ? 1 : 0.6, cursor: isPremiumAvailable ? 'pointer' : 'not-allowed' }}
              >
                Premium Pass {!isPremiumAvailable && '(Unavailable)'}
              </button>
              <button type="button" className={`reg-pass-btn ${formValues.passTier === PASS_TIER.CUSTOMIZED ? 'active' : ''}`} onClick={() => updateField('passTier', PASS_TIER.CUSTOMIZED)}>
                Customized Pass
              </button>
            </div>
            <p className="reg-pass-note">
              Premium: all events with 20% discount. Customized: 10% discount only if more than 2 (paid) events are selected.
            </p>
          </div>

          {formValues.passTier === PASS_TIER.CUSTOMIZED ? (
            <div className="reg-event-picker">
              <div className="reg-pass-head">Select Events</div>
              
              {/* Show fast-filling warnings near form */}
              <div style={{ marginBottom: '10px' }}>
                 {EVENT_CATALOG.map(ev => {
                    const avail = availability[ev.title];
                    if (avail && avail.available > 0 && avail.available <= 5) {
                         return <div key={`warn-${ev.id}`} style={{ color: '#ff9800', fontSize: '0.85em', fontWeight: '500' }}>🔥 Hurry! {ev.title} only has {avail.available} spots left.</div>
                    }
                    return null;
                 })}
              </div>

              <div className="reg-event-controls">
                <select
                  className="inp"
                  style={{ appearance: 'none', WebkitAppearance: 'none', cursor: 'pointer' }}
                  value={eventToAdd}
                  onChange={(event) => setEventToAdd(event.target.value)}
                >
                  <option value="">Choose an event</option>
                  {EVENT_CATALOG.filter((eventItem) => !selectedEventIds.includes(eventItem.id)).map((eventItem) => {
                    // Check availability for this dropdown item
                    const avail = availability[eventItem.title];
                    const isFull = avail && avail.available <= 0;
                    const isLow = avail && avail.available > 0 && avail.available <= 5;
                    const urgencyText = isFull ? ' [Closed]' : (isLow ? ` [Only ${avail.available} left]` : '');

                    return (
                      <option key={eventItem.id} value={eventItem.id} disabled={isFull}>
                        {eventItem.title} — {eventItem.fee > 0 ? `INR ${eventItem.fee}` : 'Free'}{urgencyText}
                      </option>
                    );
                  })}
                </select>
                <button type="button" className="reg-add-event-btn" onClick={addSelectedEvent}>Add Event</button>
              </div>
            </div>
          ) : null}

          <div className={`cart-summary-box ${selectedEvents.length > 0 ? 'show' : ''}`}>
            <div className="cart-summary-label">Selected events for this pass</div>
            <div className="cart-items-list">
              {selectedEvents.map((eventItem) => (
                <span key={`selected-${eventItem.id}`} className="cart-tag">
                  {eventItem.title} ({eventItem.fee > 0 ? `INR ${eventItem.fee}` : 'Free'})
                  {formValues.passTier === PASS_TIER.CUSTOMIZED ? (
                    <span className="rm" onClick={() => removeSelectedEvent(eventItem.id)}>✕</span>
                  ) : null}
                </span>
              ))}
            </div>
          </div>

          <div className="reg-billing-box">
            <div className="reg-payment-label">Billing Amount</div>
            <div className="reg-billing-row"><span>Subtotal</span><strong>INR {billing.subtotal.toLocaleString('en-IN')}</strong></div>
            <div className="reg-billing-row"><span>Discount ({billing.discountPercent}%)</span><strong>- INR {billing.discountAmount.toLocaleString('en-IN')}</strong></div>
            <div className="reg-billing-row total"><span>Payable Amount</span><strong>INR {billing.payable.toLocaleString('en-IN')}</strong></div>
          </div>

          {/* Conditionally render QR and Screenshot only if payment is required AND user clicked Proceed to Payment */}
          {requiresPayment && isPaymentStep && (
            <>
              <div style={{ marginBottom: '14px' }}>
                <input
                  className="inp"
                  type="file"
                  accept="image/*"
                  onChange={(event) => setPaymentSSFile(event.target.files?.[0] || null)}
                />
                <p className="reg-note" style={{ marginTop: '8px' }}>Upload payment screenshot (required for verification).</p>
              </div>
              
              <div className="reg-payment-block">
                <div className="reg-payment-copy">
                  <div className="reg-payment-label">Pay via UPI</div>
                  <p className="reg-payment-desc">Pay exactly the payable amount shown above. Mention your name and selected pass in payment note.</p>
                </div>
                <div className="reg-qr-box" id="paymentQrWrap" title="Payment QR">
                  <img src={paymentSSImg} alt="Payment Asset" style={{ width: '128px', height: '128px', objectFit: 'cover' }} />
                </div>
              </div>
            </>
          )}
          
          {/* Conditional Button Rendering */}
          {requiresPayment && !isPaymentStep ? (
            <button className="btn-submit" onClick={handleProceedToPayment}>
              Proceed to Payment →
            </button>
          ) : (
            <button className="btn-submit" onClick={submitForm} disabled={busy}>
              {busy ? 'Submitting Registration...' : 'Register for VENTURERS 2026 →'}
            </button>
          )}
          
        </div>
      </div>
    </section>
  );
}