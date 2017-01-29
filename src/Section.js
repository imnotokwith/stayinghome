import React, { Component, PropTypes } from 'react';
import cssModules from 'react-css-modules';
import moment from 'moment';
import { SingleDatePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';
import { getResource as r } from './resources';
import styles from './Section.css';

class Section extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            date: moment(),
            items: [],
            showCheckboxes: false,
            showEditButtons: false,
            edit: false,
            focused: false,
        };

        this.onChange = this.props.onChange;
        this.makeEditable = this.makeEditable.bind(this);
        this.makeDisplayable = this.makeDisplayable.bind(this);
        this.renderDisplay = this.renderDisplay.bind(this);
        this.renderEditable = this.renderEditable.bind(this);
    }

    componentWillMount() {
        const { title, date, items } = this.props.section;
        this.setState({
            title,
            date,
            items,
            showCheckboxes: this.props.showCheckboxes,
            showEditButtons: this.props.showEditButtons,
        });
    }

    makeEditable() {
        this.setState({
            edit: true,
        });
    }

    makeDisplayable() {
        this.onChange({
            title: this.state.title,
            date: this.state.date,
            items: this.state.items,
        });
        this.setState({
            edit: false,
        })
    }

    renderDisplay(props) {
        let { title, date, items, showCheckboxes, showEditButtons } = props;

        if (date) {
            title = date.format('dddd, LL');
        }

        return (
            <article styleName="container">
                <header>
                    {title}
                    {showEditButtons && <button styleName="editButton" onClick={this.makeEditable}>
                        <i className="fa fa-pencil-square" /> {r('section.edit')}
                    </button>}
                </header>
                <ul styleName="list">
                    {items.map((item, i) => (
                        <li styleName="listItemContainer" key={i}>
                            <label styleName="listItem">
                                {showCheckboxes && (
                                    <input type="checkbox" styleName="checkbox" />
                                )}
                                <span styleName="label">{item}</span>
                            </label>
                        </li>
                    ))}
                </ul>
            </article>
        );
    }

    renderEditable(props) {
        const { title, date, items, focused } = props;
        const text = items.join('\n');

        return (
            <article styleName="editable-container">
                <header>
                    <button onClick={this.makeDisplayable} styleName="backButton">
                        <i className="fa fa-chevron-left" /> {r('section.back')}
                    </button>
                </header>
                <header>
                    {date
                        ? <SingleDatePicker
                            style={{ width: '100%' }}
                            id="date"
                            numberOfMonths={1}
                            displayFormat="dddd, LL"
                            date={date}
                            onDateChange={date => this.setState({ date })}
                            focused={focused}
                            onFocusChange={({focused}) => this.setState({ focused })} />
                        : <input
                            styleName="input"
                            type="text"
                            value={title}
                            onChange={ev => this.setState({ title: ev.target.value })} />}
                </header>
                <textarea styleName="textarea" value={text} onChange={ev => this.setState({ items: ev.target.value.split('\n') })} />
            </article>
        );
    }

    render() {
        return this.state.edit
            ? this.renderEditable(this.state)
            : this.renderDisplay(this.state);
    }
}

Section.propTypes = {
    section: PropTypes.shape({
        title: PropTypes.string,
        date: PropTypes.object,
        items: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    onChange: PropTypes.func.isRequired,
    showCheckboxes: PropTypes.bool,
    showEditButtons: PropTypes.bool,
}

Section.defaultProps = {
    showCheckboxes: true,
    showEditButtons: true,
}

export default cssModules(Section, styles);
