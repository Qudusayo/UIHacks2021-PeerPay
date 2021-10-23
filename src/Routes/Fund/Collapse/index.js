import React from "react";
import useCollapse from "react-collapsed";

import styles from "./../style.module.scss";

function Collapse({ title, children, switchStatus, status }) {
//   const [isExpanded, setExpanded] = useState(false);
  const { getCollapseProps, getToggleProps } = useCollapse({ isExpanded: status });
  return (
    <div className={styles.FundingBlocks}>
      <div
        {...getToggleProps({
          onClick: () => {
            switchStatus()
            // setExpanded(status);
          },
        })}
        className={styles.titleBlock}
      >
        {title}
      </div>
      <div {...getCollapseProps()} className={styles.blockContent}>
        {children}
      </div>
    </div>
  );
}

export default Collapse;
