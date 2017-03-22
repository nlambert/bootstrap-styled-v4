/* eslint-disable */
import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import TransitionGroup from 'react-addons-transition-group';
import classNames from 'classnames';
import Fade from './Fade';
import { transition } from '../../styled/mixins/transition';
import { borderRadius } from '../../styled/mixins/border-radius';
import { boxShadow } from '../../styled/mixins/box-shadow';
import { mediaBreakpointUp } from '../../styled/mixins/breakpoints';
import { fade } from '../../styled/utilities/transition';

import {   
  getOriginalBodyPadding,
  conditionallyUpdateScrollbar,
  setScrollbarWidth,
  mapToCssModules,
  omit, 
} from '../../styled/utilities/tools';



const defaultProps = {
  isOpen: false,
  isLocked: false,
  backdrop: true,
  keyboard: true,
  zIndex: 1000,
};

class Modal extends React.Component {
  static propTypes = {
    isOpen: PropTypes.bool,
    isLocked: PropTypes.bool,
    onUnlock: PropTypes.func,
    size: PropTypes.string,
    onBackdrop: PropTypes.func,
    keyboard: PropTypes.bool,
    backdrop: PropTypes.oneOfType([
      PropTypes.bool,
      PropTypes.oneOf(['static'])
    ]),
    onEnter: PropTypes.func,
    onExit: PropTypes.func,
    children: PropTypes.node,
    className: PropTypes.string,
    wrapClassName: PropTypes.string,
    modalClassName: PropTypes.string,
    backdropClassName: PropTypes.string,
    contentClassName: PropTypes.string,
    cssModule: PropTypes.object,
    zIndex: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.string,
    ]),
  };

  isTransitioning = false;

  constructor(props) {
    super(props);

    this.originalBodyPadding = null;
    this.isBodyOverflowing = false;
    this.togglePortal = this.togglePortal.bind(this);
    this.handleBackdropClick = this.handleBackdropClick.bind(this);
    this.handleEscape = this.handleEscape.bind(this);
    this.destroy = this.destroy.bind(this);
    this.onEnter = this.onEnter.bind(this);
    this.onExit = this.onExit.bind(this);
    const sheet = window.document.styleSheets[0];
    sheet.insertRule('.modal-open { overflow: hidden; }', sheet.cssRules.length);
  }

  componentDidMount() {
    if (this.props.isOpen) {
      this.togglePortal();
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.isOpen !== prevProps.isOpen) {
      // handle portal events/dom updates
      this.togglePortal();
    } else if (this._element) {
      // rerender portal
      this.renderIntoSubtree();
    }
  }

  componentWillUnmount() {
    this.onExit();
  }

  onEnter() {
    this.isTransitioning = true;
    if (this.props.isLocked && this.props.onUnlock) {
      this.props.onUnlock();
    }
    if (this.props.onEnter) {
      this.props.onEnter();
    }
  }

  onExit() {
    this.destroy();
    this.isTransitioning = false;
    if (this.props.isLocked && this.props.onUnlock) {
      this.props.onUnlock();
    }
    if (this.props.onExit) {
      this.props.onExit();
    }
  }

  handleEscape(e) {
    this.isTransitioning = false;
    if (!this.isTransitioning && this.props.keyboard && e.keyCode === 27 && this.props.onBackdrop) {
      this.props.onBackdrop();
    }
  }

  handleBackdropClick(e) {
    this.isTransitioning = false;
    if (!this.isTransitioning && this.props.backdrop && e.target && !this._dialog.contains(e.target) && this.props.onBackdrop) {
      this.props.onBackdrop();
    }
  }

  togglePortal() {
    if (this.props.isOpen) {
      this._focus = true;
      this.show();
    } else {
      this.hide();
    }
  }

  destroy() {
    if (this._element) {
      ReactDOM.unmountComponentAtNode(this._element);
      document.body.removeChild(this._element);
      this._element = null;
    }

    const classes = document.body.className.replace('modal-open', '');
    document.body.className = mapToCssModules(classNames(classes).trim(), this.props.cssModule);
    setScrollbarWidth(this.originalBodyPadding);
  }

  hide() {
    this.renderIntoSubtree();
  }

  show() {
    const classes = document.body.className;
    this._element = document.createElement('div');
    this._element.setAttribute('tabindex', '-1');
    this._element.style.position = 'relative';
    this._element.style.zIndex = this.props.zIndex;
    this.originalBodyPadding = getOriginalBodyPadding();

    conditionallyUpdateScrollbar();

    document.body.appendChild(this._element);
    document.body.className = mapToCssModules(classNames(
      classes,
      'modal-open'
    ), this.props.cssModule);

    this.renderIntoSubtree();
  }

  renderIntoSubtree() {
    ReactDOM.unstable_renderSubtreeIntoContainer(
      this,
      this.renderChildren(),
      this._element
    );

    // check if modal should receive focus
    if (this._focus) {
      this._dialog.parentNode.focus();
      this._focus = false;
    }
  }

  renderChildren() {
    const {
      className,
      wrapClassName,
      modalClassName,
      backdropClassName,
      contentClassName,
      cssModule,
      isOpen,
      size,
      backdrop,
      children,
      ...attributes
    } = omit(this.props, ['isLocked', 'onUnlock', 'onBackdrop', 'keyboard', 'onEnter', 'onExit', 'zIndex']);

    return (
      <TransitionGroup component="div" className={mapToCssModules(classNames(wrapClassName, className))}>
        {isOpen && (
          <Fade
            key="modal-dialog"
            onEnter={this.onEnter}
            onLeave={this.onExit}
            transitionAppearTimeout={300}
            transitionEnterTimeout={300}
            transitionLeaveTimeout={300}
            onClickCapture={this.handleBackdropClick}
            onKeyUp={this.handleEscape}
            className={mapToCssModules(classNames('modal', modalClassName), cssModule)}
            style={{ display: 'block' }}
            tabIndex="-1"
          >
            <div
              className={mapToCssModules(classNames('modal-dialog', {
              [`modal-${size}`]: size,
              show: isOpen
              }))}
              role="document"
              ref={(c) => (this._dialog = c)}
              {...attributes}
            >
              <div className={mapToCssModules(classNames('modal-content', contentClassName), cssModule)}>
                {children}
              </div>
            </div>
          </Fade>
        )}
        {isOpen && backdrop && (
          <Fade
            key="modal-backdrop"
            transitionAppearTimeout={150}
            transitionEnterTimeout={150}
            transitionLeaveTimeout={150}
            className={mapToCssModules(classNames('modal-backdrop', backdropClassName), cssModule)}
          />
        )}
      </TransitionGroup>
    );
  }

  render() {
    return null;
  }
}

// eslint-disable-next-line no-class-assign
Modal = styled(Modal)`
  ${(props) => `

    & .modal {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${props.theme['$zindex-modal']};
      display: none;
      outline: 0;
      overflow-x: hidden;
      overflow-y: auto;
      
      ${fade(props.theme['$enable-transitions'], props.theme['$transition-fade'])}
      &.fade {
        .modal-dialog {
          ${transition(props.theme['$enable-transitions'], props.theme['$modal-transition'])}
          transform: translate(0, -25%);
        }
      }
      &.show {
        .modal-dialog {
          transform: translate(0, 0);
        }
      }
    }
    
    & .modal-dialog {
      position: relative;
      width: auto;
      margin: ${props.theme['$modal-dialog-margin']};
    }
    
    
    & .modal-content {
      position: relative;
      display: flex;
      flex-direction: column;
      background-color: ${props.theme['$modal-content-bg']};
      background-clip: padding-box;
      border: ${props.theme['$modal-content-border-width']} solid ${props.theme['$modal-content-border-color']};
      ${borderRadius(props.theme['$enable-rounded'], props.theme['$border-radius-lg'])}
      ${boxShadow(props.theme['$enable-shadows'], props.theme['$modal-content-xs-box-shadow'])}
      outline: 0;
    }
    
    & .modal-backdrop {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: ${props.theme['$zindex-modal-backdrop']};
      background-color: ${props.theme['$modal-backdrop-bg']};
      &.fade {
        opacity: 0
      }
      &.show {
        opacity: ${props.theme['$modal-backdrop-opacity']};
      }
    }
      
        
    & .modal-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: ${props.theme['$modal-header-padding']};
      border-bottom: ${props.theme['$modal-header-border-width']} solid ${props.theme['$modal-header-border-color']};
    }
    
    & .modal-title {
      margin-bottom: 0;
      line-height: ${props.theme['$modal-title-line-height']};
    }
    
    & .modal-body {
      position: relative;
      flex: 1 1 auto;
      padding: ${props.theme['$modal-inner-padding']};
    }
    
    & .modal-footer {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      padding: ${props.theme['$modal-inner-padding']};
      border-top: ${props.theme['$modal-footer-border-width']} solid ${props.theme['$modal-footer-border-color']};
      // Easily place margin between footer elements
      > :not(:first-child) { margin-left: .25rem; }
      > :not(:last-child) { margin-right: .25rem; }
    }
    

  
    // Scale up the modal
    ${mediaBreakpointUp('sm', props.theme['$grid-breakpoints'],
  `
        & .modal-dialog {
          max-width: ${props.theme['$modal-md']};
          margin: ${props.theme['$modal-dialog-sm-up-margin-y']} auto;
        }
      
        & .modal-content {
          ${boxShadow(props.theme['$enable-shadows'], props.theme['$modal-content-sm-up-box-shadow'])}
        }
      
        & .modal-sm {
          max-width: ${props.theme['$modal-sm']};
        }
      `
    )}
  

    ${mediaBreakpointUp('lg', props.theme['$grid-breakpoints'],
  `
        & .modal-lg {
           max-width:  ${props.theme['$modal-lg']}; 
         }
      `
    )}
  `}
`;


Modal.defaultProps = defaultProps;

export default Modal;