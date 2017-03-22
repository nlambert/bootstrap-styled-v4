import React, { PropTypes } from 'react';
import cn from 'classnames';
import { mapToCssModules } from '../../styled/utilities/tools';

const defaultProps = {
  tag: 'button',
};

class DropdownItem extends React.Component {

  static propTypes = {
    children: PropTypes.node,
    disabled: PropTypes.bool,
    divider: PropTypes.bool,
    tag: PropTypes.oneOfType([PropTypes.func, PropTypes.string]),
    header: PropTypes.bool,
    onClick: PropTypes.func,
    className: PropTypes.string,
    cssModule: PropTypes.object,
  };

  static contextTypes = {
    toggle: PropTypes.func,
  };

  onClick = (e) => {
    if (this.props.disabled || this.props.header || this.props.divider) {
      e.preventDefault();
      return;
    }

    if (this.props.onClick) {
      this.props.onClick(e);
    }
    this.context.toggle();
  }

  getTabIndex = () => {
    if (this.props.disabled || this.props.header || this.props.divider) {
      return '-1';
    }
    return '0';
  }

  render() {
    const tabIndex = this.getTabIndex();
    let {
      className,  // eslint-disable-line prefer-const
      cssModule,  // eslint-disable-line prefer-const
      divider,  // eslint-disable-line prefer-const
      tag: Tag,
      header, // eslint-disable-line prefer-const
      ...props } = this.props;

    const classes = mapToCssModules(cn(
      className,
      {
        disabled: props.disabled,
        'dropdown-item': !divider && !header,
        'dropdown-header': header,
        'dropdown-divider': divider,
      }
    ), cssModule);

    if (Tag === 'button') {
      if (header) {
        Tag = 'h6';
      } else if (divider) {
        Tag = 'div';
      }
    }

    return (
      <Tag
        {...props}
        tabIndex={tabIndex}
        className={classes}
        onClick={this.onClick}
      />
    );
  }
}

DropdownItem.defaultProps = defaultProps;

export default DropdownItem;