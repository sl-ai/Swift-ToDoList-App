//
//  ReminderList.swift
//  ToDo List
//
//  Created by Shin Lee
//

import Foundation
import SwiftData

@Model
final class ReminderList {
    var name: String
    var iconName: String
    @Relationship(deleteRule: .cascade) var reminder = [Reminder]()
    
    init(name: String = "New", iconName: String = "list.bullet", reminder: [Reminder] = [Reminder]()) {
        self.name = name
        self.iconName = iconName
        self.reminder = reminder
    }
}
