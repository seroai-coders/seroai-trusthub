import { FC, PropsWithChildren, ReactNode } from "react";
import { FaCircleCheck } from "react-icons/fa6";

const TimelineItem: FC<
  PropsWithChildren<{ icon?: ReactNode; isFirst?: boolean }>
> = ({ children, icon = <FaCircleCheck />, isFirst = false }) => (
  <li>
    {!isFirst && <hr />}
    <div className="timeline-middle w-12 max-w-12 flex items-center justify-center">
      {icon}
    </div>
    <div className="timeline-end timeline-box w-full mb-4 text-base-content bg-base-100">
      {children}
    </div>
    <hr />
  </li>
);

interface TimelineProps {
  items: { icon?: ReactNode; children?: ReactNode }[];
}

const Timeline: FC<TimelineProps> = ({ items }) => (
  <ul className="timeline timeline-vertical timeline-snap-icon timeline-compact w-full">
    {items.map(({ icon, children }, i) => (
      <TimelineItem key={i} icon={icon} isFirst={!i}>
        {children}
      </TimelineItem>
    ))}
  </ul>
);

export default Timeline;
