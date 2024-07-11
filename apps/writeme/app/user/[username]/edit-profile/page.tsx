import React from 'react';
import EditProfileForm from './EditProfileForm';
import LocalNavbar from '@writeme/wmc/lib/ui/local-navbar';
import { getUser } from 'apps/writeme/services/users';

export const metadata = {
  title: 'Edit Profile | WriteMe',
  description: '',
};

export interface EditProfileProps {
  params: {
    username: string;
  };
}
const EditProfile = async (props: EditProfileProps) => {
  const user = await getUser(props.params.username);

  return (
    <>
      <LocalNavbar />
      <EditProfileForm user={user} />
    </>
  );
};

export default EditProfile;
