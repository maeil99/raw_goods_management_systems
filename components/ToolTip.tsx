import React, { useRef } from 'react';

interface IToolTipProps {
  children: React.ReactNode;
  // eslint-disable-next-line react/require-default-props
  tooltip?: React.ReactElement;
  // eslint-disable-next-line react/no-unused-prop-types, react/require-default-props
  className?:string;
}

const ToolTip = ({ children, tooltip, className }: IToolTipProps) => {
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
          className={`${className} invisible group-hover:visible opacity-0 group-hover:opacity-100 transition border p-3 rounded-lg absolute bottom-full mt-2 whitespace-nowrap`}
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
