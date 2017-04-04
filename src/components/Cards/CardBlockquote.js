import React, { PropTypes } from 'react';
import cn from 'classnames';
import { mapToCssModules } from '../../styled/utilities/tools';
import Blockquote from '../Blockquote';

const defaultProps = {
  tag: Blockquote,
};

class CardBlockquote extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.string,
    cssModule: PropTypes.object,
  };

  render() {
    const {
      className,
      cssModule,
      tag: Tag,
      ...attributes
    } = this.props;

    const classes = mapToCssModules(cn(
      className,
      'card-blockquote'
    ), cssModule);

    return (
      <Tag {...attributes} className={classes} />
    );
  }
}

CardBlockquote.defaultProps = defaultProps;

export default CardBlockquote;
