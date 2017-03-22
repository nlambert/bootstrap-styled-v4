/**
 * ListGroup component
 */


import React, { PropTypes } from 'react';
import cn from 'classnames';
import H5 from '../H5';

const defaultProps = {
  tag: H5,
};

class ListGroupItemHeading extends React.Component { // eslint-disable-line react/prefer-stateless-function

  static propTypes = {
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    className: PropTypes.any,
  }

  render() {
    const {
      className,
      tag: Tag,
      ...attributes
    } = this.props;
    const classes = cn(
      className,
      'list-group-item-heading'
    );

    return (
      <Tag {...attributes} className={classes} />
    );
  }
}

ListGroupItemHeading.defaultProps = defaultProps;

export default ListGroupItemHeading ;
