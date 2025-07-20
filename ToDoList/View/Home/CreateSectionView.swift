//
//  CreateSectionView.swift
//  ToDo List
//
//  Created by Shin Lee
//

import SwiftUI
import SwiftData

struct CreateSectionView: View {
    @Bindable var reminderList: ReminderList
    
    var body: some View {
        Form {
            TextField("Name", text: $reminderList.name)
            Section("Icon") {
                Picker("Icon", selection: $reminderList.iconName) {
                    Image(systemName: "heart").tag("heart")
                    Image(systemName: "house").tag("house")
                    Image(systemName: "calendar").tag("calendar")
                    Image(systemName: "flag.fill").tag("flag.fill")
                    Image(systemName: "exclamationmark.triangle").tag("exclamationmark.trangle")
                    Image(systemName: "graduationcap").tag("graduationcap")
                    
                }
                .pickerStyle(.segmented)
            }
        }
        .navigationTitle("Add Segment")
        .navigationBarTitleDisplayMode(.inline)
    }
}

#Preview {
    CreateSectionView(reminderList: ReminderList())
}
