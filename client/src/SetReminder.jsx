import React, { useState } from "react";
import axios from "axios";

const SetReminder = ({ taskId }) => {
  const [reminderDate, setReminderDate] = useState("");

  const handleSetReminder = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/HurryUp/set-reminder/${taskId}`,
        {
          reminderDate,
        }
      );
    } catch (error) {
      console.error("Error setting reminder:", error);
    }
  };

  const handleRemoveReminder = async () => {
    try {
      await axios.patch(
        `http://localhost:3000/HurryUp/remove-reminder/${taskId}`
      );
      // Handle success, e.g., show a message or update the UI
    } catch (error) {
      console.error("Error removing reminder:", error);
    }
  };

  return (
    <div>
      <input
        type="datetime-local"
        value={reminderDate}
        onChange={(e) => setReminderDate(e.target.value)}
      />
      <button onClick={handleSetReminder}>Set Reminder</button>
      <button onClick={handleRemoveReminder}>Remove Reminder</button>
    </div>
  );
};

export default SetReminder;
