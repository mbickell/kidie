import React, { Component } from "react";
import { calendarId, key } from "../../config";
import EventCard from "../../components/EventCard/EventCard";
import styles from "./App.module.scss";
import Header from "../../components/Header/Header";

class App extends Component {
  state = { events: [], filteredEvents: [], searchText: "" };

  getCalendarEvents = async (calendarId, key) => {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${calendarId}/events?key=${key}`
    );
    const calendar = await response.json();
    let events = await calendar.items;
    events = events.filter(event => {
      return event.organizer.displayName === "Interpretive Dance Institute";
    });
    events = events.sort((a, b) => {
      let aEvent = a.start.dateTime
        ? a.start.dateTime
        : a.start.date + "T00:00:00Z";
      let bEvent = b.start.dateTime
        ? b.start.dateTime
        : b.start.date + "T00:00:00Z";

      if (aEvent.substring(0, 9) < bEvent.substring(0, 9)) {
        return -1;
      }
    });
    events.forEach(async event => {
      const picture = await fetch(
        "https://source.unsplash.com/1600x900/?dance"
      );
      event.picture = picture.url;
    });
    this.setState({ events, filteredEvents: events });
  };

  filterEvents = () => {
    const filteredEvents = this.state.events.filter(event => {
      return event.summary.toLowerCase().includes(this.state.searchText);
    });

    this.setState({ filteredEvents });
  };

  setSearchText = event => {
    const searchText = event.target.value;
    this.setState({ searchText }, this.filterEvents);
  };

  componentDidMount() {
    this.getCalendarEvents(calendarId, key);
  }

  render() {
    return (
      <>
        <header className={styles.header}>
          <Header
            setSearchText={this.setSearchText}
            placeholder="Search events..."
            searchText={this.state.searchText}
          />
        </header>
        <section className={styles.cardContainer}>
          {this.state.filteredEvents.map(event => (
            <EventCard event={event} picture={event.picture} />
          ))}
        </section>
      </>
    );
  }
}

export default App;
