import React from 'react';
import FontAwesome from 'react-fontawesome';
import createStyledComponent from 'react-css-modules';
import styles from './Share.css';
import Tweet from './Tweet';
import Post from './Post';

class Share extends React.Component {
  render() {
    return (
      <div styleName="share">
        <Post enabled={this.props.enabled} message={this.props.message} location={this.props.location} />
        <Tweet enabled={this.props.enabled} message={this.props.message} location={this.props.location} />
      </div>
    );
  }
}

Share.propTypes = {
  enabled: React.PropTypes.bool.isRequired,
  message: React.PropTypes.string,
};

export default createStyledComponent(Share, styles);