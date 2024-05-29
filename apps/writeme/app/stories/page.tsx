import styles from './page.module.css';

/* eslint-disable-next-line */
export interface StoriesProps {}

export default function Stories(props: StoriesProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Myworks!</h1>
    </div>
  );
}
