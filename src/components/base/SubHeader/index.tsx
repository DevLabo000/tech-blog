import React from 'react';

export type SubHeaderProps = {
  category: string;
};

export const Layout: React.FC<SubHeaderProps> = (props) => {
  const { category } = props;
  return (
    <div>
      <div>{category}</div>
    </div>
  );
};
