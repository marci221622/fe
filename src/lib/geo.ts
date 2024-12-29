export function getCoords() {
  return new Promise<Coords>((rs, rj) => {
    if (process?.env?.NODE_ENV === 'development') {
      rs({ latitude: 55.8272588, longitude: 37.5929934 });
    } else {
      navigator.geolocation.getCurrentPosition(({ coords }) => {
        rs({ latitude: coords.latitude, longitude: coords.longitude });
      }, rj);
    }
  });
}
