#
docker buildx build --platform linux/amd64,linux/arm64,linux/arm/v6 -t agonzalezo/ocr-api:latest --push .