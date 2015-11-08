import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Tagsinput} from 'Tagsinput.js';

const noop = () => {};
const data = [1, 2, 3, 4, 5].map((n) => {
    return {id: n, title: `Tag #${n}`}
});
const getTagsinputInstance = (tags = [], source = [], onTagsChange = noop, optionalProps) => {
    return TestUtils.renderIntoDocument(
        <Tagsinput tags={tags}
                   source={source}
                   onTagsChange={onTagsChange}
                   {...optionalProps}
        />
    );
};

describe('Tagsinput', () => {

    it('renders to DOM', () => {
        const component = getTagsinputInstance();

        expect(TestUtils.isCompositeComponentWithType(component, Tagsinput)).to.be.true;
    });


    it('renders given number of tags', () => {
        const component = getTagsinputInstance(data);
        const renderedTags = TestUtils.scryRenderedDOMComponentsWithClass(component, 'Tagsinput__tag');

        expect(renderedTags.length).to.be.equal(data.length);
    });


    it('renders tags with external renderer', () => {
        const className = 'aClassNameThatIsNotUsedInTagsinput';
        const tagRenderer = (tag) => <div className={className}>{tag.title}</div>;
        const component = getTagsinputInstance(data, [], noop, {tagRenderer});
        const renderedTags = TestUtils.scryRenderedDOMComponentsWithClass(component, className);

        expect(renderedTags.length).to.be.equal(data.length);
    });

});