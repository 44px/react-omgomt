import * as React from 'react';
import {bemClassNameGenerator} from './utils/bemClassName';
import './TagsinputSuggestions.scss';

const bemClass = bemClassNameGenerator('TagsinputSuggestions');

export class TagsinputSuggestions extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedIndex: 0
        };
    }

    selectSuggestion() {
        // TODO: check source length (may be 0)
        if (this.state.selectedIndex === -1) {
            return;
        }

        this.props.onSelect(this.props.source[this.state.selectedIndex]);

        if (this.state.selectedIndex === (this.props.source.length - 1)) {    // TODO: ??? edge case??
            this.state.selectedIndex--;
        }
    }

    render() {
        return (
            <div className={`${bemClass()} ${this.props.className}`}
                 onMouseLeave={() => this.setState({selectedIndex: -1})}
                 onClick={() => this.selectSuggestion()}
                >
                {this.renderSuggestions()}
            </div>
        );
    }

    // TODO: onClick, onEnter – choose item with selectedIndex, move selected index to next or prev item

    renderSuggestions() {
        return this.props.source.map((item, itemIndex) => {
            const mods = (itemIndex === this.state.selectedIndex) ? ['selected'] : [];
            return (
                <div className={bemClass('item', mods)}
                     key={this.props.tagIdentity(item)}
                     onMouseEnter={() => this.setState({selectedIndex: itemIndex})}
                    >
                    {this.props.suggestionRenderer(item)}
                </div>
            );
        });
    }
}

//TODO: props!
TagsinputSuggestions.propTypes = {
    //onSelect
};