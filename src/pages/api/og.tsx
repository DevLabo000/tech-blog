import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const config = {
  runtime: 'experimental-edge',
};

export default function handler(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const hasTitle = searchParams.has('title');
    const title = hasTitle ? searchParams.get('title')?.slice(0, 100) : 'My default title';

    return new ImageResponse(
      (
        <div
          style={{
            backgroundImage:
              'url(https://storage.googleapis.com/p_63f49b1ce439114a7751575c/f7452f55-898c-4eeb-bf63-3f96df5ed7c4%2FogImageBackground.png)',
            backgroundColor: '#fff',
            backgroundSize: '100% 100%',
            height: '100%',
            width: '100%',
            display: 'flex',
            textAlign: 'left',
            alignItems: 'flex-start',
            justifyContent: 'center',
            flexDirection: 'column',
            flexWrap: 'nowrap',
          }}
        >
          <div
            style={{
              width: '100%',
              fontSize: 50,
              fontStyle: 'normal',
              fontWeight: '800',
              color: '#000',
              padding: '0 120px',
              lineHeight: 1.3,
              marginBottom: '30px',
              wordWrap: 'break-word',
            }}
          >
            {title}
          </div>
        </div>
      ),
      {
        width: 1024,
        height: 512,
      }
    );

    // eslint-disable-next-line
  } catch (e: any) {
    // eslint-disable-next-line
    console.log(`${e.message}`);
    return new Response(`Failed to generate the image`, {
      status: 500,
    });
  }
}
