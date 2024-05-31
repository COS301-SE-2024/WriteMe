import React from 'react';
import { render, screen, within } from '@testing-library/react';
import nextJest  from 'next/jest';
import '@testing-library/jest-dom';
import Write from '../app/myworks/[story]/write/[session]/page';

describe('SignUp', () => {
    it('should render successfully', () => {
      const { baseElement } = render(<Write params={{
          story: '',
          session: ''
      }} />);
      expect(baseElement).toBeTruthy();
    });
});