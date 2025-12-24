// src/models/Schedule.js
export default class Schedule {
  constructor({ id, movie, date, time, room }) {
    this.id = id;
    this.movie = movie;
    this.date = date;
    this.time = time;
    this.room = room;
  }
}
