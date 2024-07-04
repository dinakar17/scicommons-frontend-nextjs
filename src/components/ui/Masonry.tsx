import React, { CSSProperties, ReactNode } from 'react';

import { cn } from '@/lib/utils';

interface MasonryProps {
  children: ReactNode | ReactNode[];
  columnsCount?: number;
  gutter?: string;
  className?: string;
  style?: CSSProperties;
}

export const Masonry: React.FC<MasonryProps> = ({
  children,
  columnsCount = 3,
  gutter = '0',
  className = null,
  style = {},
}) => {
  const getColumns = () => {
    const columns: ReactNode[][] = Array.from({ length: columnsCount }, () => []);
    let validIndex = 0;
    React.Children.forEach(children, (child) => {
      if (child && React.isValidElement(child)) {
        columns[validIndex % columnsCount].push(child);
        validIndex++;
      }
    });
    return columns;
  };

  const renderColumns = () => {
    return getColumns().map((column, i) => (
      <div
        key={i}
        className={cn(
          `flex w-0 flex-1 flex-col items-stretch justify-start ${gutter && gutter}`,
          className
        )}
      >
        {column.map((item, index) => (
          <React.Fragment key={index}>{item}</React.Fragment>
        ))}
      </div>
    ));
  };

  return (
    <div
      className={cn(
        `box-border flex w-full flex-row items-stretch justify-center ${gutter && gutter}`
      )}
      style={style}
    >
      {renderColumns()}
    </div>
  );
};
