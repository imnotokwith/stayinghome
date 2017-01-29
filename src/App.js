import React, { Component } from 'react'
import { renderToString } from 'react-dom/server';
import cssModules from 'react-css-modules';
import { getResource as r } from './resources';
import moment from 'moment';
import styles from './App.css';
import ListTitle from './ListTitle';
import Section from './Section';
import Share from './Share';

function b64EncodeUnicode(str) {
    return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, function(match, p1) {
        return String.fromCharCode('0x' + p1);
    }));
}

function b64DecodeUnicode(str) {
    return decodeURIComponent(Array.prototype.map.call(atob(str), function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
}

class App extends Component {
    constructor() {
        super();

        this.state = {
            title: 'the march/rally/protest',
            sections: {
                before: {
                    title: 'Before',
                    items: [
                        'Choose emergency meeting point',
                        'Take photos of ID/drivers license',
                    ],
                },
                dayOf: {
                    isDatePicked: false,
                    date: moment().add(7, 'days').startOf('day'),
                    items: [
                        'Cash',
                        'Water bottle',
                        'Snacks',
                        'Scarf or bandana',
                        'Leave pocket knife at home',
                        'Remove fingerprints from phone',
                        'Remove unnecessary stuff from wallet',
                        'Write phone number for lawyer on right arm',
                        'Write phone number for emergency contact on left arm',
                        'Write "EMERGENCY" on left hand with arrow pointing up arm',
                    ],
                },
                notes: {
                    title: 'Notes',
                    items: [
                        'Resist without violence',
                    ],
                }
            }
        };

        this.onTitleChange = this.onTitleChange.bind(this);
        this.onSectionChange = this.onSectionChange.bind(this);
        this.share = this.share.bind(this);
    }

    componentWillMount() {
        const search = window.location.search
            .replace(/^\?/, '')
            .split('&')
            .map(pair => {
                const [key, value] = pair.split('=');
                return {
                    key,
                    value,
                };
            })
            .filter(x => x.key === 'list')
            .map(x => JSON.parse(b64DecodeUnicode(x.value)));

        if (search.length) {
            const list = search[0];
            list.sections.dayOf.date = moment(list.sections.dayOf.date);
            this.setState(list);
        }
    }

    componentWillUpdate(nextProps, nextState) {
        const list = b64EncodeUnicode(JSON.stringify(nextState));
        const [ url ] = window.location.href.split(/\?/);
        window.history.pushState(null, `Checklist for ${nextState.title}`, `${url}?list=${list}`);
    }

    onTitleChange(title) {
        this.setState({
            title,
        });
    }

    onSectionChange(key, section) {
        this.setState({
            sections: Object.assign({}, this.state.sections, {
                [key]: section,
            }),
        });
    }

    share() {

    }

    render() {
        return (
            <div styleName="container">
                <div styleName="list">
                    <ListTitle title={this.state.title} onChange={this.onTitleChange} />
                    <article>
                        <Section
                            section={this.state.sections.before}
                            onChange={section => this.onSectionChange('before', section)}
                        />
                        <Section
                            section={this.state.sections.dayOf}
                            onChange={section => this.onSectionChange('dayof', section)}
                        />
                        <Section
                            section={this.state.sections.notes}
                            showCheckboxes={false}
                            onChange={section => this.onSectionChange('notes', section)}
                        />
                    </article>
                </div>
                <div styleName="actions">
                    <Share enabled={true} message={`Checklist for ${this.state.title}. #ImNotOkWith staying home`} location={window.location.href}/>
                </div>
                <footer>
                    <div>
                        #ImNotOkayWith staying home
                    </div>
                    <div>
                        <a href="//imnotokwith.com/stayinghome">
                            imnotokwith.com/stayinghome
                        </a>
                    </div>
                </footer>
            </div>
        );
    }
}

export default cssModules(App, styles);