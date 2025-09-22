import React, { useState } from "react";
import { Card, Button } from "react-bootstrap";
import Images from '../../pages/Images.jsx';

const BirthdayCard = () => {
  const birthdays = [
    { name: "Anjali Sharma", date: "2025-09-22" }, // Today
    { name: "Rajesh Kumar", date: "2025-09-25" },
    { name: "Meena Gupta", date: "2025-09-30" },
    // { name: "Amit Patel", date: "2025-10-02" },
  ];

  const today = new Date().toISOString().split("T")[0];

  const todayBirthdays = birthdays.filter((b) => b.date === today);
  const upcomingBirthdays = birthdays
    .filter((b) => b.date > today)
    .slice(0, 3);

  const [wished, setWished] = useState([]);

  const handleWish = (name) => {
    setWished((prev) => [...prev, name]);
    alert(`🎉 Wished ${name} a Happy Birthday!`);
    // Replace alert with API call or notification later
  };

  // Helper to get initials from name
  const getInitials = (name) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  return (
    <div className="brd_container" style={{ height: '240px', overflow: 'auto', gap: '18px' }}>
      {todayBirthdays.length > 0 ? (
        <div className="brd_cur_birthday">
          <div className="brd_cur_birthday_title">
            <i><img src={Images.BirthdayCup} alt="Birthday Cup" /></i>
            <h6>Today</h6>
          </div>
          {todayBirthdays.map((b, idx) => (
            <div key={idx} className="brd_cur_birthday_content">
              <h3>{b.name}</h3>
              <div className="brd_date_wish">
                <span className="brd_cur_date">
                  {new Date(b.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                  })}
                </span>
                <Button
                  className="brd_wish"
                  variant={wished.includes(b.name) ? "success" : "warning"}
                  disabled={wished.includes(b.name)}
                  onClick={() => handleWish(b.name)}
                >
                  <img src={Images.BirthdayCake} alt="cake" />
                  <span>{wished.includes(b.name) ? "Wished" : "Wish"}</span>
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-muted">No birthdays today</p>
      )}

      <div className="brd_upc_birthday">
        <h6 className="">Upcoming</h6>
        <div className="brd_upc_birthday_content">
          {upcomingBirthdays.length > 0 ? (
            upcomingBirthdays.map((b, idx) => (
              <div key={idx} className="brd_upc_birthday_wrap">
                <div className="brd_upc_birthday_wrap_left">
                    <i>{getInitials(b.name)}</i>
                  <h3>{b.name}</h3>
                </div>
                <span>
                  {new Date(b.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    weekday: "short",
                  })}
                </span>
              </div>
            ))
          ) : (
            <p className="text-muted">No upcoming birthdays</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default BirthdayCard;
