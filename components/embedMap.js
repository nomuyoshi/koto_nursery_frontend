export default function EmbedMap({ width = '100%', height = '350px', address }) {
  const src = `https://www.google.com/maps/embed/v1/place?key=${process.env.MAPS_EMBED_API_KEY}&q=${address}`;
  return (
      <iframe
        width={width}
        height={height}
        loading="lazy"
        src={src}>
      </iframe>
  )
}
