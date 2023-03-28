// eslint-disable-next-line import/no-extraneous-dependencies
import { css } from '@emotion/css';
// eslint-disable-next-line import/no-extraneous-dependencies
import tw from 'twin.macro';

const test = css`
  ${tw`text-gray-100 uppercase font-semibold text-6xl`}
`;

export default () => (
  <div>
    <section
      style={{
        backgroundImage:
          'url("https://images.unsplash.com/photo-1590690726331-cd7699f1a415?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max")',
      }}
      className="w-screen h-screen bg-no-repeat bg-cover flex justify-center items-center"
    >
      <div className={test}>
        <span className="text-pink-400">M</span>y biograph
        <span className="text-green-400">y</span>
      </div>
    </section>
  </div>
);
