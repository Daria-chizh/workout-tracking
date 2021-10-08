import React from 'react';

class Workout extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      records: [
        {
          id: 1,
          date: '10.12.1999',
          distance: 15,
        },
        {
          id: 2,
          date: '12.12.1999',
          distance: 7,
        }
      ],
      currentId: 2,
    };
  }

  handleRemove = (evt, id) => {
    const records = this.state.records.filter((record) => record.id !== id);
    this.setState({ records });
  };

  handleSubmit = (evt) => {
    const dateValue = evt.target.date.value;
    const distanceValue = Number(evt.target.distance.value);

    const records = this.state.records;
    const existingRecord = records.find(({ date }) => date === dateValue);
    if (existingRecord) {
      // update existing record for that date
      existingRecord.distance += distanceValue;
      this.setState({ records });
    } else {
      // add new record
      const currentId = this.state.currentId + 1;
      records.push({ id: currentId, date: dateValue, distance: distanceValue });
      // sort by date
      records.sort((a, b) => {
        const firstDate = new Date(a.date);
        const secondDate = new Date(b.date);
        return firstDate.getTime() > secondDate.getTime() ? 1 : -1;
      });

      this.setState({ records, id: currentId });
    }

    // clear form and prevent actual submit
    evt.target.reset();
    evt.preventDefault();
  };

  render() {
    const rows = [];

    for (const { date, distance, id } of this.state.records) {
      const row = (
        <tr key={id}>
          <td>{date}</td>
          <td>{distance}</td>
          <td onClick={(evt) => this.handleRemove(evt, id)}>✖</td>
        </tr>
      );

      rows.push(row);
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <div className="total-container">
          <div>
          <label htmlFor="date">Дата (ДД.MM.ГГ)</label>
            <input id="date" name="date" />
          </div>
          <div>
            <label htmlFor="distance">Пройдено км</label>
            <input id="distance" name="distance" />
          </div>
          <button className="button">ОК</button>
        </div>
        <div className='main-row'>
          <span>Дата (ДД.MM.ГГ)</span>
          <span>Пройдено км</span>
          <span>Действия</span>
        </div>
        <table id="table">
          <tbody>
            {rows}
          </tbody>
        </table>
      </form>
    );
  }
}
export default Workout;
