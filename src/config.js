import update from 'immutability-helper';

export const modalStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    transform: 'translate3d(-50%, -50%, 0)',
    width: '400px'
  }
}

export const prototype = {
  modal: false
};

export const components = [
  {
    slug: 'button',
    name: 'Button',
    event: 'onClick',
    action: 'Show modal',
    style: '',
    render: '<button>Click me</button>'
  }, {
    slug: 'modal',
    name: 'Modal',
    event: 'onClick',
    action: 'Hide modal',
    style: `padding: '1em',
border: '1px solid',
position: 'absolute',
top: '50%',
left: '50%',
display: prototype.modal ? 'inline-block' : 'none'`,
    render: '<div>Modal</div>'
  }
];

export const actions = [
  {
    name: 'Show modal',
    target: 'modal',
    value: true,
    exec: (self) => {
      let temp = update(self.state.prototype, {modal: {$set: true}});
      self.setState({prototype: temp});
    }
  }, {
    name: 'Hide modal',
    target: 'modal',
    value: false,
    exec: (self) => {
      let temp = update(self.state.prototype, {modal: {$set: false}});
      self.setState({prototype: temp});
    }
  }
];

export const flows = [
  {
    event: 'click',
    component: 'button',
    action: 'Show modal'
  }, {
    event: 'click',
    component: 'modal',
    action: 'Hide modal'
  }
];
