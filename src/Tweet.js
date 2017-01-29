import React from 'react';
import FontAwesome from 'react-fontawesome';
import createStyledComponent from 'react-css-modules';
import { getResource as r } from './resources';
import styles from './Tweet.css';

class Tweet extends React.Component {
  render() {
    let location = encodeURIComponent(this.props.location);
    let message = encodeURIComponent(this.props.message);

    const tweet = () => {
      if (!this.props.enabled) return;

      ga && ga('send', 'event', 'Share', 'share', 'Share on Twitter');
      window.open(`https://twitter.com/share?url=${location}&text=${message}`, '_blank');
    }

    return (
      <div>
        <a styleName="tweet-link" href="#" onClick={tweet}>
          {r('share.twitter')}
          <i className="fa fa-twitter fa-2x" styleName="twitter-icon"/>
        </a>
      </div>
    );
  }
}

export default createStyledComponent(Tweet, styles);