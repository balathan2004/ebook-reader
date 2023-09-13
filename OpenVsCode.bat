set mypath=%cd%
echo %mypath%
cd %mypath%
start /B firefox "localhost:3000/"
start /B code .
npm run dev 

