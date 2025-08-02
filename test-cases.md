# ✅ Test Cases - Digital E-Gram Panchayat Portal

## 1. User Registration & Role Redirect
- **Input**: Name, Email, Password, Role = User
- **Expected Output**: Account created, redirected to user-dashboard.html
- **Result**: ✅ Passed

## 2. Officer Adds New Service
- **Input**: Title = "Water Supply", Description = "New handpump installation"
- **Expected Output**: Service stored in Firestore, visible in services.html
- **Result**: ✅ Passed

## 3. Complaint Submission by User
- **Input**: Category = "Road", Description = "Broken village road"
- **Expected Output**: Complaint stored, shown in My Application Status section
- **Result**: ✅ Passed

## 4. Role-Based Page Protection
- **Input**: User tries to access officer-dashboard.html
- **Expected Output**: Redirected to login.html
- **Result**: ✅ Passed

## 5. Staff Updates Complaint
- **Input**: Staff selects "Resolved" and adds response
- **Expected Output**: Complaint updated in Firestore
- **Result**: ✅ Passed
