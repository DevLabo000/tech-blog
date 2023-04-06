import React from 'react';

export type HomeProps = {
  side?: React.ReactNode;
  children: React.ReactNode;
};

export const Home: React.FC<HomeProps> = (props) => {
  const { side, children } = props;
  return (
    <section className="container mx-auto h-full">
      <main className="mt-10 md:flex md:flex-wrap md:justify-center">
        <div className="bg-white rounded-md lg:w-1/2">{children}</div>
        {side && (
          <aside className="ml-10 hidden sm:hidden md:hidden lg:block xl:block md:w-1/5">
            <div className="sticky top-20 bg-white p-5 md:px-8 rounded-md">{side}</div>
          </aside>
        )}
      </main>
    </section>
  );
};
