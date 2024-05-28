import styles from './page.module.css';

/* eslint-disable-next-line */
export interface MyworksProps {}

export default function Myworks(props: MyworksProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Myworks!</h1>
    </div>
  );
}
