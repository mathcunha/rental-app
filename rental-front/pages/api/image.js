export default async (req, res) => {
  const { lat, lng } = req.query;

  const url =
    lat &&
    lng &&
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`;

  if (url) {
    const geoRes = await fetch(url);
    const geoBody = await geoRes.json();
    const { location } =
      geoBody &&
      geoBody.results &&
      geoBody.results.length &&
      geoBody.results[0].geometry;

    let city = undefined;

    if (location && geoBody.results[0].address_components) {
      geoBody.results[0].address_components.forEach((item) => {
        if (item.types && item.types.includes("administrative_area_level_2")) {
          city = item.long_name;
        }
      });
    }

    if (city) {
      const imgRes = await fetch(
        `https://pixabay.com/api/?key=${
          process.env.PIXABAY_KEY
        }&q=${encodeURIComponent(city)}&image_type=photo`
      ).catch((err) => {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "image api error", err: err }));
      });
      if (imgRes.status >= 200 && imgRes.status < 300) {
        const body = await imgRes.json();
        const { hits } = body && body.hits && body.hits.length;
        res.status(200).json(JSON.stringify({ city: city, img: body.hits[0] }));
      } else {
        res.statusCode = 400;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({ message: "image api error" }));
      }
    } else {
      res.statusCode = 404;
      res.setHeader("Content-Type", "application/json");
      res.end(JSON.stringify({ message: "not found" }));
    }
  } else {
    res.statusCode = 404;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "not found" }));
  }
};
