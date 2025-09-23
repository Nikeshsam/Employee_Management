import React, { useEffect, useState } from "react";

const AttendanceSummary = () => {
  const data = [
    { label: "Absent", value: 20, color: "absent" },
    { label: "Present", value: 35, color: "present" },
    { label: "On leave", value: 15, color: "on-leave" },
    { label: "Sick leave", value: 15, color: "sick-leave" },
  ];

  const total = data.reduce((sum, item) => sum + item.value, 0);

  // state for animated widths
  const [widths, setWidths] = useState(data.map(() => "0%"));

  useEffect(() => {
    const timer = setTimeout(() => {
      setWidths(data.map(item => `${(item.value / total) * 100}%`));
    }, 100);
    return () => clearTimeout(timer);
  }, [total]);

  return (
    <div className="AttendanceSummary">

      {/* Progress bar */}
      <div className="att_progress overflow-hidden" style={{ height: "6px" }}>
        {data.map((item, i) => (
          <div
            key={i}
            className={`att_progress_segment ${item.color}`}
            style={{ width: widths[i] }}
          />
        ))}
      </div>

      {/* Labels with dynamic width */}
      <div className="att_content overflow-hidden">
        {data.map((item, i) => (
          <div
            key={i}
            className={`att_details`}
            style={{ width: widths[i] }}
          >
              <span className="att_data">{item.label}</span>
              <span className="att_value fw-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AttendanceSummary;
