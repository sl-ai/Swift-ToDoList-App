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
    @Environment(\.dismiss) private var dismiss
    
    var body: some View {
        VStack {
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
            
            // Bottom buttons
            VStack(spacing: 12) {
                Button(action: saveSection) {
                    Text("Save")
                        .font(.headline)
                        .foregroundColor(.white)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(Color.blue)
                        .cornerRadius(10)
                }
                .disabled(reminderList.name.trimmingCharacters(in: .whitespacesAndNewlines).isEmpty)
                
                Button(action: cancelCreation) {
                    Text("Cancel")
                        .font(.headline)
                        .foregroundColor(.blue)
                        .frame(maxWidth: .infinity)
                        .frame(height: 50)
                        .background(Color.blue.opacity(0.1))
                        .cornerRadius(10)
                }
            }
            .padding(.horizontal, 20)
            .padding(.bottom, 20)
        }
        .navigationTitle("Add Segment")
        .navigationBarTitleDisplayMode(.inline)
    }
    
    private func saveSection() {
        // Trim whitespace from name
        reminderList.name = reminderList.name.trimmingCharacters(in: .whitespacesAndNewlines)
        
        // Dismiss the view to save
        dismiss()
    }
    
    private func cancelCreation() {
        // Dismiss without saving
        dismiss()
    }
}

#Preview {
    CreateSectionView(reminderList: ReminderList())
}
