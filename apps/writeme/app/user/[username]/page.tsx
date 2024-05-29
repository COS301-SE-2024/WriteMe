import styles from './page.module.css';

/* eslint-disable-next-line */
export interface UserProps {}

export default function User(props: UserProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Myworks!</h1>
    </div>
  );
}
