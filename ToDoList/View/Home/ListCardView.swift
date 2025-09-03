//
//  ListCardView.swift
//  ToDo List
//
//  Created by Shin Lee
//

import SwiftUI
import SwiftData

struct ListCardView: View {
    @Bindable var reminderList: ReminderList
    @Environment(\.modelContext) private var modelContext
    
    var body: some View {
        NavigationLink(value: reminderList) {
            VStack(alignment: .leading, spacing: 5) {
                HStack {
                    listIcon
                    Spacer()
                    Text("\(reminderList.reminder.count)")
                        .font(.system(.title, design: .rounded, weight: .bold)).padding(.trailing, 40)
                }
                Text(reminderList.name)
                    .font(.system(.body, design: .rounded, weight: .bold))
                    .foregroundColor(.secondary)
            }
            .padding(5)
            .padding(.horizontal, 5)
            .background(Color(UIColor.tertiarySystemFill))
            .cornerRadius(10)
            .overlay(
                // Delete button positioned in top-right corner
                Button(action: deleteList) {
                    Image(systemName: "xmark.circle.fill")
                        .font(.title2)
                        .foregroundColor(.gray)
                        .background(Color.white)
                        .clipShape(Circle())
                }
                .padding(8)
                .allowsHitTesting(false)
                , alignment: .topTrailing
            )
        }
        .buttonStyle(.plain)
        .allowsHitTesting(false)
    }
    
    var listIcon: some View {
        ZStack {
            Circle()
                .frame(width: 27)
            Image(systemName: reminderList.iconName)
                .font(.footnote)
                .foregroundColor(.white)
                .bold()
        }
    }
    
    private func deleteList() {
        // Delete the reminder list
        modelContext.delete(reminderList)
        
        // Save the changes
        try? modelContext.save()
    }
}

#Preview {
    do {
        let config = ModelConfiguration(isStoredInMemoryOnly: true)
        let container = try ModelContainer(for: ReminderList.self, configurations: config)
        let example = ReminderList(name: "House Work", iconName: "house", reminder: [Reminder(name: "mow lawn")])
        
        return ListCardView(reminderList: example)
            .modelContainer(container)
    } catch {
        fatalError("Failed to create a model container.")
    }
}
