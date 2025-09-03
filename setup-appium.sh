#!/bin/bash

# Appium Setup Script for ToDo List iOS App
# This script helps set up the Appium testing environment

echo "🚀 Setting up Appium testing environment for ToDo List iOS App..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 16.0 or later first."
    echo "   Visit: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js version: $(node --version)"

# Check if npm is installed
if ! command -v npm &> /dev/null; then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ npm version: $(npm --version)"

# Check if Xcode is installed
if ! command -v xcodebuild &> /dev/null; then
    echo "❌ Xcode is not installed. Please install Xcode from the App Store first."
    exit 1
fi

echo "✅ Xcode version: $(xcodebuild -version | head -n 1)"

# Install Node.js dependencies
echo "📦 Installing Node.js dependencies..."
npm install

if [ $? -eq 0 ]; then
    echo "✅ Dependencies installed successfully"
else
    echo "❌ Failed to install dependencies"
    exit 1
fi

# Install Appium globally
echo "🔧 Installing Appium globally..."
npm install -g appium

if [ $? -eq 0 ]; then
    echo "✅ Appium installed successfully"
else
    echo "❌ Failed to install Appium"
    exit 1
fi

# Install Appium Doctor
echo "🏥 Installing Appium Doctor..."
npm install -g appium-doctor

if [ $? -eq 0 ]; then
    echo "✅ Appium Doctor installed successfully"
else
    echo "❌ Failed to install Appium Doctor"
fi

# Create screenshots directory
echo "📸 Creating screenshots directory..."
mkdir -p screenshots

# Check Appium installation
echo "🔍 Checking Appium installation..."
appium --version

if [ $? -eq 0 ]; then
    echo "✅ Appium is properly installed"
else
    echo "❌ Appium installation check failed"
    exit 1
fi

# Run Appium Doctor
echo "🏥 Running Appium Doctor to check environment..."
appium-doctor

echo ""
echo "🎉 Setup completed successfully!"
echo ""
echo "Next steps:"
echo "1. Build your ToDo List app in Xcode"
echo "2. Update appium.config.js with your app path and device settings"
echo "3. Start Appium server: npm run appium"
echo "4. Run tests: npm test"
echo ""
echo "For detailed instructions, see README-APPIUM.md"
echo ""
echo "Happy testing! 🧪"
