# A Simple To-Do List App Written in Swift

This repository contains a simple To-do list application built for iPhone, iPad, and Apple Watch using Swift 5.

## Main Features

* **Persistent Task Lists:** Utilizes Realm for data persistence.
* **iCloud Sync:** Supports iCloud Kit for seamless syncing across devices.
* **Push Notifications:** Reminders are delivered via push notifications, synced between devices.
* **Comprehensive Task Management:**
    * Add, delete, edit, and complete tasks.
    * Set task date & time with custom reminders and comments (including images).
    * Sort, filter, and prioritize tasks.
* **Multi-Platform Support:**
    * Dedicated iPad app.
    * Dedicated Apple Watch app.
    * Widget for "Today" tasks.
* **Customization & Usability:**
    * Theme support with custom App Icons.
    * Multi-language support.
    * 3D Touch shortcuts.
    * Dark mode.
    * Onboarding/tutorial.
    * Lockdown with FaceID/TouchID or passcode (using BiometricAuthentication).
    * "Smart dates" feature to automatically transform text like "'task name' today at 10:00" into a task with a date/time.
    * Manually rearrange tasks.
    * Catalyst support for macOS.

## Requirements

* iOS 11.0+
* Xcode 11.0+
* Swift 5.0+

## How to Run

1.  Clone the repository to your local machine.
2.  In Xcode, go to "Signing & Capabilities", turn on the iCloud option, and check "CloudKit".
3.  In "Signing & Capabilities", turn on "Background Modes" and check "Background fetch + Remote notification".
4.  Update your app group configuration ("Signing & Capabilities", "App Groups") and the ID string in `RealmManager.swift`.

## Communication

* **Bugs:** If you found a bug, please open an issue on GitHub.
* **Feature Requests:** For new feature ideas, open an issue.
* **Contributions:** If you wish to contribute, submit a pull request.

## Acknowledgements & Frameworks Used

An extensive list of acknowledgements for each external framework used for RSToDoList is available within the app by accessing the settings screen. This project leverages various frameworks including Realm, iCloud Kit, and BiometricAuthentication.

## License

This project is licensed under the MIT License.
