import {
  FacebookIcon,
  FacebookShareButton,
  HatenaIcon,
  HatenaShareButton,
  LineIcon,
  LineShareButton,
  TwitterIcon,
  TwitterShareButton,
} from 'react-share';

type SocialLinkProps = {
  title: string;
  url: string;
  size: number;
  round?: boolean;
};

export const SocialLink = (props: SocialLinkProps) => {
  const { title, url, size, round = true } = props;
  return (
    <div className="w-full text-center">
      <div className="flex py-2 justify-around border-x-gray-700 border-y">
        <TwitterShareButton url={url} title={title}>
          <TwitterIcon round={round} size={size} />
        </TwitterShareButton>
        <LineShareButton url={url} title={title}>
          <LineIcon round={round} size={size} />
        </LineShareButton>
        <HatenaShareButton url={url} title={title}>
          <HatenaIcon round={round} size={size} />
        </HatenaShareButton>
        <FacebookShareButton url={url} title={title}>
          <FacebookIcon round={round} size={size} />
        </FacebookShareButton>
      </div>
    </div>
  );
};
