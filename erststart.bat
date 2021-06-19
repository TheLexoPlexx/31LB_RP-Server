@echo off
npm i && npm run build && altv-pkg d release && start.bat
cmd /k