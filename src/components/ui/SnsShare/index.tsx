/* eslint no-underscore-dangle:0 no-shadow:0 */
/* eslint-disable */
import { HatenaIcon, HatenaShareButton, LineIcon, LineShareButton, TwitterIcon, TwitterShareButton } from 'react-share';

export const SnsShare = () => (
  <div>
    <TwitterShareButton url="/" title="a">
      <TwitterIcon round size={32} />
    </TwitterShareButton>
    <LineShareButton url="/">
      <LineIcon round size={32} />
    </LineShareButton>
    <HatenaShareButton url="/">
      <HatenaIcon round size={32} />
    </HatenaShareButton>
  </div>
);

export default SnsShare;
