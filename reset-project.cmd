@echo off
echo Deleting node_modules...
rmdir /s /q node_modules

echo Deleting package-lock.json...
del /f /q package-lock.json

echo Deleting yarn.lock...
del /f /q yarn.lock

echo Deleting .expo...
rmdir /s /q .expo

echo Deleting .expo-shared...
rmdir /s /q .expo-shared

echo Done. Now reinstalling...
npm install

echo ✅ Project reset complete.
pause
