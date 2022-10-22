import React, { useRef } from 'react';

interface IToolTipProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  tooltip?: React.ReactElement;
}

const ToolTip = ({ children, tooltip }: IToolTipProps) => {
  const tooltipRef = useRef<HTMLSpanElement>(null);
  const container = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();

        tooltipRef.current.style.left = `${clientX - left}px`;
      }}
      className="group relative inline-block"
    >
      {children}
      {tooltip ? (
        <span
          ref={tooltipRef}
          className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border bg-blue-500 text-white p-3 rounded-lg absolute bottom-full mt-2 whitespace-nowrap"
        >
          {tooltip}
        </span>
      ) : null}
    </div>
  );
};

ToolTip.defaultProps = {
  tooltip: <div />,
};

export default ToolTip;
