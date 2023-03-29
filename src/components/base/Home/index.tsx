import React from 'react';

export type HomeProps = {
  title: string;
};

export const Home: React.FC<HomeProps> = (props) => {
  const { title } = props;
  return (
    <div>
      <section>
        <div>{title}</div>
        <div>{title}</div>
      </section>
    </div>
  );
};
