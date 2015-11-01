import * as React from 'react';
import {bemClassNameGenerator} from './utils/bemClassName';
import {TagsinputSuggestions} from './TagsinputSuggestions';
import './Tagsinput.scss';

const bemClass = bemClassNameGenerator('Tagsinput');

export class Tagsinput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            query: '',
            focus: false
        };
    }

    onFocus() {
        this.setState({focus: true});
    }

    onBlur() {
        this.setState({focus: false});
    }

    onQueryChange(e) {
        this.setState({query: e.target.value});
        if (!!this.props.onQueryChange) {
            this.props.onQueryChange(e.target.value);
        }
    }

    addTag(tag) {
        const newTags = this.props.tags.concat(tag);
        this.props.onTagsChange(newTags);
    }

    removeTag(tag) {
        const newTags = this.props.tags.filter((currentTag) => {
            return this.props.tagIdentity(currentTag) !== this.props.tagIdentity(tag);
        });
        this.props.onTagsChange(newTags);
    }

    getAvailableSuggestions() {
        const notUsedItems = this.props.source.filter((item) => {
            return this.props.tags.every((tag) => {
                return this.props.tagIdentity(tag) !== this.props.tagIdentity(item);
            });
        });
        return this.props.suggestionFilter(notUsedItems, this.state.query);
    }

    render() {
        // TODO: add object params to bemClass
        const mods = this.state.focus ? ['focus'] : [];
        return (
            <div className={bemClass(mods)}>
                {this.renderTags()}
                <input className={bemClass('query')}
                       type="text"
                       ref="query"
                       value={this.state.query}
                       size={Math.max(5, this.state.query.length)}
                       onFocus={this.onFocus.bind(this)}
                       onBlur={this.onBlur.bind(this)}
                       onChange={this.onQueryChange.bind(this)}
                    />
                <TagsinputSuggestions className={bemClass('suggestions')}
                                      source={this.getAvailableSuggestions()}
                                      tagIdentity={this.props.tagIdentity}
                                      suggestionRenderer={this.props.suggestionRenderer}
                                      onSelect={this.addTag.bind(this)}
                    />
            </div>
        );
    }

    renderTags() {
        return this.props.tags.map((tag) => {
            return (
                <div className={bemClass('tag')}
                     key={this.props.tagIdentity(tag)}>
                    {this.props.tagRenderer(tag)}
                    <button className={bemClass('remove')}
                            type="button"
                            onClick={() => this.removeTag(tag)}
                        >
                    </button>
                </div>
            );
        });
    }
}


Tagsinput.propTypes = {
    tags: React.PropTypes.array.isRequired,
    source: React.PropTypes.array.isRequired,
    onQueryChange: React.PropTypes.func,
    onTagsChange: React.PropTypes.func.isRequired,
    disabled: React.PropTypes.bool,
    showSuggestionsOnEmptyQuery: React.PropTypes.bool,  // TODO: better name

    // Tweaks
    tagRenderer: React.PropTypes.func.isRequired,
    tagIdentity: React.PropTypes.func.isRequired,
    suggestionRenderer: React.PropTypes.func.isRequired,
    suggestionFilter: React.PropTypes.func.isRequired
};


Tagsinput.defaultProps = {
    tagRenderer: (tag) => tag.title,
    tagIdentity: (tag) => tag.id,    // match by this in onPaste
    suggestionRenderer: (item) => item.title,   // TODO: pass query (for highlighting matched substring)
    suggestionFilter: (source, query) => {
        return source.filter((item) => item.title.toLowerCase().indexOf(query.toLowerCase()) !== -1);
    }
};