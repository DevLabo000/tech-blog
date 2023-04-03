/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */
import TagIcon from '@/public/tag.svg';

type TagProps = {
  title: string;
};

export const Tag = (props: TagProps) => {
  const { title } = props;
  return (
    <div className="rounded-lg border border-gray-400 text-gray-800 font-medium px-1 py-0.5 flex w-fit place-items-center">
      <TagIcon className="mx-1" width={20} height={20} />
      <span className="mr-1 mb-1 place-items-center">{title}</span>
    </div>
  );
};

export default Tag;
