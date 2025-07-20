//
//  ToDoListApp.swift
//  ToDo List
//
//  Created by Shin Lee
//

import SwiftUI
import SwiftData

@main
struct ToDoListApp: App {
    var body: some Scene {
        WindowGroup {
            HomeView()
        }
        .modelContainer(for: ReminderList.self)
    }
}
