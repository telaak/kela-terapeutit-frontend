export function HomePageLink({ url }: { url: string | null }) {
  return (
    <>
      {url ? (
        <a target="_blank" href={url.startsWith("www") ? `http://${url}` : url}>
          {url}
        </a>
      ) : (
        <></>
      )}
    </>
  );
}
