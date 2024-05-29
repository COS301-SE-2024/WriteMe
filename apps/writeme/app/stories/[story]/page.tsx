import styles from './page.module.css';

/* eslint-disable-next-line */
export interface StoryProps {}

export default function Story(props: StoryProps) {
  return (
    <div className={styles['container']}>
      <h1>Welcome to Myworks!</h1>
    </div>
  );
}
