
"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import {
  CalendarDays,
  Clock,
  Users,
  ArrowRight,
} from "lucide-react";

const phoneNumber = "923014846247";

export default function ReservationForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("19:00");
  const [guests, setGuests] = useState("2");
  const [today, setToday] = useState("");

  useEffect(() => {
    const now = new Date();

    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const day = String(now.getDate()).padStart(2, "0");

    setToday(`${year}-${month}-${day}`);
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const message = [
      "Assalam-o-Alaikum! I would like to request a table reservation at Kaka Restaurant.",
      "",
      `Name: ${name}`,
      `Phone: ${phone}`,
      `Date: ${date}`,
      `Time: ${time}`,
      `Guests: ${guests}`,
      "",
      "Please confirm my reservation.",
    ].join("\n");

    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="reservation-section" id="reservation">
      <div className="reservation-copy">
        <span className="eyebrow">MAKE IT A SPECIAL OCCASION</span>

        <h2>
          Your table,
          <br />
          <em>your moment.</em>
        </h2>

        <p>
          Planning a family dinner or a meal with friends?
          Send us your reservation request.
        </p>

        <div className="reservation-detail">
          <CalendarDays size={20} />
          <span>Choose your preferred date</span>
        </div>

        <div className="reservation-detail">
          <Users size={20} />
          <span>Tell us how many guests are joining</span>
        </div>

        <div className="reservation-detail">
          <Clock size={20} />
          <span>Select your preferred dining time</span>
        </div>
      </div>

      <form
        className="reservation-form"
        onSubmit={handleSubmit}
      >
        <span className="eyebrow">TABLE RESERVATION</span>

        <h3>Book a Table</h3>

        <label>
          Your Name
          <input
            type="text"
            placeholder="Enter your name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            required
          />
        </label>

        <label>
          Phone Number
          <input
            type="tel"
            placeholder="03XX XXXXXXX"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            required
          />
        </label>

        <div className="reservation-fields">
          <label>
            Date
            <input
              type="date"
              min={today || undefined}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />
          </label>

          <label>
            Time
            <select
              value={time}
              onChange={(event) => setTime(event.target.value)}
            >
              <option value="12:00">12:00 PM</option>
              <option value="13:00">1:00 PM</option>
              <option value="14:00">2:00 PM</option>
              <option value="15:00">3:00 PM</option>
              <option value="18:00">6:00 PM</option>
              <option value="19:00">7:00 PM</option>
              <option value="20:00">8:00 PM</option>
              <option value="21:00">9:00 PM</option>
              <option value="22:00">10:00 PM</option>
            </select>
          </label>
        </div>

        <label>
          Number of Guests
          <select
            value={guests}
            onChange={(event) => setGuests(event.target.value)}
          >
            <option value="1">1 Guest</option>
            <option value="2">2 Guests</option>
            <option value="3">3 Guests</option>
            <option value="4">4 Guests</option>
            <option value="5">5 Guests</option>
            <option value="6">6 Guests</option>
            <option value="7">7 Guests</option>
            <option value="8">8 Guests</option>
            <option value="9">9 Guests</option>
            <option value="10">10 Guests</option>
            <option value="10+">More than 10</option>
          </select>
        </label>

        <button
          type="submit"
          className="reservation-submit"
        >
          REQUEST A TABLE
          <ArrowRight size={17} />
        </button>

        <p className="reservation-note">
          Your reservation is a request, not a confirmed booking.
          The restaurant will confirm availability.
        </p>
      </form>
    </section>
  );
}
