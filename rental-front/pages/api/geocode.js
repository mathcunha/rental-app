import jwt from "jsonwebtoken";

export default async (req, res) => {
  const { address, lat, lng } = req.query;
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");

  // invalid token - synchronous
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {
      algorithms: ["HS512"],
    });
  } catch (err) {
    res.statusCode = 403;
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify({ message: "User not authorized" }));
  }

  const url =
    lat && lng
      ? `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${process.env.GOOGLE_API_KEY}`
      : `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
          address
        )}&key=${process.env.GOOGLE_API_KEY}`;
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

  res
    .status(200)
    .json(JSON.stringify({ location: location, city: city, geoBody: geoBody }));
};
