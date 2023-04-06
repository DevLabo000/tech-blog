import CategoryIcon from '@/public/folder.svg';

type CategoryProps = {
  title: string;
};

export const Category = (props: CategoryProps) => {
  const { title } = props;
  return (
    <div className="rounded-lg text-gray-800 font-medium px-1 py-0.5 flex w-fit place-items-center">
      <CategoryIcon className="mx-1" width={20} height={20} />
      <span className="mr-1 place-items-center">{title}</span>
    </div>
  );
};

export default Category;
