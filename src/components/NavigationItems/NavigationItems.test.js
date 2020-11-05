import React from 'react';

import Adapter from 'enzyme-adapter-react-16';
import { configure, shallow } from 'enzyme';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationItems />', () => {
    it('should render three <NavigationItem /> elements if not Sign In', () => {
        const wrapper = shallow(<NavigationItems />);
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    })
    it('should render four <NavigationItem /> elements if is Sign In', () => {
        const wrapper = shallow(<NavigationItems isLoggedIn />);
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    })
})