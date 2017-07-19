import React from 'react';
import { connect } from 'react-redux';
import './tagger.css';
import { loadTags, tagInput, selectSuggestion, addTag, removeTag } from '../../redux/actTagger';
import TextField from 'material-ui/TextField';

@connect((store) => {
  return {
    tags: store.tagger.get('tags'),
    suggestions: store.tagger.get('suggestions'),
    inputValue: store.tagger.get('inputValue'),
    selectedSuggestion: store.tagger.get('selectedSuggestion'),
    selectedPhoto: store.grid.get('selectedPhoto'),
  };
})
export default class PhotoTagger extends React.Component {
  constructor(props) {
    super(props);
    this.clickTag = this.clickTag.bind(this);
    this.tagInput = this.tagInput.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  componentWillMount() {
    if (!this.props.tags.length) {
      this.props.dispatch(loadTags(this.props.photoId))
    }
  }

  componentWillReceiveProps(nextProps){
    if (this.props.photoId != nextProps.photoId) {
      this.props.dispatch(loadTags(nextProps.photoId))
    }
  }

  clickTag(e) {
    this.props.dispatch(
      removeTag({
        photoId: this.props.photoId,
        name: e.target.dataset.name
      }
    ))
  }

  tagInput(e) {
    this.props.dispatch(tagInput(e.target.value))
  }

  handleKeyDown(e) {

    //Are there items in list
    var _items = function() {
      if (suggestions) return _select_item()
      if (!suggestions && key == 13) return _new_item()
    }.bind(this)

    //is an item selected
    var _select_item = function(){
      if (key == 13) return _new_item()
      if (current) return _next_prev()
      if (!current) return _first_last()
    }.bind(this)

    //either next/prev. Are we at the end of list or beginning, and which button
    var _next_prev = function() {
      if (key==40 && _more() ) return _next()
      if (key==40 && !_more() ) return _first()
      if (key==38 && !_index()  ) return _last()
      if (key==38 && _index() ) return _prev()
      if (key==13) return _current()
    }.bind(this)

    //either first or last
    var _first_last = function() {
      if (key==40 ) return _first()
      if (key==38 ) return _last()
    }

    var _more = function() { return (_index() < (suggestions.length - 1)) }.bind(this)

    var _index = function() { return suggestions.findIndex(x => x.id==current.id); }.bind(this)

    var _next = function() { return suggestions[_index() + 1] }.bind(this)

    var _prev = function() { return suggestions[_index() - 1] }.bind(this)

    var _first = function() { return suggestions[0] }.bind(this)

    var _last = function() {
      var len = suggestions.length-1
      return suggestions[len]
    }.bind(this)

    var _current = function() {
      var item = suggestions[_index()]
      _add_tag(item.name)
      return null
    }.bind(this)

    var _new_item =function() { if (input.length ) return _add_tag(input) }

    var _add_tag = function(name) {
      this.props.dispatch(addTag({ name: name, photoId: this.props.photoId}))
    }.bind(this)

    var key = e.which
    var input = this.props.inputValue
    var suggestions = this.props.suggestions
    var current = this.props.selectedSuggestion

    if (![13,27,38,40].includes(key)) {return null}

    var k = _items()

    this.props.dispatch(selectSuggestion({ selectedSuggestion: k}))
  }

  render() {
    const tags = this.props.tags
    const suggestions = this.props.suggestions

    return (
      <div className="tagger">
        <TextField
          floatingLabelText="Enter tag"
          onKeyDown={this.handleKeyDown}
          value={this.props.inputValue}
          onChange={this.tagInput}
          />


        <SuggestionsPane
          suggestions={suggestions}
          selected={this.props.selectedSuggestion}
          />

      <div className="added-tags">
          {tags.map(tag.bind(this))}
        </div>
      </div>
    )
  }
}

var tag = function(props){
    return (
      <div className="tag"  key={props.id} id={props.id}>
        {props.name}
        <i className='close material-icons' data-name={props.name} onClick={this.clickTag}>close</i>
      </div>
    )
  }


var SuggestionsPane = function(props) {
  var suggestions = props.suggestions
  if (props.suggestions.size == 0) { return null }

  var selected = (props.selected) ? props.selected.id : null
  var suggestions = suggestions.map(alter(selected))

  return (
    <ul className="collection tag-item-pane show">
      {suggestions.map(suggestion.bind(this))}
    </ul>
  )
}

var alter = function(selected) {
  return function(item) {
    if (item.id == selected) {
      item['classN'] = "collection-item active"
    } else {
      item['classN'] = "collection-item"
    }
    return item
  }
}

var suggestion = function(item){
    return (
        <li key={item.id} id={item.id} className={item.classN}>
        {item.name}
      </li>
    )
  }
