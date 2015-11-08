import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Tagsinput} from 'Tagsinput';
import * as demoData from './data'

const source = demoData.countries;

class DemoPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tags: source.slice(0, 5),
            source
        };
    }

    render() {
        const containerStyle = {
            margin: '0 auto',
            padding: '20px',
            width: '600px',
            fontFamily: 'sans-serif'
        };
        return (
            <div style={containerStyle}>
                <Tagsinput tags={this.state.tags}
                           source={this.state.source}
                           onTagsChange={(tags) => this.setState({tags})}
                    />
            </div>
        );
    }
}

ReactDOM.render(<DemoPage/>, document.getElementById('root'));

