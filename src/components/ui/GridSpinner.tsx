import dynamic from 'next/dynamic';

// ssr을 false로 하여 서버에서 렌더링하지 않도록 설정, dynamic import 사용
const GridLoader = dynamic(
  () => import('react-spinners').then((lib) => lib.GridLoader),
  { ssr: false }
);

type Props = {
  color?: string;
};

export default function GridSpinner({ color = 'green' }: Props) {
  return <GridLoader color={color} />;
}
