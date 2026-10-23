@echo off
cd /d "%~dp0"
title DU HOC KTS - Push to GitHub
cls
echo ========================================================
echo       DU HOC KTS - PUSH MA NGUON LEN GITHUB
echo ========================================================
echo.
set "GIT_EXE=C:\Users\Quang Anh\.git-bin\cmd\git.exe"
set /p "REPO_URL=Dan duong link GitHub repo cua ban vao day va bam Enter: "

if "%REPO_URL%"=="" (
    echo Ban chua nhap link!
    pause
    exit /b
)

echo.
echo [1/3] Dang cau hinh remote...
"%GIT_EXE%" remote remove origin 2>nul
"%GIT_EXE%" remote add origin %REPO_URL%

echo [2/3] Dang dat nhanh main...
"%GIT_EXE%" branch -M main

echo [3/3] Dang day ma nguon len GitHub...
echo (Neu co cua so dang nhap GitHub hien len, hay bam Sign in with your browser)
"%GIT_EXE%" push -u origin main --force

echo.
echo ========================================================
echo Hoan tat! Kiem tra ket qua o tren.
echo ========================================================
pause
