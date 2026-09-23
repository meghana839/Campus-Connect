const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const initialEvents = [
  {
    id: 1,
    title: "MERN Stack Workshop",
    category: "Technology",
    date: "25 September 2026",
    time: "10:00 AM",
    location: "Computer Lab 1",
    description:
      "Learn the basics of MongoDB, Express, React, and Node.js through a practical workshop.",
  },
  {
    id: 2,
    title: "College Hackathon",
    category: "Technology",
    date: "28 September 2026",
    time: "9:00 AM",
    location: "Main Auditorium",
    description:
      "Form a team, solve a real problem, and present your solution to mentors.",
  },
  {
    id: 3,
    title: "Photography Club Meet",
    category: "Club",
    date: "30 September 2026",
    time: "2:00 PM",
    location: "Seminar Hall",
    description:
      "Meet fellow photography enthusiasts and learn basic composition techniques.",
  },
];


// Test route
app.get("/", (req, res) => {
  res.send("Backend is working");
});


// GET all events
app.get("/api/events", (req, res) => {
  res.json(initialEvents);
});


// DELETE an event
app.delete("/api/events/:id", (req, res) => {
  const eventId = Number(req.params.id);

  const eventIndex = initialEvents.findIndex(function (event) {
    return event.id == eventId;
  });

  if (eventIndex === -1) {
    return res.status(404).json({
      message: "Event Not Found",
    });
  }

  initialEvents.splice(eventIndex, 1);

  res.json({
    message: "Event Deleted Successfully",
  });
});


// ADD a new event
app.post("/api/events", (req, res) => {
  const newEvent = req.body;

  initialEvents.push(newEvent);

  res.json({
    message: "Event Added Successfully",
    event: newEvent,
  });
});


// UPDATE an existing event
app.put("/api/events/:id", (req, res) => {
  const eventId = Number(req.params.id);

  const eventIndex = initialEvents.findIndex(function (event) {
    return event.id == eventId;
  });

  if (eventIndex === -1) {
    return res.status(404).json({
      message: "Event Not Found",
    });
  }

  initialEvents[eventIndex] = {
    ...initialEvents[eventIndex],
    ...req.body,
  };

  res.json({
    message: "Event Updated Successfully",
    event: initialEvents[eventIndex],
  });
});


// Start server
app.listen(5050, () => {
  console.log("Server is running on port 5050");
});