import * as React from 'react';
import * as TestUtils from 'react-addons-test-utils';
import {Tagsinput} from 'Tagsinput.js';

const noop = () => {};

describe('Tagsinput', () => {

    it('renders to DOM', () => {
        const element = <Tagsinput tags={[]} source={[]} onTagsChange={noop} />;
        const component = TestUtils.renderIntoDocument(element);
        expect(TestUtils.isCompositeComponentWithType(component, Tagsinput)).to.be.true;
    });

});