# Sapphire Laundry - Platform Documentation

This document provides a comprehensive overview of the Super Admin and Multi-Tenant architecture implemented for Sapphire Laundry.

---

## 1. Implementation Plan & Technical Design

### Objective
Expand Sapphire Laundry into a multi-tenant platform where third-party laundry outlets can register, receive jobs, and pay a commission to the platform (Super Admin).

### Key Architecture Decisions
1. **Commission Model**: Percentage-based commission (configurable per outlet) deducted from each order.
2. **Role Hierarchy**:
   - `superadmin`: Controls everything, approves/rejects outlets, views all revenue.
   - `outlet_owner`: Manages their own outlet, jobs, and earnings.
   - `user`: Standard customer placing orders.
3. **Order Assignment**: Orders are assigned to outlets based on user selection via the dynamic Location Picker.

### Components Impacted

#### Backend (sapphire-backend)
- **Models**:
    - `Outlet.js`: Tracks owner, location, status, and commission rate.
    - `Order.js`: Multi-tenant orders with commission tracking and outlet assignment.
    - `User.js`: Updated to support `superadmin` and `outlet_owner` roles.
- **Controllers & Routes**:
    - `authController.js`: Added outlet owner registration.
    - `outletController.js`: Management of outlets and job queues.
    - `orderController.js`: Paystack verification with automated commission logic.

#### Frontend (sapphire-laundry)
- **Pages**:
    - `SuperAdminDashboard.jsx`: Global oversight and outlet regulation.
    - `OutletDashboard.jsx`: Job management for partners.
    - `OutletRegistration.jsx`: Partner onboarding flow.
- **Components**:
    - `LocationPicker.jsx`: Dynamic outlet discovery from the API.
    - `RequireRole.jsx`: Role-based route protection.

---

## 2. System Walkthrough

### Key Accomplishments
- **Multi-Tenant System**: Successfully added roles and logic to allow third-party participation.
- **Centralized Regulation**: Super Admins can monitor all activities and revenue shares.
- **Partner Dashboard**: Provided business tools for outlet owners to track their laundry jobs.
- **Automated Payout Calculations**: Seamlessly split earnings between the platform and the outlet during payment verification.

### How to Use the System
1. **Partner Registration**: Partners visit `/outlet-register` to create an account and register their physical shop location.
2. **Super Admin Approval**: The platform owner reviews and approves the outlet in the `/super-admin` panel.
3. **Customer Selection**: When a customer checks out at `/checkout`, they select the nearest approved outlet on the map.
4. **Job Processing**: The selected outlet owner sees the job in their `/outlet-dashboard` and can update it from "Pending" to "Delivered".

---

*This documentation serves as the official reference for the Sapphire Laundry Multi-Tenant Platform extension.*
