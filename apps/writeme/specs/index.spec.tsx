import React from 'react';
import { render, screen, within } from '@testing-library/react';
import nextJest  from 'next/jest';
import '@testing-library/jest-dom';
import Page from '../app/page';

describe('Page', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Page />);
    expect(baseElement).toBeTruthy();
  });

});

describe('Able to sign up', () => {
  it('should show join now on landing page', () => {
    const { baseElement } = render(<Page />);
    expect(screen.getByTestId('join_now_link')).toHaveTextContent('Join Now');
  });

  it('should show sign up in nav bar', () => {
    const { baseElement} = render(<Page />);
    expect(screen.getByTestId('sign_up_button')).toHaveTextContent('Sign Up');
  });
  
});