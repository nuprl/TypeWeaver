'use strict';

import assert from 'assert';
import sinon from 'sinon';
import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import equal1 from '../es6/react';
import equal2 from '../react';

const run: any = (equal: any) => {
  class ChildWithShouldComponentUpdate extends React.Component {
    shouldComponentUpdate(nextProps) {
      // this.props.children is a h1 with a circular reference to its owner, Container
      return !equal(this.props, nextProps);
    }
    render() {
      return null;
    }
  }

  class Container extends React.Component {
    render() {
      return React.createElement(ChildWithShouldComponentUpdate, {
        children: [
          React.createElement('h1', this.props.title || ''),
          React.createElement('h2', this.props.subtitle || '')
        ]
      });
    }
  }

  describe('advanced', () => {
    let sandbox: any;
    let warnStub: any;
    let childRenderSpy: any;

    beforeEach(() => {
      sandbox = sinon.createSandbox();
      warnStub = sandbox.stub(console, 'warn');
      childRenderSpy = sandbox.spy(ChildWithShouldComponentUpdate.prototype, 'render');
    });

    afterEach(() => {
      sandbox.restore();
    });

    describe('React', () => {
      describe('element (with circular references)', () => {
        it('compares without warning or errors', () => {
          const testRenderer: any = ReactTestRenderer.create(React.createElement(Container));
          testRenderer.update(React.createElement(Container));
          assert.strictEqual(warnStub.callCount, 0);
        });
        it('elements of same type and props are equal', () => {
          const testRenderer: any = ReactTestRenderer.create(React.createElement(Container));
          testRenderer.update(React.createElement(Container));
          assert.strictEqual(childRenderSpy.callCount, 1);
        });
        it('elements of same type with different props are not equal', () => {
          const testRenderer: any = ReactTestRenderer.create(React.createElement(Container));
          testRenderer.update(React.createElement(Container, { title: 'New' }));
          assert.strictEqual(childRenderSpy.callCount, 2);
        });
      });
    });
  });
};

run(equal1);
run(equal2);
