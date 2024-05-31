import React from 'react';
import { render, screen, within } from '@testing-library/react';
import nextJest  from 'next/jest';
import '@testing-library/jest-dom';
import SignUp from '../app/auth/signup/page';

describe('SignUp', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<SignUp />);
      expect(baseElement).toBeTruthy();
    });
  
});