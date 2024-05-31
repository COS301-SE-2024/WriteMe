import React from 'react';
import { render, screen, within } from '@testing-library/react';
import nextJest  from 'next/jest';
import '@testing-library/jest-dom';
import LogIn from '../app/auth/login/page';

describe('SignUp', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<LogIn />);
      expect(baseElement).toBeTruthy();
    });
  
});