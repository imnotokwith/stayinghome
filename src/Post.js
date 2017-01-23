import React from 'react';
import createStyledComponent from 'react-css-modules';
import styles from './Post.css';

class Tweet extends React.Component {
  render() {
    const post = () => {
      if (!this.props.enabled) return;

      ga && ga('send', 'event', 'Share', 'share', 'Share on Facebook');
      FB && FB.ui({
        method: 'share',
        href: this.props.location,
        quote: this.props.message,
      });
    }

    return (
      <div>
        <a styleName="post-link" href="#" onClick={post}>
          Review and Post
          <i className="fa fa-facebook fa-2x" styleName="facebook-icon"/>
        </a>
      </div>
    );
  }
}

export default createStyledComponent(Tweet, styles);