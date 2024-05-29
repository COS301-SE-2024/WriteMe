/* eslint-disable-next-line */
export interface MyworksProps {}

import dynamic from "next/dynamic";

const Editor = dynamic(() => import("@writeme/wmc/lib/ui/editor"), { ssr: false });

export default function Myworks(props: MyworksProps) {
  return (
    <div >
      <Editor></Editor>
    </div>
  );
}
