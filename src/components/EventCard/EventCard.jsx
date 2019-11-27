import React, { Component } from "react";
import styles from "./EventCard.module.scss";

class EventCard extends Component {
  state = {};
  render() {
    const date = this.props.event.start.date
      ? new Date(this.props.event.start.date)
      : new Date(this.props.event.start.dateTime);
    const startTime = this.props.event.start.dateTime
      ? new Date(this.props.event.start.dateTime)
      : null;
    const endTime = this.props.event.end.dateTime
      ? new Date(this.props.event.end.dateTime)
      : null;
    return (
      <>
        <section className={styles.card}>
          <h2>{this.props.event.summary}</h2>
          <p>
            {date.toLocaleDateString("en-UK", {
              weekday: "long",
              day: "numeric",
              month: "short",
              year: "numeric"
            })}
          </p>
          {startTime ? (
            <p>
              {startTime.toLocaleTimeString("en-UK", {
                hour12: false,
                timeStyle: "short"
              })}{" "}
              -{" "}
              {endTime.toLocaleTimeString("en-UK", {
                hour12: false,
                timeStyle: "short"
              })}
            </p>
          ) : (
            <p>All Day</p>
          )}
          <a
            href={this.props.event.htmlLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            Click here to view on Google Calendar
          </a>
        </section>
      </>
    );
  }
}

export default EventCard;
