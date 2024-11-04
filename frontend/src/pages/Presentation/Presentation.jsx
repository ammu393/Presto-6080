import PresentationSideBar from '../../components/PresentationSideBar';

export default function Presentation({ token, store }) {
  return (
    <>
      <PresentationSideBar token={token} store={store} />
    </>
  );
}
