import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getSeries } from './redux/actions.js';

const mapStateToProps = state => ({
  series: state.seriesData.series,
  seriesIds: state.seriesData.seriesIds
});

const mapDispatchToProps = { getSeries };

class SeriesContainer extends Component {

  componentWillMount() {
    const { getSeries } = this.props;
    getSeries();
  }

  render() {
    const { series={}, seriesIds=[] } = this.props;
    const list = seriesIds.map(id => {
      const item = series[id];
      return (
        <Link to={`/series/${id}`}  key={id}>
          <div className="preview">
            <img src={item.thumbnail.path + '/standard_xlarge.' + item.thumbnail.extension} alt={`Portrait of ${item.name}`}/>
            <h3>{item.name}</h3>
          </div>
        </Link>
      );
    });

    return <div className="list">{list}</div>
  }
}

const Series = connect(
  mapStateToProps,
  mapDispatchToProps
)(SeriesContainer);

export default Series;
