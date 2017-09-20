import React from 'react';
import './panel';
import Tab from './tab';
import Content from './content';
import SearchPanel from './searchPanel';
import BucketPanel from './bucketPanel';

class BottomPanel extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.closePanel = this.closePanel.bind(this);
    this.toggleDirection = this.toggleDirection.bind(this);
    this.toggleLikedOnly = this.toggleLikedOnly.bind(this);
    this.changeDate = this.changeDate.bind(this);
    this.changeCountry = this.changeCountry.bind(this);

    this.state = {
      mainPanel: { open: false },
      searchParams: {
        nextPage:   props.searchParams.nextPage,
        startdate:  props.searchParams.startdate,
        country:    props.searchParams.country,
        direction:  props.searchParams.direction,
        like:       props.searchParams.like,
        tags:       props.searchParams.tags,
      },
      panels: [
        { id: 'Search', active: false },
        { id: 'Bucket', active: true },
        { id: 'Close', active: false },
      ],
    };
  }

  handleClick(e) {
    var contentName = e.target.dataset.panelid;
    var newState = {};

    newState = { mainPanel: { open: true, }, panels: [], };
    newState.panels = this.state.panels.map(p => {
            if (p.id == contentName) {
              p.active = true;
            } else {
              p.active = false;
            }

            return p;
          });
    this.setState(newState);
  }

  closePanel() {
    this.setState({ mainPanel: { open: false } });
  }

  toggleDirection(e) {
    this.props.changeSearchParams('direction', e.target.checked);
  }

  toggleLikedOnly(e) {
    this.props.changeSearchParams('like', e.target.checked);
  }

  changeDate(e, date) {
    this.props.changeSearchParams('startdate', date);
  }

  changeCountry(e, key, value) {
    this.props.changeSearchParams('country', value);
  }

  render () {
    const searchPanel = this.state.panels[0];
    const bucketPanel = this.state.panels[1];
    const closePanel = this.state.panels[2];
    const mainPanel   = this.state.mainPanel;

    return (
    <div id="pt-panel" class={'pt-panel ' + (mainPanel.open ? 'open' : '')}>

      <div class="pt-panel-tabs">
        <Tab data={searchPanel} clickHandler={this.handleClick}/>
        <Tab data={bucketPanel} clickHandler={this.handleClick}/>
        <Tab data={closePanel} clickHandler={this.closePanel}/>
      </div>

      <div class="pt-panel-contents">
        <Content data={searchPanel}>
          <SearchPanel
            countries={this.props.countries}
            searchParams={this.props.searchParams}
            changeCountry={this.changeCountry}
            changeDate={this.changeDate}
            toggleLikedOnly={this.toggleLikedOnly}
            toggleDirection={this.toggleDirection}
            />
        </Content>

        <Content data={bucketPanel}>
          <BucketPanel
            onShowBucket={this.props.onShowBucket}
            photos={this.props.photos}
            onRemovePhoto={this.props.onRemovePhoto}
            />
        </Content>
      </div>
    </div>);
  }
}

export default BottomPanel;
