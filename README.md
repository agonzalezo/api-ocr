api-ocr
============
### An API REST that invoke tesseract binary and return text captured from image to web client.

## To deploy to kubernetes.
> go to kubernetes folder and run the script deploy.sh then run kubectl apply -f deployable.yml.tmp

## To install tesseract in alpine ## 
> apk add tesseract-ocr

## to run
npm i
npm start