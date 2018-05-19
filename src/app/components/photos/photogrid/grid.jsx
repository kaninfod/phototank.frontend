import React from 'react';
import { List } from 'immutable';
import Waypoint from './waypoint';
import styles from './grid.scss';
import GridSection from './gridsection';

export default class Grid extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gridSectionState: List(),
    };
  }

  toggleGridSection = (event) => {
    let gridSectionState = this.state.gridSectionState;
    if (gridSectionState.includes(event.target.id)) {
      gridSectionState = gridSectionState.filter(el => el != event.target.id);
    } else {
      gridSectionState = gridSectionState.set(gridSectionState.size, event.target.id);
    }

    this.setState({ gridSectionState: gridSectionState });
  }

  render() {
    const groupedPhotos = this.props.photos.groupBy( photo => 
      new Date(photo.get('date_taken_formatted')).getMonth()
    ).toList()

    return (
      <div>
        <Waypoint className={styles.photogridSection}
          onWindowScroll={this.props.photoActions.SCROLL}
          offset={1000}
          fix={Date()}
          loading={this.props.loading}
          loadMore={!this.props.lastPage}>
          
          { 
            groupedPhotos.map(sectionPhotos => {
            
              return <GridSection props={{ 
                id: dateId(sectionPhotos.first().get('date_taken_formatted')),
                sectionPhotos: sectionPhotos,
                photoProps: this.props,
                visible: this.state.gridSectionState.includes(dateId(sectionPhotos.first().get('date_taken_formatted'))),
                toggleVisibility: this.toggleGridSection,
              }}/> 
            })
          }
          
        </Waypoint>

        <div>
          { this.props.children }
        </div>

      </div>
    );
  }
}

const dateId = (date) => {
  let _date = new Date(date)
  return String(_date.getMonth()).concat(_date.getYear() + 1900)
}