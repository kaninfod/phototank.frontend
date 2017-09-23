import React from 'react';
import styles from './photodetail.scss';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { getFacet } from '../../../redux/photo';

export class ShareWidget extends React.Component {
  constructor(props) {
    super(props);
    this.handleShareClick = this.handleShareClick.bind(this);
    this.state = {
      value: 0,
    };
  }

  handleShareClick(event) {
    console.log(event.currentTarget.dataset.url);
    window.open(event.currentTarget.dataset.url, 'name');
  }

  renderChips() {
    let _facets = getFacet('CatalogFacet', this.props.photo);
    _facets = _facets.filter(facet => facet.getIn(['instance', 'instance_type']) != 'master');
    const _chips = _facets.map(facet =>
      <Chip
        data-url={facet.getIn(['instance', 'photo_url'])}
        onClick={this.handleShareClick}
        style={styles.chip}>

        <Avatar icon={<i class={styles.materialIcons}>share</i>}/>
        {facet.getIn(['instance', 'instance_type'])}
      </Chip>
    );
    return _chips;
  }

  render () {

    if (!this.props.show) { return null; }

    return (
      <div className={styles.share}>
        {/*<ShareChips photo={this.props.photo} handleShareClick={this.handleShareClick}/>*/}
        {this.renderChips()}
      </div>
    );
  }
}

function ShareChips(props) {
  let _facets = getFacet('CatalogFacet', props.photo);
  _facets = _facets.filter(facet => facet.getIn(['instance', 'instance_type']) != 'master');
  const _chips = _facets.map(facet =>
    <Chip onClick={props.handleShareClick} style={styles.chip}>
      <Avatar icon={<i class={styles.materialIcons}>share</i>}/>
      {facet.getIn(['instance', 'instance_type'])}
    </Chip>
  );
  return _chips;

}
