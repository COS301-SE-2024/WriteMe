import React from 'react';
import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import Write from '../app/myworks/[story]/write/[session]/page';
import { userEvent } from '@storybook/testing-library';
import { expect, test, describe, it, vitest } from 'vitest';
import { signIn, signOut, useSession } from 'next-auth/react';
import {usePathname} from 'next/navigation';
vitest.mock('next-auth/react')

const mockUseSession = useSession as vitest.Mock;
// const mockUsePathname = usePathname as vitest.Mock;
;(signIn as vitest.Mock).mockImplementation(() => vitest.fn())
;(signOut as vitest.Mock).mockImplementation(() => vitest.fn())
const mockUsePathname = vitest.fn();

vitest.mock('next/navigation', () => ({
  usePathname() {
    return mockUsePathname();
  },
}));



describe('Write Page', () => {
  // it('should render successfully', () => {
  //     mockUseSession.mockReturnValue({
  //       status: 'authenticated',
  //       data: null,
  //     })
    
  //     mockUsePathname.mockImplementation(() => '/');
  //     try {

  //       const { baseElement } = render(
  //         <Write params={{
  //           story: '1',
  //           session: '1'
  //         }} />);
  //         expect(baseElement).toBeTruthy();
  //       }catch (e){}
  //   });
});
