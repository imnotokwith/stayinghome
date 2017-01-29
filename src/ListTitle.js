import React, { Component, PropTypes } from 'react'
import cssModules from 'react-css-modules';
import { getResource as r } from './resources';
import styles from './ListTitle.css';

class ListTitle extends Component {
    render() {
        return (
            <header styleName="container">
                <div styleName="firstLine">
                    {r('checklist.title.prefix')}
                </div>
                <input styleName="input" type="text" value={this.props.title} onChange={(ev) => this.props.onChange(ev.target.value)}/>
            </header>
        );
    }
}

ListTitle.propTypes = {
    title: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
}

export default cssModules(ListTitle, styles);
