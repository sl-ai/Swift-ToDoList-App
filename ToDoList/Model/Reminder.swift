//
//  Reminder.swift
//  ToDo List
//
//  Created by Shin Lee
//

import Foundation
import SwiftData

@Model
final class Reminder {
    var name: String
    var isCompleted = false
    var startDate = Date.now
    var endDate = Date.now
    
    init(name: String, isCompleted: Bool = false) {
        self.name = name
        self.isCompleted = isCompleted
    }
}
